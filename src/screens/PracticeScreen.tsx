import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useApp } from '@/context/AppContext';
import { Button, Card } from '@/components/UI';
import { colors, fontSize, radius, spacing } from '@/theme';
import { questionsBySubject, SUBJECTS, Question } from '@/data/questions';
import { useNavigation } from '@react-navigation/native';

export const PracticeScreen: React.FC = () => {
  const { customQuestions, isTrialActive, user } = useApp();
  const nav = useNavigation<any>();
  const [subject, setSubject] = useState<string>(SUBJECTS[0]);
  const [count, setCount] = useState<number>(10);

  const pool = useMemo(() => questionsBySubject(subject, customQuestions), [subject, customQuestions]);
  const max = pool.length;

  const start = () => {
    if (max === 0) {
      Alert.alert('No questions', 'No questions available for that subject yet.');
      return;
    }
    if (!user?.isPremium && !isTrialActive) {
      Alert.alert('Trial expired', 'Upgrade to Premium to keep practising.', [
        { text: 'Later', style: 'cancel' },
        { text: 'Upgrade', onPress: () => nav.navigate('Paywall') },
      ]);
      return;
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    nav.navigate('Quiz', { subject, questions: shuffled.slice(0, Math.min(count, max)) });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.lg }}>
      <Text style={s.title}>Choose a subject</Text>
      <View style={s.row}>
        {SUBJECTS.map((sub) => (
          <Pressable
            key={sub}
            onPress={() => setSubject(sub)}
            style={[s.chip, subject === sub && { backgroundColor: colors.primary, borderColor: colors.primary }]}
          >
            <Text style={{ color: subject === sub ? '#fff' : colors.text, fontWeight: '700' }}>{sub}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={[s.title, { marginTop: spacing.lg }]}>How many questions?</Text>
      <View style={s.row}>
        {[5, 10, 20, 30].map((n) => (
          <Pressable
            key={n}
            onPress={() => setCount(n)}
            style={[s.chip, count === n && { backgroundColor: colors.primary, borderColor: colors.primary }]}
          >
            <Text style={{ color: count === n ? '#fff' : colors.text, fontWeight: '700' }}>{n}</Text>
          </Pressable>
        ))}
      </View>

      <Card style={{ marginTop: spacing.lg }}>
        <Text style={{ color: colors.textMuted }}>Subject pool</Text>
        <Text style={{ fontSize: fontSize.xl, fontWeight: '900', color: colors.text }}>{max} questions</Text>
        <Text style={{ color: colors.textMuted, marginTop: 4, fontSize: fontSize.sm }}>
          Includes {customQuestions.filter((q) => q.subject === subject).length} added by admin.
        </Text>
      </Card>

      <Button title={`Start ${Math.min(count, max)}-question quiz`} onPress={start} fullWidth style={{ marginTop: spacing.md }} />
    </ScrollView>
  );
};

export const QuizScreen: React.FC<any> = ({ route, navigation }) => {
  const { subject, questions } = route.params as { subject: string; questions: Question[] };
  const { saveResult } = useApp();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[idx];

  const submit = () => {
    if (picked == null) return;
    if (picked === q.answerIndex) setScore((x) => x + 1);
    setRevealed(true);
  };

  const next = async () => {
    setRevealed(false);
    setPicked(null);
    if (idx + 1 >= questions.length) {
      await saveResult({ subject, score, total: questions.length });
      navigation.replace('Results', { subject, score, total: questions.length });
    } else {
      setIdx((i) => i + 1);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}>
      <Text style={{ color: colors.textMuted }}>
        {subject} • Question {idx + 1} of {questions.length}
      </Text>
      <Card>
        <Text style={{ fontSize: fontSize.lg, color: colors.text, fontWeight: '700' }}>{q.text}</Text>
      </Card>
      {q.options.map((opt, i) => {
        const isCorrect = revealed && i === q.answerIndex;
        const isWrongPick = revealed && picked === i && i !== q.answerIndex;
        return (
          <Pressable
            key={i}
            disabled={revealed}
            onPress={() => setPicked(i)}
            style={[
              s.opt,
              picked === i && !revealed && { borderColor: colors.primary, backgroundColor: '#E6F7F4' },
              isCorrect && { borderColor: colors.success, backgroundColor: '#E5F6EA' },
              isWrongPick && { borderColor: colors.danger, backgroundColor: '#FCEBEB' },
            ]}
          >
            <Text style={{ color: colors.text, fontSize: fontSize.md }}>
              {String.fromCharCode(65 + i)}. {opt}
            </Text>
          </Pressable>
        );
      })}
      {revealed && q.explanation && (
        <Card style={{ backgroundColor: '#FFFBE6' }}>
          <Text style={{ fontWeight: '800', color: colors.text, marginBottom: 4 }}>Explanation</Text>
          <Text style={{ color: colors.text }}>{q.explanation}</Text>
        </Card>
      )}
      {!revealed ? (
        <Button title="Submit" onPress={submit} disabled={picked == null} fullWidth style={{ marginTop: spacing.md }} />
      ) : (
        <Button title={idx + 1 >= questions.length ? 'Finish' : 'Next'} onPress={next} fullWidth style={{ marginTop: spacing.md }} />
      )}
    </ScrollView>
  );
};

export const ResultsScreen: React.FC<any> = ({ route, navigation }) => {
  const { subject, score, total } = route.params as { subject: string; score: number; total: number };
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const verdict = pct >= 70 ? 'Excellent!' : pct >= 40 ? 'Keep going.' : 'Practice more.';
  const color = pct >= 70 ? colors.success : pct >= 40 ? colors.warning : colors.danger;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: spacing.lg, justifyContent: 'center' }}>
      <Card style={{ alignItems: 'center', padding: spacing.xxl }}>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.md }}>{subject}</Text>
        <Text style={{ fontSize: 56, fontWeight: '900', color, marginTop: spacing.md }}>{pct}%</Text>
        <Text style={{ color: colors.text, fontWeight: '700', fontSize: fontSize.lg }}>
          {score} / {total}
        </Text>
        <Text style={{ color: colors.textMuted, marginTop: spacing.sm }}>{verdict}</Text>
      </Card>
      <Button title="Back to Practice" onPress={() => navigation.popToTop()} fullWidth />
    </View>
  );
};

const s = StyleSheet.create({
  title: { fontWeight: '800', fontSize: fontSize.lg, color: colors.text, marginBottom: spacing.sm },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 as any },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  opt: {
    backgroundColor: '#fff',
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
});
