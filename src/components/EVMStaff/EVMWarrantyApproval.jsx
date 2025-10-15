import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FileText, Eye, CheckCircle, XCircle } from "lucide-react";
import "../../styles/EVMWarrantyApproval.css";

const EVMWarrantyApproval = () => {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // Mock data - Yêu cầu bảo hành chờ duyệt
  const warrantyRequests = [
    {
      id: "WR002",
      status: "pending",
      statusText: "Chờ duyệt",
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
      id: "WR001",
      status: "approved",
      statusText: "Đã duyệt",
      title: "Lỗi BMS, cần thay module BMS",
      car: "VinFast VF 8",
      vin: "1HGBH41JXMN109186",
      customer: "Nguyễn Văn A",
      center: "Trung tâm Hà Nội",
      cost: "15.000.000 VND",
      part: "BMS-VF8-001",
      date: "15/9/2024",
      approvedDate: "16/9/2024",
    },
  ];

  const renderStatusBadge = (status, text) => {
    return <span className={`evm-warranty-status ${status}`}>{text}</span>;
  };

  const handleApproveClick = (request) => {
    setSelectedRequest(request);
    setShowApproveModal(true);
  };

  const handleRejectClick = (request) => {
    setSelectedRequest(request);
    setShowRejectModal(true);
  };

  const handleApprove = () => {
    console.log("Approve request:", selectedRequest.id);
    setShowApproveModal(false);
    setSelectedRequest(null);
    // Call API to approve
  };

  const handleReject = () => {
    console.log("Reject request:", selectedRequest.id, "Reason:", rejectReason);
    setShowRejectModal(false);
    setSelectedRequest(null);
    setRejectReason("");
    // Call API to reject
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  return (
    <Container fluid className="evm-warranty-approval-container">
      {/* Header */}
      <div className="evm-warranty-header">
        <h4>Yêu cầu bảo hành</h4>
        <p className="evm-warranty-subtitle">
          Duyệt hoặc từ chối yêu cầu bảo hành từ các trung tâm dịch vụ
        </p>
      </div>

      {/* Stats Cards */}
      <Row className="evm-warranty-stats g-3">
        <Col md={4}>
          <div className="evm-stat-card">
            <h6>Yêu cầu chờ duyệt</h6>
            <div className="stat-number">1</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="evm-stat-card">
            <h6>Đã duyệt</h6>
            <div className="stat-number">1</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="evm-stat-card">
            <h6>Tổng yêu cầu</h6>
            <div className="stat-number">3</div>
          </div>
        </Col>
      </Row>

      {/* Warranty Requests List */}
      <div className="evm-warranty-list mt-4">
        <h5 className="mb-3" style={{ fontWeight: 600 }}>
          Danh sách yêu cầu
        </h5>

        {warrantyRequests.length > 0 ? (
          warrantyRequests.map((request) => (
            <div key={request.id} className="evm-warranty-card">
              <div className="evm-warranty-card-header">
                <div className="evm-warranty-id">
                  {request.id}
                  {renderStatusBadge(request.status, request.statusText)}
                </div>
              </div>

              <h6 className="evm-warranty-title">{request.title}</h6>
              <p className="evm-warranty-subtitle">
                {request.car} - {request.vin}
              </p>

              <div className="evm-warranty-details">
                <div className="evm-warranty-detail-item">
                  <span className="evm-warranty-detail-label">
                    Trung tâm:
                  </span>
                  <span className="evm-warranty-detail-value">
                    {request.center}
                  </span>
                </div>
                <div className="evm-warranty-detail-item">
                  <span className="evm-warranty-detail-label">
                    Mã phụ tùng:
                  </span>
                  <span className="evm-warranty-detail-value">
                    {request.part}
                  </span>
                </div>
                <div className="evm-warranty-detail-item">
                  <span className="evm-warranty-detail-label">
                    Chi phí dự kiến:
                  </span>
                  <span className="evm-warranty-detail-value highlight">
                    {request.cost}
                  </span>
                </div>
                <div className="evm-warranty-detail-item">
                  <span className="evm-warranty-detail-label">Ngày hẹn:</span>
                  <span className="evm-warranty-detail-value">
                    {request.date}
                  </span>
                </div>
              </div>

              {request.note && (
                <div className="evm-warranty-note">
                  <strong>Ghi chú:</strong> {request.note}
                </div>
              )}

              {request.approvedDate && (
                <div
                  className="evm-warranty-note"
                  style={{ backgroundColor: "#d1f4e0", color: "#0f5132" }}
                >
                  <strong>Đã duyệt:</strong> {request.approvedDate}
                </div>
              )}

              <div className="evm-warranty-actions">
                <Button
                  variant="outline-primary"
                  onClick={() => handleViewDetails(request)}
                >
                  <Eye size={16} />
                  Xem chi tiết
                </Button>
                {request.status === "pending" && (
                  <>
                    <Button
                      className="btn-approve"
                      onClick={() => handleApproveClick(request)}
                    >
                      <CheckCircle size={16} />
                      Duyệt
                    </Button>
                    <Button
                      className="btn-reject"
                      onClick={() => handleRejectClick(request)}
                    >
                      <XCircle size={16} />
                      Từ chối
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="evm-warranty-empty">
            <FileText />
            <h5>Chưa có yêu cầu bảo hành</h5>
            <p>Các yêu cầu từ trung tâm dịch vụ sẽ hiển thị ở đây</p>
          </div>
        )}
      </div>

      {/* Approve Modal */}
      <Modal
        show={showApproveModal}
        onHide={() => setShowApproveModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận duyệt yêu cầu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc chắn muốn duyệt yêu cầu bảo hành{" "}
            <strong>{selectedRequest?.id}</strong>?
          </p>
          <p className="text-muted mb-0">
            Sau khi duyệt, trung tâm dịch vụ có thể tiến hành thay thế/sửa
            chữa linh kiện.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowApproveModal(false)}
          >
            Hủy
          </Button>
          <Button className="btn-approve" onClick={handleApprove}>
            <CheckCircle size={16} className="me-1" />
            Xác nhận duyệt
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reject Modal */}
      <Modal
        show={showRejectModal}
        onHide={() => setShowRejectModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Từ chối yêu cầu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Từ chối yêu cầu bảo hành <strong>{selectedRequest?.id}</strong>
          </p>
          <Form.Group>
            <Form.Label>
              Lý do từ chối <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Nhập lý do từ chối yêu cầu..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRejectModal(false)}
          >
            Hủy
          </Button>
          <Button
            className="btn-reject"
            onClick={handleReject}
            disabled={!rejectReason.trim()}
          >
            <XCircle size={16} className="me-1" />
            Xác nhận từ chối
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Detail Modal */}
      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết yêu cầu: {selectedRequest?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <div className="mb-3">
                <h6 className="text-muted mb-2">Thông tin xe</h6>
                <Row>
                  <Col md={6}>
                    <p>
                      <strong>Xe:</strong> {selectedRequest.car}
                    </p>
                    <p>
                      <strong>VIN:</strong> {selectedRequest.vin}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Khách hàng:</strong> {selectedRequest.customer}
                    </p>
                    <p>
                      <strong>Trung tâm:</strong> {selectedRequest.center}
                    </p>
                  </Col>
                </Row>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Mô tả sự cố</h6>
                <p>{selectedRequest.title}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Chi phí & Phụ tùng</h6>
                <Row>
                  <Col md={6}>
                    <p>
                      <strong>Mã phụ tùng:</strong> {selectedRequest.part}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Chi phí dự kiến:</strong>{" "}
                      <span className="text-danger fw-bold">
                        {selectedRequest.cost}
                      </span>
                    </p>
                  </Col>
                </Row>
              </div>

              <div className="mb-3">
                <h6 className="text-muted mb-2">Thông tin khác</h6>
                <p>
                  <strong>Ngày hẹn:</strong> {selectedRequest.date}
                </p>
                <p>
                  <strong>Trạng thái:</strong>{" "}
                  {renderStatusBadge(
                    selectedRequest.status,
                    selectedRequest.statusText
                  )}
                </p>
                {selectedRequest.approvedDate && (
                  <p>
                    <strong>Ngày duyệt:</strong> {selectedRequest.approvedDate}
                  </p>
                )}
              </div>

              {selectedRequest.note && (
                <div
                  className="alert alert-info"
                  style={{ backgroundColor: "#e7f3ff" }}
                >
                  <strong>Ghi chú:</strong> {selectedRequest.note}
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailModal(false)}
          >
            Đóng
          </Button>
          {selectedRequest?.status === "pending" && (
            <>
              <Button
                className="btn-approve"
                onClick={() => {
                  setShowDetailModal(false);
                  handleApproveClick(selectedRequest);
                }}
              >
                <CheckCircle size={16} className="me-1" />
                Duyệt
              </Button>
              <Button
                className="btn-reject"
                onClick={() => {
                  setShowDetailModal(false);
                  handleRejectClick(selectedRequest);
                }}
              >
                <XCircle size={16} className="me-1" />
                Từ chối
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EVMWarrantyApproval;
