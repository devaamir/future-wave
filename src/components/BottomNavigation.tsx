import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { HomeIcon, CoursesIcon, LiveClassIcon, ExamIcon, ProfileIcon } from './Icons';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'Home', icon: HomeIcon, label: 'Home' },
    { id: 'Courses', icon: CoursesIcon, label: 'Courses' },
    { id: 'Live', icon: LiveClassIcon, label: 'Live' },
    { id: 'Exams', icon: ExamIcon, label: 'Exams' },
    { id: 'Profile', icon: ProfileIcon, label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
          >
            <IconComponent 
              size={20} 
              color={isActive ? '#4ECDC4' : '#7F8C8D'} 
            />
            <Text style={[
              styles.label,
              isActive && styles.activeLabel
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: theme.fonts.medium,
    marginTop: 4,
  },
  activeLabel: {
    color: '#4ECDC4',
    fontFamily: theme.fonts.bold,
  },
});

export default BottomNavigation;
