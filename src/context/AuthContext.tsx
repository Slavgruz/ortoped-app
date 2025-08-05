import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Моковая аутентификация
    const mockUsers = [
      { 
        id: '1', 
        name: 'Иван Менеджеров', 
        email: 'manager@example.com', 
        role: 'manager', 
        city: 'Москва' 
      },
      { 
        id: '2', 
        name: 'Анна Бухгалтер', 
        email: 'accountant@example.com', 
        role: 'accountant', 
        city: 'Санкт-Петербург' 
      }
    ];
    
    const user = mockUsers.find(u => u.email === email && password === 'password');
    
    if (user) {
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
