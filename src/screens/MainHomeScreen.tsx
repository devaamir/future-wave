import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';
import CoursesScreen from './CoursesScreen';
import LiveClassesScreen from './LiveClassesScreen';
import ExamsScreen from './ExamsScreen';
import ProfileScreen from './ProfileScreen';
import BottomNavigation from '../components/BottomNavigation';
import { useColors } from '../theme';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import { LockIcon } from '../components/Icons';

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

  const isAccessBlocked = () => {
    if (appExpiry === null) return true;
    if (!appExpiry) return false;
    return Math.ceil((new Date(appExpiry).getTime() - Date.now()) / 86400000) <= 0;
  };

  const handleTabPress = (tab: string) => {
    if (LOCKED_TABS.includes(tab) && isAccessBlocked()) {
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

      <Modal visible={showLockModal} transparent animationType="fade" onRequestClose={() => setShowLockModal(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 36, alignItems: 'center', width: '100%', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 }}>
            <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
              <LockIcon size={36} color="#F39C12" />
            </View>
            <Text style={{ fontSize: 22, fontFamily: theme.fonts.bold, color: '#1A1A2E', marginBottom: 12, textAlign: 'center' }}>Access Restricted</Text>
            <View style={{ width: 40, height: 3, backgroundColor: '#F39C12', borderRadius: 2, marginBottom: 16 }} />
            <Text style={{ fontSize: 15, fontFamily: theme.fonts.regular, color: '#6B7280', textAlign: 'center', lineHeight: 24 }}>
              Your app access has expired or not been activated.{'\n'}Please contact support to continue.
            </Text>
            <TouchableOpacity onPress={() => setShowLockModal(false)} style={{ marginTop: 24, backgroundColor: '#F39C12', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 32 }}>
              <Text style={{ color: '#fff', fontFamily: theme.fonts.semiBold, fontSize: 15 }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};


export default MainHomeScreen;
