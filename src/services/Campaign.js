import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:8080/api/campaigns';

export const createCampaign = async (campaignData) => {
  try {
    // Lấy token và user từ authService (đã login)
    const token = authService.getToken();
    const user = authService.getCurrentUser(); // { userId, username, role, ... }

    // Chuẩn bị body
    const { createdBy, ...body } = campaignData;

    // Tạo headers
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    headers['X-User-Id'] = user?.userId || 5;

    // Gửi request
    const response = await axios.post(API_URL, body, { headers });
    return response.data;
  } catch (error) {
    console.error('❌ Create campaign error:', error.response || error.message);
    throw error;
  }
};