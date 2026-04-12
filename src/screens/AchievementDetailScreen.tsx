import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';
import { Achievement } from '../services/api';

const AchievementDetailScreen = ({ route, navigation }: any) => {
  const item: Achievement = route.params.item;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Achievement</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {item.photo ? (
          <Image source={{ uri: item.photo }} style={styles.photo} />
        ) : (
          <View style={[styles.photo, styles.photoPlaceholder]}>
            <Text style={styles.photoInitial}>{item.student_name?.[0]?.toUpperCase()}</Text>
          </View>
        )}

        <Text style={styles.name}>{item.student_name}</Text>

        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>🏆 Rank {item.rank}</Text>
        </View>

        <View style={styles.card}>
          <Row label="Exam" value={item.exam_name} />
          <Row label="Rank" value={item.rank} />
          <Row label="Date" value={new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
        </View>
      </ScrollView>
    </View>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16,
    backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  back: { padding: 8 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontFamily: theme.fonts.bold, color: '#2D2D2D' },
  content: { alignItems: 'center', padding: 24 },
  photo: { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
  photoPlaceholder: { backgroundColor: '#4DB8AC', justifyContent: 'center', alignItems: 'center' },
  photoInitial: { fontSize: 48, fontFamily: theme.fonts.bold, color: '#FFFFFF' },
  name: { fontSize: 22, fontFamily: theme.fonts.bold, color: '#1F2937', marginBottom: 10 },
  rankBadge: {
    backgroundColor: '#FFF8EC', paddingHorizontal: 16, paddingVertical: 6,
    borderRadius: 20, marginBottom: 24,
  },
  rankText: { fontSize: 14, fontFamily: theme.fonts.semiBold, color: '#F39C12' },
  card: {
    width: '100%', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  label: { fontSize: 13, fontFamily: theme.fonts.medium, color: '#6B7280' },
  value: { fontSize: 13, fontFamily: theme.fonts.semiBold, color: '#1F2937', flex: 1, textAlign: 'right' },
});

export default AchievementDetailScreen;
