import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { generateOMR, generatePrevOMR, evaluateOMR, evaluatePrevOMR } from '../services/api';

interface Question {
  id: number;
  question: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  answer?: string;
}

const DUMMY_QUESTIONS: Question[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  question: `Sample Question ${i + 1}: Which of the following is correct?`,
  option_1: 'Option A', option_2: 'Option B', option_3: 'Option C', option_4: 'Option D',
  answer: 'Option A',
}));

const MARKS_PER_QUESTION = 1;
const TIME_PER_QUESTION = 60;

const OnlineOMRScreen = ({ navigation, route }: any) => {
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
  doneBtn: { backgroundColor: colors.blue, paddingHorizontal: 16, paddingVertical: 7, borderRadius: 8 },
  doneBtnText: { fontSize: 13, fontFamily: theme.fonts.bold, color: colors.white },
  statsBar: {
    flexDirection: 'row', backgroundColor: colors.white, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontFamily: theme.fonts.bold, color: colors.textHeading },
  statLabel: { fontSize: 11, fontFamily: theme.fonts.regular, color: colors.textTertiary, marginTop: 2 },
  divider: { width: 1, backgroundColor: colors.border },
  list: { padding: 16 },
  card: {
    backgroundColor: colors.white, borderRadius: 12, padding: 14, marginBottom: 12,
    shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  qRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  badge: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: colors.blueBg,
    justifyContent: 'center', alignItems: 'center', marginRight: 10, marginTop: 1,
  },
  badgeText: { fontSize: 11, fontFamily: theme.fonts.bold, color: colors.blue },
  question: { flex: 1, fontSize: 13, fontFamily: theme.fonts.semiBold, color: colors.textPrimary, lineHeight: 20 },
  options: { gap: 8 },
  option: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border,
    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10,
  },
  optionSelected: { borderColor: colors.blue, backgroundColor: colors.blueBg },
  radio: {
    width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: colors.borderMuted,
    justifyContent: 'center', alignItems: 'center', marginRight: 10,
  },
  radioSelected: { borderColor: colors.blue },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.blue },
  optionText: { flex: 1, fontSize: 13, fontFamily: theme.fonts.regular, color: colors.textBodyAlt },
  optionTextSelected: { color: colors.indigoDeep, fontFamily: theme.fonts.semiBold },
}), [colors]);
  const isPracticeOMR = route?.params?.type === 'Practice OMR';
  const isPrevOMR = route?.params?.type === 'Practice PQ OMR';
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(isPracticeOMR || isPrevOMR);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalTime = useRef(0);


  useEffect(() => {
    const fetchFn = isPrevOMR ? generatePrevOMR : isPracticeOMR ? generateOMR : null;
    if (fetchFn) {
      fetchFn()
        .then(({ data }) => { setQuestions(data); setTimeLeft(data.length * TIME_PER_QUESTION); totalTime.current = data.length * TIME_PER_QUESTION; })
        .catch(() => { setQuestions(DUMMY_QUESTIONS); setTimeLeft(DUMMY_QUESTIONS.length * TIME_PER_QUESTION); totalTime.current = DUMMY_QUESTIONS.length * TIME_PER_QUESTION; })
        .finally(() => setLoading(false));
    } else {
      setQuestions(DUMMY_QUESTIONS);
      setTimeLeft(DUMMY_QUESTIONS.length * TIME_PER_QUESTION);
      totalTime.current = DUMMY_QUESTIONS.length * TIME_PER_QUESTION;
    }
  }, []);

  useEffect(() => {
    if (loading || timeLeft === 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current!); handleDone(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [loading]);

  const handleDone = (auto = false) => {
    clearInterval(timerRef.current!);
    const attended = Object.keys(answers).length;
    if (!auto && attended === 0) {
      Alert.alert(
        'No Questions Attended',
        'You have not answered any questions yet.',
        [
          { text: 'Exit Without Submit', style: 'destructive', onPress: () => navigation.goBack() },
          {
            text: 'Continue Exam', style: 'cancel', onPress: () => {
              timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                  if (prev <= 1) { clearInterval(timerRef.current!); handleDone(true); return 0; }
                  return prev - 1;
                });
              }, 1000);
            }
          },
        ],
      );
      return;
    }
    const secondsTaken = totalTime.current - timeLeft;
    const payload = {
      answers: questions.map(q => ({ id: q.id, selected_option: answers[q.id] || '' })),
      seconds_taken: secondsTaken,
    };
    const evaluateFn = isPrevOMR ? evaluatePrevOMR : evaluateOMR;
    evaluateFn(payload)
      .then(({ data }) => navigation.replace('OMRSummary', { summary: data }))
      .catch(() => {
        // fallback: local score
        const score = questions.reduce((acc, q) => acc + (q.answer && answers[q.id] === q.answer ? 1 : 0), 0);
        navigation.replace('OMRSummary', {
          summary: {
            total_questions: questions.length, correct_count: score,
            wrong_count: questions.length - score - (questions.length - attended),
            unanswered_count: questions.length - attended,
            score, score_percentage: (score / questions.length) * 100,
            seconds_taken: secondsTaken, average_seconds_per_question: secondsTaken / questions.length,
            results: [],
          }
        });
      });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isWarning = timeLeft <= 60;

  const renderItem = ({ item, index }: { item: Question; index: number }) => {
    const picked = answers[item.id];
    return (
      <View style={styles.card}>
        <View style={styles.qRow}>
          <View style={styles.badge}><Text style={styles.badgeText}>{index + 1}</Text></View>
          <Text style={styles.question}>{item.question}</Text>
        </View>
        <View style={styles.options}>
          {[item.option_1, item.option_2, item.option_3, item.option_4].map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.option, picked === opt && styles.optionSelected]}
              activeOpacity={0.8}
              onPress={() => setAnswers(prev => ({ ...prev, [item.id]: opt }))}
            >
              <View style={[styles.radio, picked === opt && styles.radioSelected]}>
                {picked === opt && <View style={styles.radioDot} />}
              </View>
              <Text style={[styles.optionText, picked === opt && styles.optionTextSelected]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Online OMR</Text>
        <TouchableOpacity style={styles.doneBtn} onPress={() => handleDone()}>
          <Text style={styles.doneBtnText}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{questions.length}</Text>
          <Text style={styles.statLabel}>Questions</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{questions.length * MARKS_PER_QUESTION}</Text>
          <Text style={styles.statLabel}>Total Marks</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: isWarning ? colors.error : colors.successGreen }]}>{formatTime(timeLeft)}</Text>
          <Text style={styles.statLabel}>Time Left</Text>
        </View>
      </View>

      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};


export default OnlineOMRScreen;
