import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CheckCircle, Clock, FileText } from "lucide-react";
import "../../styles/WorkOrders.css";

const WorkOrders = () => {
  // Mock data - Công việc bảo hành
  const warrantyWorks = [
    {
      id: "WO001",
      status: "in-progress",
      statusText: "Đang làm",
      title: "Thay thế module BMS",
      car: "VinFast VF 8 - 1HGBH41JXMN109186",
      customer: "Nguyễn Văn X",
      phone: "0901234567",
      requestId: "WR001",
      estimatedCost: "15.000.000 VND",
      deliveryDate: "21/9/2024",
      deadline: "25/9/2024",
      note: "Khách hàng yêu cầu hoàn thành sớm",
    },
  ];

  // Mock data - Đơn recall
  const recallWorks = [
    {
      id: "RO001",
      status: "completed",
      statusText: "Hoàn thành",
      title: "Cập nhật firmware BMS lên phiên bản 2.1.5",
      car: "VinFast VF 8 - 1HGBH41JXMN109186",
      customer: "Nguyễn Văn A",
      phone: "0901234567",
      assignedDate: "15/9/2024",
      deadline: "16/9/2024",
      completedDate: "16/9/2024",
    },
  ];

  const renderStatusBadge = (status, text) => {
    return <span className={`status-badge ${status}`}>{text}</span>;
  };

  return (
    <Container fluid className="work-orders-container">
      {/* Stats Cards */}
      <Row className="stats-row g-3">
        <Col md={4}>
          <div className="stat-card">
            <h6>Được giao</h6>
            <div className="stat-number">0</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card">
            <h6>Đang thực hiện</h6>
            <div className="stat-number">1</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card">
            <h6>Đã hoàn thành</h6>
            <div className="stat-number">1</div>
          </div>
        </Col>
      </Row>

      {/* Công việc của tôi - Công việc bảo hành */}
      <div className="work-section">
        <div className="section-header">
          <div>
            <h5>Công việc của tôi</h5>
            <p className="section-subtitle">
              Công việc được phân công bởi Manager
            </p>
          </div>
        </div>

        {warrantyWorks.length > 0 ? (
          warrantyWorks.map((work) => (
            <div key={work.id} className="work-item-card">
              <div className="work-item-header">
                <div className="work-id-badge">
                  {work.id}
                  {renderStatusBadge(work.status, work.statusText)}
                </div>
              </div>

              <h6 className="work-item-title">{work.title}</h6>
              <p className="work-item-subtitle">{work.car}</p>

              <div className="work-item-details">
                <div className="detail-item">
                  <span className="detail-label">Yêu cầu bảo hành:</span>
                  <span className="detail-value">{work.requestId}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Khách hàng:</span>
                  <span className="detail-value">{work.customer}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">SĐT:</span>
                  <span className="detail-value">{work.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Ngày giao:</span>
                  <span className="detail-value">{work.deliveryDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Bắt dầu:</span>
                  <span className="detail-value">{work.deadline}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Chi phí đã duyệt:</span>
                  <span className="detail-value highlight">
                    {work.estimatedCost}
                  </span>
                </div>
              </div>

              {work.note && (
                <div className="work-item-note">
                  <strong>Ghi chú:</strong> {work.note}
                </div>
              )}

              <div className="action-buttons">
                <button className="btn btn-action btn-outline-secondary">
                  Tạm dừng
                </button>
                <button className="btn btn-action btn-primary">
                  Hoàn thành
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FileText />
            <h5>Chưa có công việc bảo hành</h5>
            <p>Công việc sẽ hiển thị khi được phân công</p>
          </div>
        )}
      </div>

      {/* Đơn Recall của tôi */}
      <div className="work-section">
        <div className="section-header">
          <div>
            <h5>Đơn Recall của tôi</h5>
            <p className="section-subtitle">
              Đơn recall được phân công bởi SC Staff
            </p>
          </div>
        </div>

        {recallWorks.length > 0 ? (
          recallWorks.map((work) => (
            <div key={work.id} className="work-item-card">
              <div className="work-item-header">
                <div className="work-id-badge">
                  {work.id}
                  {renderStatusBadge(work.status, work.statusText)}
                </div>
              </div>

              <h6 className="work-item-title">{work.title}</h6>
              <p className="work-item-subtitle">{work.car}</p>

              <div className="work-item-details">
                <div className="detail-item">
                  <span className="detail-label">Khách hàng:</span>
                  <span className="detail-value">{work.customer}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">SĐT:</span>
                  <span className="detail-value">{work.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Ngày giao:</span>
                  <span className="detail-value">{work.assignedDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Bắt đầu:</span>
                  <span className="detail-value">{work.deadline}</span>
                </div>
              </div>

              {work.completedDate && (
                <div className="work-item-note" style={{ backgroundColor: "#d1f4e0", color: "#0f5132" }}>
                  <strong>Hoàn thành:</strong> {work.completedDate}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FileText />
            <h5>Chưa có đơn recall</h5>
            <p>Đơn recall sẽ hiển thị khi được phân công</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default WorkOrders;
