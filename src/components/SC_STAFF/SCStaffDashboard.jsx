import React, { useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import {
  AlertTriangle,
  FileText,
  Bell,
  Search,
  Clock,
  LogOut,
} from "lucide-react";
import "../../styles/SCStaffDashboard.css";
import RecallCampaignContent from "./RecallCampaignContent";
import RecallOrders from "./RecallOrders";
import Notifications from "./Notifications";
import Lookup from "../Shared/Lookup";
import History from "../Shared/History";
import authService from "../../services/authService";

const SCStaffDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("campaigns");
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      authService.logout();
      window.location.href = "/";
    }
  };

  return (
    <div className="sc-staff-dashboard">
      {/* Header */}
      <div className="sc-staff-header">
        <div>
          <h2>Hệ thống bảo hành xe điện</h2>
          <p className="sc-staff-info">
            {user?.username} • SC Staff • Trung tâm Hà Nội
          </p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>

      {/* Tabs Navigation */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs" className="sc-staff-nav-tabs">
          <Nav.Item>
            <Nav.Link eventKey="campaigns">
              <AlertTriangle size={18} />
              Chiến dịch Recall
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="orders">
              <FileText size={18} />
              Đơn Recall
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="notifications">
              <Bell size={18} />
              Thông báo
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="lookup">
              <Search size={18} />
              Tra cứu
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="history">
              <Clock size={18} />
              Lịch sử
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Tab Content */}
        <div className="sc-staff-content">
          <Tab.Content>
            <Tab.Pane eventKey="campaigns">
              <RecallCampaignContent />
            </Tab.Pane>
            <Tab.Pane eventKey="orders">
              <RecallOrders />
            </Tab.Pane>
            <Tab.Pane eventKey="notifications">
              <Notifications />
            </Tab.Pane>
            <Tab.Pane eventKey="lookup">
              <Lookup />
            </Tab.Pane>
            <Tab.Pane eventKey="history">
              <History />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
};

export default SCStaffDashboard;
