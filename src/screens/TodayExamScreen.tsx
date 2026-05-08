import React, { useEffect, useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getOnlineExams, OnlineExam } from '../services/api';

const TodayExamScreen = ({ navigation }: any) => {
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
    list: { padding: 16 },
    card: {
      backgroundColor: colors.white, borderRadius: 12, padding: 14, marginBottom: 10,
      borderLeftWidth: 4, borderLeftColor: colors.accent,
      shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
    },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
    title: { fontSize: 14, fontFamily: theme.fonts.semiBold, color: colors.textPrimary, flex: 1 },
    time: { fontSize: 12, fontFamily: theme.fonts.bold, color: colors.accent },
    meta: { fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textTertiary },
    empty: { textAlign: 'center', color: colors.textTertiary, fontFamily: theme.fonts.regular, marginTop: 40 },
  }), [colors]);

  const [exams, setExams] = useState<OnlineExam[]>([]);
  const [loading, setLoading] = useState(true);

  const formatTime = (t: string) => {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
  };

  useEffect(() => {
    getOnlineExams()
      .then(({ data }) => { console.log('getOnlineExams:', data); setExams(data); })
      .catch(err => console.error('getOnlineExams error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today's Exams</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.accent} />
      ) : (
        <FlatList
          data={exams}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.empty}>No exams scheduled for today.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate('ExamQuestions', { examId: item.id, examName: item.name, duration: item.duration, startTime: item.start_time, endTime: item.end_time })}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.time}>{formatTime(item.start_time)} – {formatTime(item.end_time)}</Text>
              </View>
              <Text style={styles.meta}>{item.level} · {item.exam_type} · {item.total_questions} Qs · {item.total_marks} marks</Text>
              {!!item.course_name && <Text style={styles.meta}>{item.course_name}</Text>}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default TodayExamScreen;
