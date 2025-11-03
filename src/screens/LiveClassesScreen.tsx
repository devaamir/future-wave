import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { PlayIcon } from '../components/Icons';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

const LiveClassesScreen = () => {
  const navigation = useNavigation();
  
  const upcomingClasses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      teacher: 'Dr. Sarah Johnson',
      subject: 'Calculus',
      date: 'Today',
      time: '3:00 PM',
      scheduledTime: new Date('2025-11-03T15:00:00+05:30'),
      thumbnail: require('../assets/images/maths_thumb.png'),
      avatar: require('../assets/images/logo-icon.png'),
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      teacher: 'Prof. Mike Chen',
      subject: 'Mechanics',
      date: 'Tomorrow',
      time: '10:00 AM',
      scheduledTime: new Date('2025-11-04T10:00:00+05:30'),
      thumbnail: require('../assets/images/physics_thumb.png'),
      avatar: require('../assets/images/logo-icon.png'),
    },
    {
      id: 3,
      title: 'Chemistry Lab Session',
      teacher: 'Dr. Emily Davis',
      subject: 'Organic Chemistry',
      date: 'Sep 28',
      time: '2:00 PM',
      scheduledTime: new Date('2025-11-05T14:00:00+05:30'),
      thumbnail: require('../assets/images/kpsc_thumb.png'),
      avatar: require('../assets/images/logo-icon.png'),
    },
  ];

  const handleSetReminder = (classItem: any) => {
    navigation.navigate('ClassReminder', { classData: classItem });
  };

  const pastSessions = [
    {
      id: 1,
      title: 'Algebra Basics',
      thumbnail: require('../assets/images/mathematics.webp'),
    },
    {
      id: 2,
      title: 'Physics Laws',
      thumbnail: require('../assets/images/mathematics.webp'),
    },
    {
      id: 3,
      title: 'Chemistry Bonds',
      thumbnail: require('../assets/images/mathematics.webp'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Classes</Text>
        <TouchableOpacity style={styles.calendarIcon}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path
              d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
              stroke="#1A3C8E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Ongoing Live Class */}
        <View style={styles.liveSection}>
          <ImageBackground
            source={require('../assets/images/live_screen.png')}
            style={styles.liveCard}
            imageStyle={styles.liveCardImage}
          >
            <View style={styles.liveOverlay}>
              <View style={styles.liveBadge}>
                <View style={styles.redDot} />
                <Text style={styles.liveText}>LIVE Now</Text>
              </View>

              <LinearGradient
                colors={['#00C6A7', '#2EB5E5']}
                style={styles.joinButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <TouchableOpacity 
                  style={styles.joinButtonContent}
                  onPress={() => navigation.navigate('LiveClassJoin')}
                >
                  <Text style={styles.joinButtonText}>Join Now</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ImageBackground>
        </View>

        {/* Upcoming Classes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Sessions</Text>

          {upcomingClasses.map(classItem => (
            <View key={classItem.id} style={styles.classCard}>
              <Image source={classItem.avatar} style={styles.teacherAvatar} />

              <View style={styles.classInfo}>
                <Text style={styles.classTitle}>{classItem.title}</Text>
                <Text style={styles.teacherName}>
                  {classItem.teacher} • {classItem.subject}
                </Text>
                <Text style={styles.classTime}>
                  {classItem.date} at {classItem.time}
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.reminderButton}
                onPress={() => handleSetReminder(classItem)}
              >
                <Text style={styles.reminderText}>Set Reminder</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Past Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Watch Recordings</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.recordingsScroll}
          >
            {pastSessions.map(session => (
              <TouchableOpacity 
                key={session.id} 
                style={styles.recordingCard}
                onPress={() => navigation.navigate('VideoPlayer', { 
                  videoTitle: session.title,
                  videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
                })}
              >
                <View style={styles.recordingThumbnail}>
                  <Image
                    source={session.thumbnail}
                    style={styles.thumbnailImage}
                  />
                  <View style={styles.playOverlay}>
                    <View style={styles.playButton}>
                      <PlayIcon size={24} color="#FFFFFF" />
                    </View>
                  </View>
                </View>
                <Text style={styles.recordingTitle}>{session.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
  },
  calendarIcon: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  liveSection: {
    padding: 16,
  },
  liveCard: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  liveCardImage: {
    borderRadius: 16,
    transform: [{ scaleX: 1.1 }, { scaleY: 1.2 }],
  },
  liveOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 16,
    justifyContent: 'space-between',
  },
  liveBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E53935',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: theme.fonts.bold,
  },
  liveInfo: {
    alignItems: 'flex-start',
  },
  liveTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  liveTeacher: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  joinButton: {
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  joinButtonContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: theme.fonts.bold,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 16,
  },
  classCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teacherAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  classInfo: {
    flex: 1,
  },
  classTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  teacherName: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    marginBottom: 2,
  },
  classTime: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
  },
  reminderButton: {
    borderWidth: 1,
    borderColor: '#1A3C8E',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  reminderText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#1A3C8E',
  },
  recordingsScroll: {
    marginLeft: -16,
    paddingLeft: 16,
  },
  recordingCard: {
    marginRight: 12,
    width: 120,
  },
  recordingThumbnail: {
    position: 'relative',
    marginBottom: 8,
  },
  thumbnailImage: {
    width: 120,
    height: 80,
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    textAlign: 'center',
  },
});

export default LiveClassesScreen;
