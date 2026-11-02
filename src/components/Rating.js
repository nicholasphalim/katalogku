import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

// value: 0-5 (boleh desimal, mis. 4.6). Bintang penuh, setengah, atau kosong.
export default function Rating({ value = 0, max = 5, size = 14 }) {
  const nilai = Math.min(Math.max(Number(value) || 0, 0), max);
  const stars = [];
  for (let i = 1; i <= max; i++) {
    let name = 'star-outline';
    if (nilai >= i - 0.25) name = 'star';
    else if (nilai >= i - 0.75) name = 'star-half';
    stars.push(
      <Ionicons key={i} name={name} size={size} color={COLORS.accent} />
    );
  }
  return (
    <View style={styles.row} accessibilityLabel={`Rating ${nilai} dari ${max}`}>
      {stars}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
});