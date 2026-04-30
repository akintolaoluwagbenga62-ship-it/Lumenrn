import React, { useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useApp } from '@/context/AppContext';
import { Button, Card, Input } from '@/components/UI';
import { colors, fontSize, radius, spacing } from '@/theme';
import { SUBJECTS } from '@/data/questions';

export const AdminScreen: React.FC = () => {
  const { user, customQuestions, addCustomQuestion, removeCustomQuestion, publishNews, deleteNews, news, pushNotification } = useApp();
  const [tab, setTab] = useState<'question' | 'news' | 'notify'>('question');

  if (user?.role !== 'admin') {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, padding: spacing.xl, justifyContent: 'center' }}>
        <Card><Text style={{ color: colors.textMuted, textAlign: 'center' }}>Admin access required.</Text></Card>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={s.tabs}>
        {(['question', 'news', 'notify'] as const).map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={[s.tab, tab === t && s.tabActive]}>
            <Text style={{ color: tab === t ? '#fff' : colors.text, fontWeight: '700', textTransform: 'capitalize' }}>
              {t === 'question' ? 'Questions' : t === 'news' ? 'News' : 'Notify'}
            </Text>
          </Pressable>
        ))}
      </View>
      {tab === 'question' && <AddQuestionTab onAdd={addCustomQuestion} customQuestions={customQuestions} onRemove={removeCustomQuestion} />}
      {tab === 'news' && <NewsAdminTab onPublish={publishNews} news={news} onDelete={deleteNews} />}
      {tab === 'notify' && <NotifyTab onPush={pushNotification} />}
    </View>
  );
};

const AddQuestionTab: React.FC<{
  onAdd: (q: any) => Promise<void>;
  customQuestions: any[];
  onRemove: (id: string) => Promise<void>;
}> = ({ onAdd, customQuestions, onRemove }) => {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [answer, setAnswer] = useState(0);
  const [explanation, setExplanation] = useState('');

  const submit = async () => {
    if (!text.trim() || !a.trim() || !b.trim() || !c.trim() || !d.trim()) {
      return Alert.alert('Required', 'Question and all four options are required.');
    }
    await onAdd({ subject, topic, text, options: [a, b, c, d], answerIndex: answer, explanation });
    setText(''); setA(''); setB(''); setC(''); setD(''); setExplanation(''); setAnswer(0); setTopic('');
    Alert.alert('Saved', 'Question added to the bank.');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}>
      <Text style={s.h}>Add a new question</Text>
      <Card>
        <Text style={s.label}>Subject</Text>
        <View style={s.row}>
          {SUBJECTS.map((sb) => (
            <Pressable key={sb} onPress={() => setSubject(sb)} style={[s.chip, subject === sb && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
              <Text style={{ color: subject === sb ? '#fff' : colors.text, fontWeight: '700' }}>{sb}</Text>
            </Pressable>
          ))}
        </View>
        <Input label="Topic (optional)" value={topic} onChangeText={setTopic} placeholder="e.g. Algebra" />
        <Input label="Question" value={text} onChangeText={setText} multiline placeholder="What is…?" />
        <Input label="Option A" value={a} onChangeText={setA} />
        <Input label="Option B" value={b} onChangeText={setB} />
        <Input label="Option C" value={c} onChangeText={setC} />
        <Input label="Option D" value={d} onChangeText={setD} />
        <Text style={s.label}>Correct answer</Text>
        <View style={s.row}>
          {[0, 1, 2, 3].map((i) => (
            <Pressable key={i} onPress={() => setAnswer(i)} style={[s.chip, answer === i && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
              <Text style={{ color: answer === i ? '#fff' : colors.text, fontWeight: '700' }}>{String.fromCharCode(65 + i)}</Text>
            </Pressable>
          ))}
        </View>
        <Input label="Explanation (optional)" value={explanation} onChangeText={setExplanation} multiline />
        <Button title="Save question" onPress={submit} fullWidth />
      </Card>

      <Text style={s.h}>My added questions ({customQuestions.length})</Text>
      {customQuestions.length === 0 ? (
        <Card><Text style={{ color: colors.textMuted }}>No custom questions yet.</Text></Card>
      ) : (
        customQuestions.map((q) => (
          <Card key={q.id}>
            <Text style={{ fontWeight: '700', color: colors.text }}>[{q.subject}] {q.text}</Text>
            <Text style={{ color: colors.textMuted, marginTop: 4 }}>Answer: {String.fromCharCode(65 + q.answerIndex)}. {q.options[q.answerIndex]}</Text>
            <Button title="Remove" variant="danger" onPress={() => onRemove(q.id)} style={{ marginTop: spacing.sm }} />
          </Card>
        ))
      )}
    </ScrollView>
  );
};

const NewsAdminTab: React.FC<{ onPublish: (n: any) => Promise<void>; news: any[]; onDelete: (id: string) => Promise<void> }> = ({ onPublish, news, onDelete }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<'JAMB Update' | 'Study Tip' | 'Scholarship' | 'Announcement'>('Announcement');
  const [pinned, setPinned] = useState(false);

  const submit = async () => {
    if (!title.trim() || !body.trim()) return Alert.alert('Required', 'Title and body are required.');
    await onPublish({ title, body, category, pinned, author: 'Admin' });
    setTitle('');
    setBody('');
    setPinned(false);
    Alert.alert('Published', 'Your news post is live.');
  };

  return (
    <FlatList
      data={news}
      keyExtractor={(n) => n.id}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}
      ListHeaderComponent={
        <>
          <Text style={s.h}>Publish news</Text>
          <Card>
            <Input label="Title" value={title} onChangeText={setTitle} />
            <Input label="Body" value={body} onChangeText={setBody} multiline style={{ minHeight: 100 }} />
            <Text style={s.label}>Category</Text>
            <View style={s.row}>
              {(['Announcement', 'JAMB Update', 'Study Tip', 'Scholarship'] as const).map((c) => (
                <Pressable key={c} onPress={() => setCategory(c)} style={[s.chip, category === c && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
                  <Text style={{ color: category === c ? '#fff' : colors.text, fontWeight: '700' }}>{c}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable onPress={() => setPinned((p) => !p)} style={[s.chip, pinned && { backgroundColor: colors.accent, borderColor: colors.accent }, { marginTop: spacing.sm }]}>
              <Text style={{ color: colors.text, fontWeight: '700' }}>{pinned ? '📌 Pinned' : 'Pin to top'}</Text>
            </Pressable>
            <Button title="Publish" onPress={submit} fullWidth style={{ marginTop: spacing.md }} />
          </Card>
          <Text style={s.h}>Existing posts</Text>
        </>
      }
      renderItem={({ item }) => (
        <Card>
          <Text style={{ fontWeight: '800', color: colors.text }}>{item.pinned ? '📌 ' : ''}{item.title}</Text>
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>{item.category} • {new Date(item.publishedAt).toLocaleDateString()}</Text>
          <Button title="Delete" variant="danger" onPress={() => onDelete(item.id)} style={{ marginTop: spacing.sm }} />
        </Card>
      )}
    />
  );
};

const NotifyTab: React.FC<{ onPush: (n: any) => Promise<void> }> = ({ onPush }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const submit = async () => {
    if (!title.trim() || !body.trim()) return Alert.alert('Required', 'Title and message are required.');
    await onPush({ userId: 'all', title, body });
    setTitle('');
    setBody('');
    Alert.alert('Sent', 'Notification sent to all users.');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
      <Text style={s.h}>Send a broadcast notification</Text>
      <Card>
        <Input label="Title" value={title} onChangeText={setTitle} />
        <Input label="Message" value={body} onChangeText={setBody} multiline style={{ minHeight: 100 }} />
        <Button title="Send to all users" onPress={submit} fullWidth />
      </Card>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  tabs: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderColor: colors.border },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabActive: { backgroundColor: colors.primary },
  h: { fontSize: fontSize.lg, fontWeight: '900', color: colors.text, marginBottom: spacing.sm, marginTop: spacing.md },
  label: { color: colors.text, fontWeight: '600', fontSize: fontSize.sm, marginBottom: 6 },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.sm },
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
});
