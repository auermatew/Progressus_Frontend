import {
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
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void | AxiosError<ApiError>>;
  register: (data: { fullName: string; email: string; password: string }) => Promise<void | AxiosError<ApiError>>;
  logout: () => void;
  refreshUser: (overrideToken?: string) => Promise<User | null>;
  becomeTeacher: (data: { contactEmail: string; contactPhone: string }) => Promise<void | AxiosError<ApiError>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => {},
  refreshUser: () => Promise.resolve(null),
  becomeTeacher: () => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async (overrideToken?: string): Promise<User | null> => {
    try {
      const res = await AuthApiService.getUser(overrideToken || token!);
      setUser(res);
      return res;
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await AuthApiService.login({ email, password });
      setToken(res.token);
      await refreshUser(res.token);
    } catch (error) {
      console.error('Login failed:', error);
      return error as AxiosError<ApiError>;
    }
  }, [refreshUser]);

  const register = useCallback(async (data: { fullName: string; email: string; password: string }) => {
    try {
      const res = await AuthApiService.register(data);
      setToken(res.token);
      await refreshUser(res.token);
    } catch (error) {
      console.error('Registration failed:', error);
      return error as AxiosError<ApiError>;
    }
  }, [refreshUser]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const becomeTeacher = useCallback(async (data: { contactEmail: string; contactPhone: string }) => {
    try {
      await AuthApiService.becomeTeacher(data);
      await refreshUser();
    } catch (error) {
      console.error('Failed to become a teacher:', error);
      return error as AxiosError<ApiError>;
    }
  }, [refreshUser]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser, becomeTeacher }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
