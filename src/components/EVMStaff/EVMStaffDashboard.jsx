import React, { useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import {
  Factory,
  ClipboardCheck,
  Search,
  Package,
  History as HistoryIcon,
  LogOut,
} from "lucide-react";
import "../../styles/EVMStaffDashboard.css";
import EVMWarrantyApproval from "./EVMWarrantyApproval";
import WarrantyLookup from "../SCTechnician/WarrantyLookup";
import Inventory from "../Shared/Inventory";
import History from "../Shared/History";
import authService from "../../services/authService";

const EVMStaffDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("warranty-approval");
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
    <div className="evm-staff-dashboard">
      {/* Header */}
      <div className="evm-dashboard-header d-flex justify-content-between align-items-center">
        <div>
          <h2>
            <Factory className="me-2" size={28} />
            Hệ thống bảo hành xe điện
          </h2>
          <div className="evm-user-info">
            <span>{user?.username || "Phạm Văn D"}</span>
            <span className="separator">•</span>
            <span>EVM Staff</span>
            <span className="separator">•</span>
            <span>Nhà sản xuất VinFast</span>
          </div>
        </div>
        <button className="btn evm-btn-logout" onClick={handleLogout}>
          <LogOut size={16} className="me-1" />
          Đăng xuất
        </button>
      </div>

      {/* Navigation Tabs */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <div className="evm-dashboard-nav">
          <Nav className="evm-nav-tabs-custom">
            <Nav.Item>
              <Nav.Link eventKey="warranty-approval">
                <ClipboardCheck size={18} />
                Yêu cầu bảo hành
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="warranty-lookup">
                <Search size={18} />
                Tra cứu bảo hành
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="inventory">
                <Package size={18} />
                Kho hàng
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="history">
                <HistoryIcon size={18} />
                Lịch sử
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {/* Tab Content */}
        <div className="evm-dashboard-content">
          <Tab.Content className="evm-tab-content">
            <Tab.Pane eventKey="warranty-approval">
              <EVMWarrantyApproval />
            </Tab.Pane>
            <Tab.Pane eventKey="warranty-lookup">
              <WarrantyLookup />
            </Tab.Pane>
            <Tab.Pane eventKey="inventory">
              <Inventory />
            </Tab.Pane>
            <Tab.Pane eventKey="history">
              <History role="EVM_STAFF" />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
};

export default EVMStaffDashboard;
