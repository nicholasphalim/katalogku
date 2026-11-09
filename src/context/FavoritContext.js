import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritContext = createContext(null);
const KUNCI = 'katalogku:favorit'; // nama penyimpanan di AsyncStorage

export function FavoritProvider({ children }) {
  const [favorit, setFavorit] = useState([]); // daftar produk
  const [siap, setSiap] = useState(false);    // true setelah data lama dibaca

  // Tantangan: baca favorit tersimpan sekali saat Provider dibuka
  useEffect(() => {
    AsyncStorage.getItem(KUNCI)
      .then((json) => { if (json) setFavorit(JSON.parse(json)); })
      .catch(() => {})                 // data rusak/gagal baca: mulai kosong
      .finally(() => setSiap(true));
  }, []);

  // Tantangan: simpan setiap kali favorit berubah.
  // Ditunda sampai `siap`, agar array kosong awal tidak menimpa data lama.
  useEffect(() => {
    if (!siap) return;
    AsyncStorage.setItem(KUNCI, JSON.stringify(favorit)).catch(() => {});
  }, [favorit, siap]);

  const isFavorit = (id) => favorit.some((p) => p.id === id);

  const toggleFavorit = (produk) => {
    setFavorit((prev) =>
      prev.some((p) => p.id === produk.id)
        ? prev.filter((p) => p.id !== produk.id) // hapus
        : [...prev, produk]);                     // tambah
  };

  const value = { favorit, isFavorit, toggleFavorit };
  return (
    <FavoritContext.Provider value={value}>
      {children}
    </FavoritContext.Provider>
  );
}

// Custom hook agar screen cukup memanggil useFavorit()
export function useFavorit() {
  return useContext(FavoritContext);
}