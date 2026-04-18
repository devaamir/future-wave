import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getExamResults, ExamResult } from '../services/api';

const ExamResultScreen = ({ navigation }: any) => {
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.white, borderRadius: 14, padding: 16, marginBottom: 10,
    shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardLeft: { flex: 1, marginRight: 12, gap: 3 },
  title: { fontSize: 14, fontFamily: theme.fonts.semiBold, color: colors.textPrimary },
  date: { fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textDisabled },
  rank: { fontSize: 12, fontFamily: theme.fonts.semiBold, color: colors.purple },
  cardRight: { alignItems: 'center', gap: 8 },
  score: { fontSize: 20, fontFamily: theme.fonts.bold, color: colors.textPrimary },
  total: { fontSize: 13, fontFamily: theme.fonts.regular, color: colors.textDisabled },
  omrBtn: { backgroundColor: colors.blueBg, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4 },
  omrBtnText: { fontSize: 11, fontFamily: theme.fonts.bold, color: colors.blue },
  empty: { textAlign: 'center', color: colors.textDisabled, fontFamily: theme.fonts.regular, marginTop: 40 },
}), [colors]);
  const [items, setItems] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExamResults().then(({ data }) => setItems(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exam Result</Text>
        <View style={{ width: 40 }} />
      </View>
      {loading ? <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.successGreen} /> : (
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


export default ExamResultScreen;
