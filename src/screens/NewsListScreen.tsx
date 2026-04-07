import React, { useEffect, useState } from 'react';
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
import { theme } from '../theme';
import { getNews, News } from '../services/api';

const NewsListScreen = ({ navigation }: any) => {
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
        <View style={[styles.image, { backgroundColor: '#E5E7EB' }]} />
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
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>News & Events</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color="#4F46E5" />
      ) : (
        <FlatList
          data={news}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={loadingMore ? <ActivityIndicator color="#4F46E5" style={{ marginVertical: 16 }} /> : null}
          ListEmptyComponent={<Text style={styles.empty}>No news available.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  back: { padding: 8 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
  },
  list: { padding: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  image: { width: '100%', height: 180 },
  info: { padding: 14 },
  meta: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  authorBadge: {
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  authorText: {
    fontSize: 11,
    fontFamily: theme.fonts.semiBold,
    color: '#4F46E5',
  },
  date: {
    fontSize: 11,
    fontFamily: theme.fonts.regular,
    color: '#10B981',
  },
  title: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#111827',
    lineHeight: 20,
  },
  empty: {
    textAlign: 'center',
    color: '#6B7280',
    fontFamily: theme.fonts.regular,
    marginTop: 40,
  },
});

export default NewsListScreen;
