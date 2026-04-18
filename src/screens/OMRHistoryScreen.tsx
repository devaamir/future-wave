import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getOMRPracticeHistory, OMRPracticeHistory } from '../services/api';

const PAGE_SIZE = 10;

const formatTime = (secs: number) => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s}s`;
};

const OMRHistoryScreen = ({ navigation }: any) => {
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
    backgroundColor: colors.white, borderRadius: 14, padding: 14, marginBottom: 10,
    shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  type: { fontSize: 14, fontFamily: theme.fonts.semiBold, color: colors.textPrimary },
  date: { fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textDisabled },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { alignItems: 'center' },
  statVal: { fontSize: 16, fontFamily: theme.fonts.bold, color: colors.textPrimary },
  statLabel: { fontSize: 10, fontFamily: theme.fonts.regular, color: colors.textDisabled, marginTop: 2 },
  empty: { textAlign: 'center', color: colors.textDisabled, fontFamily: theme.fonts.regular, marginTop: 40 },
}), [colors]);
  const [items, setItems] = useState<OMRPracticeHistory[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetch = useCallback(async (p: number, reset = false) => {
    if (p === 1) reset ? setRefreshing(true) : setLoading(true);
    else setLoadingMore(true);
    try {
      const { data } = await getOMRPracticeHistory({ page: p, page_size: PAGE_SIZE });
      setItems(prev => p === 1 ? data.results : [...prev, ...data.results]);
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
        <Text style={styles.headerTitle}>OMR History</Text>
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
        <Text style={styles.headerTitle}>OMR History</Text>
        <View style={{ width: 40 }} />
      </View>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetch(1, true)} />}
        onEndReached={() => { if (hasMore && !loadingMore) fetch(page + 1); }}
        onEndReachedThreshold={0.3}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.type}>{item.test_type}</Text>
              <Text style={styles.date}>{item.created_at.slice(0, 10)}</Text>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statVal}>{item.score}</Text>
                <Text style={styles.statLabel}>Score</Text>
              </View>
              <View style={styles.stat}>
                <Text style={[styles.statVal, { color: colors.successGreen }]}>{item.correct_count}</Text>
                <Text style={styles.statLabel}>Correct</Text>
              </View>
              <View style={styles.stat}>
                <Text style={[styles.statVal, { color: colors.error }]}>{item.wrong_count}</Text>
                <Text style={styles.statLabel}>Wrong</Text>
              </View>
              <View style={styles.stat}>
                <Text style={[styles.statVal, { color: colors.textDisabled }]}>{item.unanswered_count}</Text>
                <Text style={styles.statLabel}>Skipped</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statVal}>{formatTime(item.time_taken)}</Text>
                <Text style={styles.statLabel}>Time</Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={loadingMore ? <ActivityIndicator style={{ marginVertical: 16 }} color={colors.blue} /> : null}
        ListEmptyComponent={<Text style={styles.empty}>No history yet.</Text>}
      />
    </View>
  );
};


export default OMRHistoryScreen;
