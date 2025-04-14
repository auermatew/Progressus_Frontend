import api from './apiService';

export const SubjectApiService = {
  getAll: async (page = 0, size = 15) => {
    const res = await api.get(`/api/v1/subjects/all?page=${page}&size=${size}`);
    return res.data.content;
  },

  getById: async (id: string) => {
    const res = await api.get(`/api/v1/subjects/${id}`);
    return res.data;
  },

  create: async (data: { subjects: { subject: string; isVerified: boolean }[] }) => {
    const res = await api.post(`/api/v1/subjects/create`, data);
    return res.data;
  },

  edit: async (id: string, data: { subject: string; isVerified: boolean }) => {
    const res = await api.patch(`/api/v1/subjects/edit/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    await api.delete(`/api/v1/subjects/delete/${id}`);
  },
};