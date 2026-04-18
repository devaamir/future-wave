import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { Achievement } from '../services/api';

const AchievementDetailScreen = ({ route, navigation }: any) => {
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
  content: { alignItems: 'center', padding: 24 },
  photo: { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
  photoPlaceholder: { backgroundColor: colors.primaryDark, justifyContent: 'center', alignItems: 'center' },
  photoInitial: { fontSize: 48, fontFamily: theme.fonts.bold, color: colors.white },
  name: { fontSize: 22, fontFamily: theme.fonts.bold, color: colors.textPrimary, marginBottom: 10 },
  rankBadge: {
    backgroundColor: colors.amberBg, paddingHorizontal: 16, paddingVertical: 6,
    borderRadius: 20, marginBottom: 24,
  },
  rankText: { fontSize: 14, fontFamily: theme.fonts.semiBold, color: colors.accent },
  card: {
    width: '100%', backgroundColor: colors.white, borderRadius: 14, padding: 16,
    shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  label: { fontSize: 13, fontFamily: theme.fonts.medium, color: colors.textTertiary },
  value: { fontSize: 13, fontFamily: theme.fonts.semiBold, color: colors.textPrimary, flex: 1, textAlign: 'right' },
}), [colors]);
  const item: Achievement = route.params.item;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
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


export default AchievementDetailScreen;
