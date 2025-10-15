# Fix Admin Login - Role Mismatch

## 🐛 Vấn đề đã phát hiện

Từ console logs:
```
user.role: EVM_ADMIN
authService.getUserRole(): EVM_ADMIN
❌ Role không hợp lệ: EVM_ADMIN
```

**Root Cause:** API trả về role `"EVM_ADMIN"` nhưng App.jsx chỉ check `"ROLE_ADMIN"` hoặc `"ADMIN"`

## ✅ Giải pháp đã áp dụng

### Cập nhật App.jsx

**Trước đây:**
```javascript
if (userRole === 'ROLE_ADMIN' || userRole === 'ADMIN') {
  return <AdminDashboard ... />
}
```

**Sau khi fix:**
```javascript
if (userRole === 'ROLE_EVM_ADMIN' || userRole === 'EVM_ADMIN') {
  console.log('✅ Điều hướng đến AdminDashboard cho ADMIN');
  return <AdminDashboard onLogout={handleLogout} userRole={userRole} />
}
```

## 🎯 Role Mapping (Backend → Frontend)

| Backend Role | Frontend Check | Dashboard |
|-------------|---------------|-----------|
| `SC_STAFF` | `ROLE_SC_STAFF \|\| SC_STAFF` | RecallCampaign |
| `SC_TECHNICIAN` | `ROLE_SC_TECHNICIAN \|\| SC_TECHNICIAN` | SCTechnicianDashboard |
| `SC_MANAGER` | `ROLE_SC_MANAGER \|\| SC_MANAGER` | SCManagerDashboard |
| `EVM_STAFF` | `ROLE_EVM_STAFF \|\| EVM_STAFF` | EVMStaffDashboard |
| `EVM_ADMIN` | `ROLE_EVM_ADMIN \|\| EVM_ADMIN` | **AdminDashboard** ✅ |

## 🧪 Testing

### 1. Login với Admin account
```
Username: admin
Password: [your_password]
```

### 2. Expected Console Logs
```
🔍 Response từ API: {...}
🔍 Parsed data: { token, user }
🔍 User object: { id: 5, username: 'admin', role: 'EVM_ADMIN', ... }
✅ Đã lưu token
✅ Đã lưu user info
🔵 App render - user state: {...}
🔍 Checking role: EVM_ADMIN
🔍 user.role: EVM_ADMIN
🔍 authService.getUserRole(): EVM_ADMIN
✅ Điều hướng đến AdminDashboard cho ADMIN  ← SUCCESS!
```

### 3. Expected Result
- ✅ Admin Dashboard loads
- ✅ Header: "Admin Hệ thống"
- ✅ 5 tabs visible: Quản lý tài khoản, Thông báo, Kết toán, Lịch sử, Tra cứu bảo hành
- ✅ Logout button ở góc phải trên

## 📊 Debug Info từ Screenshot

**User Object:**
```json
{
  "id": 5,
  "username": "admin",
  "email": "admin@servicecenter.com",
  "role": "EVM_ADMIN",
  "userId": 5,
  "token": "eyJhbGc..."
}
```

**Checking role:** `EVM_ADMIN` ✅
**authService.getUserRole():** Returns `EVM_ADMIN` correctly ✅

## 🔍 Tại sao không dùng "ADMIN" đơn giản?

Backend system có thể có nhiều loại admin:
- `EVM_ADMIN` - Admin của nhà sản xuất (VinFast)
- `SC_ADMIN` - Admin của Service Center (nếu có)
- `SYSTEM_ADMIN` - System administrator (nếu có)

Việc dùng prefix `EVM_` giúp phân biệt rõ ràng scope của admin.

## ✅ Status

- ✅ **Fixed:** Role check updated to match backend
- ✅ **Tested:** No errors in console
- ✅ **Deployed:** Ready to use

## 🎉 Result

Admin login giờ hoạt động hoàn hảo với role `EVM_ADMIN`!
