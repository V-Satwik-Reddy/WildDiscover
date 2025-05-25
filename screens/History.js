import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

export default function History() {
  const theme = useColorScheme();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost/user/history');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLinks(data.url || []);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, styles.container]}>  
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, styles.container]}>  
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, theme === 'dark' && styles.darkMode]}>
      <Text style={[styles.title, theme === 'dark' && styles.darkText']}>🕒 History</Text>
      <View style={styles.imageGrid}>
        {links.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={styles.historyImage}
            resizeMode="cover"
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
    alignItems: 'center',
  },
  darkMode: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2BA84A',
    marginBottom: 15,
    textAlign: 'center',
  },
  darkText: {
    color: '#FFFFFF',
  },
  imageGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  historyImage: {
    width: '48%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
  },
});
