import apiClient from './client';

export const adminApi = {
  getDashboard: async () => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  },

  getPendingVerifications: async () => {
    const response = await apiClient.get('/admin/verifications/pending');
    return response.data;
  },

  previewDocumentBlob: async (userId, documentId) => {
    const response = await apiClient.get(`/admin/verifications/${userId}/documents/${documentId}/preview`, {
      responseType: 'blob',
    });
    return response.data;
  },

  updateVerificationStatus: async (userId, { status, reason }) => {
    const payload = { status };
    if (reason && reason.trim()) {
      payload.reason = reason.trim();
    }
    const response = await apiClient.put(`/admin/verifications/${userId}/status`, payload);
    return response.data;
  },

  getAllUsers: async (page = 0, size = 10, search = '', status = '') => {
    const params = { page, size };
    if (search) params.search = search;
    if (status) params.status = status;
    const response = await apiClient.get('/admin/users', { params });
    return response.data;
  },
};
