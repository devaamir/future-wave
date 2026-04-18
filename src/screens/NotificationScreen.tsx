import React, { useEffect, useState, useMemo } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NotificationIcon, BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getNotifications } from '../services/api';

interface Notification { id: number; title: string; description: string; created_at: string; }

const NotificationScreen = () => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16,
    backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backButton: { padding: 8 },
  headerTitle: { flex: 1, textAlign: 'center', color: colors.textDark, fontSize: theme.fontSizes.xl, fontFamily: theme.fonts.bold },
  content: { padding: 16 },
  card: {
    flexDirection: 'row', backgroundColor: colors.backgroundGrey, padding: 16,
    marginBottom: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.border,
  },
  iconContainer: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.borderLight,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  textContainer: { flex: 1 },
  title: { fontSize: theme.fontSizes.base, fontFamily: theme.fonts.bold, color: colors.textDark, marginBottom: 4 },
  subtitle: { fontSize: theme.fontSizes.sm, fontFamily: theme.fonts.regular, color: colors.textTertiary, marginBottom: 4, lineHeight: 18 },
  time: { fontSize: theme.fontSizes.xs, fontFamily: theme.fonts.regular, color: colors.textDisabled },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: theme.fontSizes.lg, fontFamily: theme.fonts.bold, color: colors.textDisabled, marginTop: 16, marginBottom: 8 },
  emptySubtitle: { fontSize: theme.fontSizes.sm, fontFamily: theme.fonts.regular, color: colors.textDisabled, textAlign: 'center' },
}), [colors]);
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
          <BackArrowIcon size={32} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 48 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.secondary} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.content}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.secondary} style={{ marginVertical: 16 }} /> : null}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <NotificationIcon size={48} color={colors.border} />
              <Text style={styles.emptyTitle}>No notifications yet</Text>
              <Text style={styles.emptySubtitle}>You're all caught up!</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <NotificationIcon size={20} color={colors.secondary} />
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


export default NotificationScreen;
