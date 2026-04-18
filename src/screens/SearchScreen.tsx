import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard,
  ActivityIndicator, Modal, ScrollView,
} from 'react-native';
import { BackArrowIcon, SearchIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { search, SearchResult } from '../services/api';

const SearchScreen = ({ navigation }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundGrey },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 14,
    backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  back: { padding: 4 },
  inputWrapper: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.borderLight, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9,
  },
  input: { flex: 1, fontSize: 14, fontFamily: theme.fonts.regular, color: colors.textPrimary, padding: 0 },
  clear: { fontSize: 13, color: colors.textDisabled, paddingLeft: 4 },
  list: { padding: 16 },
  item: { paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  itemMain: { gap: 4 },
  itemRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  itemText: { flex: 1, fontSize: 14, fontFamily: theme.fonts.semiBold, color: colors.textPrimary },
  itemMeta: { fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textDisabled },
  pdfBadge: {
    backgroundColor: colors.errorBgLight, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2, alignSelf: 'flex-start',
  },
  pdfBadgeText: { fontSize: 10, fontFamily: theme.fonts.bold, color: colors.error },
  empty: { textAlign: 'center', color: colors.textDisabled, fontFamily: theme.fonts.regular, marginTop: 40 },
  overlay: {
    flex: 1, backgroundColor: colors.overlayDark045, justifyContent: 'center', padding: 24,
  },
  modal: {
    backgroundColor: colors.white, borderRadius: 16, padding: 20, maxHeight: '75%',
  },
  modalQuestion: { fontSize: 15, fontFamily: theme.fonts.semiBold, color: colors.textPrimary, lineHeight: 22 },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: 14 },
  answerLabel: { fontSize: 11, fontFamily: theme.fonts.bold, color: colors.textDisabled, marginBottom: 6, textTransform: 'uppercase' },
  modalAnswer: { fontSize: 14, fontFamily: theme.fonts.regular, color: colors.textBodyAlt, lineHeight: 22 },
  closeBtn: {
    marginTop: 18, backgroundColor: colors.blue, borderRadius: 10,
    paddingVertical: 11, alignItems: 'center',
  },
  closeBtnText: { fontSize: 14, fontFamily: theme.fonts.bold, color: colors.white },
}), [colors]);
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
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          <SearchIcon size={16} color={colors.textDisabled} />
          <TextInput
            autoFocus
            style={styles.input}
            placeholder="Search courses, exams, materials..."
            placeholderTextColor={colors.textDisabled}
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
        <ActivityIndicator style={{ marginTop: 40 }} size="large" color={colors.blue} />
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


export default SearchScreen;
