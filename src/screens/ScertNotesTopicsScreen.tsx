import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';
import { ScertNoteSubject } from '../services/api';

const ScertNotesTopicsScreen = ({ route, navigation }: any) => {
  const { subject, color, bg }: { subject: ScertNoteSubject; color: string; bg: string } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{subject.name}</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={subject.notes}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.card, { borderLeftColor: color }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PDFViewer', { url: item.pdf_note, title: item.topic })}
          >
            <View style={[styles.badge, { backgroundColor: bg }]}>
              <Text style={[styles.badgeText, { color }]}>{index + 1}</Text>
            </View>
            <Text style={styles.topic}>{item.topic}</Text>
            <Text style={[styles.arrow, { color }]}>›</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No topics found.</Text>}
      />
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
  list: { padding: 16 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 16, marginBottom: 10, borderLeftWidth: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  badge: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  badgeText: { fontSize: 12, fontFamily: theme.fonts.bold },
  topic: { flex: 1, fontSize: 14, fontFamily: theme.fonts.semiBold, color: '#1F2937' },
  arrow: { fontSize: 22 },
  empty: { textAlign: 'center', color: '#6B7280', fontFamily: theme.fonts.regular, marginTop: 40 },
});

export default ScertNotesTopicsScreen;
