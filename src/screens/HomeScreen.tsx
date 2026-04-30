import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useApp } from '@/context/AppContext';
import { Card, Badge } from '@/components/UI';
import { colors, fontSize, radius, spacing } from '@/theme';
import { useNavigation } from '@react-navigation/native';

const Tile: React.FC<{ icon: string; title: string; subtitle?: string; onPress?: () => void; bg?: string }> = ({
  icon,
  title,
  subtitle,
  onPress,
  bg = '#E6F7F4',
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      s.tile,
      { backgroundColor: bg, opacity: pressed ? 0.85 : 1 },
    ]}
  >
    <Text style={{ fontSize: 32 }}>{icon}</Text>
    <Text style={{ fontWeight: '800', color: colors.text, marginTop: 6 }}>{title}</Text>
    {subtitle && <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, marginTop: 2 }}>{subtitle}</Text>}
  </Pressable>
);

export const HomeScreen: React.FC = () => {
  const { user, results, trialDaysLeft, isTrialActive, unreadNewsCount, unreadNotificationCount } = useApp();
  const nav = useNavigation<any>();

  const last = results.slice(0, 3);
  const newsCount = unreadNewsCount();
  const notifCount = unreadNotificationCount();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}>
      <View style={s.header}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.textMuted }}>Welcome back,</Text>
          <Text style={{ fontSize: fontSize.xl, fontWeight: '900', color: colors.text }}>{user?.name ?? 'Student'}</Text>
        </View>
        <Pressable onPress={() => nav.navigate('Notifications')} style={s.bellWrap}>
          <Text style={{ fontSize: 22 }}>🔔</Text>
          {notifCount > 0 && (
            <View style={s.dot}>
              <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>{notifCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {!user?.isPremium && (
        <Card style={{ backgroundColor: colors.primary }}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: fontSize.lg }}>
            {isTrialActive ? `Trial: ${trialDaysLeft} day${trialDaysLeft === 1 ? '' : 's'} left` : 'Trial expired'}
          </Text>
          <Text style={{ color: '#E6F7F4', marginTop: 6 }}>
            Unlock unlimited practice, premium flashcards, and full analytics.
          </Text>
          <Pressable
            onPress={() => nav.navigate('Paywall')}
            style={({ pressed }) => [s.cta, { opacity: pressed ? 0.85 : 1 }]}
          >
            <Text style={{ color: colors.primary, fontWeight: '800' }}>Upgrade to Premium</Text>
          </Pressable>
        </Card>
      )}

      <View style={s.grid}>
        <Tile icon="📝" title="Practice" subtitle="JAMB-style quizzes" onPress={() => nav.navigate('PracticeTab')} />
        <Tile icon="🃏" title="Flashcards" subtitle="Quick revision" onPress={() => nav.navigate('FlashcardsTab')} bg="#FFF6E0" />
        <Tile icon="👥" title="Groups" subtitle="Study with friends" onPress={() => nav.navigate('GroupsTab')} bg="#EAF1FF" />
        <Tile icon="🏆" title="Leaderboard" subtitle="See top scorers" onPress={() => nav.navigate('LeaderboardTab')} bg="#FCE8F0" />
        <Tile
          icon="📰"
          title="News"
          subtitle={newsCount > 0 ? `${newsCount} new` : 'JAMB updates'}
          onPress={() => nav.navigate('NewsTab')}
          bg="#E6F0FF"
        />
        {user?.role === 'admin' && (
          <Tile icon="⚙️" title="Admin" subtitle="Manage app" onPress={() => nav.navigate('Admin')} bg="#F0E6FF" />
        )}
      </View>

      <Text style={s.section}>Recent results</Text>
      {last.length === 0 ? (
        <Card>
          <Text style={{ color: colors.textMuted }}>You have not taken any quizzes yet. Tap Practice to start your first one.</Text>
        </Card>
      ) : (
        last.map((r) => (
          <Card key={r.id}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontWeight: '800', color: colors.text }}>{r.subject}</Text>
                <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
                  {r.score}/{r.total} • {new Date(r.takenAt).toLocaleDateString()}
                </Text>
              </View>
              <Badge text={`${r.percent}%`} color={r.percent >= 70 ? colors.success : r.percent >= 40 ? colors.warning : colors.danger} />
            </View>
          </Card>
        ))
      )}
    </ScrollView>
  );
};

const s = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  bellWrap: { padding: spacing.sm },
  dot: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.danger,
    borderRadius: 999,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta: {
    marginTop: spacing.md,
    backgroundColor: '#fff',
    borderRadius: radius.md,
    paddingVertical: 10,
    alignItems: 'center',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: {
    width: '48%',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    minHeight: 110,
  },
  section: { fontWeight: '800', fontSize: fontSize.lg, color: colors.text, marginTop: spacing.md, marginBottom: spacing.sm },
});
