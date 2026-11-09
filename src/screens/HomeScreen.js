import { useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet,
  useWindowDimensions } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import CustomInput from '../components/CustomInput';
import CategoryChips from '../components/CategoryChips';
import Card from '../components/Card';
import { DUMMY_PRODUCTS } from '../data/dummy';
import { COLORS } from '../theme/colors';

const BANNER = 'https://picsum.photos/id/1015/600/300';
const URUTAN = ['Termurah', 'Termahal']; // chip pengurutan (Latihan 2)

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions(); // lebar layar (dp)
  const numColumns = width >= 768 ? 4 : width >= 500 ? 3 : 2;
  const [query, setQuery] = useState('');
  const [kategori, setKategori] = useState('Semua');

  const products = DUMMY_PRODUCTS; // Modul 7: diganti data API
  const categories = ['Semua',
    ...new Set(products.map((p) => p.category)), ...URUTAN];
  const urut = URUTAN.includes(kategori);
  const hasil = products.filter((p) =>
    (kategori === 'Semua' || urut || p.category === kategori) &&
    p.title.toLowerCase().includes(query.toLowerCase()));
  // [...hasil] = salinan, agar array asli tidak berubah oleh sort()
  const data = kategori === 'Termurah'
    ? [...hasil].sort((a, b) => a.price - b.price)
    : kategori === 'Termahal'
      ? [...hasil].sort((a, b) => b.price - a.price)
      : hasil;

  return (
    <View style={styles.container}>
      <HeaderBar title="KatalogKu" subtitle="Temukan produk favoritmu" />
      <View style={styles.search}>
        <CustomInput placeholder="Cari produk..." value={query}
          onChangeText={setQuery} />
      </View>
      <CategoryChips items={categories} selected={kategori}
        onSelect={setKategori} />
      <FlatList
        key={numColumns}  // wajib: paksa render ulang saat kolom berubah
        data={data}
        numColumns={numColumns}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.banner}>
            <Image source={{ uri: BANNER }} style={styles.bannerImage} />
            <View style={styles.bannerOverlay} />
            <Text style={styles.bannerText}>Diskon 50%</Text>
          </View>}
        ListEmptyComponent={
          <Text style={styles.empty}>Produk tidak ditemukan</Text>}
        renderItem={({ item }) => (
          <View style={{ width: `${100 / numColumns}%` }}>
            <Card title={item.title} price={item.price}
              image={item.thumbnail}
              onPress={() =>
                navigation.navigate('Detail', { id: item.id })} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  search: { paddingHorizontal: 16, paddingTop: 12 },
  list: { paddingHorizontal: 10, paddingBottom: 24 },
  banner: { height: 120, margin: 6, borderRadius: 16,
    overflow: 'hidden', backgroundColor: COLORS.border },
  bannerImage: { width: '100%', height: '100%' },
  bannerOverlay: { ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primary, opacity: 0.45 },
  bannerText: { position: 'absolute', left: 16, bottom: 14,
    fontSize: 24, fontWeight: 'bold', color: COLORS.card },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 40 },
});