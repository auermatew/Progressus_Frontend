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
  loading: boolean;
  login: (username: string, password: string) => Promise<void | AxiosError<ApiError>>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  register: (data: {
    fullName: string;
    email: string;
    password: string;
    role: 'TEACHER' | 'STUDENT';
  }) => Promise<void | AxiosError<ApiError>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
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

  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await AuthApiService.login({ username, password });
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
    } catch (error) {
      console.error('Login failed:', error);
      return error as AxiosError<ApiError>;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
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
        if (response && response.success) {
          setUser(response as unknown as User);
        } else {
          console.error('Unexpected response format:', response.message);
        }
        localStorage.setItem('user', JSON.stringify(response));
      } catch (error) {
        console.error('Registration failed:', error);
        return error as AxiosError<ApiError>;
      }
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
    <AuthContext.Provider value={{ user, loading, login, logout, register, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
