import React, { useState } from 'react';
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Empty, Input } from '@/components/UI';
import { useApp } from '@/context/AppContext';
import { colors, fontSize, radius, spacing } from '@/theme';
import { useNavigation } from '@react-navigation/native';

export const GroupsScreen: React.FC = () => {
  const { groups, user, createGroup, joinGroup, leaveGroup, unreadCount } = useApp();
  const nav = useNavigation<any>();
  const [showNew, setShowNew] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const onCreate = async () => {
    if (!name.trim()) return Alert.alert('Name required');
    await createGroup(name, desc);
    setName('');
    setDesc('');
    setShowNew(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <FlatList
        data={groups}
        keyExtractor={(g) => g.id}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}
        ListHeaderComponent={
          <Text style={{ fontSize: fontSize.xl, fontWeight: '900', color: colors.text, marginBottom: spacing.md }}>Study Groups</Text>
        }
        ListEmptyComponent={<Empty title="No groups yet" subtitle="Create the first study group and invite your friends." />}
        renderItem={({ item }) => {
          const joined = !!user && item.members.includes(user.id);
          const unread = unreadCount(item.id);
          return (
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '800', fontSize: fontSize.lg, color: colors.text }}>{item.name}</Text>
                  <Text style={{ color: colors.textMuted, marginTop: 2 }}>{item.description || 'No description'}</Text>
                  <Text style={{ color: colors.textMuted, marginTop: 6, fontSize: fontSize.sm }}>
                    {item.members.length} member{item.members.length === 1 ? '' : 's'}
                  </Text>
                </View>
                {unread > 0 && (
                  <View style={s.unread}>
                    <Text style={{ color: '#fff', fontWeight: '800', fontSize: fontSize.xs }}>{unread}</Text>
                  </View>
                )}
              </View>
              <View style={{ flexDirection: 'row', marginTop: spacing.md }}>
                {joined ? (
                  <>
                    <Button title="Open chat" onPress={() => nav.navigate('Chat', { groupId: item.id, name: item.name })} style={{ flex: 1, marginRight: spacing.sm }} />
                    <Button title="Leave" variant="ghost" onPress={() => leaveGroup(item.id)} style={{ flex: 1, marginLeft: spacing.sm }} />
                  </>
                ) : (
                  <Button title="Join group" onPress={() => joinGroup(item.id)} fullWidth />
                )}
              </View>
            </Card>
          );
        }}
      />
      <Pressable onPress={() => setShowNew(true)} style={s.fab}>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: '900' }}>＋</Text>
      </Pressable>

      <Modal visible={showNew} animationType="slide" transparent>
        <View style={s.modalBg}>
          <View style={s.modal}>
            <Text style={{ fontSize: fontSize.lg, fontWeight: '800', color: colors.text, marginBottom: spacing.md }}>New study group</Text>
            <Input label="Name" value={name} onChangeText={setName} placeholder="e.g. Mathematics warriors" />
            <Input label="Description" value={desc} onChangeText={setDesc} placeholder="What's this group about?" multiline />
            <View style={{ flexDirection: 'row', marginTop: spacing.sm }}>
              <Button title="Cancel" variant="ghost" onPress={() => setShowNew(false)} style={{ flex: 1, marginRight: spacing.sm }} />
              <Button title="Create" onPress={onCreate} style={{ flex: 1, marginLeft: spacing.sm }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const s = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  unread: {
    backgroundColor: colors.danger,
    minWidth: 26,
    height: 26,
    paddingHorizontal: 8,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  modalBg: { flex: 1, backgroundColor: '#0008', justifyContent: 'flex-end' },
  modal: { backgroundColor: colors.bg, padding: spacing.lg, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl },
});
