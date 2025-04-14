import api from './apiService'; // your configured Axios instance
import { CreateTeacherDto, EditTeacherDto } from '../schema/teacher'; // define these types accordingly

export const TeacherApiService = {
  // For STUDENT: Register as a teacher
  registerAsTeacher: async (data: CreateTeacherDto) => {
    const res = await api.post('/api/v1/teachers/teacher/registration', data);
    return res.data;
  },

  // For TEACHER: Edit teacher profile
  editTeacher: async (data: EditTeacherDto) => {
    const res = await api.patch('/api/v1/teachers/teacher/edit', data);
    return res.data;
  },

  // For TEACHER: Delete their own profile
  deleteTeacher: async () => {
    const res = await api.delete('/api/v1/teachers/teacher/delete');
    return res.data;
  },

  // Public: Get teacher by ID
  getTeacherById: async (teacherId: number) => {
    const res = await api.get(`/api/v1/teachers/teacher/${teacherId}`);
    return res.data;
  },

  // Public: Get all teachers 
  getAllTeachers: async (page = 0, size = 15) => {
    const res = await api.get(`/api/v1/teachers/all?page=${page}&size=${size}`);
    return res.data;
  },
};
