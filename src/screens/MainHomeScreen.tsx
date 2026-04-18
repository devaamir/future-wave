import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';
import CoursesScreen from './CoursesScreen';
import LiveClassesScreen from './LiveClassesScreen';
import ExamsScreen from './ExamsScreen';
import ProfileScreen from './ProfileScreen';
import BottomNavigation from '../components/BottomNavigation';
import { useColors } from '../theme';

const MainHomeScreen = ({ navigation }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    // paddingBottom: 60,
  },
}), [colors]);
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabPress = (tab: string) => {
    if (tab === 'Courses') {
      navigation.navigate('MainsCourseCategories');
      return;
    }
    if (tab === 'Exams') {
      navigation.navigate('ExamsMenu');
      return;
    }
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onTabPress={handleTabPress} />;
      case 'Courses':
        return <CoursesScreen />;
      // case 'Live':
      //   return <LiveClassesScreen />;
      case 'Exams':
        return <ExamsScreen />;
      case 'Profile':
        return (
          <ProfileScreen navigation={navigation} onTabPress={handleTabPress} />
        );
      default:
        return <HomeScreen onTabPress={handleTabPress} />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.content}>{renderContent()}</View>
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};


export default MainHomeScreen;
