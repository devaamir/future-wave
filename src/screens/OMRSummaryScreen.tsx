import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';

const OMRSummaryScreen = ({ route, navigation }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundGrey },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16,
    backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  back: { padding: 8 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontFamily: theme.fonts.bold, color: colors.textDark },
  content: { padding: 20, alignItems: 'center' },
  scoreCircle: {
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: colors.purple, justifyContent: 'center', alignItems: 'center',
    marginBottom: 28,
    shadowColor: colors.purple, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
  },
  scoreValue: { fontSize: 36, fontFamily: theme.fonts.bold, color: colors.white },
  scoreLabel: {
    fontSize: 12, fontFamily: theme.fonts.regular, color: colors.overlayWhite08, marginTop: 2
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', width: '100%', marginBottom: 28 },
  statCard: {
    width: '46%', borderRadius: 14, padding: 16, alignItems: 'center',
  },
  statValue: { fontSize: 22, fontFamily: theme.fonts.bold, marginBottom: 4 },
  statLabel: { fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textTertiary, textAlign: 'center' },
  doneBtn: {
    backgroundColor: colors.blue, borderRadius: 12, paddingVertical: 14,
    paddingHorizontal: 40, alignItems: 'center',
  },
  doneBtnText: { fontSize: 15, fontFamily: theme.fonts.bold, color: colors.white },
}), [colors]);
  const s = route.params.summary;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const sec = (secs % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const stats = [
    { label: 'Total Questions', value: s.total_questions, color: colors.blue, bg: colors.blueBg },
    { label: 'Correct', value: s.correct_count, color: colors.successGreen, bg: colors.greenBgLight },
    { label: 'Wrong', value: s.wrong_count, color: colors.error, bg: colors.errorBg },
    { label: 'Unanswered', value: s.unanswered_count, color: colors.accent, bg: colors.amberBg },
    { label: 'Score', value: `${s.score} (${s.score_percentage?.toFixed(1)}%)`, color: colors.purple, bg: colors.purpleBg },
    { label: 'Time Taken', value: formatTime(s.seconds_taken), color: colors.textTertiary, bg: colors.borderLight },
    { label: 'Avg / Question', value: `${s.average_seconds_per_question?.toFixed(1)}s`, color: colors.textTertiary, bg: colors.borderLight },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
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


export default OMRSummaryScreen;
