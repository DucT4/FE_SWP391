import React, { useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import {
  Briefcase,
  Users,
  ClipboardList,
  History as HistoryIcon,
  Search,
  LogOut,
} from "lucide-react";
import "../../styles/SCManagerDashboard.css";
import ManagerWarrantyRequests from "./ManagerWarrantyRequests";
import ManagerAssignedWork from "./ManagerAssignedWork";
import History from "../Shared/History";
import WarrantyLookup from "../SCTechnician/WarrantyLookup";
import authService from "../../services/authService";

const SCManagerDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("warranty-requests");
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
    <div className="sc-manager-dashboard">
      {/* Header */}
      <div className="manager-dashboard-header d-flex justify-content-between align-items-center">
        <div>
          <h2>
            <Briefcase className="me-2" size={28} />
            Hệ thống bảo hành xe điện
          </h2>
          <div className="manager-user-info">
            <span>{user?.username || "Lê Thị C"}</span>
            <span className="separator">•</span>
            <span>SC Manager</span>
            <span className="separator">•</span>
            <span>Trung tâm Hà Nội</span>
          </div>
        </div>
        <button className="btn manager-btn-logout" onClick={handleLogout}>
          <LogOut size={16} className="me-1" />
          Đăng xuất
        </button>
      </div>

      {/* Navigation Tabs */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <div className="manager-dashboard-nav">
          <Nav className="manager-nav-tabs-custom">
            <Nav.Item>
              <Nav.Link eventKey="warranty-requests">
                <ClipboardList size={18} />
                Yêu cầu bảo hành
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="assigned-work">
                <Users size={18} />
                Công việc đã phân công
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="warranty-lookup">
                <Search size={18} />
                Tra cứu bảo hành
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="history">
                <HistoryIcon size={18} />
                Lịch sử bảo hành
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {/* Tab Content */}
        <div className="manager-dashboard-content">
          <Tab.Content className="manager-tab-content">
            <Tab.Pane eventKey="warranty-requests">
              <ManagerWarrantyRequests />
            </Tab.Pane>
            <Tab.Pane eventKey="assigned-work">
              <ManagerAssignedWork />
            </Tab.Pane>
            <Tab.Pane eventKey="warranty-lookup">
              <WarrantyLookup />
            </Tab.Pane>
            <Tab.Pane eventKey="history">
              <History role="SC_MANAGER" />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
};

export default SCManagerDashboard;
