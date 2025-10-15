import React, { useState } from "react";
import { Container, Tab, Nav } from "react-bootstrap";
import { Users, Bell, DollarSign, Clock, Search, LogOut } from "lucide-react";
import AdminAccountManagement from "./AdminAccountManagement";
import AdminNotifications from "./AdminNotifications";
import AdminFinance from "./AdminFinance";
import History from "../Shared/History";
import WarrantyLookup from "../SCTechnician/WarrantyLookup";
import authService from "../../services/authService";
import "../../styles/AdminDashboard.css";

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("accounts");

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      authService.logout();
      window.location.href = "/";
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
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

      {/* Tabs Navigation */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs" className="admin-nav-tabs">
          <Nav.Item>
            <Nav.Link eventKey="accounts">
              <Users size={18} />
              Quản lý tài khoản
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="notifications">
              <Bell size={18} />
              Thông báo
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="finance">
              <DollarSign size={18} />
              Kết toán
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="history">
              <Clock size={18} />
              Lịch sử
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="lookup">
              <Search size={18} />
              Tra cứu bảo hành
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Tab Content */}
        <div className="admin-content">
          <Tab.Content>
            <Tab.Pane eventKey="accounts">
              <AdminAccountManagement />
            </Tab.Pane>
            <Tab.Pane eventKey="notifications">
              <AdminNotifications />
            </Tab.Pane>
            <Tab.Pane eventKey="finance">
              <AdminFinance />
            </Tab.Pane>
            <Tab.Pane eventKey="history">
              <History />
            </Tab.Pane>
            <Tab.Pane eventKey="lookup">
              <WarrantyLookup />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
};

export default AdminDashboard;
