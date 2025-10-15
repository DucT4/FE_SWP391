# Fix Admin Logout Button

## 🐛 Vấn đề

Nút "Đăng xuất" ở trang Admin không hoạt động được.

## 🔍 Root Cause Analysis

### Code cũ (AdminDashboard.jsx):
```javascript
const AdminDashboard = () => {  // ❌ Không nhận prop onLogout
  const handleLogout = () => {
    localStorage.removeItem("token");  // ❌ Chỉ xóa token
    window.location.href = "/login";   // ❌ Route không tồn tại
  };
```

### Vấn đề:
1. ❌ Component không nhận prop `onLogout` từ App.jsx
2. ❌ Không import `authService`
3. ❌ Chỉ xóa token, không xóa user data
4. ❌ Redirect về `/login` (route không tồn tại trong SPA)
5. ❌ Không clear user state trong App.jsx

### So sánh với các dashboard khác:

**SCTechnicianDashboard (Working):**
```javascript
import authService from "../../services/authService";  // ✅

const SCTechnicianDashboard = ({ onLogout }) => {  // ✅ Nhận prop
  const handleLogout = () => {
    if (onLogout) {
      onLogout();  // ✅ Gọi callback
    } else {
      authService.logout();  // ✅ Fallback
      window.location.href = "/";  // ✅ Redirect về root
    }
  };
```

## ✅ Giải pháp

### 1. Import authService
```javascript
import authService from "../../services/authService";
```

### 2. Nhận prop onLogout
```javascript
const AdminDashboard = ({ onLogout }) => {
```

### 3. Fix handleLogout function
```javascript
const handleLogout = () => {
  if (onLogout) {
    onLogout();  // Gọi callback từ App.jsx
  } else {
    authService.logout();  // Xóa token + user từ localStorage
    window.location.href = "/";  // Redirect về root (login page)
  }
};
```

## 📋 What authService.logout() does:

```javascript
// services/authService.js
logout: () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
```

## 🔄 Flow khi click Đăng xuất:

```
User clicks [Đăng xuất]
  ↓
handleLogout() được gọi
  ↓
onLogout() callback → App.jsx
  ↓
authService.logout()
  - Xóa token
  - Xóa user data
  ↓
setUser(null) trong App.jsx
  ↓
App re-render → user === null
  ↓
Hiển thị <Login /> component
```

## ✅ Fixed Code

**AdminDashboard.jsx:**
```javascript
import React, { useState } from "react";
import { Container, Tab, Nav } from "react-bootstrap";
import { Users, Bell, DollarSign, Clock, Search, LogOut } from "lucide-react";
import AdminAccountManagement from "./AdminAccountManagement";
import AdminNotifications from "./AdminNotifications";
import AdminFinance from "./AdminFinance";
import History from "../Shared/History";
import WarrantyLookup from "../SCTechnician/WarrantyLookup";
import authService from "../../services/authService";  // ✅ Added
import "../../styles/AdminDashboard.css";

const AdminDashboard = ({ onLogout }) => {  // ✅ Added prop
  const [activeTab, setActiveTab] = useState("accounts");

  const handleLogout = () => {  // ✅ Fixed
    if (onLogout) {
      onLogout();
    } else {
      authService.logout();
      window.location.href = "/";
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h2>Admin Hệ thống</h2>
          <p className="admin-role">Quản trị viên</p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>
      {/* ... rest of code */}
    </div>
  );
};
```

## 🧪 Testing

### Test logout flow:
1. ✅ Login với admin account
2. ✅ Admin Dashboard hiển thị
3. ✅ Click nút "Đăng xuất"
4. ✅ localStorage được clear (token + user)
5. ✅ Redirect về Login page
6. ✅ Không thể access admin page nếu chưa login

### Console checks:
```javascript
// Before logout
localStorage.getItem('token')  // Has token
localStorage.getItem('user')   // Has user data

// After logout
localStorage.getItem('token')  // null
localStorage.getItem('user')   // null
```

## 📊 Comparison: Before vs After

| Aspect | Before ❌ | After ✅ |
|--------|----------|---------|
| Import authService | No | Yes |
| Receive onLogout prop | No | Yes |
| Clear token | Yes | Yes |
| Clear user data | No | Yes |
| Update App state | No | Yes |
| Redirect | `/login` (404) | `/` (root) |
| Consistent with other dashboards | No | Yes |

## ✅ Status

- ✅ **Fixed:** AdminDashboard logout now works correctly
- ✅ **Tested:** No console errors
- ✅ **Consistent:** Same pattern as other dashboards
- ✅ **Clean:** Proper cleanup of localStorage and state

## 🎉 Result

Nút đăng xuất giờ hoạt động hoàn hảo! Click → Clear data → Back to login! 🚀
