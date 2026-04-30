import React, { useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '@/context/AppContext';
import { Card, Empty, Badge } from '@/components/UI';
import { colors, fontSize, radius, spacing } from '@/theme';
import { NewsItem } from '@/data/news';

const categoryColor = (c: NewsItem['category']) =>
  c === 'JAMB Update'
    ? colors.primary
    : c === 'Study Tip'
    ? colors.success
    : c === 'Scholarship'
    ? colors.warning
    : '#7C3AED';

export const NewsScreen: React.FC = () => {
  const { news, newsRead, markNewsRead } = useApp();
  const [active, setActive] = useState<NewsItem | null>(null);

  const sorted = [...news].sort((a, b) => {
    if ((a.pinned ? 1 : 0) !== (b.pinned ? 1 : 0)) return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
    return b.publishedAt.localeCompare(a.publishedAt);
  });

  const open = async (n: NewsItem) => {
    setActive(n);
    if (!newsRead[n.id]) await markNewsRead(n.id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <FlatList
        data={sorted}
        keyExtractor={(n) => n.id}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}
        ListHeaderComponent={
          <Text style={{ fontSize: fontSize.xl, fontWeight: '900', color: colors.text, marginBottom: spacing.md }}>News & Updates</Text>
        }
        ListEmptyComponent={<Empty title="No news yet" subtitle="Check back later for JAMB updates and tips." />}
        renderItem={({ item }) => {
          const unread = !newsRead[item.id];
          return (
            <Pressable onPress={() => open(item)}>
              <Card>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
                  <Badge text={item.category} color={categoryColor(item.category)} />
                  {item.pinned && <Text style={{ marginLeft: spacing.sm }}>📌</Text>}
                  {unread && <View style={s.unreadDot} />}
                </View>
                <Text style={{ fontWeight: '800', fontSize: fontSize.lg, color: colors.text }}>{item.title}</Text>
                <Text style={{ color: colors.textMuted, marginTop: 4 }} numberOfLines={2}>{item.body}</Text>
                <Text style={{ color: colors.textMuted, fontSize: fontSize.xs, marginTop: spacing.sm }}>
                  {item.author ?? 'Lumen'} • {new Date(item.publishedAt).toLocaleDateString()}
                </Text>
              </Card>
            </Pressable>
          );
        }}
      />

      <Modal visible={!!active} animationType="slide" onRequestClose={() => setActive(null)}>
        {active && (
          <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
            <View style={{ padding: spacing.lg }}>
              <Pressable onPress={() => setActive(null)} style={{ alignSelf: 'flex-end' }}>
                <Text style={{ color: colors.primary, fontWeight: '700' }}>Close</Text>
              </Pressable>
              <Badge text={active.category} color={categoryColor(active.category)} />
              <Text style={{ fontSize: fontSize.xxl, fontWeight: '900', color: colors.text, marginTop: spacing.sm }}>{active.title}</Text>
              <Text style={{ color: colors.textMuted, marginTop: 4, fontSize: fontSize.sm }}>
                {active.author ?? 'Lumen'} • {new Date(active.publishedAt).toLocaleString()}
              </Text>
              <Text style={{ color: colors.text, marginTop: spacing.lg, fontSize: fontSize.md, lineHeight: 22 }}>
                {active.body}
              </Text>
            </View>
          </ScrollView>
        )}
      </Modal>
    </View>
  );
};

const s = StyleSheet.create({
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
    marginLeft: spacing.sm,
  },
});
