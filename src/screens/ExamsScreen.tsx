import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../theme';

const ExamsScreen = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const upcomingExams = [
    {
      id: 1,
      title: 'Kerala PSC Mock Test 01',
      subject: 'General Studies',
      date: 'Sep 30',
      time: '7:00 PM',
      duration: '60 mins',
    },
    {
      id: 2,
      title: 'SSC CGL Full Mock 02',
      subject: 'Quantitative Aptitude',
      date: 'Oct 2',
      time: '10:00 AM',
      duration: '90 mins',
    },
  ];

  const ongoingExams = [
    {
      id: 1,
      title: 'NEET Biology Practice Test',
      timeRemaining: '45:20',
      questions: '100 MCQs',
      type: 'Practice Test',
    },
  ];

  const results = [
    {
      id: 1,
      title: 'SSC CGL Full Mock 02',
      date: 'Sep 24, 2024',
      score: '72/100',
      percentage: 72,
      status: 'Passed',
    },
    {
      id: 2,
      title: 'Kerala PSC Prelims Mock',
      date: 'Sep 20, 2024',
      score: '45/100',
      percentage: 45,
      status: 'Failed',
    },
  ];

  const renderUpcoming = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Upcoming Exams</Text>
      {upcomingExams.map((exam) => (
        <View key={exam.id} style={styles.card}>
          <Text style={styles.examTitle}>{exam.title}</Text>
          <Text style={styles.examSubject}>{exam.subject}</Text>
          <View style={styles.examDetails}>
            <Text style={styles.examInfo}>📅 {exam.date}, {exam.time}</Text>
            <Text style={styles.examInfo}>⏱ {exam.duration}</Text>
          </View>
          <LinearGradient
            colors={['#00C6A7', '#2EB5E5']}
            style={styles.primaryButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity style={styles.buttonContent}>
              <Text style={styles.primaryButtonText}>Register</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      ))}
    </View>
  );

  const renderOngoing = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Ongoing Exams</Text>
      {ongoingExams.map((exam) => (
        <View key={exam.id} style={styles.card}>
          <Text style={[styles.examTitle, { color: '#1A3C8E' }]}>{exam.title}</Text>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>⏱ {exam.timeRemaining} remaining</Text>
          </View>
          <Text style={styles.examInfo}>{exam.questions}</Text>
          <LinearGradient
            colors={['#00C6A7', '#2EB5E5']}
            style={styles.primaryButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity style={styles.buttonContent}>
              <Text style={styles.primaryButtonText}>Start Exam</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      ))}
    </View>
  );

  const renderResults = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Your Results</Text>
      {results.map((result) => (
        <View key={result.id} style={styles.card}>
          <Text style={styles.examTitle}>{result.title}</Text>
          <Text style={styles.examInfo}>Attempted on {result.date}</Text>
          <View style={styles.resultRow}>
            <Text style={styles.scoreText}>Score: {result.score}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: result.status === 'Passed' ? '#2ECC71' : '#E74C3C' }
            ]}>
              <Text style={styles.statusText}>
                {result.status === 'Passed' ? '✅ Passed' : '❌ Failed'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>View Report</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Upcoming':
        return renderUpcoming();
      case 'Ongoing':
        return renderOngoing();
      case 'Results':
        return renderResults();
      default:
        return renderUpcoming();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Exams</Text>
        <TouchableOpacity style={styles.analyticsIcon}>
          <Text style={styles.analyticsText}>📊</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Upcoming', 'Ongoing', 'Results'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
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
  analyticsIcon: {
    padding: 8,
  },
  analyticsText: {
    fontSize: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#1A3C8E',
  },
  tabText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#1A3C8E',
    fontFamily: theme.fonts.bold,
  },
  content: {
    flex: 1,
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  examTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  examSubject: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    marginBottom: 8,
  },
  examDetails: {
    marginBottom: 16,
  },
  examInfo: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    marginBottom: 4,
  },
  timerContainer: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#D97706',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreText: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  primaryButton: {
    borderRadius: 8,
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#1A3C8E',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#1A3C8E',
  },
});

export default ExamsScreen;
