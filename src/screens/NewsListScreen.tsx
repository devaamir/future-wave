import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getNews, News } from '../services/api';

const NewsListScreen = ({ navigation }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundGrey },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  back: { padding: 8 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: colors.textDark,
  },
  list: { padding: 16 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: colors.blackShort,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  image: { width: '100%', height: 180 },
  info: { padding: 14 },
  meta: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  authorBadge: {
    backgroundColor: colors.indigoBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  authorText: {
    fontSize: 11,
    fontFamily: theme.fonts.semiBold,
    color: colors.indigo,
  },
  date: {
    fontSize: 11,
    fontFamily: theme.fonts.regular,
    color: colors.successGreen,
  },
  title: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: colors.textHeading,
    lineHeight: 20,
  },
  empty: {
    textAlign: 'center',
    color: colors.textTertiary,
    fontFamily: theme.fonts.regular,
    marginTop: 40,
  },
}), [colors]);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const formattedDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    getNews().then(({ data }) => {
      setNews(data.results);
      setNextPage(data.next);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const fetchMore = async () => {
    if (!nextPage || loadingMore) return;
    setLoadingMore(true);
    try {
      const { data } = await getNews({ page: new URL(nextPage).searchParams.get('page') });
      setNews(prev => [...prev, ...data.results]);
      setNextPage(data.next);
    } finally {
      setLoadingMore(false);
    }
  };

  const renderItem = ({ item }: { item: News }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('NewsDetail', { item })}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, { backgroundColor: colors.border }]} />
      )}
      <View style={styles.info}>
        <View style={styles.meta}>
          <View style={styles.authorBadge}>
            <Text style={styles.authorText}>{item.author}</Text>
          </View>
          <Text style={styles.date}>{formattedDate(item.date)}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>News & Events</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.indigo} />
      ) : (
        <FlatList
          data={news}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.indigo} style={{ marginVertical: 16 }} /> : null}
          ListEmptyComponent={<Text style={styles.empty}>No news available.</Text>}
        />
      )}
    </View>
  );
};


export default NewsListScreen;
