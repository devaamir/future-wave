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
import { theme } from '../theme';

const LiveClassesScreen = () => {
  const upcomingClasses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      teacher: 'Dr. Sarah Johnson',
      subject: 'Calculus',
      date: 'Today',
      time: '3:00 PM',
      avatar: require('../assets/images/logo-icon.png'),
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      teacher: 'Prof. Mike Chen',
      subject: 'Mechanics',
      date: 'Tomorrow',
      time: '10:00 AM',
      avatar: require('../assets/images/logo-icon.png'),
    },
    {
      id: 3,
      title: 'Chemistry Lab Session',
      teacher: 'Dr. Emily Davis',
      subject: 'Organic Chemistry',
      date: 'Sep 28',
      time: '2:00 PM',
      avatar: require('../assets/images/logo-icon.png'),
    },
  ];

  const pastSessions = [
    { id: 1, title: 'Algebra Basics', thumbnail: require('../assets/images/logo-icon.png') },
    { id: 2, title: 'Physics Laws', thumbnail: require('../assets/images/logo-icon.png') },
    { id: 3, title: 'Chemistry Bonds', thumbnail: require('../assets/images/logo-icon.png') },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Classes</Text>
        <TouchableOpacity style={styles.calendarIcon}>
          <Text style={styles.calendarText}>📅</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Ongoing Live Class */}
        <View style={styles.liveSection}>
          <ImageBackground
            source={require('../assets/images/logo.png')}
            style={styles.liveCard}
            imageStyle={styles.liveCardImage}
          >
            <View style={styles.liveOverlay}>
              <View style={styles.liveBadge}>
                <Text style={styles.liveText}>🔴 LIVE Now</Text>
              </View>
              
              <View style={styles.liveInfo}>
                <Text style={styles.liveTitle}>Introduction to React Native</Text>
                <Text style={styles.liveTeacher}>Prof. John Smith</Text>
                
                <LinearGradient
                  colors={['#00C6A7', '#2EB5E5']}
                  style={styles.joinButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <TouchableOpacity style={styles.joinButtonContent}>
                    <Text style={styles.joinButtonText}>Join Now</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Upcoming Classes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
          
          {upcomingClasses.map((classItem) => (
            <View key={classItem.id} style={styles.classCard}>
              <Image source={classItem.avatar} style={styles.teacherAvatar} />
              
              <View style={styles.classInfo}>
                <Text style={styles.classTitle}>{classItem.title}</Text>
                <Text style={styles.teacherName}>{classItem.teacher} • {classItem.subject}</Text>
                <Text style={styles.classTime}>{classItem.date} at {classItem.time}</Text>
              </View>
              
              <TouchableOpacity style={styles.reminderButton}>
                <Text style={styles.reminderText}>Set Reminder</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Past Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Watch Recordings</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recordingsScroll}>
            {pastSessions.map((session) => (
              <TouchableOpacity key={session.id} style={styles.recordingCard}>
                <View style={styles.recordingThumbnail}>
                  <Image source={session.thumbnail} style={styles.thumbnailImage} />
                  <View style={styles.playOverlay}>
                    <Text style={styles.playIcon}>▶️</Text>
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
    fontSize: 22,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
  },
  calendarIcon: {
    padding: 8,
  },
  calendarText: {
    fontSize: 20,
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
  },
  liveOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    justifyContent: 'space-between',
  },
  liveBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E53935',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
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
  playIcon: {
    fontSize: 24,
  },
  recordingTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    textAlign: 'center',
  },
});

export default LiveClassesScreen;
