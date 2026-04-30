import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '@/context/AppContext';
import { Button, Input } from '@/components/UI';
import { colors, fontSize, spacing } from '@/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';

type LoginProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
type RegisterProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const Header = () => (
  <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
    <View style={s.logoCircle}>
      <Text style={{ color: '#fff', fontSize: 36, fontWeight: '900' }}>L</Text>
    </View>
    <Text style={{ fontSize: fontSize.xxl, fontWeight: '900', color: colors.text, marginTop: spacing.md }}>
      Lumen
    </Text>
    <Text style={{ color: colors.textMuted, marginTop: 4 }}>Your JAMB study companion</Text>
  </View>
);

export const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    setBusy(true);
    const r = await login(email, pw);
    setBusy(false);
    if (!r.ok) Alert.alert('Login failed', r.error ?? 'Unknown error');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={s.container}>
        <Header />
        <Input label="Email" placeholder="you@example.com" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <Input label="Password" placeholder="Your password" secureTextEntry value={pw} onChangeText={setPw} />
        <Button title="Log in" onPress={onSubmit} loading={busy} fullWidth />
        <View style={{ height: spacing.md }} />
        <Button title="Create an account" variant="ghost" onPress={() => navigation.navigate('Register')} fullWidth />
        <Text style={s.hint}>Tip: register with admin@lumen.ng to unlock the admin panel.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const RegisterScreen: React.FC<RegisterProps> = ({ navigation }) => {
  const { register } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    setBusy(true);
    const r = await register(email, pw, name);
    setBusy(false);
    if (!r.ok) Alert.alert('Could not create account', r.error ?? 'Unknown error');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={s.container}>
        <Header />
        <Input label="Full name" value={name} onChangeText={setName} placeholder="Adaeze Okoro" />
        <Input label="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="you@example.com" />
        <Input label="Password" secureTextEntry value={pw} onChangeText={setPw} placeholder="At least 4 characters" />
        <Button title="Create account" onPress={onSubmit} loading={busy} fullWidth />
        <View style={{ height: spacing.md }} />
        <Button title="I already have an account" variant="ghost" onPress={() => navigation.goBack()} fullWidth />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const s = StyleSheet.create({
  container: { padding: spacing.xl, paddingTop: spacing.xxl * 2, flexGrow: 1 },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: { textAlign: 'center', marginTop: spacing.lg, color: colors.textMuted, fontSize: fontSize.sm },
});
