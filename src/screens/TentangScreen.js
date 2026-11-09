import { View, Text, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';

// Latihan M5: dibuka dari Profil lewat Stack (navigate('Tentang'))
export default function TentangScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBar title="Tentang" onBack={() => navigation.goBack()} />
      <View style={styles.card}>
        <Text style={styles.app}>KatalogKu</Text>
        <Text style={styles.label}>Nama</Text>
        <Text style={styles.value}>Nicholas Putra Halim</Text>
        <Text style={styles.label}>NIM</Text>
        <Text style={styles.value}>18224098</Text>
        <Text style={styles.label}>Mata Kuliah</Text>
        <Text style={styles.value}>
          II3140 Pengembangan Aplikasi Web dan Mobile
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  card: {
    margin: 16, padding: 16, borderRadius: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1, borderColor: COLORS.border,
  },
  app: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary },
  label: { marginTop: 12, fontSize: 13, color: COLORS.muted },
  value: { fontSize: 15, color: COLORS.text, fontWeight: 'bold' },
});