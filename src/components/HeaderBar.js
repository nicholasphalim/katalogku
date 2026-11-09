import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function HeaderBar({ title, subtitle, onBack }) {
  const insets = useSafeAreaInsets(); // jarak aman dari notch
  return (
    <View style={[styles.bar, { paddingTop: insets.top + 12 }]}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={10} style={styles.back}>
          <Ionicons name="arrow-back" size={24} color={COLORS.card} />
        </Pressable>
      ) : null}
      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subtitle ? (
          <Text style={styles.sub} numberOfLines={1}>{subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16, paddingBottom: 14,
  },
  back: { marginRight: 12 },
  texts: { flex: 1 }, // judul panjang dipotong "..." (Modul 5)
  title: { color: COLORS.card, fontSize: 20, fontWeight: 'bold' },
  sub: { color: COLORS.border, fontSize: 13, marginTop: 2 },
});