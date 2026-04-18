import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { BackArrowIcon, CalendarIcon, ClockIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getTimetable, TimetableEntry } from '../services/api';

const formatTime = (t: string) => t?.slice(0, 5) ?? '';

const TimeTableScreen = ({ navigation }: any) => {
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
    backgroundColor: colors.white, borderRadius: 14, padding: 16, marginBottom: 12,
    shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 },
  name: { flex: 1, fontSize: 15, fontFamily: theme.fonts.semiBold, color: colors.textPrimary, marginRight: 8 },
  modeBadge: { backgroundColor: colors.amberBg, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  modeText: { fontSize: 11, fontFamily: theme.fonts.semiBold, color: colors.accent },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  meta: { fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textTertiary },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  tag: { backgroundColor: colors.borderLight, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  tagText: { fontSize: 11, fontFamily: theme.fonts.regular, color: colors.textTertiary },
  sub: { fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textDisabled },
  empty: { textAlign: 'center', color: colors.textDisabled, fontFamily: theme.fonts.regular, marginTop: 40 },
}), [colors]);
  const [items, setItems] = useState<TimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTimetable().then(({ data }) => setItems(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Time Table</Text>
        <View style={{ width: 40 }} />
      </View>
      {loading ? <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.accent} /> : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.modeBadge}>
                  <Text style={styles.modeText}>{item.mode}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <CalendarIcon size={13} color={colors.textDisabled} />
                <Text style={styles.meta}>{item.date}</Text>
                <ClockIcon size={13} color={colors.textDisabled} />
                <Text style={styles.meta}>{formatTime(item.start_time)} – {formatTime(item.end_time)}</Text>
              </View>

              <View style={styles.tagsRow}>
                <View style={styles.tag}><Text style={styles.tagText}>{item.level}</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>{item.exam_type}</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>{item.total_questions} Qs</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>{item.total_marks} Marks</Text></View>
              </View>

              {(item.course_name || item.batch_name) ? (
                <Text style={styles.sub}>{[item.course_name, item.batch_name].filter(Boolean).join(' · ')}</Text>
              ) : null}
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No timetable available.</Text>}
        />
      )}
    </View>
  );
};


export default TimeTableScreen;
