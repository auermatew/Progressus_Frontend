import api from './apiService';

const login = async (data: { email: string; password: string }) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

const register = async (data: {
  fullName: string;
  email: string;
  password: string;
  role: 'TEACHER' | 'STUDENT';
}) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

const getUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

const logout = async () => {
  await api.post('/auth/logout');
};

export default {
  login,
  register,
  getUser,
  logout,
};
