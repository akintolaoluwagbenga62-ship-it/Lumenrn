import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Storage, KEYS } from '@/services/storage';
import { Question, QUESTIONS } from '@/data/questions';
import { SEED_NEWS, NewsItem } from '@/data/news';

const ADMIN_EMAIL = 'admin@lumen.ng';
const TRIAL_DAYS = 7;

export type User = {
  id: string;
  email: string;
  password: string; // local-only demo
  name: string;
  role: 'admin' | 'student';
  isPremium: boolean;
  createdAt: string;
};

export type QuizResult = {
  id: string;
  userId: string;
  subject: string;
  score: number;
  total: number;
  percent: number;
  takenAt: string;
};

export type Group = {
  id: string;
  name: string;
  description: string;
  members: string[]; // userIds
  createdBy: string;
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  groupId: string;
  userId: string;
  userName: string;
  text: string;
  sentAt: string;
};

export type AppNotification = {
  id: string;
  userId: string | 'all';
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
};

type AppState = {
  user: User | null;
  loading: boolean;
  customQuestions: Question[];
  results: QuizResult[];
  groups: Group[];
  messages: Record<string, ChatMessage[]>;
  notifications: AppNotification[];
  news: NewsItem[];
  newsRead: Record<string, boolean>;
  trialDaysLeft: number;
  isTrialActive: boolean;
};

type AppActions = {
  register: (email: string, password: string, name: string) => Promise<{ ok: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  saveResult: (r: Omit<QuizResult, 'id' | 'takenAt' | 'userId' | 'percent'>) => Promise<void>;
  createGroup: (name: string, description: string) => Promise<void>;
  joinGroup: (groupId: string) => Promise<void>;
  leaveGroup: (groupId: string) => Promise<void>;
  sendMessage: (groupId: string, text: string) => Promise<void>;
  markGroupRead: (groupId: string) => Promise<void>;
  unreadCount: (groupId: string) => number;
  addCustomQuestion: (q: Omit<Question, 'id' | 'source'>) => Promise<void>;
  removeCustomQuestion: (id: string) => Promise<void>;
  upgradeToPremium: () => Promise<void>;
  publishNews: (n: Omit<NewsItem, 'id' | 'publishedAt'>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  markNewsRead: (id: string) => Promise<void>;
  unreadNewsCount: () => number;
  pushNotification: (n: Omit<AppNotification, 'id' | 'createdAt' | 'read'>) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  unreadNotificationCount: () => number;
  allUsersForLeaderboard: () => Promise<{ user: User; best: number; total: number }[]>;
};

const Ctx = createContext<(AppState & AppActions) | null>(null);

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

const computeTrial = (createdAtIso: string) => {
  const start = new Date(createdAtIso).getTime();
  const elapsedDays = (Date.now() - start) / (1000 * 60 * 60 * 24);
  const daysLeft = Math.max(0, Math.ceil(TRIAL_DAYS - elapsedDays));
  return { isTrialActive: daysLeft > 0, daysLeft };
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [readMarks, setReadMarks] = useState<Record<string, string>>({}); // groupId -> last read iso
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [news, setNews] = useState<NewsItem[]>(SEED_NEWS);
  const [newsRead, setNewsRead] = useState<Record<string, boolean>>({});

  // Bootstrap from storage
  useEffect(() => {
    (async () => {
      const [u, cq, rs, gs, ms, rm, nf, nw, nr] = await Promise.all([
        Storage.get<User | null>(KEYS.currentUser, null),
        Storage.get<Question[]>(KEYS.customQuestions, []),
        Storage.get<QuizResult[]>(KEYS.results, []),
        Storage.get<Group[]>(KEYS.groups, []),
        Storage.get<Record<string, ChatMessage[]>>(KEYS.messages, {}),
        Storage.get<Record<string, string>>(KEYS.readMarks, {}),
        Storage.get<AppNotification[]>(KEYS.notifications, []),
        Storage.get<NewsItem[]>(KEYS.news, SEED_NEWS),
        Storage.get<Record<string, boolean>>(KEYS.newsRead, {}),
      ]);
      setUser(u);
      setCustomQuestions(cq);
      setResults(rs);
      setGroups(gs);
      setMessages(ms);
      setReadMarks(rm);
      setNotifications(nf);
      setNews(nw && nw.length ? nw : SEED_NEWS);
      setNewsRead(nr);
      setLoading(false);
    })();
  }, []);

  const persistUsers = async (next: User[]) => Storage.set(KEYS.users, next);
  const persistCurrentUser = async (u: User | null) => Storage.set(KEYS.currentUser, u);

  const register = useCallback<AppActions['register']>(async (email, password, name) => {
    const e = email.trim().toLowerCase();
    if (!e || !password || !name) return { ok: false, error: 'All fields are required.' };
    if (password.length < 4) return { ok: false, error: 'Password must be at least 4 characters.' };
    const users = await Storage.get<User[]>(KEYS.users, []);
    if (users.some((u) => u.email === e)) return { ok: false, error: 'That email is already registered.' };
    const newUser: User = {
      id: uid(),
      email: e,
      password,
      name: name.trim(),
      role: e === ADMIN_EMAIL ? 'admin' : 'student',
      isPremium: e === ADMIN_EMAIL,
      createdAt: new Date().toISOString(),
    };
    await persistUsers([...users, newUser]);
    await persistCurrentUser(newUser);
    setUser(newUser);
    return { ok: true };
  }, []);

  const login = useCallback<AppActions['login']>(async (email, password) => {
    const e = email.trim().toLowerCase();
    const users = await Storage.get<User[]>(KEYS.users, []);
    const found = users.find((u) => u.email === e && u.password === password);
    if (!found) return { ok: false, error: 'Invalid email or password.' };
    await persistCurrentUser(found);
    setUser(found);
    return { ok: true };
  }, []);

  const logout = useCallback(async () => {
    await persistCurrentUser(null);
    setUser(null);
  }, []);

  const saveResult: AppActions['saveResult'] = async ({ subject, score, total }) => {
    if (!user) return;
    const percent = total > 0 ? Math.round((score / total) * 100) : 0;
    const r: QuizResult = {
      id: uid(),
      userId: user.id,
      subject,
      score,
      total,
      percent,
      takenAt: new Date().toISOString(),
    };
    const next = [r, ...results];
    setResults(next);
    await Storage.set(KEYS.results, next);
  };

  const createGroup: AppActions['createGroup'] = async (name, description) => {
    if (!user) return;
    const g: Group = {
      id: uid(),
      name: name.trim(),
      description: description.trim(),
      members: [user.id],
      createdBy: user.id,
      createdAt: new Date().toISOString(),
    };
    const next = [g, ...groups];
    setGroups(next);
    await Storage.set(KEYS.groups, next);
  };

  const joinGroup: AppActions['joinGroup'] = async (groupId) => {
    if (!user) return;
    const next = groups.map((g) =>
      g.id === groupId && !g.members.includes(user.id) ? { ...g, members: [...g.members, user.id] } : g,
    );
    setGroups(next);
    await Storage.set(KEYS.groups, next);
  };

  const leaveGroup: AppActions['leaveGroup'] = async (groupId) => {
    if (!user) return;
    const next = groups.map((g) =>
      g.id === groupId ? { ...g, members: g.members.filter((m) => m !== user.id) } : g,
    );
    setGroups(next);
    await Storage.set(KEYS.groups, next);
  };

  const sendMessage: AppActions['sendMessage'] = async (groupId, text) => {
    if (!user || !text.trim()) return;
    const m: ChatMessage = {
      id: uid(),
      groupId,
      userId: user.id,
      userName: user.name,
      text: text.trim(),
      sentAt: new Date().toISOString(),
    };
    const next = { ...messages, [groupId]: [...(messages[groupId] ?? []), m] };
    setMessages(next);
    await Storage.set(KEYS.messages, next);
  };

  const markGroupRead: AppActions['markGroupRead'] = async (groupId) => {
    const next = { ...readMarks, [groupId]: new Date().toISOString() };
    setReadMarks(next);
    await Storage.set(KEYS.readMarks, next);
  };

  const unreadCount: AppActions['unreadCount'] = (groupId) => {
    if (!user) return 0;
    const lastIso = readMarks[groupId];
    const list = messages[groupId] ?? [];
    return list.filter((m) => m.userId !== user.id && (!lastIso || m.sentAt > lastIso)).length;
  };

  const addCustomQuestion: AppActions['addCustomQuestion'] = async (q) => {
    const newQ: Question = { ...q, id: 'cq-' + uid(), source: 'custom' };
    const next = [...customQuestions, newQ];
    setCustomQuestions(next);
    await Storage.set(KEYS.customQuestions, next);
  };

  const removeCustomQuestion: AppActions['removeCustomQuestion'] = async (id) => {
    const next = customQuestions.filter((q) => q.id !== id);
    setCustomQuestions(next);
    await Storage.set(KEYS.customQuestions, next);
  };

  const upgradeToPremium: AppActions['upgradeToPremium'] = async () => {
    if (!user) return;
    const updated: User = { ...user, isPremium: true };
    setUser(updated);
    await persistCurrentUser(updated);
    const users = await Storage.get<User[]>(KEYS.users, []);
    await persistUsers(users.map((u) => (u.id === updated.id ? updated : u)));
  };

  const publishNews: AppActions['publishNews'] = async (n) => {
    const item: NewsItem = { ...n, id: 'news-' + uid(), publishedAt: new Date().toISOString() };
    const next = [item, ...news];
    setNews(next);
    await Storage.set(KEYS.news, next);
  };

  const deleteNews: AppActions['deleteNews'] = async (id) => {
    const next = news.filter((n) => n.id !== id);
    setNews(next);
    await Storage.set(KEYS.news, next);
  };

  const markNewsRead: AppActions['markNewsRead'] = async (id) => {
    const next = { ...newsRead, [id]: true };
    setNewsRead(next);
    await Storage.set(KEYS.newsRead, next);
  };

  const unreadNewsCount: AppActions['unreadNewsCount'] = () =>
    news.filter((n) => !newsRead[n.id]).length;

  const pushNotification: AppActions['pushNotification'] = async (n) => {
    const item: AppNotification = { ...n, id: 'nt-' + uid(), createdAt: new Date().toISOString(), read: false };
    const next = [item, ...notifications];
    setNotifications(next);
    await Storage.set(KEYS.notifications, next);
  };

  const markNotificationRead: AppActions['markNotificationRead'] = async (id) => {
    const next = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(next);
    await Storage.set(KEYS.notifications, next);
  };

  const unreadNotificationCount: AppActions['unreadNotificationCount'] = () => {
    if (!user) return 0;
    return notifications.filter((n) => !n.read && (n.userId === 'all' || n.userId === user.id)).length;
  };

  const allUsersForLeaderboard: AppActions['allUsersForLeaderboard'] = async () => {
    const users = await Storage.get<User[]>(KEYS.users, []);
    const allResults = await Storage.get<QuizResult[]>(KEYS.results, []);
    return users
      .map((u) => {
        const mine = allResults.filter((r) => r.userId === u.id);
        const best = mine.length ? Math.max(...mine.map((r) => r.percent)) : 0;
        return { user: u, best, total: mine.length };
      })
      .sort((a, b) => b.best - a.best || b.total - a.total)
      .slice(0, 50);
  };

  const trial = useMemo(
    () => (user ? computeTrial(user.createdAt) : { isTrialActive: false, daysLeft: 0 }),
    [user],
  );

  const value: AppState & AppActions = {
    user,
    loading,
    customQuestions,
    results,
    groups,
    messages,
    notifications,
    news,
    newsRead,
    trialDaysLeft: trial.daysLeft,
    isTrialActive: trial.isTrialActive,
    register,
    login,
    logout,
    saveResult,
    createGroup,
    joinGroup,
    leaveGroup,
    sendMessage,
    markGroupRead,
    unreadCount,
    addCustomQuestion,
    removeCustomQuestion,
    upgradeToPremium,
    publishNews,
    deleteNews,
    markNewsRead,
    unreadNewsCount,
    pushNotification,
    markNotificationRead,
    unreadNotificationCount,
    allUsersForLeaderboard,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useApp = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be used inside <AppProvider>');
  return v;
};

export const ALL_QUESTIONS = QUESTIONS;
