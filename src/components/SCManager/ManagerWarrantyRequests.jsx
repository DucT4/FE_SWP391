import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FileText, Plus, Eye, Calendar, MapPin, Car } from "lucide-react";
import "../../styles/ManagerWarrantyRequests.css";

const ManagerWarrantyRequests = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    implementDate: "",
    carModel: "",
    vin: "",
    issueType: "Pin",
    issueDescription: "",
    partCode: "",
    supportingParts: "",
  });
  // Mock data - Yêu cầu bảo hành
  const warrantyRequests = [
    {
      id: "WR001",
      status: "approved",
      statusText: "Đã duyệt",
      category: "Pin",
      title: "Lỗi BMS, cần thay module BMS",
      car: "VinFast VF 8",
      vin: "1HGBH41JXMN109186",
      customer: "Nguyễn Văn A",
      center: "Trung tâm Hà Nội",
      cost: "15.000.000 VND",
      part: "BMS-RF9001",
      date: "15/9/2024",
      note: "Khách hàng yêu cầu hoàn thành sớm",
    },
    {
      id: "WR002",
      status: "pending",
      statusText: "Chờ duyệt",
      category: "Động cơ",
      title: "Động cơ phát ra tiếng kêu bất thường",
      car: "VinFast VF 9",
      vin: "2HGBH41JXMN109187",
      customer: "Trần Thị B",
      center: "Trung tâm Hà Nội",
      cost: "20.000.000 VND",
      part: "MOTOR-RF9002",
      date: "25/9/2024",
      note: "Cần kiểm tra kỹ trước khi thay thế",
    },
    {
      id: "WR003",
      status: "in-progress",
      statusText: "Đang xử lý",
      category: "Điện",
      title: "Xe không hoạt động",
      car: "VinFast VF 6",
      vin: "3HGBH41JXMN109188",
      customer: "Lê Văn C",
      center: "Trung tâm TP.HCM",
      cost: "12.000.000 VND",
      part: "AC-RF9007",
      date: "18/9/2024",
      note: "Đã giao cho kỹ thuật viên Trần Văn B",
    },
  ];

  const renderStatusBadge = (status, text) => {
    return <span className={`manager-warranty-status ${status}`}>{text}</span>;
  };

  const handleCreateRequest = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setFormData({
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      implementDate: "",
      carModel: "",
      vin: "",
      issueType: "Pin",
      issueDescription: "",
      partCode: "",
      supportingParts: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    console.log("Create warranty request:", formData);
    // Call API to create request
    handleCloseCreateModal();
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedRequest(null);
  };

  return (
    <Container fluid className="manager-warranty-requests-container">
      {/* Header */}
      <div className="manager-warranty-header">
        <div>
          <h4>Yêu cầu bảo hành</h4>
          <p className="manager-warranty-subtitle">
            Tạo yêu cầu và phân công công việc cho kỹ thuật viên sau khi được duyệt
          </p>
        </div>
        <Button className="btn-create-request" onClick={handleCreateRequest}>
          <Plus size={18} />
          Tạo yêu cầu mới
        </Button>
      </div>

      {/* Stats Cards */}
      <Row className="manager-warranty-stats g-3">
        <Col md={4}>
          <div className="manager-stat-card">
            <h6>Chờ duyệt</h6>
            <div className="stat-number">1</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="manager-stat-card">
            <h6>Đã duyệt</h6>
            <div className="stat-number">1</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="manager-stat-card">
            <h6>Đang xử lý</h6>
            <div className="stat-number">1</div>
          </div>
        </Col>
      </Row>

      {/* Warranty Requests List */}
      <div className="manager-warranty-list">
        <h5 className="mb-3" style={{ fontWeight: 600 }}>
          Danh sách yêu cầu
        </h5>

        {warrantyRequests.length > 0 ? (
          warrantyRequests.map((request) => (
            <div key={request.id} className="manager-warranty-card">
              <div className="manager-warranty-card-header">
                <div className="manager-warranty-id">
                  {request.id}
                  {renderStatusBadge(request.status, request.statusText)}
                  <span className="manager-warranty-category">
                    {request.category}
                  </span>
                </div>
              </div>

              <h6 className="manager-warranty-title">{request.title}</h6>
              <p className="manager-warranty-subtitle">
                {request.car} - {request.vin}
              </p>

              <div className="manager-warranty-details">
                <div className="manager-warranty-detail-item">
                  <span className="manager-warranty-detail-label">
                    Khách hàng:
                  </span>
                  <span className="manager-warranty-detail-value">
                    {request.customer}
                  </span>
                </div>
                <div className="manager-warranty-detail-item">
                  <span className="manager-warranty-detail-label">
                    Trung tâm:
                  </span>
                  <span className="manager-warranty-detail-value">
                    {request.center}
                  </span>
                </div>
                <div className="manager-warranty-detail-item">
                  <span className="manager-warranty-detail-label">
                    Mã phụ tùng:
                  </span>
                  <span className="manager-warranty-detail-value">
                    {request.part}
                  </span>
                </div>
                <div className="manager-warranty-detail-item">
                  <span className="manager-warranty-detail-label">Ngày tạo:</span>
                  <span className="manager-warranty-detail-value">
                    {request.date}
                  </span>
                </div>
                <div className="manager-warranty-detail-item">
                  <span className="manager-warranty-detail-label">Chi phí:</span>
                  <span className="manager-warranty-detail-value highlight">
                    {request.cost}
                  </span>
                </div>
              </div>

              {request.note && (
                <div className="manager-warranty-note">
                  <strong>Ghi chú:</strong> {request.note}
                </div>
              )}

              <div className="manager-warranty-actions">
                <Button
                  variant="outline-primary"
                  onClick={() => handleViewDetails(request)}
                >
                  <Eye size={16} className="me-1" />
                  Xem chi tiết
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="manager-warranty-empty">
            <FileText />
            <h5>Chưa có yêu cầu bảo hành</h5>
            <p>Tạo yêu cầu mới để bắt đầu quy trình bảo hành</p>
          </div>
        )}
      </div>

      {/* Create Warranty Request Modal */}
      <Modal
        show={showCreateModal}
        onHide={handleCloseCreateModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo yêu cầu bảo hành mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-3">
            Điền thông tin để tạo yêu cầu bảo hành mới
          </p>
          <Form onSubmit={handleSubmitRequest}>
            <h6 className="mb-3 fw-semibold">Thông tin khách hàng</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Tên khách hàng <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên khách hàng"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleInputChange}
                placeholder="123 Đường ABC, Trung tâm Hà Nội"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                Ngày thực hiện <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                name="implementDate"
                value={formData.implementDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <h6 className="mb-3 fw-semibold">Thông tin xe</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Dòng xe <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn dòng xe</option>
                    <option value="VinFast VF 5">VinFast VF 5</option>
                    <option value="VinFast VF 6">VinFast VF 6</option>
                    <option value="VinFast VF 7">VinFast VF 7</option>
                    <option value="VinFast VF 8">VinFast VF 8</option>
                    <option value="VinFast VF 9">VinFast VF 9</option>
                    <option value="VinFast VF e34">VinFast VF e34</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Số VIN</Form.Label>
                  <Form.Control
                    type="text"
                    name="vin"
                    value={formData.vin}
                    onChange={handleInputChange}
                    placeholder="VD: 1HGBH41JXMN109186"
                  />
                </Form.Group>
              </Col>
            </Row>

            <h6 className="mb-3 fw-semibold">Thông tin sự cố</h6>
            <Form.Group className="mb-3">
              <Form.Label>
                Loại sự cố <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="issueType"
                value={formData.issueType}
                onChange={handleInputChange}
                required
              >
                <option value="Pin">Pin</option>
                <option value="Động cơ">Động cơ</option>
                <option value="Điện">Điện</option>
                <option value="Cơ khí">Cơ khí</option>
                <option value="Điện tử">Điện tử</option>
                <option value="Khác">Khác</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Mô tả sự cố <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="issueDescription"
                value={formData.issueDescription}
                onChange={handleInputChange}
                placeholder="Mô tả chi tiết tình trạng và vấn đề của xe"
                required
              />
            </Form.Group>

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Mã phụ tùng cần thay</Form.Label>
                  <Form.Control
                    type="text"
                    name="partCode"
                    value={formData.partCode}
                    onChange={handleInputChange}
                    placeholder="VD: BMS-VF8-001"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Linh kiện cần hỗ trợ</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="supportingParts"
                value={formData.supportingParts}
                onChange={handleInputChange}
                placeholder="Nhập danh sách linh kiện cần hỗ trợ (có thể để trống)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmitRequest}>
            Tạo yêu cầu
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Detail Modal */}
      <Modal
        show={showDetailModal}
        onHide={handleCloseDetailModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết yêu cầu bảo hành</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <div>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h5 className="mb-1">
                    {selectedRequest.id}
                    <span className="ms-2">
                      {renderStatusBadge(
                        selectedRequest.status,
                        selectedRequest.statusText
                      )}
                    </span>
                  </h5>
                  <p className="text-muted mb-0">{selectedRequest.title}</p>
                </div>
                <span className="manager-warranty-category">
                  {selectedRequest.category}
                </span>
              </div>

              <div className="border-top pt-3 mb-3">
                <h6 className="fw-semibold mb-3">
                  <Car size={18} className="me-2" />
                  Thông tin xe
                </h6>
                <Row>
                  <Col md={6}>
                    <p className="mb-2">
                      <strong>Dòng xe:</strong> {selectedRequest.car}
                    </p>
                    <p className="mb-2">
                      <strong>VIN:</strong> {selectedRequest.vin}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p className="mb-2">
                      <strong>Khách hàng:</strong> {selectedRequest.customer}
                    </p>
                    <p className="mb-2">
                      <strong>Trung tâm:</strong> {selectedRequest.center}
                    </p>
                  </Col>
                </Row>
              </div>

              <div className="border-top pt-3 mb-3">
                <h6 className="fw-semibold mb-3">
                  <FileText size={18} className="me-2" />
                  Chi tiết sự cố
                </h6>
                <p className="mb-2">
                  <strong>Mã phụ tùng:</strong> {selectedRequest.part}
                </p>
                <p className="mb-2">
                  <strong>Chi phí:</strong>{" "}
                  <span className="text-success fw-semibold">
                    {selectedRequest.cost}
                  </span>
                </p>
                <p className="mb-2">
                  <strong>Ngày tạo:</strong> {selectedRequest.date}
                </p>
                {selectedRequest.note && (
                  <div className="mt-3 p-3 bg-light rounded">
                    <strong>Ghi chú:</strong>
                    <p className="mb-0 mt-1">{selectedRequest.note}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManagerWarrantyRequests;
