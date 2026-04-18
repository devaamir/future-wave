import React, { useEffect, useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image,
  TouchableOpacity, ActivityIndicator, Linking,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getBooks, Book } from '../services/api';

const OurBooksScreen = ({ navigation }: any) => {
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
    flexDirection: 'row', backgroundColor: colors.white, borderRadius: 14,
    marginBottom: 12, overflow: 'hidden',
    shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  cover: { width: 90, height: 120 },
  coverPlaceholder: { backgroundColor: colors.greenBgLight, justifyContent: 'center', alignItems: 'center' },
  coverEmoji: { fontSize: 36 },
  info: { flex: 1, padding: 12, justifyContent: 'space-between' },
  title: { fontSize: 14, fontFamily: theme.fonts.bold, color: colors.textHeading, marginBottom: 4 },
  author: { fontSize: 12, fontFamily: theme.fonts.semiBold, color: colors.successGreenAlt, marginBottom: 4 },
  desc: { fontSize: 11, fontFamily: theme.fonts.regular, color: colors.textTertiary, lineHeight: 16, marginBottom: 6 },
  footer: { flexDirection: 'row', alignItems: 'center' },
  freeBadge: { backgroundColor: colors.greenBgLight, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  freeText: { fontSize: 11, fontFamily: theme.fonts.bold, color: colors.successGreenAlt },
  price: { fontSize: 13, fontFamily: theme.fonts.bold, color: colors.textHeading },
  empty: { textAlign: 'center', color: colors.textTertiary, fontFamily: theme.fonts.regular, marginTop: 40 },
}), [colors]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks().then(({ data }) => setBooks(data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handlePress = (item: Book) => {
    if (item.is_free && item.pdf_file) {
      navigation.navigate('PDFViewer', { url: item.pdf_file, title: item.title });
    } else if (item.purchase_link) {
      Linking.openURL(item.purchase_link);
    }
  };

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => handlePress(item)}>
      {item.cover_image ? (
        <Image source={{ uri: item.cover_image }} style={styles.cover} resizeMode="cover" />
      ) : (
        <View style={[styles.cover, styles.coverPlaceholder]}>
          <Text style={styles.coverEmoji}>📗</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        {!!item.author && <Text style={styles.author}>{item.author}</Text>}
        {!!item.description && <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>}
        <View style={styles.footer}>
          {item.is_free ? (
            <View style={styles.freeBadge}><Text style={styles.freeText}>FREE</Text></View>
          ) : (
            <Text style={styles.price}>₹{item.price}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Books</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.successGreenAlt} />
      ) : (
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.empty}>No books available.</Text>}
        />
      )}
    </View>
  );
};


export default OurBooksScreen;
