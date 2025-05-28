import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppState } from 'react-native';
import { useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
// Import context
import { AppModeProvider, useAppMode } from './context/AppModeContext';

// Screens
import HomeScreen from './screens/HomeScreen';
import FloraScreen from './screens/FloraScreen';
import FaunaScreen from './screens/FaunaScreen';
import LandmarkScreen from './screens/LandmarkScreen';
import ResultScreen from './screens/ResultScreen';

// Offline variants (you’ll create these)
import FloraScreenOffline from './screens/FloraScreenOffline';
import FaunaScreenOffline from './screens/FaunaScreenOffline';
import LandmarkScreenOffline from './screens/LandmarkScreenOffline';

const Stack = createStackNavigator();

function AppNavigator() {
  const appState = useRef(AppState.currentState);
const [hasPrompted, setHasPrompted] = useState(false);

useEffect(() => {
  const subscription = AppState.addEventListener('change', nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active' &&
      !hasPrompted
    ) {
      appState.current = nextAppState;
      showLocationPrompt();
      setHasPrompted(true);
    }
  });

  return () => {
    subscription.remove();
  };
}, []);
  
const showLocationPrompt = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return;

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  const nearbySpecies = await fetchSeasonalSpecies(latitude, longitude); // your own logic

  if (nearbySpecies && nearbySpecies.length > 0) {
    Alert.alert(
      '🌿 Local Discoveries',
      `Keep an eye out for: ${nearbySpecies.join(', ')}`,
      [
        { text: 'View More', onPress: () => navigation.navigate('SuggestionScreen') },
        { text: 'Got it', style: 'cancel' }
      ]
    );
  }
};
  const theme = useColorScheme();
  const { isOffline } = useAppMode();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="FloraScreen"
          component={isOffline ? FloraScreenOffline : FloraScreen}
          options={{ title: 'Identify Flora' }}
        />
        <Stack.Screen
          name="FaunaScreen"
          component={isOffline ? FaunaScreenOffline : FaunaScreen}
          options={{ title: 'Identify Fauna' }}
        />
        <Stack.Screen
          name="LandmarkScreen"
          component={isOffline ? LandmarkScreenOffline : LandmarkScreen}
          options={{ title: 'Identify Landmark' }}
        />
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ title: 'Identification Result' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    (async () => {
      try {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
          Alert.alert('Permissions Required', 'Camera and media permissions are required to use this app.');
        }
      } catch (error) {
        console.error('Permission request error:', error);
      }
    })();
  }, []);

  return (
    <AppModeProvider>
      <AppNavigator />
    </AppModeProvider>
  );
}
