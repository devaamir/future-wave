import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';
import CoursesScreen from './CoursesScreen';
import ExamsScreen from './ExamsScreen';
import ProfileScreen from './ProfileScreen';
import BottomNavigation from '../components/BottomNavigation';
import AccessModal from '../components/AccessModal';
import { useColors } from '../theme';
import { useAuth } from '../context/AuthContext';
import { getAccessVariant } from '../utils/expiry';

const LOCKED_TABS = ['Courses', 'Exams'];

const MainHomeScreen = ({ navigation }: any) => {
  const colors = useColors();
  const { appExpiry } = useAuth();
  const [showLockModal, setShowLockModal] = useState(false);
  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    content: { flex: 1 },
  }), [colors]);
  const [activeTab, setActiveTab] = useState('Home');

  const { variant: accessVariant, daysLeft, isBlocked } = getAccessVariant(appExpiry);

  const handleTabPress = (tab: string) => {
    if (LOCKED_TABS.includes(tab) && isBlocked) {
      setShowLockModal(true);
      return;
    }
    if (tab === 'Courses') { navigation.navigate('MainsCourseCategories'); return; }
    if (tab === 'Exams') { navigation.navigate('ExamsMenu'); return; }
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onTabPress={handleTabPress} />;
      case 'Courses':
        return <CoursesScreen />;
      case 'Exams':
        return <ExamsScreen />;
      case 'Profile':
        return <ProfileScreen navigation={navigation} onTabPress={handleTabPress} />;
      default:
        return <HomeScreen onTabPress={handleTabPress} />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.content}>{renderContent()}</View>
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
      <AccessModal
        visible={showLockModal}
        variant={accessVariant}
        daysLeft={daysLeft}
        onClose={() => setShowLockModal(false)}
      />
    </SafeAreaView>
  );
};

export default MainHomeScreen;
