import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';
import { getExamHistory, ExamHistory } from '../services/api';

const PAGE_SIZE = 10;

const NextExamScreen = ({ navigation }: any) => {
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
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exams</Text>
        <View style={{ width: 40 }} />
      </View>
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#3A8EDB" />
    </View>
  );

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
        ListFooterComponent={loadingMore ? <ActivityIndicator style={{ marginVertical: 16 }} color="#3A8EDB" /> : null}
        ListEmptyComponent={<Text style={styles.empty}>No exam history.</Text>}
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardLeft: { flex: 1, marginRight: 12, gap: 3 },
  cardRight: { alignItems: 'flex-end', gap: 4 },
  title: { fontSize: 14, fontFamily: theme.fonts.semiBold, color: '#1F2937' },
  course: { fontSize: 12, fontFamily: theme.fonts.regular, color: '#6B7280' },
  date: { fontSize: 11, fontFamily: theme.fonts.regular, color: '#C4C4C4' },
  marks: { fontSize: 18, fontFamily: theme.fonts.bold, color: '#1F2937' },
  rank: { fontSize: 12, fontFamily: theme.fonts.semiBold, color: '#7B5ACF' },
  empty: { textAlign: 'center', color: '#9CA3AF', fontFamily: theme.fonts.regular, marginTop: 40 },
});

export default NextExamScreen;
