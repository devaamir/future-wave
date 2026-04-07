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
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch {
        // refresh failed — let the error propagate
      }
    }
    return Promise.reject(error);
  },
);

export const register = (data: RegisterPayload) => api.post('register/', data);

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

export const getNews = (params?: Record<string, any>) =>
  api.get<PaginatedResponse<News>>('news/', { params });

export default api;
