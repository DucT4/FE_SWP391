import { useState, useEffect } from 'react'
import Login from './components/Login'
import SCStaffDashboard from './components/SC_STAFF/SCStaffDashboard'
import authService from './services/authService'
import './App.css'
import History from './components/Shared/History'
import SCTechnicianDashboard from './components/SCTechnician/SCTechnicianDashboard'
import SCManagerDashboard from './components/SCManager/SCManagerDashboard'
import EVMStaffDashboard from './components/EVMStaff/EVMStaffDashboard'
import AdminDashboard from './components/Admin/AdminDashboard'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  console.log('🔵 App render - user state:', user);

  // Kiểm tra user đã đăng nhập chưa khi app khởi động
  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (userData) => {
    // userData có cấu trúc: { token: "...", userId, username, role }
    console.log('🔵 App.jsx - handleLogin được gọi với data:', userData);
    console.log('🔵 userData.role:', userData.role);
    setUser(userData)
    console.log('✅ App.jsx - setUser đã được gọi');
    
    // Force re-render bằng cách log state ngay sau khi set
    setTimeout(() => {
      console.log('🔍 User state sau 100ms:', userData);
    }, 100);
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
  }

  // Đang kiểm tra trạng thái đăng nhập
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  // Chưa đăng nhập => hiển thị trang Login
  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  // Đã đăng nhập => routing theo role
  const userRole = user.role || authService.getUserRole()
  
  console.log('🔍 Checking role:', userRole);
  console.log('🔍 user object:', user);
  console.log('🔍 user.role:', user.role);
  console.log('🔍 authService.getUserRole():', authService.getUserRole());
  
  // ROLE_SC_STAFF hoặc SC_STAFF (Nhân viên trung tâm dịch vụ)
  if (userRole === 'ROLE_SC_STAFF' || userRole === 'SC_STAFF') {
    console.log('✅ Điều hướng đến SCStaffDashboard cho SC_STAFF');
    return <SCStaffDashboard onLogout={handleLogout} userRole={userRole} />
  }
  
  // ROLE_SC_TECHNICIAN hoặc SC_TECHNICIAN (Kỹ thuật viên trung tâm dịch vụ)
  if (userRole === 'ROLE_SC_TECHNICIAN' || userRole === 'SC_TECHNICIAN') {
    console.log('✅ Điều hướng đến SCTechnicianDashboard cho SC_TECHNICIAN');
    return <SCTechnicianDashboard onLogout={handleLogout} userRole={userRole} />
  }
  
  // ROLE_SC_MANAGER hoặc SC_MANAGER (Quản lý trung tâm dịch vụ)
  if (userRole === 'ROLE_SC_MANAGER' || userRole === 'SC_MANAGER') {
    console.log('✅ Điều hướng đến SCManagerDashboard cho SC_MANAGER');
    return <SCManagerDashboard onLogout={handleLogout} userRole={userRole} />
  }
  
  // ROLE_EVM_STAFF hoặc EVM_STAFF (Nhân viên nhà sản xuất)
  if (userRole === 'ROLE_EVM_STAFF' || userRole === 'EVM_STAFF') {
    console.log('✅ Điều hướng đến EVMStaffDashboard cho EVM_STAFF');
    return <EVMStaffDashboard onLogout={handleLogout} userRole={userRole} />
  }
  
  // ROLE_ADMIN hoặc ADMIN (Quản trị viên hệ thống)
  if (userRole === 'ROLE_EVM_ADMIN' || userRole === 'EVM_ADMIN') {
    console.log('✅ Điều hướng đến AdminDashboard cho ADMIN');
    return <AdminDashboard onLogout={handleLogout} userRole={userRole} />
  }

  // Không có role hợp lệ => logout
  console.error('❌ Role không hợp lệ:', userRole);
  authService.logout()
  return <Login onLogin={handleLogin} />
}

export default App

