import { View, FlatList, Text, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Card from '../components/Card';
import { useFavorit } from '../context/FavoritContext';
import { COLORS } from '../theme/colors';

export default function FavoritScreen({ navigation }) {
  const { favorit } = useFavorit(); // ambil data dari Context
  return (
    <View style={styles.container}>
      <HeaderBar title="Favorit" subtitle={`${favorit.length} produk`} />
      <FlatList
        data={favorit}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada produk favorit</Text>}
        renderItem={({ item }) => (
          <View style={{ width: '50%' }}>
            <Card title={item.title} price={item.price}
              image={item.thumbnail}
              onPress={() =>
                // kirim id saja (tantangan M5), sama seperti Beranda
                navigation.navigate('Detail', { id: item.id })} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: 10 },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 40 },
});