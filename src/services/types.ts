export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  name: string;
  mobile_number: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginUser {
  id: number;
  username: string;
  email: string;
  name: string;
  mobile_number: string;
  photo: string | null;
  address: string | null;
  course_name: string | null;
  spouse_name: string | null;
  spouse_number: string | null;
  relation: string | null;
  spouse_address: string | null;
  app_access_expiry: string | null;
}

export interface LoginResponse {
  refresh: string;
  access: string;
  app_expiry: string | null;
  user: LoginUser;
}

export interface UpdateProfilePayload {
  name?: string;
  mobile_number?: string;
  address?: string;
  photo?: string;
}

export interface UpdateProfileResponse {
  id: number;
  username: string;
  email: string;
  name: string;
  mobile_number: string;
  photo: string | null;
  address: string | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PrelimQuestion {
  id: number;
  category: {
    id: number;
    name: string;
    subject: {
      id: number;
      name: string;
      syllabus: {
        id: number;
        name: string;
        course: {
          id: number;
          name: string;
          category: { id: number; name: string };
        };
      };
    };
  };
  question: string;
  answer: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  created_at: string;
}

export interface StudyMaterial {
  id: number;
  subject: { id: number; name: string };
  batches: { id: number; name: string }[];
  title: string;
  description: string;
  date: string;
  file: string;
  created_at: string;
  updated_at: string;
}

export interface CurrentAffair {
  id: number;
  date: string;
  question: string;
  answer: string;
  created_at: string;
}

export interface QASubject {
  id: number;
  name: string;
}

export interface PrevLevel {
  id: number;
  name: string;
}

export interface PrevExamCategory {
  id: number;
  name: string;
}

export interface PrevYear {
  id: number;
  name: string;
}

export interface ScertClass {
  id: number;
  name: string;
}

export interface ScertCategory {
  id: number;
  name: string;
}

export interface ScertSubject {
  id: number;
  name: string;
}

export interface CapsuleSubject {
  id: number;
  name: string;
}

export interface CapsuleSubcategory {
  id: number;
  name: string;
  subject_id: number;
}

export interface CapsuleType {
  id: number;
  name: string;
  subcategory_id: number;
}

export interface CapsuleQuestion {
  id: number;
  type_cat: {
    id: number;
    name: string;
    subcategory: {
      id: number;
      name: string;
      subject: { id: number; name: string };
    };
  };
  question: string;
  answer: string;
  created_at: string;
}

export interface ScertQuestion {
  id: number;
  class_cat: { id: number; name: string };
  cat: { id: number; name: string };
  subject: { id: number; name: string };
  question: string;
  answer: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  created_at: string;
}

export interface QACategory {
  id: number;
  name: string;
  subject_id: number;
}

export interface QASubcategory {
  id: number;
  name: string;
  category_id: number;
}

export interface QAQuestion {
  id: number;
  subcategory: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
      subject: { id: number; name: string };
    };
  };
  question: string;
  answer: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  created_at: string;
}

export interface News {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
  date_published: string;
  image: string;
  is_active: boolean;
  created_at: string;
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  photo: string;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: number;
  student_name: string;
  exam_name: string;
  rank: string;
  photo: string;
  created_at: string;
  updated_at: string;
}

export interface MultimediaVideo {
  id: number;
  level: string;
  privacy: string;
  player_type: 'YOUTUBE' | 'FILE';
  title: string;
  description: string;
  video_id: string;
  video_url: string;
  thumbnail: string;
  video_file: string;
  created_at: string;
  subject: number;
}


export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: string;
  purchase_link: string;
  cover_image: string;
  pdf_file: string;
  is_free: boolean;
  is_active: boolean;
  created_at: string;
}

export interface ScertNote {
  id: number;
  topic: string;
  pdf_note: string;
  created_at: string;
  subject: number;
}

export interface ScertNoteSubject {
  id: number;
  name: string;
  created_at: string;
  notes: ScertNote[];
}

export interface ScertNoteCategory {
  id: number;
  name: string;
  created_at: string;
  subjects: ScertNoteSubject[];
}

export interface SearchResult {
  id: number;
  question: string;
  type: string;
  category_name: string;
  breadcrumb_info: Record<string, string>;
  answer: string;
  pdf_url: string;
}

export interface PrevOMRQuestion {
  id: number;
  question: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
}

export interface NamedItem {
  id: number;
  name: string;
}

export interface CourseItem extends NamedItem {
  category_id: number;
}

export interface SyllabusItem extends NamedItem {
  course_id: number;
}

export interface SubjectItem extends NamedItem {
  syllabus_id: number;
}

export interface CategoryItem extends NamedItem {
  subject_id: number;
}

export interface OMREvaluatePayload {
  answers: { id: number; selected_option: string }[];
  seconds_taken: number;
}

export interface OMREvaluateResponse {
  total_questions: number;
  correct_count: number;
  wrong_count: number;
  unanswered_count: number;
  score: number;
  score_percentage: number;
  seconds_taken: number;
  average_seconds_per_question: number;
  results: Record<string, string>[];
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export interface QAQuestionsParams {
  page?: number;
  page_size?: number;
  subcategory_id?: number;
  [key: string]: any;
}

export interface CapsuleQuestionsParams {
  page?: number;
  page_size?: number;
  subcategory_id?: number;
  subject_id?: number;
  type_id?: number;
}

export interface ScertQuestionsParams {
  class_id?: number;
  category_id?: number;
  subject_id?: number;
  page?: number;
  page_size?: number;
}

export interface ExamHistory {
  id: number;
  exam: number;
  exam_name: string;
  course_name: string;
  marks_obtained: string;
  rank: number;
  created_at: string;
  updated_at: string;
}

export interface UpcomingExam {
  id: number;
  title: string;
  subject: string;
  date: string;
  time: string;
}

export interface TimetableEntry {
  id: number;
  name: string;
  level: string;
  exam_type: string;
  mode: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  duration: string;
  total_questions: number;
  total_marks: string;
  course_name: string;
  batch_name: string;
}

export interface ExamResult {
  id: number;
  exam: number;
  exam_name: string;
  exam_date: string;
  marks_obtained: string;
  total_marks: string;
  rank: number;
  omr_sheet: string;
  created_at: string;
}

export interface OMRPracticeHistory {
  id: number;
  test_type: string;
  category_id: number;
  subcategory_id: number;
  score: number;
  total_questions: number;
  correct_count: number;
  wrong_count: number;
  unanswered_count: number;
  time_taken: number;
  is_omr: boolean;
  created_at: string;
  user: number;
}

export interface RankingEntry {
  id: number;
  rank: number;
  name: string;
  score: number;
  exam: string;
  is_me: boolean;
}

export interface AudioClass {
  id: number;
  batches: { id: number; name: string }[];
  level: string;
  privacy: string;
  title: string;
  description: string;
  audio_file: string;
  created_at: string;
  updated_at: string;
  subject: number;
  course: number;
}

export interface AudioClassesParams {
  course_id?: number;
  level?: string;
  page?: number;
  page_size?: number;
  privacy?: string;
  subject_id?: number;
}

export interface OnlineExam {
  id: number;
  name: string;
  level: string;
  exam_type: string;
  mode: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  duration: string;
  total_questions: number;
  total_marks: string;
  course_name: string;
  batch_name: string;
}

export interface OnlineExamQuestion {
  id: number;
  question: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
}

export interface ExamSubmitPayload {
  time_taken: number;
  answers: { question_id: number; selected_option: string }[];
}