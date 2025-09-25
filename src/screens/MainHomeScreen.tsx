import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';
import CoursesScreen from './CoursesScreen';
import BottomNavigation from '../components/BottomNavigation';

const MainHomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    // Handle navigation to different screens based on tab
    console.log(`Navigating to ${tab}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Courses':
        return <CoursesScreen />;
      case 'Live':
        return <HomeScreen />; // Placeholder - replace with LiveScreen
      case 'Exams':
        return <HomeScreen />; // Placeholder - replace with ExamsScreen
      case 'Profile':
        return <HomeScreen />; // Placeholder - replace with ProfileScreen
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderContent()}
      </View>
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingBottom: 80,
  },
});

export default MainHomeScreen;
