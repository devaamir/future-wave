import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';
import { getCapsuleSubjects, getCapsuleSubcategories, getCapsuleTypes, getCapsuleQuestions, CapsuleSubject } from '../services/api';

const palette = [
  { color: '#3A8EDB', bg: '#EBF4FF' },
  { color: '#7B5ACF', bg: '#F3EEFF' },
  { color: '#F39C12', bg: '#FFF8EC' },
  { color: '#10B981', bg: '#ECFDF5' },
  { color: '#EF4444', bg: '#FEF2F2' },
  { color: '#3DBE8B', bg: '#E8F5E9' },
  { color: '#6B7280', bg: '#F3F4F6' },
];

const CapsuleSubjectsScreen = ({ navigation }: any) => {
  const [subjects, setSubjects] = useState<CapsuleSubject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCapsuleSubjects()
      .then(({ data }) => setSubjects(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Capsules</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color="#10B981" />
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
                onPress={() => navigation.navigate('QACategories', {
                  title: item.name,
                  color,
                  bg,
                  fetchFn: () => getCapsuleSubcategories({ subject_id: item.id }),
                  nextScreen: 'QACategories',
                  nextParams: (sub: any) => ({
                    title: sub.name,
                    color,
                    bg,
                    fetchFn: () => getCapsuleTypes({ subcategory_id: sub.id }),
                    nextScreen: 'QAQuestions',
                    nextParams: (type: any) => ({
                      title: type.name,
                      readOnly: true,
                      fetchFn: (p: any) => getCapsuleQuestions({ type_id: type.id, ...p }),
                    }),
                  }),
                })}
              >
                <View style={[styles.dot, { backgroundColor: color }]} />
                <Text style={[styles.title, { color }]}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
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
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontFamily: theme.fonts.bold, color: '#2D2D2D' },
  list: { padding: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  title: { fontSize: 13, fontFamily: theme.fonts.bold },
});

export default CapsuleSubjectsScreen;
