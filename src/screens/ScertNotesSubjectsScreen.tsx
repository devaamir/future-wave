import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getScertNotes, ScertNoteCategory, ScertNoteSubject } from '../services/api';


const ScertNotesSubjectsScreen = ({ route, navigation }: any) => {
  const colors = useColors();
  const palette = useMemo(() => [
  { color: colors.blue, bg: colors.blueBg },
  { color: colors.purple, bg: colors.purpleBg },
  { color: colors.accent, bg: colors.amberBg },
  { color: colors.successGreen, bg: colors.greenBgLight },
  { color: colors.error, bg: colors.errorBg },
  { color: colors.successGreenDark, bg: colors.greenBg },
  { color: colors.textTertiary, bg: colors.borderLight },
], [colors]);
  const styles = useMemo(() => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundGrey },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16,
    backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  back: { padding: 8 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontFamily: theme.fonts.bold, color: colors.textDark },
  list: { padding: 12 },
  card: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 10,
    borderRadius: 12, padding: 16, borderLeftWidth: 4,
    shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  title: { fontSize: 13, fontFamily: theme.fonts.bold },
  empty: { textAlign: 'center', color: colors.textTertiary, fontFamily: theme.fonts.regular, marginTop: 40 },
}), [colors]);
  const { classId, className } = route.params;
  const [subjects, setSubjects] = useState<ScertNoteSubject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScertNotes({ class_id: classId })
      .then(({ data }) => {
        // flatten all subjects from all categories
        const all = data.flatMap((cat: ScertNoteCategory) => cat.subjects);
        setSubjects(all);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [classId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{className}</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.error} />
      ) : (
        <FlatList
          data={subjects}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => {
            const { color, bg } = palette[index % palette.length];
            return (
              <TouchableOpacity
                style={[styles.card, { borderLeftColor: color, backgroundColor: bg }]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ScertNotesTopics', { subject: item, color, bg })}
              >
                <View style={[styles.dot, { backgroundColor: color }]} />
                <Text style={[styles.title, { color }]}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={<Text style={styles.empty}>No subjects found.</Text>}
        />
      )}
    </View>
  );
};


export default ScertNotesSubjectsScreen;
