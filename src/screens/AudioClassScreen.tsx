import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, ActivityIndicator,
} from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import { BackArrowIcon, PlayIcon, PauseIcon, AudioClassIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getAudioClasses, AudioClass } from '../services/api';

const AudioCard = ({ item, colors, styles }: { item: AudioClass; colors: any; styles: any }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<VideoRef>(null);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <AudioClassIcon size={22} color={colors.primary} />
        </View>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      </View>
      {!!item.description && (
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
      )}

      {/* Hidden audio player */}
      <Video
        ref={videoRef}
        source={{ uri: item.audio_file }}
        audioOnly
        paused={!playing}
        onProgress={({ currentTime, seekableDuration }) => {
          setProgress(currentTime);
          if (seekableDuration) setDuration(seekableDuration);
        }}
        onEnd={() => { setPlaying(false); setProgress(0); videoRef.current?.seek(0); }}
        style={{ width: 0, height: 0 }}
      />

      {/* Controls */}
      <View style={styles.playerRow}>
        <TouchableOpacity onPress={() => setPlaying(p => !p)} style={[styles.playBtn, { backgroundColor: colors.primary }]}>
          {playing ? <PauseIcon size={16} color="#fff" /> : <PlayIcon size={16} color="#fff" />}
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: duration ? `${(progress / duration) * 100}%` : '0%' as any, backgroundColor: colors.primary }]} />
        </View>
        <Text style={styles.timeText}>{formatTime(progress)} / {formatTime(duration)}</Text>
      </View>

      <View style={styles.badgeRow}>
        <View style={styles.badge}><Text style={styles.badgeText}>{item.level}</Text></View>
        <View style={styles.badge}><Text style={styles.badgeText}>{item.privacy}</Text></View>
      </View>
    </View>
  );
};

const AudioClassScreen = ({ navigation }: any) => {
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
      backgroundColor: colors.white, borderRadius: 14, marginBottom: 12, padding: 16,
      shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
    },
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    iconBox: {
      width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primaryLight ?? '#E0F7F5',
      justifyContent: 'center', alignItems: 'center', marginRight: 12,
    },
    title: { flex: 1, fontSize: 14, fontFamily: theme.fonts.bold, color: colors.textDark },
    desc: { fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textTertiary, marginBottom: 8, lineHeight: 18 },
    playerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
    playBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
    progressContainer: { flex: 1, height: 4, backgroundColor: colors.borderLight, borderRadius: 2, overflow: 'hidden' },
    progressBar: { height: 4, borderRadius: 2 },
    timeText: { fontSize: 11, fontFamily: theme.fonts.regular, color: colors.textTertiary, minWidth: 72, textAlign: 'right' },
    badgeRow: { flexDirection: 'row', gap: 8 },
    badge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: colors.borderLight },
    badgeText: { fontSize: 11, fontFamily: theme.fonts.semiBold, color: colors.textTertiary },
    empty: { textAlign: 'center', color: colors.textTertiary, fontFamily: theme.fonts.regular, marginTop: 40 },
  }), [colors]);

  const [items, setItems] = useState<AudioClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    getAudioClasses({ page: 1, page_size: 20 })
      .then(({ data }) => { console.log('getAudioClasses:', data); setItems(data.results); setNextPage(data.next); })
      .catch(err => console.error('getAudioClasses error:', err))
      .finally(() => setLoading(false));
  }, []);

  const fetchMore = async () => {
    if (!nextPage || loadingMore) return;
    setLoadingMore(true);
    try {
      const page = new URL(nextPage).searchParams.get('page');
      const { data } = await getAudioClasses({ page: Number(page), page_size: 20 });
      console.log('getAudioClasses more:', data);
      setItems(prev => [...prev, ...data.results]);
      setNextPage(data.next);
    } catch (err) {
      console.error('getAudioClasses fetchMore error:', err);
    } finally { setLoadingMore(false); }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Audio Classes</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => <AudioCard item={item} colors={colors} styles={styles} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.primary} style={{ marginVertical: 16 }} /> : null}
          ListEmptyComponent={<Text style={styles.empty}>No audio classes available.</Text>}
        />
      )}
    </View>
  );
};

export default AudioClassScreen;
