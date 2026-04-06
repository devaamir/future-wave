import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginUser } from './api';

const KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
};

export const saveSession = async (access: string, refresh: string, user: LoginUser) => {
  await AsyncStorage.multiSet([
    [KEYS.ACCESS_TOKEN, access],
    [KEYS.REFRESH_TOKEN, refresh],
    [KEYS.USER, JSON.stringify(user)],
  ]);
};

export const getAccessToken = () => AsyncStorage.getItem(KEYS.ACCESS_TOKEN);

export const getUser = async (): Promise<LoginUser | null> => {
  const raw = await AsyncStorage.getItem(KEYS.USER);
  return raw ? JSON.parse(raw) : null;
};

export const clearSession = () =>
  AsyncStorage.multiRemove([KEYS.ACCESS_TOKEN, KEYS.REFRESH_TOKEN, KEYS.USER]);
