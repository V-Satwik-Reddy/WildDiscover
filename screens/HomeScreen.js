import React, { useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import { useFonts, Poppins_700Bold, Poppins_400Regular } from "@expo-google-fonts/poppins";
import * as SplashScreen from 'expo-splash-screen';
import { useAppMode } from '../context/AppModeContext';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Modal, TextInput, Button } from 'react-native';
import { useState } from 'react';

SplashScreen.preventAutoHideAsync();

const categories = [
  { name: "Flora", icon: "seedling", color: "#EAF6E9", route: "FloraScreen" },
  { name: "Fauna", icon: "dove", color: "#E9F2FF", route: "FaunaScreen" },
  { name: "Landmark", icon: "landmark", color: "#FFF7E6", route: "LandmarkScreen" },
];

export default function HomeScreen() {
  const [phone, setPhone] = useState('');
const [isPhoneModalVisible, setPhoneModalVisible] = useState(false);

useEffect(() => {
  const checkPhone = async () => {
    const savedPhone = await SecureStore.getItemAsync('phone');
    if (!savedPhone) {
      setPhoneModalVisible(true);
    }
  };
  checkPhone();
}, []);

const handleSavePhone = async () => {
  if (phone.length >= 10) {
    await SecureStore.setItemAsync('phone', phone);
    setPhoneModalVisible(false);
  } else {
    Alert.alert('Invalid Number', 'Please enter a valid phone number.');
  }
};

  const navigation = useNavigation();
  const theme = useColorScheme();
  const { isOffline, setIsOffline } = useAppMode();

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, theme === "dark" && styles.darkMode]} onLayout={onLayoutRootView}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <View style={styles.headerRow}>
        <Text style={[styles.title, theme === "dark" && styles.darkText]}>🌿 WildDiscover 🫎</Text>
        <TouchableOpacity
  onPress={() => {
    setIsOffline(prev => {
      const newState = !prev;
      Alert.alert(
        'Mode Switched',
        newState ? '🛰️ You are now in Offline Mode.' : '🌐 Switched back to Online Mode.',
        [{ text: 'OK' }]
      );
      return newState;
    });
  }}
>
  <Ionicons
    name={isOffline ? 'cloud-offline' : 'cloud-outline'}
    size={24}
    color={theme === 'dark' ? 'white' : 'black'}
  />
</TouchableOpacity>

      </View>

      <Text style={[styles.subHeader, theme === "dark" && styles.darkSubHeader]}>
        Identify and explore wildlife & landmarks around you!
      </Text>

      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={[styles.card, { backgroundColor: category.color, elevation: 5 }]}
            onPress={() => navigation.navigate(isOffline ? `${category.name}ScreenOffline` : category.route)}
            activeOpacity={0.7}
          >
            <FontAwesome5 name={category.icon} size={40} color="black" />
            <Text style={[styles.cardText, theme === "dark" && styles.darkText]}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.footerText, theme === "dark" && styles.darkFooter]}>📸 Capture or Upload to Identify</Text>
      <Modal visible={isPhoneModalVisible} transparent animationType="slide">
  <View style={{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <View style={{
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    }}>
      <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>
        Enter Your Phone Number
      </Text>
      <TextInput
        placeholder="e.g. 9876543210"
        keyboardType="phone-pad"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          width: '100%',
          padding: 10,
          marginBottom: 15,
        }}
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Save" onPress={handleSavePhone} />
    </View>
  </View>
</Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 20,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  darkMode: {
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    color: "#2BA84A",
    marginBottom: 10,
  },
  darkText: {
    color: "#FFFFFF",
  },
  subHeader: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    fontFamily: "Poppins_400Regular",
    marginBottom: 20,
  },
  darkSubHeader: {
    color: "#BBB",
  },
  categoryContainer: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "80%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardText: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#888",
    marginTop: 20,
    fontFamily: "Poppins_400Regular",
  },
  darkFooter: {
    color: "#BBB",
  },
});
