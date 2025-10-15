import React, { useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import {
  Wrench,
  AlertTriangle,
  FileText,
  ClipboardList,
  History as HistoryIcon,
  Package,
  LogOut,
} from "lucide-react";
import "../../styles/SCTechnicianDashboard.css";
import WorkOrders from "./WorkOrders";
import RecallOrdersTab from "./RecallOrdersTab";
import ClaimsTab from "./ClaimsTab";
import WarrantyLookup from "./WarrantyLookup";
import History from "../Shared/History";
import Inventory from "../Shared/Inventory";
import authService from "../../services/authService";

const SCTechnicianDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("work-orders");
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
    <div className="sc-tech-dashboard">
      {/* Header */}
      <div className="dashboard-header d-flex justify-content-between align-items-center">
        <div>
          <h2>
            <Wrench className="me-2" size={28} />
            Hệ thống bảo hành xe điện
          </h2>
          <div className="user-info">
            <span>{user?.username || "Trần Văn B"}</span>
            <span className="separator">•</span>
            <span>SC Technician</span>
            <span className="separator">•</span>
            <span>Trung tâm Hà Nội</span>
          </div>
        </div>
        <button className="btn btn-logout" onClick={handleLogout}>
          <LogOut size={16} className="me-1" />
          Đăng xuất
        </button>
      </div>

      {/* Navigation Tabs */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <div className="dashboard-nav">
          <Nav className="nav-tabs-custom">
            <Nav.Item>
              <Nav.Link eventKey="work-orders">
                <Wrench size={18} />
                Công việc
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="recall">
                <AlertTriangle size={18} />
                Recall
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="claims">
                <FileText size={18} />
                Claims
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="warranty-lookup">
                <ClipboardList size={18} />
                Tra cứu bảo hành
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="history">
                <HistoryIcon size={18} />
                Lịch sử bảo hành
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="inventory">
                <Package size={18} />
                Kho hàng
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {/* Tab Content */}
        <div className="dashboard-content">
          <Tab.Content>
            <Tab.Pane eventKey="work-orders">
              <WorkOrders />
            </Tab.Pane>
            <Tab.Pane eventKey="recall">
              <RecallOrdersTab />
            </Tab.Pane>
            <Tab.Pane eventKey="claims">
              <ClaimsTab />
            </Tab.Pane>
            <Tab.Pane eventKey="warranty-lookup">
              <WarrantyLookup />
            </Tab.Pane>
            <Tab.Pane eventKey="history">
              <History role="SC_TECHNICIAN" />
            </Tab.Pane>
            <Tab.Pane eventKey="inventory">
              <Inventory />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
};

export default SCTechnicianDashboard;
