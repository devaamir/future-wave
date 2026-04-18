import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getAchievements, Achievement } from '../services/api';

const AchievementsScreen = ({ navigation }: any) => {
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
    borderRadius: 14, padding: 14, marginBottom: 12,
    shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  photo: { width: 64, height: 64, borderRadius: 32, marginRight: 14 },
  photoPlaceholder: { backgroundColor: colors.primaryDark, justifyContent: 'center', alignItems: 'center' },
  photoInitial: { fontSize: 24, fontFamily: theme.fonts.bold, color: colors.white },
  info: { flex: 1 },
  name: { fontSize: 15, fontFamily: theme.fonts.bold, color: colors.textPrimary, marginBottom: 3 },
  exam: { fontSize: 13, fontFamily: theme.fonts.regular, color: colors.textTertiary, marginBottom: 6 },
  rankBadge: {
    alignSelf: 'flex-start', backgroundColor: colors.amberBg,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  rankText: { fontSize: 12, fontFamily: theme.fonts.semiBold, color: colors.accent },
  empty: { textAlign: 'center', color: colors.textTertiary, fontFamily: theme.fonts.regular, marginTop: 40 },
}), [colors]);
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAchievements().then(({ data }) => setItems(data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Achievements</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.primaryDark} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('AchievementDetail', { item })}
            >
              {item.photo ? (
                <Image source={{ uri: item.photo }} style={styles.photo} />
              ) : (
                <View style={[styles.photo, styles.photoPlaceholder]}>
                  <Text style={styles.photoInitial}>{item.student_name?.[0]?.toUpperCase()}</Text>
                </View>
              )}
              <View style={styles.info}>
                <Text style={styles.name}>{item.student_name}</Text>
                <Text style={styles.exam}>{item.exam_name}</Text>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>🏆 Rank {item.rank}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No achievements found.</Text>}
        />
      )}
    </View>
  );
};


export default AchievementsScreen;
