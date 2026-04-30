import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '@/context/AppContext';
import { Card, Empty } from '@/components/UI';
import { colors, fontSize, spacing } from '@/theme';

export const NotificationsScreen: React.FC = () => {
  const { notifications, markNotificationRead, user } = useApp();
  const visible = notifications.filter((n) => n.userId === 'all' || n.userId === user?.id);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <FlatList
        data={visible}
        keyExtractor={(n) => n.id}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}
        ListHeaderComponent={
          <Text style={{ fontSize: fontSize.xl, fontWeight: '900', color: colors.text, marginBottom: spacing.md }}>Notifications</Text>
        }
        ListEmptyComponent={<Empty title="No notifications" subtitle="You're all caught up." />}
        renderItem={({ item }) => (
          <Pressable onPress={() => !item.read && markNotificationRead(item.id)}>
            <Card style={!item.read ? s.unread : undefined}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 22, marginRight: spacing.sm }}>🔔</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '800', color: colors.text }}>{item.title}</Text>
                  <Text style={{ color: colors.text, marginTop: 4 }}>{item.body}</Text>
                  <Text style={{ color: colors.textMuted, marginTop: spacing.sm, fontSize: fontSize.xs }}>
                    {new Date(item.createdAt).toLocaleString()}
                  </Text>
                </View>
                {!item.read && <View style={s.dot} />}
              </View>
            </Card>
          </Pressable>
        )}
      />
    </View>
  );
};

const s = StyleSheet.create({
  unread: { borderWidth: 2, borderColor: colors.primary },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.danger, marginLeft: spacing.sm, marginTop: 6 },
});
