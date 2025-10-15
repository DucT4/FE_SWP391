import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { DollarSign, Building } from "lucide-react";
import "../../styles/AdminFinance.css";

const AdminFinance = () => {
  // Mock data - Thống kê chi phí theo trung tâm
  const centerFinances = [
    {
      id: 1,
      name: "Trung tâm TP.HCM",
      code: "SC002",
      totalCost: "12.000.000 đ",
      totalClaims: 1,
      approved: 0,
      pending: 1,
      approvedCost: "0 đ",
    },
    {
      id: 2,
      name: "Trung tâm Hà Nội",
      code: "SC001",
      totalCost: "15.000.000 đ",
      totalClaims: 2,
      approved: 1,
      pending: 1,
      approvedCost: "3.000.000 đ",
    },
  ];

  const totalApprovedCost = 3000000;
  const totalPendingCost = 15000000;

  return (
    <Container fluid className="admin-finance">
      {/* Header */}
      <div className="admin-finance-header">
        <h4>Kết toán theo Trung tâm</h4>
        <p className="admin-finance-subtitle">
          Tổng hợp chi phí bảo hành và recall của các trung tâm
        </p>
      </div>

      {/* Stats Cards */}
      <Row className="finance-stats g-3 mb-4">
        <Col md={3}>
          <div className="finance-stat-card">
            <h6>Tổng Claims</h6>
            <div className="finance-stat-number">2</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="finance-stat-card">
            <h6>Đã duyệt</h6>
            <div className="finance-stat-number">1</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="finance-stat-card">
            <h6>Tổng chi phí</h6>
            <div className="finance-stat-number">15.000.000 đ</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="finance-stat-card">
            <h6>Đã duyệt</h6>
            <div className="finance-stat-number success">
              {totalApprovedCost.toLocaleString("vi-VN")} đ
            </div>
          </div>
        </Col>
      </Row>

      {/* Center Finance List */}
      <div>
        <h5 className="mb-3" style={{ fontWeight: 600 }}>
          Chi phí theo Trung tâm
        </h5>

        {centerFinances.map((center) => (
          <div key={center.id} className="center-finance-card">
            <div className="center-finance-header">
              <div className="center-name">
                <Building size={20} />
                {center.name}
                <span className="center-code">{center.code}</span>
              </div>
              <div className="center-total-cost">{center.totalCost}</div>
            </div>

            <div className="center-stats-row">
              <div className="center-stat-item">
                <div className="center-stat-label">Tổng Claims</div>
                <div className="center-stat-value">{center.totalClaims}</div>
              </div>
              <div className="center-stat-item">
                <div className="center-stat-label">Đã duyệt</div>
                <div className="center-stat-value approved">
                  {center.approved}
                </div>
              </div>
              <div className="center-stat-item">
                <div className="center-stat-label">Chờ duyệt</div>
                <div className="center-stat-value pending">{center.pending}</div>
              </div>
              <div className="center-stat-item">
                <div className="center-stat-label">Chi phí đã duyệt</div>
                <div className="center-stat-value approved">
                  {center.approvedCost}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AdminFinance;
