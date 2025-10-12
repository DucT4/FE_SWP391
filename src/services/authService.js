import axios from 'axios';

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
    const token = localStorage.getItem('token');
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
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Có thể redirect về trang login nếu cần
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

const authService = {
  /**
   * Đăng nhập
   * @param {string} username - Tên đăng nhập
   * @param {string} password - Mật khẩu
   * @returns {Promise} Response chứa token và thông tin user
   */
  login: async (username, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        username,
        password,
      });

      console.log('🔍 Response từ API:', response);
      console.log('🔍 Response.data:', response.data);

      // Backend trả về: { token: "...", user: { id, username, role, ... } }
      const { token, user } = response.data;
      
      console.log('🔍 Parsed data:', { token, user });
      console.log('🔍 User object:', user);

      // Lưu token và thông tin user vào localStorage
      if (token && user) {
        console.log('🟢 Token và user tồn tại, bắt đầu lưu vào localStorage...');
        
        try {
          localStorage.setItem('token', token);
          console.log('✅ Đã lưu token');
          
          localStorage.setItem('user', JSON.stringify({
            userId: user.id,
            username: user.username,
            role: user.role,
            email: user.email,
          }));
          console.log('✅ Đã lưu user info');
          
          const savedUser = localStorage.getItem('user');
          console.log('🔍 Verify - User đã lưu:', savedUser);
          
        } catch (storageError) {
          console.error('❌ Lỗi khi lưu vào localStorage:', storageError);
        }
      } else {
        console.error('❌ Không có token hoặc user trong response!');
      }

      // Return data với cấu trúc flat để dễ sử dụng
      return {
        token,
        userId: user?.id,
        username: user?.username,
        role: user?.role,
        email: user?.email,
        user: user, // Giữ lại user object gốc nếu cần
      };
    } catch (error) {
      console.error('Login error:', error);
      
      // Xử lý các loại lỗi khác nhau
      if (error.response) {
        // Server trả về lỗi
        if (error.response.status === 401) {
          throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác');
        } else if (error.response.status === 403) {
          throw new Error('Tài khoản của bạn đã bị khóa');
        } else {
          throw new Error(error.response.data?.message || 'Đăng nhập thất bại');
        }
      } else if (error.request) {
        // Request được gửi nhưng không nhận được response
        throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối.');
      } else {
        // Lỗi khác
        throw new Error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      }
    }
  },

  /**
   * Đăng xuất
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Lấy thông tin user đang đăng nhập
   * @returns {Object|null} Thông tin user hoặc null nếu chưa đăng nhập
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  /**
   * Kiểm tra user đã đăng nhập chưa
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Lấy token hiện tại
   * @returns {string|null}
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Lấy role của user hiện tại
   * @returns {string|null}
   */
  getUserRole: () => {
    const user = authService.getCurrentUser();
    return user?.role || null;
  },

  /**
   * Kiểm tra user có role cụ thể không
   * @param {string} role - Role cần kiểm tra (VD: 'ROLE_SC_STAFF')
   * @returns {boolean}
   */
  hasRole: (role) => {
    const userRole = authService.getUserRole();
    return userRole === role;
  },

  /**
   * Kiểm tra user có một trong các role được chỉ định không
   * @param {string[]} roles - Mảng các role cần kiểm tra
   * @returns {boolean}
   */
  hasAnyRole: (roles) => {
    const userRole = authService.getUserRole();
    return roles.includes(userRole);
  },
};

export default authService;
