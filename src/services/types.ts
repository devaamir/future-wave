export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  name: string;
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
