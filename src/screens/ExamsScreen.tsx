import React, { useState, useMemo } from 'react';
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
import { theme, buttonStyles, buttonColors, useColors } from '../theme';

const { width } = Dimensions.get('window');

const ExamsScreen = () => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceAlt,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: colors.textBody,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIcon: {
    padding: 8,
  },
  tabContainer: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceAlt,
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
    borderColor: colors.borderSlate,
    backgroundColor: colors.white,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: colors.textMuted,
  },
  activeFilterChipText: {
    color: colors.white,
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
    color: colors.textBody,
    marginBottom: 16,
  },
  examCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.blackShort,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  ongoingCard: {
    borderWidth: 2,
    borderColor: colors.primary,
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
    color: colors.textBody,
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
    color: colors.textMuted,
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
    color: colors.white,
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
    backgroundColor: colors.amberBgPale,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  timerText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: colors.amberDark,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.borderSlate,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: colors.textMuted,
  },
  questionsText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: colors.textMuted,
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
    color: colors.textMuted,
    marginTop: 4,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greenBgPale,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  completedText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: colors.emerald,
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
    color: colors.textBody,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: colors.white,
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
    color: colors.textBody,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
}), [colors]);
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
      color: colors.slate,
    },
    {
      id: 2,
      title: 'Mathematics Mock Test',
      subject: 'Mathematics',
      date: 'Nov 7',
      time: '2:00 PM – 3:30 PM',
      duration: '90 mins',
      thumbnail: require('../assets/images/maths_thumb.png'),
      color: colors.successGreen,
    },
    {
      id: 3,
      title: 'General Knowledge Quiz',
      subject: 'General Studies',
      date: 'Nov 10',
      time: '9:00 AM – 10:00 AM',
      duration: '1 Hour',
      thumbnail: require('../assets/images/kpsc_thumb.png'),
      color: colors.orangeAlt,
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
                <CalendarIcon size={14} color={colors.textTertiary} />
                <Text style={styles.examDetail}>
                  {exam.date}, {exam.time}
                </Text>
              </View>
              <View style={styles.examDetailsRow}>
                <ClockIcon size={14} color={colors.textTertiary} />
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
                <ClockIcon size={14} color={colors.amberDark} />
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
                <TickIcon size={12} color={colors.emerald} />
                <Text style={styles.completedText}>Completed</Text>
              </View>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Score: {exam.score}%</Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: exam.score >= 50 ? colors.successGreen : colors.error },
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
            <CalendarIcon size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <NotificationIcon size={24} color={colors.primary} />
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
          <CalendarIcon size={24} color={colors.white} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};


export default ExamsScreen;
