import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FileText } from "lucide-react";
import "../../styles/RecallOrders.css";

const RecallOrdersTab = () => {
  // Mock data - Đơn recall đã hoàn thành
  const completedRecalls = [
    {
      id: "RO001",
      status: "completed",
      statusText: "Hoàn thành",
      tag: "Cập nhật phần mềm BMS",
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
    return <span className={`recall-status-badge ${status}`}>{text}</span>;
  };

  return (
    <Container fluid className="recall-orders-container">
      {/* Stats Cards */}
      <Row className="recall-stats-row g-3">
        <Col md={4}>
          <div className="recall-stat-card">
            <h6>Chờ duyệt</h6>
            <div className="stat-number">0</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="recall-stat-card">
            <h6>Đã duyệt</h6>
            <div className="stat-number">1</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="recall-stat-card">
            <h6>Từ chối</h6>
            <div className="stat-number">0</div>
          </div>
        </Col>
      </Row>

      {/* Đơn recall đã hoàn thành */}
      <div className="recall-section-header">
        <div>
          <h5>Đơn Recall của tôi</h5>
          <p className="recall-section-subtitle">
            Đơn recall được phân công bởi SC Staff
          </p>
        </div>
      </div>

      {completedRecalls.length > 0 ? (
        completedRecalls.map((recall) => (
          <div key={recall.id} className="recall-item-card">
            <div className="recall-item-header">
              <div className="recall-id-badge">
                {recall.id}
                {renderStatusBadge(recall.status, recall.statusText)}
                {recall.tag && (
                  <span className="recall-status-badge tag">{recall.tag}</span>
                )}
              </div>
            </div>

            <h6 className="recall-item-title">{recall.title}</h6>
            <p className="recall-item-subtitle">{recall.car}</p>

            <div className="recall-item-details">
              <div className="recall-detail-item">
                <span className="recall-detail-label">Khách hàng:</span>
                <span className="recall-detail-value">{recall.customer}</span>
              </div>
              <div className="recall-detail-item">
                <span className="recall-detail-label">SĐT:</span>
                <span className="recall-detail-value">{recall.phone}</span>
              </div>
              <div className="recall-detail-item">
                <span className="recall-detail-label">Ngày giao:</span>
                <span className="recall-detail-value">{recall.assignedDate}</span>
              </div>
              <div className="recall-detail-item">
                <span className="recall-detail-label">Bắt đầu:</span>
                <span className="recall-detail-value">{recall.deadline}</span>
              </div>
            </div>

            {recall.completedDate && (
              <div className="recall-completion-date">
                Hoàn thành: {recall.completedDate}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="recall-empty-state">
          <FileText />
          <h5>Chưa có đơn recall</h5>
          <p>Đơn recall sẽ hiển thị khi được phân công</p>
        </div>
      )}
    </Container>
  );
};

export default RecallOrdersTab;
