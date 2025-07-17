import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = async (email: string, _password: string) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    // Mock login - replace with actual API call
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    };

    setState({
      user: mockUser,
      isAuthenticated: true,
    });
  };

  const register = async (name: string, email: string, _password: string) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    // Mock registration - replace with actual API call
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
    };

    setState({
      user: mockUser,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, register }}>
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