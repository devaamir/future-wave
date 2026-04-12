import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {
  NotificationIcon,
  SearchIcon,
  TodayTaskIcon,
  LearningSectionIcon,
  OMRIcon,
  PrelimsIcon,
  MainCoursesIcon,
  VideosIcon,
  OurBooksIcon,
  CurrentAffairsIcon,
  AudioClassIcon,
  StudyMaterialIcon,
  ExamIcon,
  AchievementsIcon,
  MegaphoneIcon,
  GoldenBellIcon,
} from '../components/Icons';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { getNews, getAnnouncements, News, Announcement } from '../services/api';



const HomeScreen = ({ onTabPress }: any) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const [news, setNews] = useState<News[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    getNews({ page: 1 }).then(({ data }) => setNews(data.results)).catch(() => { });
    getAnnouncements().then(({ data }) => setAnnouncements(data)).catch(() => { });
  }, []);


  const dashboardItems = [
    { title: "My tasks", icon: TodayTaskIcon, color: '#37B38A', screen: null },
    { title: 'Learning Section', icon: LearningSectionIcon, color: '#3A8EDB', screen: 'LearningSection' },
    { title: 'OMR Practice', icon: OMRIcon, color: '#F39C12', screen: null },
    { title: 'Prelims', icon: PrelimsIcon, color: '#7B5ACF', screen: null },
    { title: 'Main Courses', icon: MainCoursesIcon, color: '#F5B041', screen: null },
    { title: 'Audio Class', icon: AudioClassIcon, color: '#FF5A7A', screen: null },
    { title: 'Videos', icon: VideosIcon, color: '#F04F4F', screen: 'RecordedVideos' },
    { title: 'Achievements', icon: AchievementsIcon, color: '#4DB8AC', screen: null },
    { title: 'Our Books', icon: OurBooksIcon, color: '#2E9E45', screen: null },
    { title: '', icon: null, color: 'transparent', screen: null },
  ];

  const formattedDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <ImageBackground source={require('../assets/images/background-image.png')} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.headerContainer, { paddingTop: statusBarHeight }]}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/logo-icon.png')}
            style={styles.logoIcon}
            resizeMode="contain"
          />
          <View style={styles.headerCenter}>
            <Text style={styles.greetingText}>Hi, Aamir</Text>
            <Text style={styles.subGreetingText}>Ready to continue learning?</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Notifications')}
          >
            <GoldenBellIcon size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <SearchIcon size={18} color="#9CA3AF" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses, exams, materials..."
          placeholderTextColor="#9CA3AF"
        />
      </View>



      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tasksHorizontal}
          >
            <TouchableOpacity style={styles.taskCard} activeOpacity={0.7} onPress={() => navigation.navigate('StudyMaterial' as never)}>
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <StudyMaterialIcon size={24} color="#6B7280" />
                </View>
                <Text style={styles.taskTitle}>Study Materials</Text>
              </View>
              <View>
                {/* <Text style={styles.taskProgressIncomplete}>1/3 completed</Text> */}
                <TouchableOpacity style={styles.continueButtonSmall} activeOpacity={0.7}>
                  <Text style={styles.continueButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.taskCard} activeOpacity={0.7} onPress={() => navigation.navigate('DailyQuiz' as never)}>
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <ExamIcon size={24} color="#6B7280" />
                </View>
                <Text style={styles.taskTitle}>Daily Quiz</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.startButtonFull} activeOpacity={0.7} onPress={() => navigation.navigate('DailyQuiz' as never)}>
                  <Text style={styles.startButtonText}>Start</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.taskCard} activeOpacity={0.7} onPress={() => navigation.navigate('CurrentAffairs' as never)}>
              <View style={styles.taskHeader}>
                <View style={[styles.taskIconContainer, { backgroundColor: '#E8F5E9', borderRadius: 8, padding: 4 }]}>
                  <CurrentAffairsIcon size={20} color="#3DBE8B" />
                </View>
                <Text style={styles.taskTitle}>Current Affairs</Text>
              </View>
              <View>
                <View style={styles.caReadBadge}>
                  <Text style={styles.caReadText}>Read Now</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.dashboardCard}>
          <View style={styles.dashboardGrid}>
            {dashboardItems.map((item, index) => {
              if (!item.icon) return <View key={index} style={styles.dashboardItem} />;
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.dashboardItem}
                  activeOpacity={0.7}
                  onPress={() => item.screen && navigation.navigate(item.screen as never)}
                >
                  <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                    <IconComponent size={20} color="#FFFFFF" />
                  </View>
                  <Text style={styles.dashboardText}>{item.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <View style={styles.continueCard}>
            <View style={styles.continueContent}>
              <Text style={styles.continueTitle}>Kerala PSC Polity Notes</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '45%' }]} />
                </View>
                <Text style={styles.progressText}>45%</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.resumeButton} activeOpacity={0.7}>
              <Text style={styles.resumeText}>Resume →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {announcements.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Announcements</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Announcements' as never)}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {announcements.map(item => (
              <TouchableOpacity key={item.id} style={styles.affairCard} activeOpacity={0.7}>
                {item.photo ? (
                  <Image source={{ uri: item.photo }} style={styles.affairImage} resizeMode="cover" />
                ) : (
                  <View style={[styles.affairImage, { backgroundColor: '#E5E7EB' }]} />
                )}
                <View style={styles.affairOverlay}>
                  <View style={[styles.categoryBadge, { backgroundColor: 'rgba(43,174,155,0.9)' }]}>
                    <Text style={styles.categoryText}>{item.created_at.slice(0, 10)}</Text>
                  </View>
                </View>
                <View style={styles.affairInfo}>
                  <Text style={styles.affairTitle} numberOfLines={2}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        )}

        {news.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>News & Events</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('NewsList' as never)}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {news.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.affairCard}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('NewsDetail' as never, { item } as never)}
              >
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.affairImage} resizeMode="cover" />
                ) : (
                  <View style={[styles.affairImage, { backgroundColor: '#E5E7EB' }]} />
                )}
                <View style={styles.affairOverlay}>
                  {/* <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.date}</Text>
                  </View> */}
                </View>
                <View style={styles.affairInfo}>
                  <Text style={styles.affairTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.affairDate}>{formattedDate(item.date)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        )}

      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5F5F5',
  },
  linearGradient: {
    flex: 1,
  },
  headerContainer: {
    // backgroundColor: '#FFFFFF',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logoIcon: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  headerCenter: {
    flex: 1,
    marginLeft: 12,
  },
  greetingText: {
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    color: '#2D2D2D',
  },
  subGreetingText: {
    fontSize: 13,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#2D2D2D',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
    marginBottom: 50,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
  },
  viewAllText: {
    fontSize: 13,
    fontFamily: theme.fonts.medium,
    color: '#4DB8AC',
  },
  tasksHorizontal: {
    paddingHorizontal: 16,
    gap: 12,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: 140,
    justifyContent: 'space-between',
    minHeight: 140,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 0,
  },
  taskIconContainer: {
    marginRight: 8,
  },
  taskTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: '#2D2D2D',
    flex: 1,
  },
  taskProgress: {
    fontSize: 11,
    fontFamily: theme.fonts.medium,
    color: '#10B981',
    textAlign: 'center',
    marginBottom: 4,
  },
  taskProgressIncomplete: {
    fontSize: 11,
    fontFamily: theme.fonts.medium,
    color: '#FF9800',
    textAlign: 'center',
    marginBottom: 4,
  },
  continueButtonSmall: {
    backgroundColor: '#FF9800',
    paddingVertical: 8,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: theme.fonts.semiBold,
  },
  taskCompleted: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: theme.fonts.bold,
  },
  startButton: {
    backgroundColor: '#4DB8AC',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  startButtonFull: {
    backgroundColor: '#4DB8AC',
    paddingVertical: 8,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: theme.fonts.semiBold,
  },
  taskProgressPending: {
    fontSize: 11,
    fontFamily: theme.fonts.medium,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 4,
  },
  pendingBadge: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  pendingText: {
    fontSize: 11,
    fontFamily: theme.fonts.medium,
    color: '#9CA3AF',
  },
  caReadBadge: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 8,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
  caReadText: {
    fontSize: 11,
    fontFamily: theme.fonts.semiBold,
    color: '#3DBE8B',
  },
  continueCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  continueContent: {
    flex: 1,
    marginRight: 12,
  },
  continueTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: '#2D2D2D',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4DB8AC',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#6B7280',
    minWidth: 35,
  },
  announcementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2BAE9B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  announcementIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E6F7F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  announcementTitle: {
    fontSize: 13,
    fontFamily: theme.fonts.semiBold,
    color: '#1F2937',
    marginBottom: 3,
  },
  announcementDate: {
    fontSize: 11,
    fontFamily: theme.fonts.regular,
    color: '#9CA3AF',
  },
  resumeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  resumeText: {
    fontSize: 13,
    fontFamily: theme.fonts.semiBold,
    color: '#4DB8AC',
  },
  dashboardCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dashboardItem: {
    width: '31%',
    alignItems: 'center',
    marginBottom: 28,
  },
  iconContainer: {
    marginBottom: 8,
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardText: {
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
    color: '#4B5563',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  horizontalScroll: {
    paddingLeft: 16,
  },
  affairCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  affairImage: {
    width: '100%',
    height: 110,
  },
  affairOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  categoryBadge: {
    backgroundColor: 'rgba(77, 184, 172, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: theme.fonts.semiBold,
    color: '#FFFFFF',
  },
  affairInfo: {
    padding: 12,
  },
  affairTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.semiBold,
    color: '#2D2D2D',
    marginBottom: 6,
    lineHeight: 18,
  },
  affairDate: {
    fontSize: 11,
    fontFamily: theme.fonts.regular,
    color: '#10B981',
  },
});

export default HomeScreen;
