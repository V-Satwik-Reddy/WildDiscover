import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function History({ visible, onClose }) {
  const theme = useColorScheme();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    if (!visible) return;

    const fetchPhoneAndHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedPhone = await SecureStore.getItemAsync('phone');
        if (!storedPhone) {
          setError('No phone number found. Please enter your phone in Home screen.');
          setLoading(false);
          return;
        }
        setPhone(storedPhone);

        const response = await fetch(`http://192.168.0.105:3000/user/history?phone=${storedPhone}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        setHistory(data.past || []);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load history.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneAndHistory();
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.container, theme === 'dark' && styles.darkBackground]}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>

        <Text style={[styles.title, theme === 'dark' && styles.darkText]}>🕒 History</Text>

        {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
        {error && <Text style={styles.errorText}>{error}</Text>}

        <ScrollView contentContainerStyle={styles.imageGrid}>
          {history.map(({ url, tag }, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: url }} style={styles.image} resizeMode="cover" />
              <Text style={[styles.tagText, theme === 'dark' && styles.darkText]}>{tag}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E8F5E9' },
  darkBackground: { backgroundColor: '#121212' },
  closeButton: { padding: 10, alignSelf: 'flex-end' },
  closeText: { color: '#2BA84A', fontWeight: 'bold', fontSize: 16 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2BA84A', marginBottom: 15, textAlign: 'center' },
  darkText: { color: '#FFFFFF' },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageWrapper: { width: '48%', marginBottom: 20, alignItems: 'center' },
  image: { width: '100%', height: 180, borderRadius: 10 },
  tagText: { marginTop: 8, fontSize: 16, fontWeight: '600', color: '#333' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
});
