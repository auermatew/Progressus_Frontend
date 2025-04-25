import api from './apiService';
import { TeacherClassLesson } from '../schema/lesson';

export const LessonApiService = {
  getLessonsForTeacher: async (teacherId: number): Promise<TeacherClassLesson[]> => {
    const res = await api.get(`/api/v1/teacher-class-lessons/teacher/${teacherId}`);
    return res.data;
  },

  getLessonsByClass: async (teacherClassId: number): Promise<TeacherClassLesson[]> => {
    const res = await api.get(`/api/v1/teacher-class-lessons/lessons-by/${teacherClassId}`);
    return res.data;
  },

  getLessonsByCalendar: async (
    teacherId: number,
    startDate: string,
    endDate: string
  ): Promise<TeacherClassLesson[]> => {
    const res = await api.get(`/api/v1/teacher-class-lessons/calendar`, {
      params: { teacherId, startDate, endDate },
    });
    return res.data;
  },

  createLesson: async (data: {
    teacherClassId: number;
    startDate: string;
    endDate: string;
  }) => {
    const res = await api.post(`/api/v1/teacher-class-lessons/create`, data);
    return res.data;
  },

  reserveLesson: async (lessonId: number) => {
    await api.post(`/api/v1/teacher-class-lessons/reserve/${lessonId}`);
  },

  handleReservation: async (reservationId: number, accepted: boolean) => {
    await api.post(`/api/v1/teacher-class-lessons/reservation/${reservationId}/${accepted}`);
  },

  deleteLesson: async (lessonId: number) => {
    await api.delete(`/api/v1/teacher-class-lessons/delete/${lessonId}`);
  },
};
