import axios from 'axios';
import authService from './authService';

// Base URL của API backend
const API_BASE_URL = 'http://localhost:8080/api';

// Tạo axios instance với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để tự động thêm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý lỗi response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      authService.logout();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

const accountService = {
  /**
   * Lấy thông tin tài khoản hiện tại
   * @returns {Promise}
   */
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/account/profile');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  /**
   * Cập nhật thông tin tài khoản
   * @param {Object} data - Dữ liệu cập nhật
   * @returns {Promise}
   */
  updateProfile: async (data) => {
    try {
      const response = await axiosInstance.put('/account/profile', data);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  /**
   * Đổi mật khẩu
   * @param {string} oldPassword - Mật khẩu cũ
   * @param {string} newPassword - Mật khẩu mới
   * @returns {Promise}
   */
  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await axiosInstance.post('/account/change-password', {
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      if (error.response?.status === 400) {
        throw new Error('Mật khẩu cũ không chính xác');
      }
      throw new Error('Đổi mật khẩu thất bại. Vui lòng thử lại sau.');
    }
  },

  /**
   * Lấy danh sách tất cả users (Admin only)
   * @returns {Promise}
   */
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get('/users');
      return response.data;
    } catch (error) {
      console.error('Get all users error:', error);
      throw error;
    }
  },

  /**
   * Tạo user mới (Admin only)
   * @param {Object} userData - Dữ liệu user mới
   * @returns {Promise}
   */
  createUser: async (userData) => {
    try {
      const response = await axiosInstance.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  },

  /**
   * Cập nhật thông tin user (Admin only)
   * @param {number} userId - ID của user
   * @param {Object} userData - Dữ liệu cập nhật
   * @returns {Promise}
   */
  updateUser: async (userId, userData) => {
    try {
      const response = await axiosInstance.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  },

  /**
   * Xóa user (Admin only)
   * @param {number} userId - ID của user
   * @returns {Promise}
   */
  deleteUser: async (userId) => {
    try {
      const response = await axiosInstance.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  },
};

export default accountService;
