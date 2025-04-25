import api from './apiService';
import { TeacherClass } from '../schema/teacherClass';

export const TeacherClassApiService = {
  getByTeacherId: async (teacherId: number): Promise<TeacherClass[]> => {
    const res = await api.get(`/api/v1/teacher-classes/teacher/${teacherId}`);
    return res.data;
  },

  getSpecificClass: async (classId: number): Promise<TeacherClass> => {
    const res = await api.get(`/api/v1/teacher-classes/teacher/specific-class/${classId}`);
    return res.data;
  },

  create: async (data: {
    title: string;
    description: string;
    price: number;
    subjects: string[];
  }): Promise<TeacherClass> => {
    const res = await api.post(`/api/v1/teacher-classes/create`, data);
    return res.data;
  },

  edit: async (id: number, data: {
    title?: string;
    description?: string;
    price?: number;
    subjectsToAdd?: string[];
    subjectIdsToRemove?: number[];
  }): Promise<TeacherClass> => {
    const res = await api.patch(`/api/v1/teacher-classes/edit/${id}`, data);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/v1/teacher-classes/delete/${id}`);
  }
};
