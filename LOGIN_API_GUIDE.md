# Hướng dẫn Call API Login và Điều hướng theo Role

## 🎯 Tổng quan

Hệ thống đã được cấu hình để:
1. ✅ Gọi API login từ backend Spring Boot
2. ✅ Lưu token và thông tin user vào localStorage
3. ✅ Tự động điều hướng đến trang RecallCampaign cho user có role SC_STAFF
4. ✅ Xử lý các trường hợp lỗi và bảo mật

---

## 📁 Cấu trúc File

### 1. **authService.js** - Service xử lý authentication
**Đường dẫn:** `/src/services/authService.js`

**Chức năng chính:**
- `login(username, password)` - Gọi API đăng nhập
- `logout()` - Đăng xuất và xóa token
- `getCurrentUser()` - Lấy thông tin user hiện tại
- `isAuthenticated()` - Kiểm tra đã đăng nhập chưa
- `getToken()` - Lấy JWT token
- `getUserRole()` - Lấy role của user
- `hasRole(role)` - Kiểm tra user có role cụ thể
- `hasAnyRole(roles)` - Kiểm tra user có một trong các role

**Cấu hình API:**
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### 2. **Login.jsx** - Component trang đăng nhập
**Đường dẫn:** `/src/components/Login.jsx`

**Flow xử lý:**
1. User nhập username và password
2. Submit form → gọi `authService.login()`
3. Nếu thành công → gọi `onLogin(response)` callback
4. Nếu lỗi → hiển thị thông báo lỗi

### 3. **App.jsx** - Main component xử lý routing
**Đường dẫn:** `/src/App.jsx`

**Logic điều hướng theo role:**
```javascript
// ROLE_SC_STAFF → RecallCampaign
if (userRole === 'ROLE_SC_STAFF') {
  return <RecallCampaign onLogout={handleLogout} userRole={userRole} />
}

// Tương tự cho các role khác
```

---

## 🔐 Flow Đăng Nhập

### 1. User nhập thông tin
```
Username: staff01
Password: 123456
```

### 2. Gọi API Login
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "staff01",
  "password": "123456"
}
```

### 3. Response từ Backend
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "username": "staff01",
  "role": "ROLE_SC_STAFF"
}
```

### 4. Lưu vào localStorage
```javascript
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify({
  userId,
  username,
  role
}));
```

### 5. Điều hướng theo Role
- **ROLE_SC_STAFF** → RecallCampaign
- **ROLE_SC_TECHNICIAN** → RecallCampaign
- **ROLE_SC_MANAGER** → RecallCampaign
- **ROLE_EVM_STAFF** → RecallCampaign

---

## 🧪 Test Đăng Nhập

### Tài khoản Test (theo database)

#### 1. SC_STAFF (Nhân viên trung tâm dịch vụ)
```
Username: staff01
Password: 123456
Role: ROLE_SC_STAFF
```

#### 2. SC_TECHNICIAN (Kỹ thuật viên)
```
Username: tech01
Password: 123456
Role: ROLE_SC_TECHNICIAN
```

#### 3. SC_MANAGER (Quản lý trung tâm)
```
Username: manager01
Password: 123456
Role: ROLE_SC_MANAGER
```

#### 4. EVM_STAFF (Nhân viên nhà sản xuất)
```
Username: evm_staff01
Password: 123456
Role: ROLE_EVM_STAFF
```

---

## 🚀 Chạy Ứng Dụng

### 1. Start Backend (Spring Boot)
```bash
cd "/Users/letu/Documents/FE_SWP391/SWP391_02 copy"
./mvnw spring-boot:run
```
Backend sẽ chạy tại: `http://localhost:8080`

### 2. Start Frontend (React + Vite)
```bash
cd /Users/letu/Documents/FE_SWP391
npm run dev
```
Frontend sẽ chạy tại: `http://localhost:5177`

### 3. Test Login
1. Mở browser: `http://localhost:5177`
2. Nhập username: `staff01`
3. Nhập password: `123456`
4. Click "Đăng nhập"
5. Nếu thành công → tự động chuyển sang trang RecallCampaign

---

## 🔧 Xử Lý Lỗi

### 1. Lỗi 401 - Sai username/password
```javascript
throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác');
```

### 2. Lỗi 403 - Tài khoản bị khóa
```javascript
throw new Error('Tài khoản của bạn đã bị khóa');
```

### 3. Lỗi kết nối
```javascript
throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối.');
```

### 4. Token hết hạn (401 Unauthorized)
- Tự động xóa token và user khỏi localStorage
- Redirect về trang login

---

## 🔒 Bảo Mật

### 1. JWT Token trong Header
Mọi request sau khi login đều tự động gửi kèm token:
```javascript
Authorization: Bearer <token>
```

### 2. Axios Interceptor
```javascript
// Request Interceptor - Tự động thêm token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor - Xử lý lỗi 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
```

---

## 📝 Sử Dụng authService trong Component

### Kiểm tra đã đăng nhập
```javascript
import authService from '../services/authService';

if (authService.isAuthenticated()) {
  console.log('User đã đăng nhập');
}
```

### Lấy thông tin user
```javascript
const user = authService.getCurrentUser();
console.log(user.username, user.role);
```

### Kiểm tra role
```javascript
if (authService.hasRole('ROLE_SC_STAFF')) {
  console.log('User là SC_STAFF');
}

// Hoặc kiểm tra nhiều role
if (authService.hasAnyRole(['ROLE_SC_STAFF', 'ROLE_SC_MANAGER'])) {
  console.log('User là SC_STAFF hoặc SC_MANAGER');
}
```

### Đăng xuất
```javascript
authService.logout();
// Sau đó có thể redirect về login page
```

---

## 🎨 UI Features

### Login Form
- ✅ Hiển thị/ẩn mật khẩu
- ✅ Loading spinner khi đang đăng nhập
- ✅ Error alert khi có lỗi
- ✅ Disable form khi đang xử lý
- ✅ Remember me checkbox
- ✅ Responsive design

### RecallCampaign Page
- ✅ Hiển thị thông tin user
- ✅ Nút logout
- ✅ Quản lý chiến dịch recall
- ✅ Thông báo

---

## 📱 Responsive Design

Giao diện đã được tối ưu cho:
- 📱 Mobile (xs, sm)
- 💻 Tablet (md)
- 🖥️ Desktop (lg, xl)

---

## 🐛 Debug

### Xem log trong Console
```javascript
// authService.js đã có console.log
console.log('Đăng nhập thành công:', response);
console.error('Login error:', error);
```

### Kiểm tra localStorage
```javascript
// Trong Browser Console
localStorage.getItem('token')
localStorage.getItem('user')
```

### Network Tab
Kiểm tra request/response trong DevTools → Network:
- Request URL: `http://localhost:8080/api/auth/login`
- Request Method: `POST`
- Status: `200 OK` (thành công) hoặc `401` (lỗi)

---

## ✅ Checklist

- [x] Cài đặt axios: `npm install axios`
- [x] Tạo authService.js với các method cần thiết
- [x] Tạo Account.js cho các API khác
- [x] Cấu hình Login.jsx để gọi API
- [x] Cấu hình App.jsx để routing theo role
- [x] Xử lý lỗi và hiển thị thông báo
- [x] Tự động thêm token vào header
- [x] Xử lý token hết hạn
- [x] Test với tài khoản ROLE_SC_STAFF

---

## 📚 Tài Liệu Tham Khảo

- Backend API Docs: `HUONG_DAN_TEST_API_EVM.md`
- React Bootstrap: https://react-bootstrap.github.io/
- Axios: https://axios-http.com/
- Vite: https://vitejs.dev/

---

**Tạo bởi:** GitHub Copilot
**Ngày:** October 13, 2025
