import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Plus, FileText } from "lucide-react";
import "../../styles/Claims.css";

const ClaimsTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    workOrder: "",
    recallOrder: "",
    workDescription: "",
    partCode: "",
    cost: "",
    startTime: "",
    endTime: "",
    note: "",
  });

  // Mock data - Claims đã tạo
  const claims = [
    {
      id: "CL002",
      status: "approved",
      statusText: "Đã duyệt",
      title: "Kiểm tra và bảo dưỡng định kỳ",
      partCode: "MAINT-001",
      cost: "3.000.000 VND",
      createdDate: "20/9/2024",
      timeRange: "08:00:00 20/9/2024 - 12:00:00 20/9/2024",
      note: "Bảo dưỡng định kỳ 10,000km",
    },
  ];

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    handleClose();
    // Reset form
    setFormData({
      workOrder: "",
      recallOrder: "",
      workDescription: "",
      partCode: "",
      cost: "",
      startTime: "",
      endTime: "",
      note: "",
    });
  };

  const renderStatusBadge = (status, text) => {
    return <span className={`claim-status-badge ${status}`}>{text}</span>;
  };

  return (
    <Container fluid className="claims-container">
      {/* Stats Cards */}
      <Row className="claims-stats-row g-3">
        <Col md={4}>
          <div className="claims-stat-card">
            <h6>Chờ duyệt</h6>
            <div className="stat-number">0</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="claims-stat-card">
            <h6>Đã duyệt</h6>
            <div className="stat-number">1</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="claims-stat-card">
            <h6>Từ chối</h6>
            <div className="stat-number">0</div>
          </div>
        </Col>
      </Row>

      {/* Claims Section */}
      <div className="claims-section-header">
        <div>
          <h5>Claims (Báo cáo chi phí)</h5>
          <p className="claims-section-subtitle">
            Báo cáo chi phí công việc đã hoàn thành
          </p>
        </div>
        <Button className="btn-create-claim" onClick={handleShow}>
          <Plus size={16} /> Tạo Claim
        </Button>
      </div>

      {claims.length > 0 ? (
        claims.map((claim) => (
          <div key={claim.id} className="claim-item-card">
            <div className="claim-item-header">
              <div className="claim-id-badge">
                {claim.id}
                {renderStatusBadge(claim.status, claim.statusText)}
              </div>
            </div>

            <h6 className="claim-item-title">{claim.title}</h6>
            <p className="claim-item-subtitle">Mã phụ tùng: {claim.partCode}</p>

            <div className="claim-item-details">
              <div className="claim-detail-item">
                <span className="claim-detail-label">Chi phí:</span>
                <span className="claim-detail-value highlight">{claim.cost}</span>
              </div>
              <div className="claim-detail-item">
                <span className="claim-detail-label">Ngày tạo:</span>
                <span className="claim-detail-value">{claim.createdDate}</span>
              </div>
              <div className="claim-detail-item">
                <span className="claim-detail-label">Thời gian:</span>
                <span className="claim-detail-value">{claim.timeRange}</span>
              </div>
            </div>

            {claim.note && (
              <div className="claim-item-note">
                <strong>Ghi chú:</strong> {claim.note}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="claims-empty-state">
          <FileText />
          <h5>Chưa có báo cáo chi phí</h5>
          <p>Tạo claim mới để báo cáo chi phí công việc</p>
        </div>
      )}

      {/* Create Claim Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" className="claim-modal">
        <Modal.Header closeButton>
          <Modal.Title>Tạo Claim mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-3">Báo cáo chi tiết công việc đã hoàn thành</p>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Công việc bảo hành <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="workOrder"
                    value={formData.workOrder}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn công việc (nếu có)</option>
                    <option value="WO001">WO001 - Thay thế module BMS</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Đơn Recall</Form.Label>
                  <Form.Select
                    name="recallOrder"
                    value={formData.recallOrder}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn đơn recall (nếu có)</option>
                    <option value="RO001">RO001 - Cập nhật firmware BMS</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                Mô tả công việc đã thực hiện <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="workDescription"
                value={formData.workDescription}
                onChange={handleInputChange}
                placeholder="Mô tả chi tiết công việc đã thực hiện"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Mã phụ tùng <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="partCode"
                    value={formData.partCode}
                    onChange={handleInputChange}
                    placeholder="VD: BMS-VF8-001"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Chi phí (VND) <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                    placeholder="Nhập chi phí"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Thời gian bắt đầu <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Thời gian kết thúc <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="Thông tin bổ sung (nếu có)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn-cancel" onClick={handleClose}>
            Hủy
          </Button>
          <Button className="btn-submit-claim" onClick={handleSubmit}>
            Tạo Claim
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ClaimsTab;
