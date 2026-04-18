import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import Video from 'react-native-video';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

const extractYoutubeId = (val: string) => {

  if (!val) return '';
  const match = val.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : val;
};

const VideoPlayerScreen = ({ route, navigation }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blackShort },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16,
    backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  back: { padding: 8 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontFamily: theme.fonts.bold, color: colors.textDark },
  player: { width, aspectRatio: 16 / 9, backgroundColor: colors.blackShort },
}), [colors]);
  const { videoId: rawId, videoUrl, playerType, title } = route.params || {};
  console.log('playerType', playerType);

  const isYoutube = playerType === 'YOUTUBE' || !!rawId;
  const videoId = extractYoutubeId(rawId);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title || 'Video'}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={{ flex: 1, justifyContent: 'center', }}>
        {isYoutube ? (
          <YoutubePlayer
            height={'50%'}
            width={'100%'}
            play={true}
            videoId={videoId}
            forceAndroidAutoplay={true}
          />
        ) : (
          <Video
            source={{ uri: videoUrl }}
            style={styles.player}
            controls
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
};


export default VideoPlayerScreen;
