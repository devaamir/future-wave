import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  BackHandler,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackArrowIcon, PlayIcon, BackwardIcon, ForwardIcon, PauseIcon, ExpandIcon, CompressIcon, VolumeMaxIcon, VolumeXMarkIcon } from '../components/Icons';
import { theme } from '../theme';

const VideoPlayerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  const [shouldSeek, setShouldSeek] = useState(false);
  const savedTimeRef = useRef(0);

  const videoUrl =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  useEffect(() => {
    const onChange = result => {
      // Save current time before orientation change
      if (currentTime > 0) {
        savedTimeRef.current = currentTime;
        setShouldSeek(true);
      }
      
      setScreenData(result.window);
      setIsLandscape(result.window.width > result.window.height);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, [currentTime]);

  useEffect(() => {
    const backAction = () => {
      if (isLandscape) {
        Orientation.lockToPortrait();
        return true; // Prevent default back action
      }
      return false; // Allow default back action
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [isLandscape]);

  useEffect(() => {
    // Show controls for 7 seconds on mount
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 7000);

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const dynamicStyles = StyleSheet.create({
    videoPlayer: {
      width: screenData.width,
      height: screenData.width * 0.56,
      backgroundColor: '#000000',
    },
  });

  const videoData = {
    title: 'Mathematics: Calculus Integration',
    tutor: 'Dr. Priya Sharma',
    duration: '52 min',
    description:
      'Learn the fundamentals of calculus integration with step-by-step examples and practice problems.',
    uploadDate: 'Oct 18, 2024',
  };

  const relatedVideos = [
    {
      id: 1,
      title: 'Calculus: Differentiation Basics',
      tutor: 'Dr. Priya Sharma',
      duration: '45 min',
      thumbnail: require('../assets/images/mathematics.webp'),
    },
    {
      id: 2,
      title: 'Advanced Integration Techniques',
      tutor: 'Prof. Kumar',
      duration: '38 min',
      thumbnail: require('../assets/images/mathematics.webp'),
    },
  ];

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleVideoPress = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 7000);
  };

  const onSeek = progress => {
    const seekTime = progress * duration;
    videoRef.current?.seek(seekTime);
  };

  const skipForward = () => {
    const newTime = Math.min(currentTime + 10, duration);
    videoRef.current?.seek(newTime);
  };

  const skipBackward = () => {
    const newTime = Math.max(currentTime - 10, 0);
    videoRef.current?.seek(newTime);
  };

  const handleBackPress = () => {
    if (isLandscape) {
      Orientation.lockToPortrait();
    } else {
      navigation.goBack();
    }
  };

  const toggleOrientation = () => {
    if (isLandscape) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
  };

  if (isLandscape) {
    return (
      <View style={styles.landscapeContainer}>
        <TouchableOpacity
          style={styles.landscapeVideoWrapper}
          onPress={handleVideoPress}
          activeOpacity={1}
        >
          <Video
            ref={videoRef}
            source={{ uri: videoUrl }}
            style={styles.landscapeVideoPlayer}
            controls={false}
            paused={paused}
            muted={muted}
            resizeMode="contain"
            onLoad={data => {
              setDuration(data.duration);
              if (shouldSeek && savedTimeRef.current > 0) {
                setTimeout(() => {
                  videoRef.current?.seek(savedTimeRef.current);
                  setShouldSeek(false);
                }, 100);
              }
            }}
            onProgress={data => setCurrentTime(data.currentTime)}
            onError={error => console.log('Video Error:', error)}
          />

          <View
            style={[
              styles.landscapeControlsOverlay,
              {
                backgroundColor: showControls
                  ? 'rgba(0,0,0,0.3)'
                  : 'transparent',
              },
            ]}
          >
            <TouchableOpacity
              style={styles.landscapeBackButton}
              onPress={handleBackPress}
            >
              <BackArrowIcon size={20} color="#FFFFFF" />
            </TouchableOpacity>



            <View style={styles.landscapeCenterControls}>
              <TouchableOpacity
                style={styles.skipButton}
                onPress={skipBackward}
              >
                <ForwardIcon size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.playButton}
                onPress={togglePlayPause}
              >
                {paused ? <PlayIcon size={32} color="#FFFFFF" /> : <PauseIcon size={32} color="#FFFFFF" />}
              </TouchableOpacity>

              <TouchableOpacity style={styles.skipButton} onPress={skipForward}>
                <ForwardIcon size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.landscapeBottomControls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={toggleMute}
              >
                {muted ? <VolumeXMarkIcon size={16} color="#FFFFFF" /> : <VolumeMaxIcon size={16} color="#FFFFFF" />}
              </TouchableOpacity>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <TouchableOpacity
                style={styles.landscapeProgressBar}
                onPress={e => {
                  const { locationX } = e.nativeEvent;
                  const progress = locationX / (screenData.width - 120);
                  onSeek(progress);
                }}
              >
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${
                          duration > 0 ? (currentTime / duration) * 100 : 0
                        }%`,
                      },
                    ]}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={toggleOrientation}
              >
                <CompressIcon size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <BackArrowIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.placeholder} />
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.videoContainer}>
          <TouchableOpacity
            style={styles.videoWrapper}
            onPress={handleVideoPress}
            activeOpacity={1}
          >
            <Video
              ref={videoRef}
              source={{ uri: videoUrl }}
              style={dynamicStyles.videoPlayer}
              controls={false}
              paused={paused}
              muted={muted}
              resizeMode="contain"
              onLoad={data => {
                setDuration(data.duration);
                if (shouldSeek && savedTimeRef.current > 0) {
                  setTimeout(() => {
                    videoRef.current?.seek(savedTimeRef.current);
                    setShouldSeek(false);
                  }, 100);
                }
              }}
              onProgress={data => setCurrentTime(data.currentTime)}
              onError={error => console.log('Video Error:', error)}
            />

            {showControls && (
              <View style={styles.controlsOverlay}>
                <View style={styles.centerControls}>
                  <TouchableOpacity
                    style={styles.skipButton}
                    onPress={skipBackward}
                  >
                    <ForwardIcon size={24} color="#FFFFFF" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={togglePlayPause}
                  >
                    {paused ? <PlayIcon size={32} color="#FFFFFF" /> : <PauseIcon size={32} color="#FFFFFF" />}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.skipButton}
                    onPress={skipForward}
                  >
                    <ForwardIcon size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.customControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleMute}
            >
              {muted ? <VolumeXMarkIcon size={16} color="#FFFFFF" /> : <VolumeMaxIcon size={16} color="#FFFFFF" />}
            </TouchableOpacity>

            <View style={styles.progressSection}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>

              <TouchableOpacity
                style={styles.progressBarContainer}
                onPress={e => {
                  const { locationX } = e.nativeEvent;
                  const progress = locationX / (screenData.width - 120);
                  onSeek(progress);
                }}
              >
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${
                          duration > 0 ? (currentTime / duration) * 100 : 0
                        }%`,
                      },
                    ]}
                  />
                </View>
              </TouchableOpacity>

              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleOrientation}
            >
              <ExpandIcon size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{videoData.title}</Text>
          <Text style={styles.tutorName}>By {videoData.tutor}</Text>
          <Text style={styles.videoMeta}>
            {videoData.duration} • Uploaded: {videoData.uploadDate}
          </Text>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{videoData.description}</Text>
        </View>

        <View style={styles.relatedSection}>
          <Text style={styles.sectionTitle}>Related Videos</Text>
          {relatedVideos.map(video => (
            <TouchableOpacity key={video.id} style={styles.relatedCard}>
              <View style={styles.relatedThumbnail}>
                <Image 
                  source={video.thumbnail} 
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
                <View style={styles.playOverlay}>
                  <PlayIcon size={16} color="#FFFFFF" />
                </View>
              </View>
              <View style={styles.relatedInfo}>
                <Text style={styles.relatedTitle}>{video.title}</Text>
                <Text style={styles.relatedTutor}>By {video.tutor}</Text>
                <Text style={styles.relatedDuration}>{video.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  videoContainer: {
    backgroundColor: '#000000',
  },
  videoWrapper: {
    position: 'relative',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: theme.fonts.bold,
  },
  customControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: theme.fonts.bold,
  },
  progressSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0056FF',
    borderRadius: 2,
  },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  skipIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: theme.fonts.bold,
  },
  landscapeContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  landscapeVideoWrapper: {
    flex: 1,
    position: 'relative',
  },
  landscapeVideoPlayer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  landscapeControlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  landscapeBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  landscapeCenterControls: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -120 }, { translateY: -30 }],
    flexDirection: 'row',
    alignItems: 'center',
  },
  landscapeBottomControls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  landscapeProgressBar: {
    flex: 1,
    marginHorizontal: 12,
  },
  timeText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#FFFFFF',
    minWidth: 40,
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 8,
  },
  tutorName: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#6B7280',
    marginBottom: 4,
  },
  videoMeta: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#2D2D2D',
  },
  descriptionSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    lineHeight: 20,
  },
  relatedSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  relatedCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  relatedThumbnail: {
    width: 60,
    height: 45,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
  },
  playIconSmall: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: theme.fonts.bold,
  },
  relatedInfo: {
    flex: 1,
  },
  relatedTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  relatedTutor: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    marginBottom: 2,
  },
  relatedDuration: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#9CA3AF',
  },
});

export default VideoPlayerScreen;
