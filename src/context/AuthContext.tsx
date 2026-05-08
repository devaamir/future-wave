import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const APP_EXPIRY_KEY = 'app_expiry';

interface AuthContextType {
  appExpiry: string | null | undefined; // undefined = not yet loaded
  setAppExpiry: (val: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  appExpiry: undefined,
  setAppExpiry: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [appExpiry, setAppExpiryState] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    AsyncStorage.getItem(APP_EXPIRY_KEY).then(val => setAppExpiryState(val)); // null = no expiry, string = has expiry
  }, []);

  const setAppExpiry = (val: string | null) => {
    setAppExpiryState(val);
    if (val) AsyncStorage.setItem(APP_EXPIRY_KEY, val);
    else AsyncStorage.removeItem(APP_EXPIRY_KEY);
  };

  return (
    <AuthContext.Provider value={{ appExpiry, setAppExpiry }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
