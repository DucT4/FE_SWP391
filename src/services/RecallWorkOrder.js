import axios from 'axios';
import authService from './authService';

// Tạo record (work order) cho campaignId
export const createRecallWorkOrder = async (campaignId, workOrderData) => {
  try {
    const token = authService.getToken();
    const user = authService.getCurrentUser();
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    headers['X-User-Id'] = user?.userId || 1;
    const url = `http://localhost:8080/api/campaigns/${campaignId}/records`;
    const response = await axios.post(url, workOrderData, { headers });
    return response.data;
  } catch (error) {
    console.error('❌ Create recall work order error:', error.response || error.message);
    throw error;
  }
};
