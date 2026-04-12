import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';
import { getExamRankings, RankingEntry } from '../services/api';

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

const RankingScreen = ({ navigation }: any) => {
  const [items, setItems] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExamRankings().then(({ data }) => setItems(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ranking</Text>
        <View style={{ width: 40 }} />
      </View>
      {loading ? <ActivityIndicator style={{ flex: 1 }} size="large" color="#7B5ACF" /> : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={[styles.card, item.is_me && styles.cardMe]}>
              <Text style={styles.rank}>{MEDAL[item.rank] ?? `#${item.rank}`}</Text>
              <View style={styles.info}>
                <Text style={[styles.name, item.is_me && styles.nameMe]}>{item.name}</Text>
                <Text style={styles.exam}>{item.exam}</Text>
              </View>
              <Text style={[styles.score, item.is_me && styles.scoreMe]}>{item.score}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No rankings available.</Text>}
        />
      )}
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
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: 14, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardMe: { backgroundColor: '#EBF4FF', borderWidth: 1.5, borderColor: '#3A8EDB' },
  rank: { fontSize: 22, width: 40, textAlign: 'center' },
  info: { flex: 1, marginLeft: 10 },
  name: { fontSize: 14, fontFamily: theme.fonts.semiBold, color: '#1F2937' },
  nameMe: { color: '#3A8EDB' },
  exam: { fontSize: 11, fontFamily: theme.fonts.regular, color: '#9CA3AF', marginTop: 2 },
  score: { fontSize: 18, fontFamily: theme.fonts.bold, color: '#1F2937' },
  scoreMe: { color: '#3A8EDB' },
  empty: { textAlign: 'center', color: '#9CA3AF', fontFamily: theme.fonts.regular, marginTop: 40 },
});

export default RankingScreen;
