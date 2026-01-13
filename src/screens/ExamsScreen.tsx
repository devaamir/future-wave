import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  CalendarIcon,
  NotificationIcon,
  SearchIcon,
  ClockIcon,
  TickIcon,
} from '../components/Icons';
import { theme, buttonStyles, buttonColors } from '../theme';

const { width } = Dimensions.get('window');

const ExamsScreen = () => {
  const [activeTab, setActiveTab] = useState('All');

  const upcomingExams = [
    {
      id: 1,
      title: 'Physics – Chapter 3 Test',
      subject: 'Physics',
      date: 'Nov 5',
      time: '10:00 AM – 11:00 AM',
      duration: '1 Hour',
      thumbnail: require('../assets/images/physics_thumb.png'),
      color: '#3B82F6',
    },
    {
      id: 2,
      title: 'Mathematics Mock Test',
      subject: 'Mathematics',
      date: 'Nov 7',
      time: '2:00 PM – 3:30 PM',
      duration: '90 mins',
      thumbnail: require('../assets/images/maths_thumb.png'),
      color: '#10B981',
    },
    {
      id: 3,
      title: 'General Knowledge Quiz',
      subject: 'General Studies',
      date: 'Nov 10',
      time: '9:00 AM – 10:00 AM',
      duration: '1 Hour',
      thumbnail: require('../assets/images/kpsc_thumb.png'),
      color: '#F59E0B',
    },
  ];

  const ongoingExams = [
    {
      id: 1,
      title: 'General Knowledge Mock Test',
      timeRemaining: '25:30',
      progress: 65,
      questions: '30 Questions',
      completed: 19,
      total: 30,
    },
  ];

  const completedExams = [
    {
      id: 1,
      title: 'Chemistry Unit Test',
      date: 'Oct 28',
      score: 85,
      status: 'Passed',
    },
    {
      id: 2,
      title: 'Biology Mock Exam',
      date: 'Oct 25',
      score: 92,
      status: 'Passed',
    },
    {
      id: 3,
      title: 'History Quiz',
      date: 'Oct 20',
      score: 45,
      status: 'Failed',
    },
  ];

  const renderUpcoming = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Upcoming Exams</Text>
      {upcomingExams.map(exam => (
        <View key={exam.id} style={styles.examCard}>
          <View style={styles.cardContent}>
            <View style={styles.thumbnailContainer}>
              <Image
                source={exam.thumbnail}
                style={styles.examThumbnail}
                resizeMode="cover"
              />
            </View>
            <View style={styles.examInfo}>
              <Text style={styles.examTitle}>{exam.title}</Text>
              <View style={styles.examDetailsRow}>
                <CalendarIcon size={14} color="#6B7280" />
                <Text style={styles.examDetail}>
                  {exam.date}, {exam.time}
                </Text>
              </View>
              <View style={styles.examDetailsRow}>
                <ClockIcon size={14} color="#6B7280" />
                <Text style={styles.examDetail}>{exam.duration}</Text>
              </View>
            </View>
            <LinearGradient
              colors={buttonColors.primary}
              style={buttonStyles.primaryGradient}
              start={buttonStyles.primaryGradientStart}
              end={buttonStyles.primaryGradientEnd}
            >
              <TouchableOpacity style={buttonStyles.buttonContent}>
                <Text style={buttonStyles.buttonText}>Start Soon</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      ))}
    </View>
  );

  const renderOngoing = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Ongoing Exams</Text>
      {ongoingExams.map(exam => (
        <View key={exam.id} style={[styles.examCard, styles.ongoingCard]}>
          <View style={styles.cardContent}>
            <View style={styles.ongoingHeader}>
              <Text style={styles.examTitle}>{exam.title}</Text>
              <View style={styles.timerContainer}>
                <ClockIcon size={14} color="#D97706" />
                <Text style={styles.timerText}>{exam.timeRemaining}</Text>
              </View>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${exam.progress}%` }]}
                />
              </View>
              <Text style={styles.progressText}>
                {exam.progress}% completed
              </Text>
            </View>
            <Text style={styles.questionsText}>
              {exam.completed}/{exam.total} questions answered
            </Text>
            <LinearGradient
              colors={buttonColors.primary}
              style={buttonStyles.primaryGradient}
              start={buttonStyles.primaryGradientStart}
              end={buttonStyles.primaryGradientEnd}
            >
              <TouchableOpacity style={buttonStyles.buttonContent}>
                <Text style={buttonStyles.buttonText}>Resume Test</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      ))}
    </View>
  );

  const renderCompleted = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Completed Exams</Text>
      {completedExams.map(exam => (
        <View key={exam.id} style={[styles.examCard, styles.completedCard]}>
          <View style={styles.cardContent}>
            <View style={styles.completedHeader}>
              <View style={styles.completedInfo}>
                <Text style={styles.examTitle}>{exam.title}</Text>
                <Text style={styles.examDate}>Completed on {exam.date}</Text>
              </View>
              <View style={styles.completedBadge}>
                <TickIcon size={12} color="#16A34A" />
                <Text style={styles.completedText}>Completed</Text>
              </View>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Score: {exam.score}%</Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: exam.score >= 50 ? '#10B981' : '#EF4444' },
                ]}
              >
                <Text style={styles.statusText}>{exam.score >= 50 ? 'Passed' : 'Failed'}</Text>
              </View>
            </View>
            <TouchableOpacity style={buttonStyles.outlinedButton}>
              <Text style={buttonStyles.outlinedButtonText}>View Result</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📝</Text>
      <Text style={styles.emptyTitle}>No Exams Scheduled</Text>
      <Text style={styles.emptySubtext}>
        Stay tuned for upcoming tests and mock exams.
      </Text>
    </View>
  );

  const renderContent = () => {
    const allExams = [...upcomingExams, ...ongoingExams, ...completedExams];

    switch (activeTab) {
      case 'All':
        return (
          <View>
            {ongoingExams.length > 0 && renderOngoing()}
            {upcomingExams.length > 0 && renderUpcoming()}
            {completedExams.length > 0 && renderCompleted()}
            {allExams.length === 0 && renderEmptyState()}
          </View>
        );
      case 'Upcoming':
        return upcomingExams.length > 0 ? renderUpcoming() : renderEmptyState();
      case 'Ongoing':
        return ongoingExams.length > 0 ? renderOngoing() : renderEmptyState();
      case 'Completed':
        return completedExams.length > 0
          ? renderCompleted()
          : renderEmptyState();
      default:
        return renderUpcoming();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exams</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <CalendarIcon size={24} color="#4ECDC4" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <NotificationIcon size={24} color="#4ECDC4" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContainer}
        >
          {['All', 'Upcoming', 'Ongoing', 'Completed'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.filterChip,
                activeTab === tab && styles.activeFilterChip,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  activeTab === tab && styles.activeFilterChipText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>

      {/* Floating Filter Button */}
      <TouchableOpacity style={buttonStyles.floatingButton}>
        <LinearGradient
          colors={buttonColors.primary}
          style={buttonStyles.floatingButtonContent}
          start={buttonStyles.primaryGradientStart}
          end={buttonStyles.primaryGradientEnd}
        >
          <CalendarIcon size={24} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#1E293B',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIcon: {
    padding: 8,
  },
  tabContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tabScrollContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  activeFilterChip: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#64748B',
  },
  activeFilterChipText: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.bold,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#1E293B',
    marginBottom: 16,
  },
  examCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  ongoingCard: {
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  completedCard: {
    opacity: 0.9,
  },
  cardContent: {
    padding: 20,
  },
  thumbnailContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  examThumbnail: {
    width: '100%',
    height: '100%',
  },
  examInfo: {
    flex: 1,
    marginBottom: 16,
  },
  examTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#1E293B',
    marginBottom: 8,
  },
  examDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  examDetail: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#64748B',
    marginLeft: 8,
  },
  startButton: {
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  resumeButton: {
    borderRadius: 12,
    marginTop: 16,
  },
  buttonContent: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  ongoingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  timerText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: '#D97706',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#64748B',
  },
  questionsText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#64748B',
  },
  completedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  completedInfo: {
    flex: 1,
  },
  examDate: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#64748B',
    marginTop: 4,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  completedText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#16A34A',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#1E293B',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ExamsScreen;
