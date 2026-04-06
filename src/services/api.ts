import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  name: string;
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


export interface LoginPayload {
  username: string;
  password: string;
}


export interface UpdateProfilePayload {
  name?: string;
  mobile_number?: string;
  address?: string;
  // photo?: string;
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

export const register = (data: RegisterPayload) => api.post('register/', data);

export const login = (data: LoginPayload) =>
  api.post<LoginResponse>('login/', data);

export const updateProfile = (data: UpdateProfilePayload) =>
  api.patch<UpdateProfileResponse>('user/', data);

export default api;
