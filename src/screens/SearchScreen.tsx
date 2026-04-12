import React, { useRef, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard,
  ActivityIndicator, Modal, ScrollView,
} from 'react-native';
import { BackArrowIcon, SearchIcon } from '../components/Icons';
import { theme } from '../theme';
import { search, SearchResult } from '../services/api';

const SearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<SearchResult | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback((text: string) => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!text.trim()) { setResults([]); return; }
    debounceRef.current = setTimeout(() => {
      setLoading(true);
      search(text.trim())
        .then(({ data }) => setResults(data))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 400);
  }, []);

  const handlePress = (item: SearchResult) => {
    if (item.pdf_url) {
      navigation.navigate('PDFViewer', { url: item.pdf_url, title: item.question });
    } else if (item.answer) {
      setSelected(item);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          <SearchIcon size={16} color="#9CA3AF" />
          <TextInput
            autoFocus
            style={styles.input}
            placeholder="Search courses, exams, materials..."
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={handleChange}
            returnKeyType="search"
            onSubmitEditing={Keyboard.dismiss}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => { setQuery(''); setResults([]); }}>
              <Text style={styles.clear}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#3A8EDB" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={() => handlePress(item)}>
              <View style={styles.itemMain}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemText} numberOfLines={2}>{item.question}</Text>
                  {item.pdf_url && (
                    <View style={styles.pdfBadge}><Text style={styles.pdfBadgeText}>PDF</Text></View>
                  )}
                </View>
                <Text style={styles.itemMeta}>{item.category_name} · {item.type}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={query.trim() ? <Text style={styles.empty}>No results found.</Text> : null}
        />
      )}

      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setSelected(null)}>
          <TouchableOpacity style={styles.modal} activeOpacity={1}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalQuestion}>{selected?.question}</Text>
              <View style={styles.divider} />
              <Text style={styles.answerLabel}>Answer</Text>
              <Text style={styles.modalAnswer}>{selected?.answer}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelected(null)}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 14,
    backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  back: { padding: 4 },
  inputWrapper: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#F3F4F6', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9,
  },
  input: { flex: 1, fontSize: 14, fontFamily: theme.fonts.regular, color: '#1F2937', padding: 0 },
  clear: { fontSize: 13, color: '#9CA3AF', paddingLeft: 4 },
  list: { padding: 16 },
  item: { paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  itemMain: { gap: 4 },
  itemRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  itemText: { flex: 1, fontSize: 14, fontFamily: theme.fonts.semiBold, color: '#1F2937' },
  itemMeta: { fontSize: 12, fontFamily: theme.fonts.regular, color: '#9CA3AF' },
  pdfBadge: {
    backgroundColor: '#FEE2E2', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2, alignSelf: 'flex-start',
  },
  pdfBadgeText: { fontSize: 10, fontFamily: theme.fonts.bold, color: '#EF4444' },
  empty: { textAlign: 'center', color: '#9CA3AF', fontFamily: theme.fonts.regular, marginTop: 40 },
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 24,
  },
  modal: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, maxHeight: '75%',
  },
  modalQuestion: { fontSize: 15, fontFamily: theme.fonts.semiBold, color: '#1F2937', lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 14 },
  answerLabel: { fontSize: 11, fontFamily: theme.fonts.bold, color: '#9CA3AF', marginBottom: 6, textTransform: 'uppercase' },
  modalAnswer: { fontSize: 14, fontFamily: theme.fonts.regular, color: '#374151', lineHeight: 22 },
  closeBtn: {
    marginTop: 18, backgroundColor: '#3A8EDB', borderRadius: 10,
    paddingVertical: 11, alignItems: 'center',
  },
  closeBtnText: { fontSize: 14, fontFamily: theme.fonts.bold, color: '#FFFFFF' },
});

export default SearchScreen;
