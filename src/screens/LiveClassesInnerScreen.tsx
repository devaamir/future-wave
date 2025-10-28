import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BackArrowIcon, NotificationIcon, CalendarIcon, ClockIcon } from '../components/Icons';
import { theme } from '../theme';

const LiveClassesInnerScreen = ({ navigation }: any) => {
  const todaySessions = [
    {
      id: 1,
      title: 'Physics – Motion in One Dimension',
      tutor: 'Dr. Sarah Johnson',
      time: 'Today, 6:30 PM',
      status: 'live',
      thumbnail: require('../assets/images/physics_thumb.png'),
    },
    {
      id: 2,
      title: 'Mathematics – Calculus Basics',
      tutor: 'Prof. Kumar',
      time: 'Today, 8:00 PM',
      status: 'starting_soon',
      thumbnail: require('../assets/images/maths_thumb.png'),
    },
  ];

  const recommendedSessions = [
    {
      id: 3,
      title: 'Kerala PSC General Studies',
      tutor: 'Dr. Nair',
      time: 'Tomorrow, 7:00 PM',
      status: 'upcoming',
      thumbnail: require('../assets/images/kpsc_thumb.png'),
    },
    {
      id: 4,
      title: 'NEET Biology Revision',
      tutor: 'Dr. Priya',
      time: 'Tomorrow, 9:00 AM',
      status: 'upcoming',
      thumbnail: require('../assets/images/physics_thumb.png'),
    },
  ];

  const renderSessionCard = (session: any) => (
    <View key={session.id} style={styles.sessionCard}>
      <Image source={session.thumbnail} style={styles.teacherAvatar} />
      <View style={styles.sessionInfo}>
        <Text style={styles.sessionTitle}>{session.title}</Text>
        <Text style={styles.tutorName}>{session.tutor}</Text>
        <View style={styles.timeRow}>
          <ClockIcon size={14} color="#6B7280" />
          <Text style={styles.sessionTime}>{session.time}</Text>
        </View>
      </View>
      <View style={styles.sessionActions}>
        {session.status === 'live' ? (
          <View style={styles.liveIndicator}>
            <View style={styles.redDot} />
            <Text style={styles.liveText}>LIVE Now</Text>
          </View>
        ) : session.status === 'starting_soon' ? (
          <View style={styles.soonIndicator}>
            <ClockIcon size={12} color="#F59E0B" />
            <Text style={styles.soonText}>Starting Soon</Text>
          </View>
        ) : null}
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
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Classes</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <NotificationIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Today</Text>
          {todaySessions.map(renderSessionCard)}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recommendedSessions.map(session => (
              <View key={session.id} style={styles.recommendedCard}>
                <Image source={session.thumbnail} style={styles.recommendedThumbnail} />
                <Text style={styles.recommendedTitle}>{session.title}</Text>
                <Text style={styles.recommendedTutor}>{session.tutor}</Text>
                <Text style={styles.recommendedTime}>{session.time}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity 
          style={styles.fullScheduleButton}
          onPress={() => navigation.navigate('LiveClasses')}
        >
          <Text style={styles.fullScheduleText}>See Full Schedule →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
  },
  notificationButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 16,
  },
  sessionCard: {
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
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  tutorName: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    marginBottom: 2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionTime: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    marginLeft: 4,
  },
  sessionActions: {
    alignItems: 'flex-end',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: '#EF4444',
  },
  soonIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  soonText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#F59E0B',
    marginLeft: 4,
  },
  joinButton: {
    borderRadius: 8,
  },
  joinButtonContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  joinButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  recommendedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    width: 160,
    shadowColor: '#E5E7EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendedThumbnail: {
    width: '100%',
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  recommendedTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  recommendedTutor: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    marginBottom: 2,
  },
  recommendedTime: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#0056FF',
  },
  fullScheduleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginVertical: 24,
    shadowColor: '#E5E7EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fullScheduleText: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#0056FF',
  },
});

export default LiveClassesInnerScreen;
