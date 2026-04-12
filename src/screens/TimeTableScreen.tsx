import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { BackArrowIcon, CalendarIcon, ClockIcon } from '../components/Icons';
import { theme } from '../theme';
import { getTimetable, TimetableEntry } from '../services/api';

const formatTime = (t: string) => t?.slice(0, 5) ?? '';

const TimeTableScreen = ({ navigation }: any) => {
  const [items, setItems] = useState<TimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTimetable().then(({ data }) => setItems(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Time Table</Text>
        <View style={{ width: 40 }} />
      </View>
      {loading ? <ActivityIndicator style={{ flex: 1 }} size="large" color="#F39C12" /> : (
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
                <CalendarIcon size={13} color="#9CA3AF" />
                <Text style={styles.meta}>{item.date}</Text>
                <ClockIcon size={13} color="#9CA3AF" />
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
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 },
  name: { flex: 1, fontSize: 15, fontFamily: theme.fonts.semiBold, color: '#1F2937', marginRight: 8 },
  modeBadge: { backgroundColor: '#FFF8EC', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  modeText: { fontSize: 11, fontFamily: theme.fonts.semiBold, color: '#F39C12' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  meta: { fontSize: 12, fontFamily: theme.fonts.regular, color: '#6B7280' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  tag: { backgroundColor: '#F3F4F6', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  tagText: { fontSize: 11, fontFamily: theme.fonts.regular, color: '#6B7280' },
  sub: { fontSize: 12, fontFamily: theme.fonts.regular, color: '#9CA3AF' },
  empty: { textAlign: 'center', color: '#9CA3AF', fontFamily: theme.fonts.regular, marginTop: 40 },
});

export default TimeTableScreen;
