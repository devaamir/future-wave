import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme, buttonStyles, buttonColors, useColors } from '../theme';
import { ClockIcon, PlayIcon, BackArrowIcon } from '../components/Icons';

const MyCoursesScreen = ({ navigation }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceAlt,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: colors.textBody,
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
  courseCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.blackShort,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: colors.textBody,
    marginBottom: 4,
  },
  teacherName: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: colors.textMuted,
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.borderSlate,
    borderRadius: 3,
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: colors.textMuted,
  },
  lessonInfo: {
    marginBottom: 16,
  },
  lessonText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: colors.textMuted,
  },
}), [colors]);
  const enrolledCourses = [
    {
      id: '1',
      title: 'Kerala PSC Prelims 2025 Crash Course',
      teacher: 'Dr. Nair',
      progress: 65,
      totalLessons: 45,
      completedLessons: 29,
      thumbnail: require('../assets/images/kpsc_thumb.png'),
    },
    {
      id: '2',
      title: 'SSC CGL Complete Maths Batch',
      teacher: 'Prof. Sharma',
      progress: 40,
      totalLessons: 60,
      completedLessons: 24,
      thumbnail: require('../assets/images/maths_thumb.png'),
    },
    {
      id: '3',
      title: 'NEET Physics Fundamentals',
      teacher: 'Dr. Priya Menon',
      progress: 85,
      totalLessons: 30,
      completedLessons: 26,
      thumbnail: require('../assets/images/physics_thumb.png'),
    },
  ];

  const renderCourseCard = (course: any) => (
    <View key={course.id} style={styles.courseCard}>
      <Image source={course.thumbnail} style={styles.thumbnail} />
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.teacherName}>by {course.teacher}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{course.progress}% completed</Text>
        </View>
        
        <View style={styles.lessonInfo}>
          <Text style={styles.lessonText}>
            {course.completedLessons}/{course.totalLessons} lessons
          </Text>
        </View>
        
        <LinearGradient
          colors={buttonColors.primary}
          style={buttonStyles.primaryGradient}
          start={buttonStyles.primaryGradientStart}
          end={buttonStyles.primaryGradientEnd}
        >
          <TouchableOpacity style={buttonStyles.buttonContent}>
            <Text style={buttonStyles.buttonText}>Continue Learning</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrowIcon size={24} color={colors.textBody} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Courses</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enrolled Courses ({enrolledCourses.length})</Text>
          {enrolledCourses.map(renderCourseCard)}
        </View>
      </ScrollView>
    </View>
  );
};


export default MyCoursesScreen;
