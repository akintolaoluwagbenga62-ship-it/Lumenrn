import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useApp } from '@/context/AppContext';
import { Card, Empty } from '@/components/UI';
import { colors, fontSize, spacing } from '@/theme';
import { useFocusEffect } from '@react-navigation/native';

export const LeaderboardScreen: React.FC = () => {
  const { allUsersForLeaderboard, user } = useApp();
  const [rows, setRows] = useState<{ user: any; best: number; total: number }[]>([]);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setBusy(true);
    const r = await allUsersForLeaderboard();
    setRows(r);
    setBusy(false);
  }, [allUsersForLeaderboard]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const medal = (rank: number) => (rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `${rank + 1}.`);

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.lg }}
      refreshControl={<RefreshControl refreshing={busy} onRefresh={load} />}
      data={rows}
      keyExtractor={(r) => r.user.id}
      ListHeaderComponent={
        <Text style={{ fontSize: fontSize.xl, fontWeight: '900', color: colors.text, marginBottom: spacing.md }}>Leaderboard</Text>
      }
      ListEmptyComponent={<Empty title="No scores yet" subtitle="Take a quiz to appear on the leaderboard." />}
      renderItem={({ item, index }) => {
        const me = item.user.id === user?.id;
        return (
          <Card style={me ? s.me : undefined}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ width: 48, fontSize: fontSize.lg, fontWeight: '800', color: colors.text }}>{medal(index)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '700', color: colors.text }}>
                  {item.user.name} {me ? '(you)' : ''}
                </Text>
                <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
                  {item.total} quiz{item.total === 1 ? '' : 'zes'} taken
                </Text>
              </View>
              <Text style={{ fontWeight: '900', color: colors.primary, fontSize: fontSize.lg }}>{item.best}%</Text>
            </View>
          </Card>
        );
      }}
    />
  );
};

const s = StyleSheet.create({
  me: { borderWidth: 2, borderColor: colors.primary },
});
