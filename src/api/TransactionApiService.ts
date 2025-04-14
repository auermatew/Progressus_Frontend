import api from './apiService';

export const TransactionApiService = {
  getIncoming: async (page = 0, size = 15) => {
    const res = await api.get(`/api/v1/transactions/incoming?page=${page}&size=${size}`);
    return res.data.content;
  },

  getOutgoing: async (page = 0, size = 15) => {
    const res = await api.get(`/api/v1/transactions/outgoing?page=${page}&size=${size}`);
    return res.data.content;
  },

  acceptTransaction: async (transactionId: string) => {
    const res = await api.post(`/api/v1/transactions/transaction/${transactionId}/accept`);
    return res.data;
  },
};
