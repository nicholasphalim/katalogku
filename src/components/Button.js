import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

// variant: 'primary' (latar biru), 'outline' (garis tepi), 'danger' (latar merah)
export default function Button({
  title, onPress, variant = 'primary', disabled = false,
}) {
  const variantStyle = {
    primary: styles.primary,
    outline: styles.outline,
    danger: styles.danger,
  }[variant] ?? styles.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        (pressed || disabled) && styles.dim,
      ]}>
      <Text style={[styles.text, variant === 'outline' && styles.textOutline]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14, paddingHorizontal: 20,
    borderRadius: 10, alignItems: 'center',
  },
  primary: { backgroundColor: COLORS.primary },
  outline: { borderWidth: 1.5, borderColor: COLORS.primary },
  danger: { backgroundColor: COLORS.danger },
  dim: { opacity: 0.5 },
  text: { color: COLORS.card, fontSize: 15, fontWeight: 'bold' },
  textOutline: { color: COLORS.primary },
});