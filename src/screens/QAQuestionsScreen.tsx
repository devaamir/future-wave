import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getQAQuestions, QAQuestion } from '../services/api';

const QAQuestionsScreen = ({ route, navigation }: any) => {
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
  toggle: {
    flexDirection: 'row', margin: 16, backgroundColor: colors.borderLight,
    borderRadius: 10, padding: 4,
  },
  toggleBtn: {
    flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center',
  },
  toggleText: { fontSize: 13, fontFamily: theme.fonts.semiBold, color: colors.textTertiary },
  list: { paddingHorizontal: 16, paddingBottom: 16 },
  card: {
    backgroundColor: colors.white, borderRadius: 12, padding: 14, marginBottom: 10,
    shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  qRow: { flexDirection: 'row', alignItems: 'flex-start' },
  badge: { width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center', marginRight: 10, marginTop: 1 },
  badgeText: { fontSize: 11, fontFamily: theme.fonts.bold },
  question: { flex: 1, fontSize: 13, fontFamily: theme.fonts.semiBold, color: colors.textPrimary, lineHeight: 20 },
  answerBox: { marginTop: 12, borderWidth: 1.5, borderRadius: 10, padding: 12 },
  answerLabel: { fontSize: 10, fontFamily: theme.fonts.bold, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  answerText: { fontSize: 14, fontFamily: theme.fonts.semiBold },
  options: { marginTop: 12, gap: 6 },
  option: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  optionText: { flex: 1, fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textBodyAlt },
  tick: { fontSize: 14, fontFamily: theme.fonts.bold, color: colors.white },
  empty: { textAlign: 'center', color: colors.textTertiary, fontFamily: theme.fonts.regular, marginTop: 40 },
}), [colors]);
  const { subcategory, subcategoryId, color, bg, fetchFn, readOnly } = route.params;
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [mode, setMode] = useState<'read' | 'play'>('read');
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [selected, setSelected] = useState<Record<number, string>>({});

  const load = fetchFn
    ? (page: number) => fetchFn({ page, page_size: 20 })
    : (page: number) => getQAQuestions({ subcategory_id: subcategoryId, page, page_size: 20 });

  useEffect(() => {
    console.log('[QAQuestionsScreen] Opened with params:', JSON.stringify({ title: route.params.title, subcategory, subcategoryId }, null, 2));
    console.log('[QAQuestionsScreen] Has fetchFn:', !!fetchFn);
    load(1)
      .then(({ data }: any) => {
        console.log('[QAQuestionsScreen] Response | total:', data?.count, '| results count:', data?.results?.length);
        setQuestions(data.results);
        setNextPage(data.next);
      })
      .catch((err: any) => {
        console.error('[QAQuestionsScreen] Error loading questions:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const fetchMore = async () => {
    if (!nextPage || loadingMore) return;
    setLoadingMore(true);
    try {
      const page = new URL(nextPage).searchParams.get('page');
      const { data } = await load(Number(page));
      setQuestions(prev => [...prev, ...data.results]);
      setNextPage(data.next);
    } finally { setLoadingMore(false); }
  };

  const renderReadItem = ({ item, index }: { item: QAQuestion; index: number }) => {
    const isOpen = expanded[item.id];
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => setExpanded(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
      >
        <View style={styles.qRow}>
          <View style={[styles.badge, { backgroundColor: bg }]}>
            <Text style={[styles.badgeText, { color }]}>{index + 1}</Text>
          </View>
          <Text style={styles.question}>{item.question}</Text>
        </View>
        {isOpen && (
          <View style={[styles.answerBox, { borderColor: color, backgroundColor: bg }]}>
            <Text style={[styles.answerLabel, { color }]}>Answer</Text>
            <Text style={[styles.answerText, { color }]}>{item.answer}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderPlayItem = ({ item, index }: { item: QAQuestion; index: number }) => {
    const picked = selected[item.id];
    return (
      <View style={styles.card}>
        <View style={styles.qRow}>
          <View style={[styles.badge, { backgroundColor: bg }]}>
            <Text style={[styles.badgeText, { color }]}>{index + 1}</Text>
          </View>
          <Text style={styles.question}>{item.question}</Text>
        </View>
        <View style={styles.options}>
          {[item.option_1, item.option_2, item.option_3, item.option_4].map((opt, i) => {
            const isCorrect = opt === item.answer;
            const isPicked = opt === picked;
            let optStyle = styles.option;
            let textStyle = styles.optionText;
            if (picked) {
              if (isCorrect) { optStyle = { ...styles.option, backgroundColor: colors.successGreen, borderColor: colors.successGreen } as any; textStyle = { ...styles.optionText, color: colors.white } as any; }
              else if (isPicked) { optStyle = { ...styles.option, backgroundColor: colors.error, borderColor: colors.error } as any; textStyle = { ...styles.optionText, color: colors.white } as any; }
            } else if (isPicked) {
              optStyle = { ...styles.option, backgroundColor: bg, borderColor: color } as any;
            }
            return (
              <TouchableOpacity
                key={i}
                style={optStyle}
                activeOpacity={0.8}
                disabled={!!picked}
                onPress={() => setSelected(prev => ({ ...prev, [item.id]: opt }))}
              >
                <Text style={textStyle}>{opt}</Text>
                {picked && isCorrect && <Text style={styles.tick}>✓</Text>}
                {picked && isPicked && !isCorrect && <Text style={styles.tick}>✗</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{route.params.title || subcategory}</Text>
        <View style={{ width: 40 }} />
      </View>

      {!readOnly && (
        <View style={styles.toggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, mode === 'read' && { backgroundColor: color }]}
            onPress={() => setMode('read')}
          >
            <Text style={[styles.toggleText, mode === 'read' && { color: colors.white }]}>Read</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, mode === 'play' && { backgroundColor: color }]}
            onPress={() => { setMode('play'); setSelected({}); }}
          >
            <Text style={[styles.toggleText, mode === 'play' && { color: colors.white }]}>Play</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={color} />
      ) : (
        <FlatList
          data={questions}
          renderItem={mode === 'read' ? renderReadItem : renderPlayItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={loadingMore ? <ActivityIndicator color={color} style={{ marginVertical: 16 }} /> : null}
          ListEmptyComponent={<Text style={styles.empty}>No questions available.</Text>}
        />
      )}
    </View>
  );
};


export default QAQuestionsScreen;
