import api from './apiService';

const register = async (data: {
  fullName: string;
  email: string;
  password: string;
  role: 'TEACHER' | 'STUDENT';
}) => {
  const res = await api.post('/api/v1/auth/registration', data);
  return {
    token: res.data.token,
    user: res.data.user || res.data,
  };
};

const login = async (data: { email: string; password: string }) => {
  const res = await api.post('/api/v1/auth/login', data);
  return {
    token: res.data.token,
    user: res.data.user || res.data,
  };
};

const getUser = async () => {
  const res = await api.get('/api/v1/auth/authenticate');
  return res.data;
};

const editUser = async (data: {
  fullName: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  description?: string;
  profilePicture?: string;
}) => {
  const res = await api.patch('/api/v1/users/edit', data);
  return res.data;
};

export default {
  register,
  login,
  getUser,
  editUser,
};
