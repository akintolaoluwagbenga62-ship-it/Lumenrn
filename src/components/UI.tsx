import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { colors, fontSize, radius, spacing } from '@/theme';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  style,
  fullWidth,
}) => {
  const bg =
    variant === 'primary'
      ? colors.primary
      : variant === 'secondary'
      ? '#E6F7F4'
      : variant === 'danger'
      ? colors.danger
      : 'transparent';
  const fg =
    variant === 'primary' || variant === 'danger'
      ? '#fff'
      : variant === 'secondary'
      ? colors.primaryDark
      : colors.primary;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          backgroundColor: bg,
          paddingVertical: 12,
          paddingHorizontal: 18,
          borderRadius: radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          minHeight: 44,
          alignSelf: fullWidth ? 'stretch' : 'auto',
          borderWidth: variant === 'ghost' ? 1 : 0,
          borderColor: colors.primary,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <Text style={{ color: fg, fontWeight: '700', fontSize: fontSize.md }}>{title}</Text>
      )}
    </Pressable>
  );
};

export const Input: React.FC<TextInputProps & { label?: string }> = ({ label, style, ...rest }) => (
  <View style={{ marginBottom: spacing.md }}>
    {label && <Text style={s.label}>{label}</Text>}
    <TextInput
      placeholderTextColor={colors.textMuted}
      style={[s.input, style]}
      {...rest}
    />
  </View>
);

export const Card: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({ children, style }) => (
  <View style={[s.card, style]}>{children}</View>
);

export const Badge: React.FC<{ text: string; color?: string }> = ({ text, color = colors.primary }) => (
  <View
    style={{
      backgroundColor: color + '22',
      borderRadius: 999,
      paddingVertical: 2,
      paddingHorizontal: 8,
      alignSelf: 'flex-start',
    }}
  >
    <Text style={{ color, fontWeight: '700', fontSize: fontSize.xs }}>{text}</Text>
  </View>
);

export const Empty: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <View style={{ alignItems: 'center', padding: spacing.xl }}>
    <Text style={{ fontSize: 40, marginBottom: spacing.md }}>📭</Text>
    <Text style={{ fontWeight: '700', color: colors.text, fontSize: fontSize.lg }}>{title}</Text>
    {subtitle && (
      <Text style={{ color: colors.textMuted, textAlign: 'center', marginTop: spacing.sm }}>{subtitle}</Text>
    )}
  </View>
);

const s = StyleSheet.create({
  label: { marginBottom: 6, color: colors.text, fontWeight: '600', fontSize: fontSize.sm },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 12,
    fontSize: fontSize.md,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
});
