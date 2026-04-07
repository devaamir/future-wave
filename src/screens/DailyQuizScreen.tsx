import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getQuestions, PrelimQuestion } from '../services/api';
import { BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';

const QUIZ_KEY = 'daily_quiz_';

const getTodayKey = () => {
  const d = new Date();
  return QUIZ_KEY + `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

interface QuizResult {
  selected: string;
  answer: string;
  question: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
}

const DailyQuizScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<PrelimQuestion | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const key = getTodayKey();
    const saved = await AsyncStorage.getItem(key);
    if (saved) {
      setResult(JSON.parse(saved));
      setLoading(false);
      return;
    }
    try {
      const { data } = await getQuestions({ page: 1 });
      if (data.results.length > 0) setQuestion(data.results[0]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (option: string) => {
    if (!question) return;
    setSelected(option);

    const isCorrect = option === question.answer;

    if (isCorrect) {
      Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 1.08, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
      ]).start();
      Animated.timing(bgAnim, { toValue: 1, duration: 400, useNativeDriver: false }).start();
    }

    const quizResult: QuizResult = {
      selected: option,
      answer: question.answer,
      question: question.question,
      option_1: question.option_1,
      option_2: question.option_2,
      option_3: question.option_3,
      option_4: question.option_4,
    };

    await AsyncStorage.setItem(getTodayKey(), JSON.stringify(quizResult));

    // Short delay so animation plays before switching to result view
    setTimeout(() => setResult(quizResult), 800);
  };

  const getOptionStyle = (option: string) => {
    if (!selected) return styles.option;
    if (option === question?.answer) return [styles.option, styles.correct];
    if (option === selected) return [styles.option, styles.wrong];
    return styles.option;
  };

  const options = question
    ? [question.option_1, question.option_2, question.option_3, question.option_4]
    : [];

  const resultOptions = result
    ? [result.option_1, result.option_2, result.option_3, result.option_4]
    : [];

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7B5ACF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Quiz</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {result ? (
          // Result view
          <>
            <View style={styles.resultBadge}>
              <Text style={styles.resultEmoji}>
                {result.selected === result.answer ? '🎉' : '😔'}
              </Text>
              <Text style={styles.resultLabel}>
                {result.selected === result.answer ? 'Correct!' : 'Incorrect'}
              </Text>
            </View>

            <View style={styles.questionCard}>
              <Text style={styles.questionText}>{result.question}</Text>
            </View>

            {resultOptions.map((opt, i) => {
              const isCorrect = opt === result.answer;
              const isSelected = opt === result.selected;
              return (
                <View
                  key={i}
                  style={[
                    styles.option,
                    isCorrect && styles.correct,
                    isSelected && !isCorrect && styles.wrong,
                  ]}
                >
                  <Text style={[styles.optionText, (isCorrect || (isSelected && !isCorrect)) && styles.optionTextWhite]}>
                    {opt}
                  </Text>
                  {isCorrect && <Text style={styles.tag}>✓ Correct</Text>}
                  {isSelected && !isCorrect && <Text style={styles.tag}>✗ Your answer</Text>}
                </View>
              );
            })}

            <Text style={styles.note}>📌 A fresh question awaits you tomorrow.</Text>
          </>
        ) : question ? (
          // Quiz view
          <>
            <View style={styles.questionCard}>
              <Text style={styles.questionLabel}>Today's Question</Text>
              <Text style={styles.questionText}>{question.question}</Text>
            </View>

            {options.map((opt, i) => {
              const isSelected = selected === opt;
              const isCorrect = selected && opt === question.answer;
              return (
                <Animated.View
                  key={i}
                  style={[
                    isCorrect ? { transform: [{ scale: scaleAnim }] } : {},
                  ]}
                >
                  <TouchableOpacity
                    style={getOptionStyle(opt)}
                    onPress={() => !selected && handleSelect(opt)}
                    activeOpacity={0.8}
                    disabled={!!selected}
                  >
                    <Text style={[styles.optionText, (isCorrect || (isSelected && !isCorrect)) && styles.optionTextWhite]}>
                      {opt}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </>
        ) : (
          <Text style={styles.empty}>No question available today.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  back: { padding: 8 },
  headerTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
  },
  content: { padding: 16 },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  questionLabel: {
    fontSize: 10,
    fontFamily: theme.fonts.medium,
    color: '#7B5ACF',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  questionText: {
    fontSize: 13,
    fontFamily: theme.fonts.semiBold,
    color: '#1F2937',
    lineHeight: 20,
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  correct: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  wrong: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  optionText: {
    fontSize: 13,
    fontFamily: theme.fonts.medium,
    color: '#1F2937',
    lineHeight: 19,
  },
  optionTextWhite: { color: '#FFFFFF' },
  tag: {
    fontSize: 11,
    fontFamily: theme.fonts.medium,
    color: '#FFFFFF',
    marginTop: 3,
    opacity: 0.9,
  },
  resultBadge: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultEmoji: { fontSize: 40, marginBottom: 6 },
  resultLabel: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#1F2937',
  },
  empty: {
    textAlign: 'center',
    color: '#6B7280',
    fontFamily: theme.fonts.regular,
    marginTop: 40,
  },
  note: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#9CA3AF',
    marginTop: 20,
  },
});

export default DailyQuizScreen;
