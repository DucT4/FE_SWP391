import { useState, useEffect } from 'react'
import Login from './components/Login'
import RecallCampaign from './components/RecallCampaign'
import authService from './services/authService'
import './App.css'
import History from './components/History'

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
  
  // ROLE_SC_STAFF hoặc SC_STAFF (Nhân viên trung tâm dịch vụ)
  if (userRole === 'ROLE_SC_STAFF' || userRole === 'SC_STAFF') {
    console.log('✅ Điều hướng đến RecallCampaign cho SC_STAFF');
    return <RecallCampaign onLogout={handleLogout} userRole={userRole} />
  }
  
  // ROLE_SC_TECHNICIAN hoặc SC_TECHNICIAN (Kỹ thuật viên trung tâm dịch vụ)
  if (userRole === 'ROLE_SC_TECHNICIAN' || userRole === 'SC_TECHNICIAN') {
    console.log('✅ Điều hướng đến RecallCampaign cho SC_TECHNICIAN');
    return <RecallCampaign onLogout={handleLogout} userRole={userRole} />
  }
  
  // ROLE_SC_MANAGER hoặc SC_MANAGER (Quản lý trung tâm dịch vụ)
  if (userRole === 'ROLE_SC_MANAGER' || userRole === 'SC_MANAGER') {
    console.log('✅ Điều hướng đến RecallCampaign cho SC_MANAGER');
    return <RecallCampaign onLogout={handleLogout} userRole={userRole} />
  }
  
  // ROLE_EVM_STAFF hoặc EVM_STAFF (Nhân viên nhà sản xuất)
  if (userRole === 'ROLE_EVM_STAFF' || userRole === 'EVM_STAFF') {
    console.log('✅ Điều hướng đến RecallCampaign cho EVM_STAFF');
    // Tạm thời hiển thị RecallCampaign, sau này sẽ tạo trang riêng cho EVM
    return <RecallCampaign onLogout={handleLogout} userRole={userRole} />
  }

  if (userRole === 'ROLE_EVM_STAFF' || userRole === 'EVM_STAFF') {
    console.log('✅ Điều hướng đến RecallCampaign cho EVM_STAFF');
    // Tạm thời hiển thị RecallCampaign, sau này sẽ tạo trang riêng cho EVM
    return <History onLogout={handleLogout} userRole={userRole} />
  }

  // Không có role hợp lệ => logout
  console.error('❌ Role không hợp lệ:', userRole);
  authService.logout()
  return <Login onLogin={handleLogin} />
}

export default App

