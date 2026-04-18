import React, { useEffect, useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image,
  TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getMultimediaVideos, MultimediaVideo } from '../services/api';

const MultimediaVideosScreen = ({ route, navigation }: any) => {
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
  thumb: { width: 110, height: 80 },
  thumbPlaceholder: { justifyContent: 'center', alignItems: 'center' },
  playIcon: { fontSize: 28 },
  info: { flex: 1, padding: 10, justifyContent: 'center' },
  videoTitle: { fontSize: 13, fontFamily: theme.fonts.bold, color: colors.textHeading, marginBottom: 4 },
  desc: { fontSize: 11, fontFamily: theme.fonts.regular, color: colors.textTertiary, marginBottom: 6 },
  badge: { alignSelf: 'flex-start', backgroundColor: colors.borderLight, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  badgeText: { fontSize: 10, fontFamily: theme.fonts.semiBold },
  empty: { textAlign: 'center', color: colors.textTertiary, fontFamily: theme.fonts.regular, marginTop: 40 },
}), [colors]);
  const { title, subjectId, privacy, color = colors.errorAlt, bg = colors.errorBgAlt } = route.params;
  const [videos, setVideos] = useState<MultimediaVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    getMultimediaVideos({ page: 1, page_size: 20, privacy, subject_id: subjectId })
      .then(({ data }) => { setVideos(data.results); setNextPage(data.next); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const fetchMore = async () => {
    if (!nextPage || loadingMore) return;
    setLoadingMore(true);
    try {
      const page = new URL(nextPage).searchParams.get('page');
      const { data } = await getMultimediaVideos({ page: Number(page), page_size: 20, privacy, subject_id: subjectId });
      setVideos(prev => [...prev, ...data.results]);
      setNextPage(data.next);
    } finally { setLoadingMore(false); }
  };

  const handlePress = (item: MultimediaVideo) => {
    navigation.navigate('VideoPlayer', {
      videoId: item.player_type === 'YOUTUBE' ? item.video_url : undefined,
      videoUrl: item.player_type !== 'YOUTUBE' ? (item.video_file || item.video_url) : undefined,
      playerType: item.player_type,
      title: item.title,
    });
  };

  const renderItem = ({ item }: { item: MultimediaVideo }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => handlePress(item)}>
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumb} resizeMode="cover" />
      ) : (
        <View style={[styles.thumb, styles.thumbPlaceholder, { backgroundColor: bg }]}>
          <Text style={[styles.playIcon, { color }]}>▶</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
        {!!item.description && <Text style={styles.desc} numberOfLines={1}>{item.description}</Text>}
        <View style={styles.badge}>
          <Text style={[styles.badgeText, { color }]}>{item.player_type}</Text>
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
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={color} />
      ) : (
        <FlatList
          data={videos}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={loadingMore ? <ActivityIndicator color={color} style={{ marginVertical: 16 }} /> : null}
          ListEmptyComponent={<Text style={styles.empty}>No videos available.</Text>}
        />
      )}
    </View>
  );
};


export default MultimediaVideosScreen;
