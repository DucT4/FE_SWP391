# Cấu trúc dự án FE_SWP391

## Tổ chức thư mục

### 📁 src/components/

#### 🔵 SC_STAFF (Nhân viên trung tâm dịch vụ)
- `RecallCampaign.jsx` - Quản lý chiến dịch recall
- `RecallOrders.jsx` - Quản lý đơn recall
- `Notifications.jsx` - Xem thông báo

#### 🔵 SCTechnician (Kỹ thuật viên)
- `SCTechnicianDashboard.jsx` - Dashboard chính
- `WorkOrders.jsx` - Công việc được phân công
- `RecallOrdersTab.jsx` - Tab đơn recall
- `ClaimsTab.jsx` - Báo cáo chi phí
- `WarrantyLookup.jsx` - Tra cứu bảo hành

#### 🔵 SCManager (Quản lý trung tâm)
- `SCManagerDashboard.jsx` - Dashboard chính
- `ManagerWarrantyRequests.jsx` - Quản lý yêu cầu bảo hành
- `ManagerAssignedWork.jsx` - Theo dõi công việc đã phân

#### 🔵 EVMStaff (Nhân viên nhà sản xuất)
- `EVMStaffDashboard.jsx` - Dashboard chính
- `EVMWarrantyApproval.jsx` - Duyệt yêu cầu bảo hành

#### 🔵 Admin (Quản trị viên)
- `AdminDashboard.jsx` - Dashboard chính
- `AdminAccountManagement.jsx` - Quản lý tài khoản
- `AdminNotifications.jsx` - Gửi thông báo
- `AdminFinance.jsx` - Kết toán theo trung tâm

#### 🔄 Shared (Components tái sử dụng)
- `History.jsx` - Lịch sử yêu cầu bảo hành & recall
- `Inventory.jsx` - Quản lý kho linh kiện
- `Lookup.jsx` - Tra cứu bảo hành (cũ - dùng cho SC_STAFF)

#### 🔐 Authentication
- `Login.jsx` - Trang đăng nhập

---

### 📁 src/styles/

Tất cả các file CSS được tổ chức trong một thư mục duy nhất:

#### Role-based Dashboard Styles
- `SCTechnicianDashboard.css`
- `SCManagerDashboard.css`
- `EVMStaffDashboard.css`
- `AdminDashboard.css`

#### SC_STAFF Styles
- `RecallCampaign.css`
- `RecallOrders.css`
- `Notifications.css`

#### SCTechnician Styles
- `WorkOrders.css`
- `Claims.css`
- `WarrantyLookup.css`

#### SCManager Styles
- `ManagerWarrantyRequests.css`
- `ManagerAssignedWork.css`

#### EVMStaff Styles
- `EVMWarrantyApproval.css`

#### Admin Styles
- `AdminAccountManagement.css`
- `AdminNotifications.css`
- `AdminFinance.css`

#### Shared Styles
- `History.css`
- `Inventory.css`
- `Lookup.css`
- `Login.css`

---

## 🔄 Import Patterns

### Components trong cùng folder:
```jsx
import Component from './Component';
```

### Components từ Shared:
```jsx
import History from '../Shared/History';
import Inventory from '../Shared/Inventory';
import Lookup from '../Shared/Lookup';
```

### Components từ folder khác:
```jsx
import WarrantyLookup from '../SCTechnician/WarrantyLookup';
```

### CSS Files:
```jsx
// Từ components/ subfolder
import '../../styles/ComponentName.css';

// Từ components/ root
import '../styles/ComponentName.css';
```

### Services:
```jsx
// Từ components/ subfolder
import authService from '../../services/authService';
import api from '../../config/apiConfig';

// Từ components/ root
import authService from '../services/authService';
```

---

## 🎯 Role-based Routing (App.jsx)

- **ADMIN** → AdminDashboard
- **EVM_STAFF** → EVMStaffDashboard
- **SC_MANAGER** → SCManagerDashboard
- **SC_TECHNICIAN** → SCTechnicianDashboard
- **SC_STAFF** → RecallCampaign

---

## 📝 Notes

1. **Shared Components**: History, Inventory, Lookup được tái sử dụng bởi nhiều roles
2. **CSS Organization**: Tất cả CSS files nằm trong `src/styles/` để dễ quản lý
3. **Role-based Access**: Mỗi role có dashboard và components riêng
4. **Modular Architecture**: Components được tổ chức theo chức năng và role

---

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Server chạy tại: http://localhost:5174/
