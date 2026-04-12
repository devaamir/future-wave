import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';
import { getExamResults, ExamResult } from '../services/api';

const ExamResultScreen = ({ navigation }: any) => {
  const [items, setItems] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExamResults().then(({ data }) => setItems(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exam Result</Text>
        <View style={{ width: 40 }} />
      </View>
      {loading ? <ActivityIndicator style={{ flex: 1 }} size="large" color="#10B981" /> : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardLeft}>
                <Text style={styles.title}>{item.exam_name}</Text>
                <Text style={styles.date}>{item.exam_date}</Text>
                <Text style={styles.rank}>Rank #{item.rank}</Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.score}>
                  {item.marks_obtained}
                  <Text style={styles.total}>/{item.total_marks}</Text>
                </Text>
                {item.omr_sheet ? (
                  <TouchableOpacity
                    style={styles.omrBtn}
                    onPress={() => navigation.navigate('PDFViewer', { url: item.omr_sheet, title: item.exam_name })}
                  >
                    <Text style={styles.omrBtnText}>OMR</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No results yet.</Text>}
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardLeft: { flex: 1, marginRight: 12, gap: 3 },
  title: { fontSize: 14, fontFamily: theme.fonts.semiBold, color: '#1F2937' },
  date: { fontSize: 12, fontFamily: theme.fonts.regular, color: '#9CA3AF' },
  rank: { fontSize: 12, fontFamily: theme.fonts.semiBold, color: '#7B5ACF' },
  cardRight: { alignItems: 'center', gap: 8 },
  score: { fontSize: 20, fontFamily: theme.fonts.bold, color: '#1F2937' },
  total: { fontSize: 13, fontFamily: theme.fonts.regular, color: '#9CA3AF' },
  omrBtn: { backgroundColor: '#EBF4FF', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4 },
  omrBtnText: { fontSize: 11, fontFamily: theme.fonts.bold, color: '#3A8EDB' },
  empty: { textAlign: 'center', color: '#9CA3AF', fontFamily: theme.fonts.regular, marginTop: 40 },
});

export default ExamResultScreen;
