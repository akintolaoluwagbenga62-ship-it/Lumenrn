import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '@/context/AppContext';
import { Button, Card } from '@/components/UI';
import { colors, fontSize, spacing } from '@/theme';
import { useNavigation } from '@react-navigation/native';

const Feature: React.FC<{ children: string }> = ({ children }) => (
  <View style={s.row}>
    <Text style={{ color: colors.success, fontSize: fontSize.lg, marginRight: spacing.sm }}>✓</Text>
    <Text style={{ color: colors.text, flex: 1 }}>{children}</Text>
  </View>
);

export const PaywallScreen: React.FC = () => {
  const { upgradeToPremium, user } = useApp();
  const nav = useNavigation<any>();

  const onUpgrade = async () => {
    await upgradeToPremium();
    Alert.alert('Welcome to Premium!', 'Enjoy unlimited access to Lumen.', [{ text: 'Great', onPress: () => nav.goBack() }]);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}>
      <Card style={{ alignItems: 'center', backgroundColor: colors.primary }}>
        <Text style={{ fontSize: 36 }}>⚡</Text>
        <Text style={{ color: '#fff', fontWeight: '900', fontSize: fontSize.xxl, marginTop: spacing.sm }}>Lumen Premium</Text>
        <Text style={{ color: '#E6F7F4', marginTop: spacing.sm, textAlign: 'center' }}>Everything you need to ace JAMB.</Text>
      </Card>

      <Card>
        <Text style={{ fontWeight: '800', fontSize: fontSize.lg, color: colors.text, marginBottom: spacing.md }}>
          What you get
        </Text>
        <Feature>Unlimited practice quizzes — no daily limit</Feature>
        <Feature>Full flashcard library across every subject</Feature>
        <Feature>Detailed explanations for every question</Feature>
        <Feature>Group chat with no message limits</Feature>
        <Feature>Priority access to JAMB news & scholarships</Feature>
      </Card>

      <Card>
        <Text style={{ color: colors.textMuted }}>One-time payment</Text>
        <Text style={{ fontSize: fontSize.xxl, fontWeight: '900', color: colors.text }}>₦2,500</Text>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, marginTop: 2 }}>(demo: tap below to unlock free)</Text>
      </Card>

      <Button
        title={user?.isPremium ? 'You are Premium' : 'Upgrade now'}
        onPress={onUpgrade}
        disabled={user?.isPremium}
        fullWidth
        style={{ marginTop: spacing.md }}
      />
    </ScrollView>
  );
};

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.sm },
});
