import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type PressableStateCallbackType,
} from 'react-native';

import { colors } from '@/src/theme/colors';

type ButtonProps = PressableProps & {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({ title, variant = 'primary', style, disabled, ...props }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => [
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        state.pressed && !disabled && styles.pressed,
        typeof style === 'function' ? style(state as PressableStateCallbackType) : style,
      ]}
      {...props}>
      <Text style={[styles.text, variant === 'ghost' && styles.ghostText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 18,
  },
  primary: {
    backgroundColor: colors.green,
  },
  secondary: {
    backgroundColor: colors.primary,
  },
  ghost: {
    backgroundColor: colors.surfaceMuted,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  ghostText: {
    color: colors.primary,
  },
});
