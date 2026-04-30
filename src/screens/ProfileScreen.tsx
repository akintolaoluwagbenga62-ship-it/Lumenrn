import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '@/context/AppContext';
import { Button, Card, Badge } from '@/components/UI';
import { colors, fontSize, spacing } from '@/theme';

export const ProfileScreen: React.FC = () => {
  const { user, logout, results, isTrialActive, trialDaysLeft } = useApp();

  const onLogout = () =>
    Alert.alert('Log out?', 'You will need to log in again.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: logout },
    ]);

  const totalQuizzes = results.length;
  const avg = results.length ? Math.round(results.reduce((a, r) => a + r.percent, 0) / results.length) : 0;
  const best = results.length ? Math.max(...results.map((r) => r.percent)) : 0;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.lg }}>
      <Card style={{ alignItems: 'center' }}>
        <View style={s.avatar}>
          <Text style={{ color: '#fff', fontSize: 36, fontWeight: '900' }}>{user?.name?.[0]?.toUpperCase() ?? 'L'}</Text>
        </View>
        <Text style={{ fontSize: fontSize.xl, fontWeight: '900', color: colors.text, marginTop: spacing.md }}>{user?.name}</Text>
        <Text style={{ color: colors.textMuted }}>{user?.email}</Text>
        <View style={{ flexDirection: 'row', marginTop: spacing.sm, gap: 6 as any }}>
          {user?.role === 'admin' && <Badge text="ADMIN" color={colors.danger} />}
          <Badge text={user?.isPremium ? 'PREMIUM' : isTrialActive ? `Trial • ${trialDaysLeft}d` : 'FREE'} color={user?.isPremium ? colors.success : colors.warning} />
        </View>
      </Card>

      <Card>
        <Text style={{ fontWeight: '800', fontSize: fontSize.lg, color: colors.text, marginBottom: spacing.md }}>Your stats</Text>
        <View style={s.statsRow}>
          <Stat label="Quizzes" value={`${totalQuizzes}`} />
          <Stat label="Average" value={`${avg}%`} />
          <Stat label="Best" value={`${best}%`} />
        </View>
      </Card>

      <Button title="Log out" variant="danger" onPress={onLogout} fullWidth />
      <Text style={{ textAlign: 'center', color: colors.textMuted, marginTop: spacing.lg, fontSize: fontSize.xs }}>
        Lumen v1.0 • Made for Nigerian JAMB candidates
      </Text>
    </ScrollView>
  );
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={{ alignItems: 'center', flex: 1 }}>
    <Text style={{ fontSize: fontSize.xl, fontWeight: '900', color: colors.primary }}>{value}</Text>
    <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>{label}</Text>
  </View>
);

const s = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
});
