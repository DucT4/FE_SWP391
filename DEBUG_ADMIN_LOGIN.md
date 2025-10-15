# Debug Guide - Admin Login Issue

## 🔍 Vấn đề
Khi login với role ADMIN, không vào được trang AdminDashboard

## ✅ Đã fix
1. **Xóa duplicate code:** Đã xóa đoạn code EVM_STAFF duplicate ở cuối App.jsx
2. **Thêm debug logs:** Thêm console.log chi tiết để trace role value

## 🧪 Testing Steps

### 1. Mở Console Browser
- Mở http://localhost:5176
- F12 → Console tab

### 2. Login với tài khoản Admin
Nhập thông tin đăng nhập admin và xem console logs:

**Các log cần chú ý:**
```
🔍 Response từ API: {...}
🔍 Response.data: {...}
🔍 Parsed data: { token, user }
🔍 User object: { id, username, role, email }
✅ Đã lưu token
✅ Đã lưu user info
🔍 Verify - User đã lưu: {...}
```

**Sau khi login thành công:**
```
🔵 App render - user state: {...}
🔍 Checking role: [ROLE_VALUE]
🔍 user object: {...}
🔍 user.role: [ROLE_VALUE]
🔍 authService.getUserRole(): [ROLE_VALUE]
```

### 3. Kiểm tra Role Format

API có thể trả về role theo 1 trong các format sau:
- ✅ `ADMIN` 
- ✅ `ROLE_ADMIN`
- ❌ `Admin` (nếu khác)

**App.jsx đã handle cả 2 format:**
```javascript
if (userRole === 'ROLE_ADMIN' || userRole === 'ADMIN') {
  return <AdminDashboard ... />
}
```

### 4. Nếu vẫn không vào được

**Check localStorage:**
```javascript
// Trong browser console
localStorage.getItem('user')
localStorage.getItem('token')
```

**Expected output:**
```json
{
  "userId": 1,
  "username": "admin",
  "role": "ADMIN" // hoặc "ROLE_ADMIN"
  "email": "admin@example.com"
}
```

## 🐛 Possible Issues

### Issue 1: Role format không match
**Triệu chứng:** Console log hiển thị role khác `ADMIN` hoặc `ROLE_ADMIN`

**Solution:** Update App.jsx để handle role format từ API
```javascript
// Nếu API trả về "Admin" (capitalize khác)
if (userRole === 'ROLE_ADMIN' || userRole === 'ADMIN' || userRole === 'Admin') {
  return <AdminDashboard ... />
}
```

### Issue 2: Role undefined
**Triệu chứng:** Console log hiển thị `userRole: undefined`

**Solution:** Check API response structure
```javascript
// authService.js - line ~62
const { token, user } = response.data;

// Nếu API trả role ở ngoài user object:
const { token, user, role } = response.data;

// Update return:
return {
  token,
  userId: user?.id,
  username: user?.username,
  role: user?.role || role, // fallback
  ...
}
```

### Issue 3: localStorage không lưu được
**Triệu chứng:** Console có log "✅ Đã lưu user info" nhưng localStorage.getItem('user') = null

**Solution:** 
- Check browser privacy settings
- Disable "Block third-party cookies"
- Try incognito mode

## 📝 Next Steps nếu vẫn lỗi

1. **Copy toàn bộ console logs** khi login
2. **Copy response từ API:** Từ Network tab → auth/login request → Response
3. **Check localStorage:** Run `localStorage.getItem('user')` trong console và copy kết quả

Share 3 thông tin trên để debug tiếp!

## ✅ Expected Behavior

Khi login thành công với Admin role, console sẽ show:
```
✅ Điều hướng đến AdminDashboard cho ADMIN
```

Và trang AdminDashboard sẽ hiển thị với:
- Header: "Admin Hệ thống"
- Tabs: Quản lý tài khoản, Thông báo, Kết toán, Lịch sử, Tra cứu bảo hành
