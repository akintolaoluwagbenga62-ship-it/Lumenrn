export type NewsItem = {
  id: string;
  title: string;
  body: string;
  category: 'JAMB Update' | 'Study Tip' | 'Scholarship' | 'Announcement';
  publishedAt: string; // ISO
  author?: string;
  pinned?: boolean;
};

export const SEED_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Welcome to Lumen!',
    body:
      'Lumen helps you prepare for JAMB with practice questions, flashcards, study groups, and a leaderboard. Tap the Practice tab to start your first quiz, and visit Flashcards for quick revision before bed. Good luck — your light is on!',
    category: 'Announcement',
    publishedAt: '2026-04-20T08:00:00Z',
    author: 'Lumen Team',
    pinned: true,
  },
  {
    id: 'news-2',
    title: 'JAMB UTME 2026: Registration Tips',
    body:
      'Confirm your NIN before registration opens. Use a valid email you check daily — your slip and updates will go there. Print two copies of your slip and keep one with your guardian. Always double-check your subject combination matches your course of choice.',
    category: 'JAMB Update',
    publishedAt: '2026-04-18T10:00:00Z',
    author: 'Lumen Team',
  },
  {
    id: 'news-3',
    title: 'Study Tip: The 25/5 Pomodoro Method',
    body:
      'Study deeply for 25 minutes, then take a 5-minute break. After four rounds, take a longer 15-minute break. This rhythm beats burnout and helps your brain consolidate what you have learned. Pair it with Lumen flashcards during the break.',
    category: 'Study Tip',
    publishedAt: '2026-04-15T07:30:00Z',
    author: 'Lumen Team',
  },
  {
    id: 'news-4',
    title: 'How to Master English Lexis & Structure',
    body:
      'Read one short editorial daily and underline new words. Note down 5 synonyms and 5 antonyms each day. Practise with Lumen quizzes set to English-only mode. In two weeks you will see noticeable improvement.',
    category: 'Study Tip',
    publishedAt: '2026-04-10T09:00:00Z',
    author: 'Lumen Team',
  },
  {
    id: 'news-5',
    title: 'Federal Government Scholarship Window Opens',
    body:
      'Eligible JAMB candidates with strong scores may apply for federal scholarships. Visit the official portal of the Federal Scholarship Board for details. Lumen will post category-by-category guides through the week.',
    category: 'Scholarship',
    publishedAt: '2026-04-05T12:00:00Z',
    author: 'Lumen Team',
  },
];
