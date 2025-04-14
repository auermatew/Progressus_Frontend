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
  updateUserProfile: (data: { fullName: string; email: string }) => Promise<User>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  updateUserProfile: () => Promise.resolve({} as User),
  logout: () => {},
  refreshUser: () => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const response = await AuthApiService.getUser();
      setUser(response);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    }
  }, []);

  const updateUserProfile = useCallback(
    async (data: {
      fullName: string;
      email: string;
      password?: string;
      profilePicture?: string;
      phoneNumber?: string;
      description?: string;
    }) => {
      const updated = await AuthApiService.editUser(data);
      setUser(updated.user);
      return updated;
    },
    []
  );

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await AuthApiService.login({ email, password });
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
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
        setUser(response);
        localStorage.setItem('user', JSON.stringify(response));
      } catch (error) {
        console.error('Registration failed:', error);
        return error as AxiosError<ApiError>;
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, updateUserProfile, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
