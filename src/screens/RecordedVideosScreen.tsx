import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { BackArrowIcon, SearchIcon, RecordedVideosIcon } from '../components/Icons';
import { theme, useColors } from '../theme';

const RecordedVideosScreen = () => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: colors.textDark,
  },
  searchButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: colors.textDark,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  horizontalScroll: {
    paddingLeft: 16,
  },
  featuredCard: {
    marginRight: 16,
    width: 160,
  },
  featuredThumbnail: {
    position: 'relative',
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.gold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  newText: {
    fontSize: 10,
    fontFamily: theme.fonts.bold,
    color: colors.white,
  },
  thumbnailOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.overlayDark06,
    padding: 8,
  },
  featuredTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: colors.white,
    marginBottom: 2,
  },
  featuredTutor: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: colors.white,
  },
  categoriesScroll: {
    paddingLeft: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginRight: 8,
  },
  activeCategoryChip: {
    backgroundColor: colors.blueAlt,
    borderColor: colors.blueAlt,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: colors.textTertiary,
  },
  activeCategoryText: {
    color: colors.white,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundGrey,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  videoThumbnail: {
    position: 'relative',
    marginRight: 12,
  },
  cardThumbnailImage: {
    width: 120,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlayDark03,
    borderRadius: 8,
  },
  playIcon: {
    fontSize: 16,
    color: colors.white,
    fontFamily: theme.fonts.bold,
  },
  resumeButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: colors.blueAlt,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  resumeText: {
    fontSize: 10,
    fontFamily: theme.fonts.bold,
    color: colors.white,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: colors.textDark,
    marginBottom: 4,
  },
  videoTutor: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: colors.textTertiary,
    marginBottom: 4,
  },
  videoDuration: {
    fontSize: 13,
    fontFamily: theme.fonts.regular,
    color: colors.textTertiary,
    marginBottom: 8,
  },
  lastWatched: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: colors.textDisabled,
    marginBottom: 4,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 3,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.blueAlt,
    borderRadius: 2,
  },
  watchButton: {
    backgroundColor: colors.blueAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  watchButtonText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: colors.white,
  },
}), [colors]);
  const navigation = useNavigation();

  const featuredVideos = [
    {
      id: 1,
      title: 'Organic Chemistry: Alkanes',
      tutor: 'Dr. Sana Rahman',
      duration: '45 min',
      thumbnail: require('../assets/images/mathematics.webp'),
      isNew: true,
    },
    {
      id: 2,
      title: 'Physics: Newton\'s Laws',
      tutor: 'Prof. Rahul Menon',
      duration: '38 min',
      thumbnail: require('../assets/images/mathematics.webp'),
      isNew: false,
    },
  ];

  const allVideos = [
    {
      id: 1,
      title: 'Mathematics: Calculus Integration',
      tutor: 'Dr. Priya Sharma',
      duration: '52 min',
      uploadDate: 'Oct 18',
      thumbnail: require('../assets/images/mathematics.webp'),
    },
    {
      id: 2,
      title: 'Biology: Cell Division Process',
      tutor: 'Dr. Kumar Nair',
      duration: '41 min',
      uploadDate: 'Oct 15',
      thumbnail: require('../assets/images/mathematics.webp'),
    },
    {
      id: 3,
      title: 'History: Mughal Empire',
      tutor: 'Prof. Sarah Joseph',
      duration: '35 min',
      uploadDate: 'Oct 12',
      thumbnail: require('../assets/images/mathematics.webp'),
    },
  ];

  const recentlyWatched = [
    {
      id: 1,
      title: 'English Grammar Basics',
      tutor: 'Ms. Priya',
      progress: 0.6,
      lastWatched: '2 days ago',
      thumbnail: require('../assets/images/mathematics.webp'),
    },
  ];

  const categories = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'History'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recorded Videos</Text>
        <TouchableOpacity style={styles.searchButton}>
          <SearchIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Classes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredVideos.map((video) => (
              <TouchableOpacity key={video.id} style={styles.featuredCard}>
                <View style={styles.featuredThumbnail}>
                  <Image source={video.thumbnail} style={styles.thumbnailImage} />
                  {video.isNew && (
                    <View style={styles.newBadge}>
                      <Text style={styles.newText}>NEW</Text>
                    </View>
                  )}
                  <View style={styles.thumbnailOverlay}>
                    <Text style={styles.featuredTitle}>{video.title}</Text>
                    <Text style={styles.featuredTutor}>{video.tutor}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category}
                style={[styles.categoryChip, index === 0 && styles.activeCategoryChip]}
              >
                <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {recentlyWatched.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Continue Watching</Text>
            {recentlyWatched.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.videoCard}
                onPress={() => navigation.navigate('VideoPlayer', { video })}
              >
                <View style={styles.videoThumbnail}>
                  <Image source={video.thumbnail} style={styles.cardThumbnailImage} />
                  <View style={styles.resumeButton}>
                    <Text style={styles.resumeText}>Resume</Text>
                  </View>
                </View>
                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <Text style={styles.videoTutor}>By {video.tutor}</Text>
                  <Text style={styles.lastWatched}>Last watched {video.lastWatched}</Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${video.progress * 100}%` }]} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Recorded Videos</Text>
          {allVideos.map((video) => (
            <View key={video.id} style={styles.videoCard}>
              <View style={styles.videoThumbnail}>
                <Image source={video.thumbnail} style={styles.cardThumbnailImage} />
                <View style={styles.playOverlay}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoTutor}>By {video.tutor}</Text>
                <Text style={styles.videoDuration}>{video.duration} • Uploaded: {video.uploadDate}</Text>
                <TouchableOpacity
                  style={styles.watchButton}
                  onPress={() => navigation.navigate('VideoPlayer', { video })}
                >
                  <Text style={styles.watchButtonText}>Watch Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};


export default RecordedVideosScreen;
