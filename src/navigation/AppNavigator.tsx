import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainHomeScreen from '../screens/MainHomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import LiveClassesScreen from '../screens/LiveClassesScreen';
import RecordedVideosScreen from '../screens/RecordedVideosScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    checkFirstTime();
  }, []);

  const checkFirstTime = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        setIsFirstTime(true);
        await AsyncStorage.setItem('hasLaunched', 'true');
      } else {
        setIsFirstTime(false);
      }
    } catch (error) {
      setIsFirstTime(true);
    }
  };

  if (isFirstTime === null) {
    return null; // Loading state
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isFirstTime ? 'Welcome' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={MainHomeScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="LiveClasses" component={LiveClassesScreen} />
        <Stack.Screen name="RecordedVideos" component={RecordedVideosScreen} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
