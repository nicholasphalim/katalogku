import { View, Text } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';

// Sementara. Di Modul 6 isi file ini ditimpa form profil:
// tombol "Tentang" di bawah perlu ditambahkan lagi saat itu.
export default function ProfilScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title="Profil" />
      <Text style={{ padding: 16 }}>Segera hadir di Modul 6</Text>
      <View style={{ paddingHorizontal: 16 }}>
        <Button title="Tentang Aplikasi" variant="outline"
          onPress={() => navigation.navigate('Tentang')} />
      </View>
    </View>
  );
}