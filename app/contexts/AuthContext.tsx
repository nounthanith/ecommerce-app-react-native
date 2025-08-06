import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = null | { 
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  createdAt: string;
  [key: string]: any;
};

type AuthContextType = {
  user: User | null;
  login: (userData: any) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = '@user_data';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Start with true to show loading state
  const [error, setError] = useState<string | null>(null);

  // Load user from storage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (userJson) {
          const userData = JSON.parse(userJson);
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to load user data', error);
        Alert.alert('Error', 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      // Save user data to AsyncStorage
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to save user data');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    // Similar to login, but you might want to handle registration-specific logic here
    return login(userData);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError('Failed to clear user data');
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        login,
        logout,
        register,
        loading,
        error,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
