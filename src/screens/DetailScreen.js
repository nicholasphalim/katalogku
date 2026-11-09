import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';
import { DUMMY_PRODUCTS } from '../data/dummy';
import { COLORS } from '../theme/colors';

export default function DetailScreen({ route, navigation }) {
  // Tantangan M5: Beranda hanya mengirim id, produk dicari di sini.
  // Modul 7: pencarian ini diganti permintaan ke API berdasarkan id.
  const { id } = route.params;
  const product = DUMMY_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <HeaderBar title="Detail Produk"
          onBack={() => navigation.goBack()} />
        <Text style={styles.empty}>Produk tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderBar title={product.title}
        onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.thumbnail }}
          style={styles.image} />
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>$ {product.price}</Text>
        <Text style={styles.rating}>Rating {product.rating} / 5</Text>
        <Text style={styles.desc}>{product.description}</Text>
        <Button title="Tambah ke Favorit" onPress={() => {}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  image: { width: '100%', aspectRatio: 1, borderRadius: 16,
    backgroundColor: COLORS.border },
  category: { marginTop: 16, color: COLORS.muted,
    textTransform: 'uppercase', fontSize: 12 },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  price: { fontSize: 20, color: COLORS.accent, marginTop: 6,
    fontWeight: 'bold' },
  rating: { color: COLORS.muted, marginTop: 4 },
  desc: { fontSize: 15, lineHeight: 22, color: COLORS.text,
    marginVertical: 16 },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 40 },
});