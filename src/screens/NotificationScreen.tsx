import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NotificationIcon, BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';
import { getNotifications } from '../services/api';

interface Notification { id: number; title: string; description: string; created_at: string; }

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    getNotifications({ page: 1, page_size: 20 })
      .then(({ data }) => { setItems(data.results); setNextPage(data.next); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const fetchMore = async () => {
    if (!nextPage || loadingMore) return;
    setLoadingMore(true);
    try {
      const page = new URL(nextPage).searchParams.get('page');
      const { data } = await getNotifications({ page: Number(page), page_size: 20 });
      setItems(prev => [...prev, ...data.results]);
      setNextPage(data.next);
    } finally { setLoadingMore(false); }
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackArrowIcon size={32} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 48 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color="#E74C3C" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.content}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={loadingMore ? <ActivityIndicator color="#E74C3C" style={{ marginVertical: 16 }} /> : null}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <NotificationIcon size={48} color="#E5E7EB" />
              <Text style={styles.emptyTitle}>No notifications yet</Text>
              <Text style={styles.emptySubtitle}>You're all caught up!</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <NotificationIcon size={20} color="#E74C3C" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.description}</Text>
                <Text style={styles.time}>{timeAgo(item.created_at)}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16,
    backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  backButton: { padding: 8 },
  headerTitle: { flex: 1, textAlign: 'center', color: '#2D2D2D', fontSize: theme.fontSizes.xl, fontFamily: theme.fonts.bold },
  content: { padding: 16 },
  card: {
    flexDirection: 'row', backgroundColor: '#F9FAFB', padding: 16,
    marginBottom: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB',
  },
  iconContainer: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6',
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  textContainer: { flex: 1 },
  title: { fontSize: theme.fontSizes.base, fontFamily: theme.fonts.bold, color: '#2D2D2D', marginBottom: 4 },
  subtitle: { fontSize: theme.fontSizes.sm, fontFamily: theme.fonts.regular, color: '#6B7280', marginBottom: 4, lineHeight: 18 },
  time: { fontSize: theme.fontSizes.xs, fontFamily: theme.fonts.regular, color: '#9CA3AF' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: theme.fontSizes.lg, fontFamily: theme.fonts.bold, color: '#9CA3AF', marginTop: 16, marginBottom: 8 },
  emptySubtitle: { fontSize: theme.fontSizes.sm, fontFamily: theme.fonts.regular, color: '#9CA3AF', textAlign: 'center' },
});

export default NotificationScreen;
