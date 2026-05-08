import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getExamQuestions, submitExam, OnlineExamQuestion } from '../services/api';

const OPTIONS = ['option_1', 'option_2', 'option_3', 'option_4'] as const;
const LABELS = ['A', 'B', 'C', 'D'];

const ExamQuestionsScreen = ({ navigation, route }: any) => {
  const { examId, examName, duration, startTime, endTime } = route.params;
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundGrey },
    header: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16,
      backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border,
    },
    back: { padding: 8 },
    headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontFamily: theme.fonts.bold, color: colors.textDark },
    timer: { fontSize: 14, fontFamily: theme.fonts.bold, color: colors.error, minWidth: 52, textAlign: 'right' },
    list: { padding: 16, paddingBottom: 100 },
    card: {
      backgroundColor: colors.white, borderRadius: 12, padding: 14, marginBottom: 12,
      shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
    },
    qRow: { flexDirection: 'row', marginBottom: 12 },
    qNum: {
      width: 26, height: 26, borderRadius: 13, backgroundColor: colors.blueBg,
      justifyContent: 'center', alignItems: 'center', marginRight: 10, marginTop: 1,
    },
    qNumText: { fontSize: 11, fontFamily: theme.fonts.bold, color: colors.blue },
    qText: { flex: 1, fontSize: 14, fontFamily: theme.fonts.semiBold, color: colors.textPrimary, lineHeight: 20 },
    option: {
      flexDirection: 'row', alignItems: 'center', paddingVertical: 9, paddingHorizontal: 12,
      borderRadius: 8, borderWidth: 1, borderColor: colors.border, marginBottom: 8,
    },
    optionSelected: { borderColor: colors.primary, backgroundColor: colors.primaryLight ?? '#E0F7F5' },
    optLabel: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.borderLight, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    optLabelSelected: { backgroundColor: colors.primary },
    optLabelText: { fontSize: 11, fontFamily: theme.fonts.bold, color: colors.textTertiary },
    optLabelTextSelected: { color: colors.white },
    optText: { flex: 1, fontSize: 13, fontFamily: theme.fonts.regular, color: colors.textPrimary },
    submitBar: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: 16, backgroundColor: colors.white,
      borderTopWidth: 1, borderTopColor: colors.border,
    },
    submitBtn: {
      backgroundColor: colors.primary, borderRadius: 12,
      paddingVertical: 14, alignItems: 'center',
    },
    submitBtnText: { fontSize: 16, fontFamily: theme.fonts.bold, color: colors.white },
    empty: { textAlign: 'center', color: colors.textTertiary, fontFamily: theme.fonts.regular, marginTop: 40 },
  }), [colors]);

  const [questions, setQuestions] = useState<OnlineExamQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState<Record<number, string>>({});

  const calcInitialSeconds = () => {
    if (startTime && endTime) {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const start = new Date(`${today}T${startTime}`);
      const end = new Date(`${today}T${endTime}`);
      if (now >= start && now <= end) {
        return Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
      }
    }
    return (parseInt(duration) || 60) * 60;
  };

  const totalSeconds = useRef(calcInitialSeconds());
  const [timeLeft, setTimeLeft] = useState(totalSeconds.current);
  const examStartedAt = useRef(Date.now());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    getExamQuestions(examId)
      .then(({ data }) => { console.log('getExamQuestions:', data); setQuestions(data); })
      .catch(err => console.error('getExamQuestions error:', err))
      .finally(() => setLoading(false));
  }, [examId]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current!); doSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const doSubmit = async () => {
    clearInterval(timerRef.current!);
    setSubmitting(true);
    const time_taken = Math.floor((Date.now() - examStartedAt.current) / 1000);
    const answers = Object.entries(selected).map(([qId, opt]) => ({
      question_id: Number(qId),
      selected_option: questions.find(q => q.id === Number(qId))?.[opt as typeof OPTIONS[number]] ?? '',
    }));
    try {
      await submitExam(examId, { time_taken, answers });
      Alert.alert('Submitted', 'Your exam has been submitted successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.error('submitExam error:', err);
      Alert.alert('Error', 'Failed to submit exam. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = () => {
    const unanswered = questions.length - Object.keys(selected).length;
    if (Object.keys(selected).length === 0) {
      Alert.alert('No Answers', "You can't submit without answering at least one question.");
      return;
    } else if (unanswered > 0) {
      Alert.alert('Unanswered Questions', `You have ${unanswered} unanswered question(s). Submit anyway?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Submit', onPress: doSubmit },
      ]);
      return;
    }
    doSubmit();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{examName}</Text>
        <Text style={[styles.timer, timeLeft < 60 && { color: colors.error }]}>{formatTimer(timeLeft)}</Text>
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.primary} />
      ) : (
        <>
          <FlatList
            data={questions}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text style={styles.empty}>No questions available.</Text>}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                <View style={styles.qRow}>
                  <View style={styles.qNum}><Text style={styles.qNumText}>{index + 1}</Text></View>
                  <Text style={styles.qText}>{item.question}</Text>
                </View>
                {OPTIONS.map((opt, i) => {
                  const isSelected = selected[item.id] === opt;
                  return (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.option, isSelected && styles.optionSelected]}
                      activeOpacity={0.8}
                      onPress={() => setSelected(prev => ({ ...prev, [item.id]: opt }))}
                    >
                      <View style={[styles.optLabel, isSelected && styles.optLabelSelected]}>
                        <Text style={[styles.optLabelText, isSelected && styles.optLabelTextSelected]}>{LABELS[i]}</Text>
                      </View>
                      <Text style={styles.optText}>{item[opt]}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          />
          <View style={styles.submitBar}>
            <TouchableOpacity style={styles.submitBtn} activeOpacity={0.85} onPress={handleSubmit} disabled={submitting}>
              {submitting
                ? <ActivityIndicator color={colors.white} />
                : <Text style={styles.submitBtnText}>Submit Exam</Text>}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default ExamQuestionsScreen;
