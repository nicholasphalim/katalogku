import { View, ScrollView, Alert, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';
import useForm from '../hooks/useForm';
import { validateProfil } from '../utils/validators';
import { COLORS } from '../theme/colors';

const AWAL = { nama: '', email: '', hp: '', password: '', konfirmasi: '' };

export default function ProfilScreen({ navigation }) {
  const { values, errors, handleChange, handleSubmit, reset } =
    useForm(AWAL, validateProfil);

  // Latihan M6: tombol Simpan nonaktif selama ada field kosong
  const adaKosong = Object.values(values).some((v) => !v.trim());

  const simpan = (data) => {
    Alert.alert('Berhasil', `Profil ${data.nama} tersimpan!`);
    reset();
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="Profil" subtitle="Lengkapi data akunmu" />
      <ScrollView contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled">
        <CustomInput label="Nama Lengkap" value={values.nama}
          onChangeText={handleChange('nama')} error={errors.nama} />
        <CustomInput label="Email" value={values.email}
          keyboardType="email-address" autoCapitalize="none"
          onChangeText={handleChange('email')} error={errors.email} />
        <CustomInput label="No. HP" value={values.hp}
          keyboardType="phone-pad"
          onChangeText={handleChange('hp')} error={errors.hp} />
        <CustomInput label="Password" value={values.password}
          secureTextEntry onChangeText={handleChange('password')}
          error={errors.password} />
        <CustomInput label="Ulangi Password" value={values.konfirmasi}
          secureTextEntry onChangeText={handleChange('konfirmasi')}
          error={errors.konfirmasi} />
        <Button title="Simpan Profil" disabled={adaKosong}
          onPress={handleSubmit(simpan)} />
        <View style={styles.gap} />
        {/* Latihan M5: layar Tentang lewat Stack */}
        <Button title="Tentang Aplikasi" variant="outline"
          onPress={() => navigation.navigate('Tentang')} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  form: { padding: 16 },
  gap: { height: 12 },
});