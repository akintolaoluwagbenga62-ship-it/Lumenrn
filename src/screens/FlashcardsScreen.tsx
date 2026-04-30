import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Button } from '@/components/UI';
import { colors, fontSize, radius, spacing } from '@/theme';
import { FLASHCARDS } from '@/data/flashcards';
import { SUBJECTS } from '@/data/questions';

export const FlashcardsScreen: React.FC = () => {
  const [subject, setSubject] = useState<string>(SUBJECTS[0]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cards = useMemo(() => FLASHCARDS.filter((c) => c.subject === subject), [subject]);
  const card = cards[idx];

  const reset = () => {
    setIdx(0);
    setFlipped(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.lg }}>
      <Text style={s.title}>Flashcards</Text>
      <View style={s.row}>
        {SUBJECTS.map((sub) => (
          <Pressable
            key={sub}
            onPress={() => {
              setSubject(sub);
              reset();
            }}
            style={[s.chip, subject === sub && { backgroundColor: colors.primary, borderColor: colors.primary }]}
          >
            <Text style={{ color: subject === sub ? '#fff' : colors.text, fontWeight: '700' }}>{sub}</Text>
          </Pressable>
        ))}
      </View>

      {cards.length === 0 ? (
        <Card><Text style={{ color: colors.textMuted }}>No flashcards for this subject yet.</Text></Card>
      ) : (
        <>
          <Pressable onPress={() => setFlipped((f) => !f)} style={s.cardFlip}>
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, marginBottom: spacing.sm }}>
              {flipped ? 'Answer' : 'Question'}
            </Text>
            <Text style={{ fontSize: fontSize.xl, color: colors.text, fontWeight: '700', textAlign: 'center' }}>
              {flipped ? card.back : card.front}
            </Text>
            <Text style={{ marginTop: spacing.lg, color: colors.textMuted, fontSize: fontSize.xs }}>
              Tap card to {flipped ? 'see question' : 'reveal answer'}
            </Text>
          </Pressable>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md }}>
            <Button
              title="Previous"
              variant="ghost"
              onPress={() => {
                setFlipped(false);
                setIdx((i) => Math.max(0, i - 1));
              }}
              style={{ flex: 1, marginRight: spacing.sm }}
            />
            <Button
              title="Next"
              onPress={() => {
                setFlipped(false);
                setIdx((i) => Math.min(cards.length - 1, i + 1));
              }}
              style={{ flex: 1, marginLeft: spacing.sm }}
            />
          </View>
          <Text style={{ textAlign: 'center', marginTop: spacing.md, color: colors.textMuted }}>
            {idx + 1} / {cards.length}
          </Text>
        </>
      )}
    </ScrollView>
  );
};

const s = StyleSheet.create({
  title: { fontWeight: '900', fontSize: fontSize.xl, color: colors.text, marginBottom: spacing.md },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.lg },
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
  cardFlip: {
    backgroundColor: '#fff',
    minHeight: 240,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
