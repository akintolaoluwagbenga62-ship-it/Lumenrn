import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
  async get<T>(key: string, fallback: T): Promise<T> {
    try {
      const v = await AsyncStorage.getItem(key);
      if (v == null) return fallback;
      return JSON.parse(v) as T;
    } catch {
      return fallback;
    }
  },
  async set<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },
  async clearAll(): Promise<void> {
    await AsyncStorage.clear();
  },
};

export const KEYS = {
  users: 'lumen.users',
  currentUser: 'lumen.currentUser',
  results: 'lumen.results',
  groups: 'lumen.groups',
  messages: 'lumen.messages',
  readMarks: 'lumen.readMarks',
  notifications: 'lumen.notifications',
  flashcardProgress: 'lumen.flashcardProgress',
  customQuestions: 'lumen.customQuestions',
  news: 'lumen.news',
  newsRead: 'lumen.newsRead',
  trialStarts: 'lumen.trialStarts',
};
