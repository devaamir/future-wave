import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';
import CoursesScreen from './CoursesScreen';
import LiveClassesScreen from './LiveClassesScreen';
import ExamsScreen from './ExamsScreen';
import ProfileScreen from './ProfileScreen';
import BottomNavigation from '../components/BottomNavigation';

const MainHomeScreen = ({ navigation }: any) => {
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
        return <LiveClassesScreen />;
      case 'Exams':
        return <ExamsScreen />;
      case 'Profile':
        return (
          <ProfileScreen navigation={navigation} onTabPress={handleTabPress} />
        );
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderContent()}</View>
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
