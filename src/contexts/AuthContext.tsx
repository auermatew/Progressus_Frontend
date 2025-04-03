import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/userdata', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user data');

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
