import api from './apiService';
import { CreateTeacherDto, EditTeacherDto } from '../schema/teacher';

export const TeacherApiService = {
  registerAsTeacher: async (data: CreateTeacherDto) => {
    const res = await api.post('/api/v1/teachers/teacher/registration', data);
    return res.data;
  },

  editTeacher: async (data: EditTeacherDto) => {
    const res = await api.patch('/api/v1/teachers/teacher/edit', data);
    return res.data;
  },

  deleteTeacher: async () => {
    const res = await api.delete('/api/v1/teachers/teacher/delete');
    return res.data;
  },

  getTeacherById: async (teacherId: number) => {
    const res = await api.get(`/api/v1/teachers/teacher/${teacherId}`);
    return res.data;
  },

  get: async () => {
    const res = await api.get('/api/v1/teachers/all');
    return res.data.content || res.data;
  },

  post: async (data: CreateTeacherDto) => {
    const res = await api.post('/api/v1/teachers/teacher/registration', data);
    return res.data;
  },
};
