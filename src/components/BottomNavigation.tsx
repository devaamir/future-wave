import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme, useColors } from '../theme';
import {
  HomeIcon,
  CoursesIcon,
  ExamIcon,
  ProfileIcon,
} from './Icons';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabPress }) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.white,
      paddingVertical: 8,
      paddingBottom: 20,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    tab: { flex: 1, alignItems: 'center', paddingVertical: 8 },
    label: { fontSize: 12, color: colors.textTertiary, fontFamily: theme.fonts.medium, marginTop: 4 },
    activeLabel: { color: colors.primaryDark, fontFamily: theme.fonts.bold },
  }), [colors]);

  const tabs = [
    { id: 'Home', icon: HomeIcon, label: 'Home' },
    { id: 'Courses', icon: CoursesIcon, label: 'Courses' },
    { id: 'Exams', icon: ExamIcon, label: 'Exams' },
    { id: 'Profile', icon: ProfileIcon, label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity key={tab.id} style={styles.tab} onPress={() => onTabPress(tab.id)}>
            <IconComponent size={20} color={isActive ? colors.primaryDark : colors.textSecondary} />
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;
