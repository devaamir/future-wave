import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';

const OMRSummaryScreen = ({ route, navigation }: any) => {
  const s = route.params.summary;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const sec = (secs % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const stats = [
    { label: 'Total Questions', value: s.total_questions, color: '#3A8EDB', bg: '#EBF4FF' },
    { label: 'Correct', value: s.correct_count, color: '#10B981', bg: '#ECFDF5' },
    { label: 'Wrong', value: s.wrong_count, color: '#EF4444', bg: '#FEF2F2' },
    { label: 'Unanswered', value: s.unanswered_count, color: '#F39C12', bg: '#FFF8EC' },
    { label: 'Score', value: `${s.score} (${s.score_percentage?.toFixed(1)}%)`, color: '#7B5ACF', bg: '#F3EEFF' },
    { label: 'Time Taken', value: formatTime(s.seconds_taken), color: '#6B7280', bg: '#F3F4F6' },
    { label: 'Avg / Question', value: `${s.average_seconds_per_question?.toFixed(1)}s`, color: '#6B7280', bg: '#F3F4F6' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exam Summary</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Score circle */}
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreValue}>{s.score_percentage?.toFixed(0)}%</Text>
          <Text style={styles.scoreLabel}>Overall Score</Text>
        </View>

        {/* Stats grid */}
        <View style={styles.grid}>
          {stats.map(stat => (
            <View key={stat.label} style={[styles.statCard, { backgroundColor: stat.bg }]}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.doneBtn} onPress={() => navigation.popToTop()}>
          <Text style={styles.doneBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
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
  content: { padding: 20, alignItems: 'center' },
  scoreCircle: {
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: '#7B5ACF', justifyContent: 'center', alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#7B5ACF', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
  },
  scoreValue: { fontSize: 36, fontFamily: theme.fonts.bold, color: '#FFFFFF' },
  scoreLabel: { fontSize: 12, fontFamily: theme.fonts.regular, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', width: '100%', marginBottom: 28 },
  statCard: {
    width: '46%', borderRadius: 14, padding: 16, alignItems: 'center',
  },
  statValue: { fontSize: 22, fontFamily: theme.fonts.bold, marginBottom: 4 },
  statLabel: { fontSize: 12, fontFamily: theme.fonts.regular, color: '#6B7280', textAlign: 'center' },
  doneBtn: {
    backgroundColor: '#3A8EDB', borderRadius: 12, paddingVertical: 14,
    paddingHorizontal: 40, alignItems: 'center',
  },
  doneBtnText: { fontSize: 15, fontFamily: theme.fonts.bold, color: '#FFFFFF' },
});

export default OMRSummaryScreen;
