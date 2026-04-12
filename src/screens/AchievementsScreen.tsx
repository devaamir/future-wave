import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';
import { getAchievements, Achievement } from '../services/api';

const AchievementsScreen = ({ navigation }: any) => {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAchievements().then(({ data }) => setItems(data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Achievements</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color="#4DB8AC" />
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
    borderRadius: 14, padding: 14, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  photo: { width: 64, height: 64, borderRadius: 32, marginRight: 14 },
  photoPlaceholder: { backgroundColor: '#4DB8AC', justifyContent: 'center', alignItems: 'center' },
  photoInitial: { fontSize: 24, fontFamily: theme.fonts.bold, color: '#FFFFFF' },
  info: { flex: 1 },
  name: { fontSize: 15, fontFamily: theme.fonts.bold, color: '#1F2937', marginBottom: 3 },
  exam: { fontSize: 13, fontFamily: theme.fonts.regular, color: '#6B7280', marginBottom: 6 },
  rankBadge: {
    alignSelf: 'flex-start', backgroundColor: '#FFF8EC',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  rankText: { fontSize: 12, fontFamily: theme.fonts.semiBold, color: '#F39C12' },
  empty: { textAlign: 'center', color: '#6B7280', fontFamily: theme.fonts.regular, marginTop: 40 },
});

export default AchievementsScreen;
