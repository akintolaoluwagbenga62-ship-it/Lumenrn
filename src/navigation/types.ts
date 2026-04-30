import { Question } from '@/data/questions';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  Quiz: { subject: string; questions: Question[] };
  Results: { subject: string; score: number; total: number };
  Chat: { groupId: string; name: string };
  Notifications: undefined;
  Paywall: undefined;
  Admin: undefined;
};
