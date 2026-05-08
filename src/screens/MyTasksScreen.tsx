import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackArrowIcon, ExamIcon } from '../components/Icons';
import { theme, useColors } from '../theme';

const MyTasksScreen = () => {
  const colors = useColors();
  const TASK_ITEMS = useMemo(() => [
    { title: 'Today Exam', icon: ExamIcon, color: colors.accent, bg: colors.amberBg, screen: 'TodayExam' },
  ], [colors]);
  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundGrey },
    header: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16,
      backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border,
    },
    back: { padding: 8 },
    headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontFamily: theme.fonts.bold, color: colors.textDark },
    list: { padding: 16 },
    card: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
      borderRadius: 14, padding: 16, marginBottom: 12,
      shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
    },
    iconBox: { width: 50, height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
    cardTitle: { flex: 1, fontSize: 15, fontFamily: theme.fonts.semiBold, color: colors.textPrimary },
    arrow: { fontSize: 22, color: colors.textDisabled },
  }), [colors]);
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={TASK_ITEMS}
        keyExtractor={item => item.title}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
                <Icon size={26} color={item.color} />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default MyTasksScreen;
