import api from './apiService';

export const LessonApiService = {
  getLessonsByDateInterval: async (teacherId: number, startDate: string, endDate: string) => {
    const res = await api.get(`/api/v1/teacher-class-lessons/calendar`, {
      params: {
        teacherId,
        startDate,
        endDate,
      },
    });
    return res.data;
  },
};
