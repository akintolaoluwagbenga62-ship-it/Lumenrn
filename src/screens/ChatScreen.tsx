import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useApp } from '@/context/AppContext';
import { colors, fontSize, radius, spacing } from '@/theme';
import { useNavigation, useRoute } from '@react-navigation/native';

export const ChatScreen: React.FC = () => {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const { groupId, name } = route.params as { groupId: string; name: string };
  const { messages, sendMessage, user, markGroupRead } = useApp();
  const [text, setText] = useState('');
  const listRef = useRef<FlatList>(null);

  const list = messages[groupId] ?? [];

  useEffect(() => {
    nav.setOptions({ title: name });
    markGroupRead(groupId);
    return () => {
      markGroupRead(groupId);
    };
  }, [groupId, name, nav]);

  useEffect(() => {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  }, [list.length]);

  const onSend = async () => {
    if (!text.trim()) return;
    await sendMessage(groupId, text);
    setText('');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={80}>
      <FlatList
        ref={listRef}
        data={list}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}
        renderItem={({ item }) => {
          const mine = item.userId === user?.id;
          return (
            <View style={[s.bubbleWrap, { alignItems: mine ? 'flex-end' : 'flex-start' }]}>
              {!mine && <Text style={s.author}>{item.userName}</Text>}
              <View style={[s.bubble, mine ? s.mine : s.theirs]}>
                <Text style={{ color: mine ? '#fff' : colors.text }}>{item.text}</Text>
                <Text style={[s.time, { color: mine ? '#E6F7F4' : colors.textMuted }]}>
                  {new Date(item.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={{ color: colors.textMuted, textAlign: 'center', marginTop: spacing.xxl }}>
            No messages yet. Say hi 👋
          </Text>
        }
      />
      <View style={s.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={s.input}
          placeholder="Type a message…"
          placeholderTextColor={colors.textMuted}
          multiline
        />
        <Pressable onPress={onSend} style={s.send}>
          <Text style={{ color: '#fff', fontWeight: '800' }}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const s = StyleSheet.create({
  bubbleWrap: { marginBottom: spacing.sm },
  author: { color: colors.textMuted, fontSize: fontSize.xs, marginBottom: 2 },
  bubble: { padding: spacing.md, borderRadius: radius.md, maxWidth: '80%' },
  mine: { backgroundColor: colors.primary, borderTopRightRadius: 4 },
  theirs: { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border, borderTopLeftRadius: 4 },
  time: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  inputRow: {
    flexDirection: 'row',
    padding: spacing.sm,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 10,
    fontSize: fontSize.md,
    color: colors.text,
    maxHeight: 120,
    backgroundColor: colors.bg,
  },
  send: {
    marginLeft: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: radius.md,
  },
});
