import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
} from 'react';
import { AxiosError } from 'axios';
import { ApiError } from '../schema/api';
import { User } from '../schema/user';
import AuthApiService from '../api/AuthApiService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void | AxiosError<ApiError>>;
  register: (data: {
    fullName: string;
    email: string;
    password: string;
    role: 'TEACHER' | 'STUDENT';
  }) => Promise<void | AxiosError<ApiError>>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateUserProfile: (data: {
    fullName: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    description?: string;
    profilePicture?: string;
  }) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => {},
  refreshUser: () => Promise.resolve(),
  updateUserProfile: () => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await AuthApiService.login({ email, password });
      setUser(response.user || response);
      localStorage.setItem('user', JSON.stringify(response.user || response));
    } catch (error) {
      console.error('Login failed:', error);
      return error as AxiosError<ApiError>;
    }
  }, []);

  const register = useCallback(
    async (data: {
      fullName: string;
      email: string;
      password: string;
      role: 'TEACHER' | 'STUDENT';
    }) => {
      try {
        const response = await AuthApiService.register(data);
        setUser(response.user || response);
        localStorage.setItem('user', JSON.stringify(response.user || response));
      } catch (error) {
        console.error('Registration failed:', error);
        return error as AxiosError<ApiError>;
      }
    },
    []
  );

  const refreshUser = useCallback(async () => {
    try {
      const response = await AuthApiService.getUser();
      setUser(response.user || response);
    } catch (error) {
      console.error('Could not refresh user:', error);
      setUser(null);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const updateUserProfile = useCallback(
    async (data: {
      fullName: string;
      email: string;
      password?: string;
      phoneNumber?: string;
      description?: string;
      profilePicture?: string;
    }) => {
      const updated = await AuthApiService.editUser(data);
      setUser(updated.user || updated);
      return updated;
    },
    []
  );

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshUser, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
