import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  RegisterPayload,
  LoginPayload,
  LoginResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
  PaginatedResponse,
  PrelimQuestion,
  StudyMaterial,
  CurrentAffair,
  News,
  QAQuestion,
  QASubject,
  QACategory,
  QASubcategory,
  Announcement,
  PrevLevel,
  PrevExamCategory,
  ScertClass,
  ScertCategory,
  ScertSubject,
  ScertQuestion,
  PrevYear,
  CapsuleSubject,
  CapsuleSubcategory,
  CapsuleType,
  CapsuleQuestion,
  ScertNoteCategory,
  MultimediaVideo,
  Achievement,
  Book,
  PrevOMRQuestion,
  SearchResult,
  UpcomingExam,
  ExamHistory,
  TimetableEntry,
  ExamResult,
  RankingEntry,
  OMRPracticeHistory,
  NamedItem,
  CourseItem,
  SyllabusItem,
  SubjectItem,
  CategoryItem,
  OMREvaluatePayload,
  OMREvaluateResponse,
  Notification,
  QAQuestionsParams,
  CapsuleQuestionsParams,
  ScertQuestionsParams,
  AudioClass,
  AudioClassesParams,
  OnlineExam,
  OnlineExamQuestion,
  ExamSubmitPayload,
  PasswordResetConfirmPayload,
  PasswordResetRequestPayload,
} from './types';

export * from './types';

const api = axios.create({
  baseURL: 'https://beta.tipspscacademy.in/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = await AsyncStorage.getItem('refresh_token');
        const { data } = await axios.post(
          'https://beta.tipspscacademy.in/api/token/refresh/',
          { refresh },
        );
        await AsyncStorage.setItem('access_token', data.access);
        if (data.app_expiry) await AsyncStorage.setItem('app_expiry', data.app_expiry);
        else await AsyncStorage.removeItem('app_expiry');
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch {
        console.log(error.response, 'refresh failed');

        // refresh failed — let the error propagate
      }
    }
    return Promise.reject(error);
  },
);

export const register = (data: RegisterPayload) => api.post('register/', data);

export const passwordResetConfirm = (data: PasswordResetConfirmPayload) =>
  api.post<PasswordResetConfirmPayload>('password-reset/confirm/', data);

export const passwordResetRequestOtp = (data: PasswordResetRequestPayload) =>
  api.post<PasswordResetRequestPayload>('password-reset/request-otp/', data);

export const login = (data: LoginPayload) =>
  api.post<LoginResponse>('login/', data);

export const updateProfile = (data: UpdateProfilePayload) =>
  api.patch<UpdateProfileResponse>('user/', data);

export const getQuestions = (params?: Record<string, any>) =>
  api.get<PaginatedResponse<PrelimQuestion>>('learning/prelims/questions/', { params });

export const getStudyMaterials = (params?: Record<string, any>) =>
  api.get<PaginatedResponse<StudyMaterial>>('study-materials/', { params });

export const getCurrentAffairs = (params?: Record<string, any>) =>
  api.get<CurrentAffair[]>('learning/current-affairs/', { params });

export const getQAQuestions = (params?: QAQuestionsParams) =>
  api.get<PaginatedResponse<QAQuestion>>('learning/qa/questions/', { params });

export const getQASubjects = () =>
  api.get<QASubject[]>('learning/qa/subjects/');

export const getQACategories = (params?: { subject_id?: number }) =>
  api.get<QACategory[]>('learning/qa/categories/', { params });

export const getQASubcategories = (params?: { category_id?: number }) =>
  api.get<QASubcategory[]>('learning/qa/subcategories/', { params });

export const getPrevLevels = () =>
  api.get<PrevLevel[]>('learning/prev/levels/');

export const getPrevExamCategories = (params?: { level_id?: number }) =>
  api.get<PrevExamCategory[]>('learning/prev/exam-categories/', { params });

export const getPrevYears = (params?: { exam_cat_id?: number }) =>
  api.get<PrevYear[]>('learning/prev/years/', { params });

export const getScertClasses = () =>
  api.get<ScertClass[]>('learning/scert/classes/');

export const getScertNotesClasses = () =>
  api.get<ScertClass[]>('learning/scert-notes/classes/');

export const getScertNotes = (params?: { class_id?: number }) =>
  api.get<ScertNoteCategory[]>('learning/scert-notes/', { params });

export const getScertCategories = (params?: { class_id?: number }) =>
  api.get<ScertCategory[]>('learning/scert/categories/', { params });

export const getScertSubjects = (params?: { category_id?: number }) =>
  api.get<ScertSubject[]>('learning/scert/subjects/', { params });

export const getCapsuleSubjects = () =>
  api.get<CapsuleSubject[]>('learning/capsules/subjects/');

export const getCapsuleSubcategories = (params?: { subject_id?: number }) =>
  api.get<CapsuleSubcategory[]>('learning/capsules/subcategories/', { params });

export const getCapsuleTypes = (params?: { subcategory_id?: number }) => {
  return api.get<CapsuleType[]>('learning/capsules/types/', { params });
};

export const getCapsuleQuestions = (params?: CapsuleQuestionsParams) =>
  api.get<PaginatedResponse<CapsuleQuestion>>('learning/capsules/questions/', { params });

export const getScertQuestions = (params?: ScertQuestionsParams) =>
  api.get<PaginatedResponse<ScertQuestion>>('learning/scert/questions/', { params });

export const getNews = (params?: Record<string, any>) =>
  api.get<PaginatedResponse<News>>('news/', { params });

export const getAnnouncements = () =>
  api.get<Announcement[]>('announcements/');

export const getAchievements = () =>
  api.get<Achievement[]>('achievements/');

export const getPrelimsCourseCategories = () =>
  api.get<NamedItem[]>('learning/prelims/course-categories/');

export const getPrelimsCourses = (params?: { course_category_id?: number }) =>
  api.get<CourseItem[]>('learning/prelims/courses/', { params });

export const getPrelimsSyllabuses = (params?: { course_id?: number }) =>
  api.get<SyllabusItem[]>('learning/prelims/syllabuses/', { params });

export const getPrelimSubjects = (params?: { syllabus_id?: number }) =>
  api.get<SubjectItem[]>('learning/prelims/subjects/', { params });

export const getPrelimCategories = (params?: { subject_id?: number }) =>
  api.get<CategoryItem[]>('learning/prelims/categories/', { params });

export const getMainsCourseCategories = () =>
  api.get<NamedItem[]>('learning/mains/course-categories/');

export const getMainsCourses = (params?: { course_category_id?: number }) =>
  api.get<CourseItem[]>('learning/mains/courses/', { params });

export const getMainsSyllabuses = (params?: { course_id?: number }) =>
  api.get<SyllabusItem[]>('learning/mains/syllabuses/', { params });

export const getMainsSubjects = (params?: { syllabus_id?: number }) =>
  api.get<SubjectItem[]>('learning/mains/subjects/', { params });

export const getMainsCategories = (params?: { subject_id?: number }) =>
  api.get<CategoryItem[]>('learning/mains/categories/', { params });

export const getMainsQuestions = (params?: Record<string, any>) =>
  api.get<PaginatedResponse<PrelimQuestion>>('learning/mains/questions/', { params });

export const search = (q: string) =>
  api.get<SearchResult[]>('search/', { params: { q } });

export const getUpcomingExams = () =>
  api.get<UpcomingExam[]>('exams/upcoming/');

export const getExamHistory = (params?: { page?: number; page_size?: number }) =>
  api.get<PaginatedResponse<ExamHistory>>('user/exam-history/', { params });

export const getTimetable = () =>
  api.get<TimetableEntry[]>('exams/timetable/');

export const getExamResults = () =>
  api.get<ExamResult[]>('exams/results/');

export const getExamRankings = () =>
  api.get<RankingEntry[]>('exams/rankings/');

export const getOMRPracticeHistory = (params?: { page?: number; page_size?: number }) =>
  api.get<PaginatedResponse<OMRPracticeHistory>>('user/omr-practice-history/', { params });

export const generateOMR = () =>
  api.get<PrevOMRQuestion[]>('learning/omr/generate');

export const generatePrevOMR = () =>
  api.get<PrevOMRQuestion[]>('learning/prev/omr/generate/');

export const evaluateOMR = (payload: OMREvaluatePayload) =>
  api.post<OMREvaluateResponse>('learning/omr/evaluate/', payload);

export const evaluatePrevOMR = (payload: OMREvaluatePayload) =>
  api.post<OMREvaluateResponse>('learning/prev/omr/evaluate/', payload);

export const getNotifications = (params?: { page?: number; page_size?: number }) =>
  api.get<PaginatedResponse<Notification>>('login/notifications/', { params });

export const getBooks = () =>
  api.get<Book[]>('books/');

export const getMultimediaSubjects = (privacy: 'PUBLIC' | 'PRIVATE') =>
  api.get<NamedItem[]>('multimedia/subjects/', { params: { privacy } });

export const getMultimediaVideos = (params: { page?: number; page_size?: number; privacy: string; subject_id: number }) =>
  api.get<PaginatedResponse<MultimediaVideo>>('multimedia/', { params });

export const getAudioClasses = (params?: AudioClassesParams) =>
  api.get<PaginatedResponse<AudioClass>>('audio-classes/', { params });

export const getOnlineExams = () =>
  api.get<OnlineExam[]>('exams/online/');

export const getExamQuestions = (examId: number) =>
  api.get<OnlineExamQuestion[]>(`exams/${examId}/questions/`);

export const submitExam = (examId: number, payload: ExamSubmitPayload) =>
  api.post(`exams/${examId}/submit/`, payload);

export default api;
