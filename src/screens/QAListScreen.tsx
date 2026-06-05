import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';

interface Item { id: number; name: string; }

const QAListScreen = ({ route, navigation }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundGrey },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16,
    backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  back: { padding: 8 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontFamily: theme.fonts.bold, color: colors.textDark },
  list: { padding: 16 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 12, padding: 16, marginBottom: 10, borderLeftWidth: 4,
    shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  badge: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  badgeText: { fontSize: 12, fontFamily: theme.fonts.bold },
  itemTitle: { flex: 1, fontSize: 14, fontFamily: theme.fonts.semiBold, color: colors.textPrimary },
  arrow: { fontSize: 22 },
  empty: { textAlign: 'center', color: colors.textTertiary, fontFamily: theme.fonts.regular, marginTop: 40 },
}), [colors]);
  const { title, color, bg, fetchFn, nextScreen, nextParams } = route.params;
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    console.log('[QAListScreen] Screen:', title, '| nextScreen:', nextScreen);
    console.log('[QAListScreen] Calling fetchFn...');
    setLoading(true);
    fetchFn()
      .then(({ data }: any) => {
        console.log('[QAListScreen] fetchFn response for', title, '| count:', Array.isArray(data) ? data.length : data, '| data:', JSON.stringify(data));
        setItems(data);
      })
      .catch((err: any) => {
        console.error('[QAListScreen] fetchFn error for', title, ':', err);
      })
      .finally(() => setLoading(false));
  }, [route.params]));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={color} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.card, { borderLeftColor: color }]}
              activeOpacity={0.8}
              onPress={() => {
                console.log('[QAListScreen] Item tapped:', JSON.stringify(item), '| navigating to:', nextScreen);
                if (item.pdf_file) {
                  console.log('[QAListScreen] pdf_file detected, opening PDFViewer:', item.pdf_file);
                  navigation.navigate('PDFViewer', { url: item.pdf_file, title: item.name });
                  return;
                }
                const params = nextParams ? nextParams(item) : {};
                console.log('[QAListScreen] Next params (excluding functions):', JSON.stringify(params, (k, v) => typeof v === 'function' ? '[Function]' : v));
                nextScreen && navigation.navigate(nextScreen, { ...params, color, bg });
              }}
            >
              <View style={[styles.badge, { backgroundColor: bg }]}>
                <Text style={[styles.badgeText, { color }]}>{index + 1}</Text>
              </View>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={[styles.arrow, { color }]}>›</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No items found.</Text>}
        />
      )}
    </View>
  );
};


export default QAListScreen;
