import api from './apiService';

export const PaymentApiService = {
  getMyBillingDetails: async () => {
    const res = await api.get('/api/v1/billing/user');
    return res.data;
  },

  getTeacherBillingDetails: async (teacherId: string) => {
    const res = await api.get(`/api/v1/billing/teacher/${teacherId}`);
    return res.data;
  },
};
