import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackArrowIcon, ClockIcon, AnalyticsIcon, AchievementsIcon } from '../components/Icons';
import { theme } from '../theme';

const EXAM_ITEMS = [
  { title: 'Time Table', icon: ClockIcon, color: '#F39C12', bg: '#FFF8EC', screen: 'TimeTable' },
  { title: 'Exam Result', icon: AnalyticsIcon, color: '#10B981', bg: '#ECFDF5', screen: 'ExamResult' },
  { title: 'Ranking', icon: AchievementsIcon, color: '#7B5ACF', bg: '#F3EEFF', screen: 'Ranking' },
];

const ExamsMenuScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exams</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={EXAM_ITEMS}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16,
    backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  back: { padding: 8 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontFamily: theme.fonts.bold, color: '#2D2D2D' },
  list: { padding: 16 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: 14, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  iconBox: { width: 50, height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  cardTitle: { flex: 1, fontSize: 15, fontFamily: theme.fonts.semiBold, color: '#1F2937' },
  arrow: { fontSize: 22, color: '#9CA3AF' },
});

export default ExamsMenuScreen;
