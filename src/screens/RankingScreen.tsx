import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getExamRankings, RankingEntry } from '../services/api';

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

const RankingScreen = ({ navigation }: any) => {
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
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 14, padding: 14, marginBottom: 10,
    shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardMe: { backgroundColor: colors.blueBg, borderWidth: 1.5, borderColor: colors.blue },
  rank: { fontSize: 22, width: 40, textAlign: 'center' },
  info: { flex: 1, marginLeft: 10 },
  name: { fontSize: 14, fontFamily: theme.fonts.semiBold, color: colors.textPrimary },
  nameMe: { color: colors.blue },
  exam: { fontSize: 11, fontFamily: theme.fonts.regular, color: colors.textDisabled, marginTop: 2 },
  score: { fontSize: 18, fontFamily: theme.fonts.bold, color: colors.textPrimary },
  scoreMe: { color: colors.blue },
  empty: { textAlign: 'center', color: colors.textDisabled, fontFamily: theme.fonts.regular, marginTop: 40 },
}), [colors]);
  const [items, setItems] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExamRankings().then(({ data }) => setItems(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ranking</Text>
        <View style={{ width: 40 }} />
      </View>
      {loading ? <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.purple} /> : (
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


export default RankingScreen;
