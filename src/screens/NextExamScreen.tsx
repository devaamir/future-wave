import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getExamHistory, ExamHistory } from '../services/api';

const PAGE_SIZE = 10;

const NextExamScreen = ({ navigation }: any) => {
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.white, borderRadius: 14, padding: 14, marginBottom: 10,
    shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardLeft: { flex: 1, marginRight: 12, gap: 3 },
  cardRight: { alignItems: 'flex-end', gap: 4 },
  title: { fontSize: 14, fontFamily: theme.fonts.semiBold, color: colors.textPrimary },
  course: { fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textTertiary },
  date: { fontSize: 11, fontFamily: theme.fonts.regular, color: colors.grey },
  marks: { fontSize: 18, fontFamily: theme.fonts.bold, color: colors.textPrimary },
  rank: { fontSize: 12, fontFamily: theme.fonts.semiBold, color: colors.purple },
  empty: { textAlign: 'center', color: colors.textDisabled, fontFamily: theme.fonts.regular, marginTop: 40 },
}), [colors]);
  const [history, setHistory] = useState<ExamHistory[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetch = useCallback(async (p: number, reset = false) => {
    if (p === 1) reset ? setRefreshing(true) : setLoading(true);
    else setLoadingMore(true);
    try {
      const { data } = await getExamHistory({ page: p, page_size: PAGE_SIZE });
      setHistory(prev => p === 1 ? data.results : [...prev, ...data.results]);
      setHasMore(!!data.next);
      setPage(p);
    } catch {}
    finally { setLoading(false); setLoadingMore(false); setRefreshing(false); }
  }, []);

  useEffect(() => { fetch(1); }, []);

  if (loading) return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exams</Text>
        <View style={{ width: 40 }} />
      </View>
      <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.blue} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exams</Text>
        <View style={{ width: 40 }} />
      </View>
      <FlatList
        data={history}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetch(1, true)} />}
        onEndReached={() => { if (hasMore && !loadingMore) fetch(page + 1); }}
        onEndReachedThreshold={0.3}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.title}>{item.exam_name}</Text>
              <Text style={styles.course}>{item.course_name}</Text>
              <Text style={styles.date}>{item.created_at.slice(0, 10)}</Text>
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.marks}>{item.marks_obtained}</Text>
              <Text style={styles.rank}>Rank #{item.rank}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={loadingMore ? <ActivityIndicator style={{ marginVertical: 16 }} color={colors.blue} /> : null}
        ListEmptyComponent={<Text style={styles.empty}>No exam history.</Text>}
      />
    </View>
  );
};


export default NextExamScreen;
