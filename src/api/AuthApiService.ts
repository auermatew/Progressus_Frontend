import api from './apiService';

const register = async (data: { fullName: string; email: string; password: string }) => {
  const res = await api.post('/api/v1/auth/registration', data);
  return { token: res.data.token };
};

const login = async (data: { email: string; password: string }) => {
  const res = await api.post('/api/v1/auth/login', data);
  return { token: res.data.token };
};

const getUser = async (token: string) => {
  const res = await api.get('/api/v1/auth/authenticate', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const becomeTeacher = async (data: { contactEmail: string; contactPhone: string }) => {
  await api.post('/api/v1/teachers/teacher/registration', data);
};

export default {
  register,
  login,
  getUser,
  becomeTeacher,
};
