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
