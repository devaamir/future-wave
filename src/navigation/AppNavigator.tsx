import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAccessToken } from '../services/storage';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OtpVerifyScreen from '../screens/OtpVerifyScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import MainHomeScreen from '../screens/MainHomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import LiveClassesScreen from '../screens/LiveClassesScreen';
import LiveClassJoinScreen from '../screens/LiveClassJoinScreen';
import ClassReminderScreen from '../screens/ClassReminderScreen';
import StudyMaterialScreen from '../screens/StudyMaterialScreen';
import RecordedVideosScreen from '../screens/RecordedVideosScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import MyCoursesScreen from '../screens/MyCoursesScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import EnrollmentScreen from '../screens/EnrollmentScreen';
import DailyQuizScreen from '../screens/DailyQuizScreen';
import CurrentAffairsScreen from '../screens/CurrentAffairsScreen';
import PDFViewerScreen from '../screens/PDFViewerScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import NewsListScreen from '../screens/NewsListScreen';
import LearningSectionScreen from '../screens/LearningSectionScreen';
import QASubjectsScreen from '../screens/QASubjectsScreen';
import QAListScreen from '../screens/QAListScreen';
import QAQuestionsScreen from '../screens/QAQuestionsScreen';
import CollapsibleLevelScreen from '../screens/CollapsibleLevelScreen';
import AnnouncementsScreen from '../screens/AnnouncementsScreen';
import AnnouncementDetailScreen from '../screens/AnnouncementDetailScreen';
import CapsuleSubjectsScreen from '../screens/CapsuleSubjectsScreen';
import ScertNotesSubjectsScreen from '../screens/ScertNotesSubjectsScreen';
import ScertNotesTopicsScreen from '../screens/ScertNotesTopicsScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import AchievementDetailScreen from '../screens/AchievementDetailScreen';
import OurBooksScreen from '../screens/OurBooksScreen';
import VideosScreen from '../screens/VideosScreen';
import OMRPracticeScreen from '../screens/OMRPracticeScreen';
import OnlineOMRScreen from '../screens/OnlineOMRScreen';
import OMRSummaryScreen from '../screens/OMRSummaryScreen';
import MultimediaVideosScreen from '../screens/MultimediaVideosScreen';
import AudioClassScreen from '../screens/AudioClassScreen';
import TodayExamScreen from '../screens/TodayExamScreen';
import ExamQuestionsScreen from '../screens/ExamQuestionsScreen';
import MyTasksScreen from '../screens/MyTasksScreen';
import SearchScreen from '../screens/SearchScreen';
import ExamsMenuScreen from '../screens/ExamsMenuScreen';
import NextExamScreen from '../screens/NextExamScreen';
import TimeTableScreen from '../screens/TimeTableScreen';
import ExamResultScreen from '../screens/ExamResultScreen';
import RankingScreen from '../screens/RankingScreen';
import OMRHistoryScreen from '../screens/OMRHistoryScreen';
import { getPrelimsCourseCategories, getPrelimsCourses, getPrelimsSyllabuses, getPrelimSubjects, getPrelimCategories, getQuestions, getMainsCourseCategories, getMainsCourses, getMainsSyllabuses, getMainsSubjects, getMainsCategories, getMainsQuestions } from '../services/api';
import { useColors } from '../theme';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const colors = useColors();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    resolveInitialRoute();
  }, []);

  const resolveInitialRoute = async () => {
    try {
      const token = await getAccessToken();
      if (token) {
        setInitialRoute('Home');
        return;
      }
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        await AsyncStorage.setItem('hasLaunched', 'true');
        setInitialRoute('Welcome');
      } else {
        setInitialRoute('Login');
      }
    } catch {
      setInitialRoute('Welcome');
    }
  };

  if (initialRoute === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OtpVerify" component={OtpVerifyScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={MainHomeScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="LiveClasses" component={LiveClassesScreen} />
        <Stack.Screen name="LiveClassJoin" component={LiveClassJoinScreen} />
        <Stack.Screen name="ClassReminder" component={ClassReminderScreen} />
        {/* <Stack.Screen name="LiveClassesInner" component={LiveClassesInnerScreen} /> */}
        {/* <Stack.Screen name="LiveDashboard" component={LiveDashboardScreen} /> */}
        <Stack.Screen name="StudyMaterial" component={StudyMaterialScreen} />
        <Stack.Screen name="RecordedVideos" component={RecordedVideosScreen} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
        <Stack.Screen name="MyCourses" component={MyCoursesScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Enrollment" component={EnrollmentScreen} />
        <Stack.Screen name="DailyQuiz" component={DailyQuizScreen} />
        <Stack.Screen name="CurrentAffairs" component={CurrentAffairsScreen} />
        <Stack.Screen name="PDFViewer" component={PDFViewerScreen} />
        <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
        <Stack.Screen name="NewsList" component={NewsListScreen} />
        <Stack.Screen name="LearningSection" component={LearningSectionScreen} />
        <Stack.Screen name="QASubjects" component={QASubjectsScreen} />
        <Stack.Screen name="QACategories" component={QAListScreen} />
        <Stack.Screen name="QASubcategories" component={QAListScreen} />
        <Stack.Screen name="QAQuestions" component={QAQuestionsScreen} />
        <Stack.Screen name="PrelimQuestions" component={QAQuestionsScreen} />
        <Stack.Screen name="MainsQuestions" component={QAQuestionsScreen} />
        <Stack.Screen name="PreviousQuestions" component={CollapsibleLevelScreen} />
        <Stack.Screen name="SCERTQuestions" component={CollapsibleLevelScreen} />
        <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
        <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetailScreen} />
        <Stack.Screen name="CapsuleSubjects" component={CapsuleSubjectsScreen} />
        <Stack.Screen name="ScertNotesSubjects" component={ScertNotesSubjectsScreen} />
        <Stack.Screen name="ScertNotesTopics" component={ScertNotesTopicsScreen} />
        <Stack.Screen name="Achievements" component={AchievementsScreen} />
        <Stack.Screen name="AchievementDetail" component={AchievementDetailScreen} />
        <Stack.Screen name="OurBooks" component={OurBooksScreen} />
        <Stack.Screen name="OMRPractice" component={OMRPracticeScreen} />
        <Stack.Screen name="OnlineOMR" component={OnlineOMRScreen} />
        <Stack.Screen name="OMRSummary" component={OMRSummaryScreen} />
        <Stack.Screen name="Videos" component={VideosScreen} />
        <Stack.Screen name="VideoSubjects" component={QAListScreen} />
        <Stack.Screen name="MultimediaVideos" component={MultimediaVideosScreen} />
        <Stack.Screen name="AudioClasses" component={AudioClassScreen} />
        <Stack.Screen name="TodayExam" component={TodayExamScreen} />
        <Stack.Screen name="ExamQuestions" component={ExamQuestionsScreen} />
        <Stack.Screen name="MyTasks" component={MyTasksScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ExamsMenu" component={ExamsMenuScreen} />
        <Stack.Screen name="NextExam" component={NextExamScreen} />
        <Stack.Screen name="TimeTable" component={TimeTableScreen} />
        <Stack.Screen name="ExamResult" component={ExamResultScreen} />
        <Stack.Screen name="Ranking" component={RankingScreen} />
        <Stack.Screen name="OMRHistory" component={OMRHistoryScreen} />
        <Stack.Screen
          name="PrelimsCourseCategories"
          component={QAListScreen}
          initialParams={{
            title: 'Prelims',
            color: colors.purple,
            bg: colors.purpleBg,
            fetchFn: getPrelimsCourseCategories,
            nextScreen: 'QACategories',
            nextParams: (cat: any) => ({
              title: cat.name,
              color: colors.purple,
              bg: colors.purpleBg,
              fetchFn: () => getPrelimsCourses({ course_category_id: cat.id }),
              nextScreen: 'QACategories',
              nextParams: (course: any) => ({
                title: course.name,
                color: colors.purple,
                bg: colors.purpleBg,
                fetchFn: () => getPrelimsSyllabuses({ course_id: course.id }),
                nextScreen: 'QACategories',
                nextParams: (syllabus: any) => ({
                  title: syllabus.name,
                  color: colors.purple,
                  bg: colors.purpleBg,
                  fetchFn: () => getPrelimSubjects({ syllabus_id: syllabus.id }),
                  nextScreen: 'QACategories',
                  nextParams: (subject: any) => ({
                    title: subject.name,
                    color: colors.purple,
                    bg: colors.purpleBg,
                    fetchFn: () => getPrelimCategories({ subject_id: subject.id }),
                    nextScreen: 'PrelimQuestions',
                    nextParams: (category: any) => ({
                      title: category.name,
                      color: colors.purple,
                      bg: colors.purpleBg,
                      fetchFn: (params: any) => getQuestions({ ...params, subject_id: subject.id, category_id: category.id }),
                    }),
                  }),
                }),
              }),
            }),
          }}
        />
        <Stack.Screen
          name="MainsCourseCategories"
          component={QAListScreen}
          initialParams={{
            title: 'Mains',
            color: colors.amber,
            bg: colors.amberBg,
            fetchFn: getMainsCourseCategories,
            nextScreen: 'QACategories',
            nextParams: (cat: any) => ({
              title: cat.name,
              color: colors.amber,
              bg: colors.amberBg,
              fetchFn: () => getMainsCourses({ course_category_id: cat.id }),
              nextScreen: 'QACategories',
              nextParams: (course: any) => ({
                title: course.name,
                color: colors.amber,
                bg: colors.amberBg,
                fetchFn: () => getMainsSyllabuses({ course_id: course.id }),
                nextScreen: 'QACategories',
                nextParams: (syllabus: any) => ({
                  title: syllabus.name,
                  color: colors.amber,
                  bg: colors.amberBg,
                  fetchFn: () => getMainsSubjects({ syllabus_id: syllabus.id }),
                  nextScreen: 'QACategories',
                  nextParams: (subject: any) => ({
                    title: subject.name,
                    color: colors.amber,
                    bg: colors.amberBg,
                    fetchFn: () => getMainsCategories({ subject_id: subject.id }),
                    nextScreen: 'MainsQuestions',
                    nextParams: (category: any) => ({
                      title: category.name,
                      color: colors.amber,
                      bg: colors.amberBg,
                      fetchFn: (params: any) => getMainsQuestions({ ...params, subject_id: subject.id, category_id: category.id }),
                    }),
                  }),
                }),
              }),
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
