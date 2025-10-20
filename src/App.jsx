import { useState, useEffect } from "react";
import Login from "./components/Login";
import SCStaffDashboard from "./components/SC_STAFF/SCStaffDashboard";
import authService from "./services/authService";
import "./App.css";
import SCTechnicianDashboard from "./components/SCTechnician/SCTechnicianDashboard";
import SCManagerDashboard from "./components/SCManager/SCManagerDashboard";
import EVMStaffDashboard from "./components/EVMStaff/EVMStaffDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("🔵 App render - user state:", user);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) setUser(currentUser);
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    console.log("🔵 handleLogin:", userData);
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) return <Login onLogin={handleLogin} />;

  const userRole = user.role || authService.getUserRole();

  console.log("🔍 Checking role:", userRole);

  if (userRole === "ROLE_SC_STAFF" || userRole === "SC_STAFF")
    return <SCStaffDashboard onLogout={handleLogout} userRole={userRole} />;

  if (userRole === "ROLE_SC_TECHNICIAN" || userRole === "SC_TECHNICIAN")
    return <SCTechnicianDashboard onLogout={handleLogout} userRole={userRole} />;

  if (userRole === "ROLE_SC_MANAGER" || userRole === "SC_MANAGER")
    return <SCManagerDashboard onLogout={handleLogout} userRole={userRole} />;

  if (userRole === "ROLE_EVM_STAFF" || userRole === "EVM_STAFF")
    return <EVMStaffDashboard onLogout={handleLogout} userRole={userRole} />;

  if (userRole === "ROLE_EVM_ADMIN" || userRole === "EVM_ADMIN")
    return <AdminDashboard onLogout={handleLogout} userRole={userRole} />;

  console.error("❌ Role không hợp lệ:", userRole);
  authService.logout();
  return <Login onLogin={handleLogin} />;
}

export default App;
