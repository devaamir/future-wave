import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';
import {
  LiveClassIcon,
  RecordedVideosIcon,
  StudyMaterialIcon,
  ExamIcon,
  NotificationIcon,
  SearchIcon,
} from '../components/Icons';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ onTabPress }: any) => {
  const categories = [
    {
      icon: LiveClassIcon,
      title: 'Live Classes',
      onPress: () => onTabPress?.('Live'),
    },
    {
      icon: RecordedVideosIcon,
      title: 'Recorded Videos',
      onPress: () => navigation.navigate('RecordedVideos'),
    },
    {
      icon: StudyMaterialIcon,
      title: 'Study Material',
      onPress: () => navigation.navigate('StudyMaterial'),
    },
    { icon: ExamIcon, title: 'Exams', onPress: () => onTabPress?.('Exams') },
  ];

  const courses = [
    {
      title: 'Kerala PSC Prelims – Crash Batch',
      teacher: 'Dr. Kumar',
      image: require('../assets/images/kpsc_thumb.png'),
    },
    {
      title: 'Maths for SSC CGL',
      teacher: 'Prof. Sharma',
      image: require('../assets/images/maths_thumb.png'),
    },
    {
      title: 'NEET Physics Fundamentals',
      teacher: 'Dr. Patel',
      image: require('../assets/images/physics_thumb.png'),
    },
  ];

  const upcomingClasses = [
    {
      title: 'General Science – Live Test Discussion',
      teacher: 'Dr. Nair',
      time: 'Today, 7:00 PM',
      scheduledTime: new Date('2025-11-03T19:00:00+05:30'), // 7:00 PM today
      thumbnail: require('../assets/images/physics_thumb.png'),
    },
    {
      title: 'English Grammar Basics',
      teacher: 'Ms. Priya',
      time: 'Tomorrow, 6:00 PM',
      scheduledTime: new Date('2025-11-04T18:00:00+05:30'), // 6:00 PM tomorrow
      thumbnail: require('../assets/images/maths_thumb.png'),
    },
  ];

  const navigation = useNavigation();

  const handleSetReminder = (classItem: any) => {
    navigation.navigate('ClassReminder', { classData: classItem });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo-icon.png')}
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Welcome, Aamir!</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.notificationContainer}
          onPress={() => navigation.navigate('Notifications')}
        >
          <NotificationIcon size={24} color="#2D2D2D" />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <SearchIcon size={16} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses, exams, teachers…"
          placeholderTextColor="#6B7280"
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#1A3C8E', '#00C6A7']}
          style={styles.banner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.bannerText}>
            Live PSC Crash Course Starting Tomorrow!
          </Text>
          <LinearGradient
            colors={['#00C6A7', '#2EB5E5']}
            style={styles.enrollButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity
              style={styles.buttonContent}
              onPress={() =>
                navigation.navigate('Enrollment', {
                  courseTitle: 'Kerala PSC Prelims – Crash Batch',
                  coursePrice: '₹499',
                })
              }
            >
              <Text style={styles.enrollButtonText}>Enroll Now</Text>
            </TouchableOpacity>
          </LinearGradient>
        </LinearGradient>

        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.categoryItem}
                activeOpacity={0.7}
                onPress={category.onPress}
              >
                <View style={styles.categoryIcon}>
                  <IconComponent size={32} color="#1A3C8E" />
                </View>
                <Text style={styles.categoryText}>{category.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Courses</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {courses.map((course, index) => (
              <TouchableOpacity
                key={index}
                style={styles.courseCard}
                onPress={() =>
                  navigation.navigate('Enrollment', {
                    courseTitle: course.title,
                    coursePrice: '₹499',
                  })
                }
              >
                <View style={styles.courseImage}>
                  <Image
                    source={course.image}
                    style={styles.courseImageStyle}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseTeacher}>{course.teacher}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Upcoming Classes</Text>
          {upcomingClasses.map((classItem, index) => (
            <View key={index} style={styles.classCard}>
              <View style={styles.classInfo}>
                <Text style={styles.classTitle}>{classItem.title}</Text>
                <Text style={styles.classTeacher}>by {classItem.teacher}</Text>
                <Text style={styles.classTime}>{classItem.time}</Text>
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
  },
  logoIcon: {
    width: 40,
    height: 40,
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: '#2D2D2D',
    flex: 1,
    textAlign: 'left',
    marginLeft: 16,
    marginTop: 8,
  },
  notificationContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    width: 8,
    height: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#2D2D2D',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  bannerText: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  enrollButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  buttonContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  enrollButtonText: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.bold,
    fontSize: 14,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#2D2D2D',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  horizontalScroll: {
    paddingLeft: 16,
  },
  courseCard: {
    width: 150,
    marginRight: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
  },
  courseImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  courseImageStyle: {
    width: '100%',
    height: '100%',
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 4,
    lineHeight: 20,
  },
  courseTeacher: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
  },
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
  classTeacher: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    marginBottom: 2,
  },
  classTime: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#1A3C8E',
  },
  joinButton: {
    backgroundColor: '#1A3C8E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontFamily: theme.fonts.bold,
    fontSize: 14,
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
});

export default HomeScreen;
