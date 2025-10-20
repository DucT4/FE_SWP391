import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form, Spinner } from "react-bootstrap";
import { FileText, Plus, Eye, Car } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/ManagerWarrantyRequests.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const ManagerWarrantyRequests = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claims, setClaims] = useState([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, inProgress: 0 });

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

  // === GỌI API LẤY DANH SÁCH YÊU CẦU ===
  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")); // lấy user từ localStorage
    const serviceCenterId = user?.serviceCenterId || 1; // fallback cho test

    const res = await axios.get(`${API_BASE_URL}/claims/manager/${serviceCenterId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = res.data || [];
    setClaims(data);

    // ✅ Map lại theo status thật từ backend
    const pending = data.filter(
      (c) => c.status === "DRAFT" || c.status === "SUBMITTED"
    ).length;
    const approved = data.filter((c) => c.status === "DONE").length;
    const inProgress = data.filter((c) => c.status === "CONFIRMED_REPAIR").length;

    setStats({ pending, approved, inProgress });
  } catch (err) {
    console.error("Lỗi tải yêu cầu bảo hành:", err);
    toast.error("Không thể tải danh sách yêu cầu");
  } finally {
    setLoading(false);
  }
};


  // === TẠO MỚI YÊU CẦU ===
  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerAddress: formData.customerAddress,
        vin: formData.vin,
        carModel: formData.carModel,
        failureDesc: formData.issueDescription,
        partCode: formData.partCode,
        issueType: formData.issueType,
        supportingParts: formData.supportingParts,
        implementDate: formData.implementDate,
      };

      await axios.post(`${API_BASE_URL}/claims`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Tạo yêu cầu bảo hành thành công!");
      handleCloseCreateModal();
      fetchClaims();
    } catch (err) {
      console.error("Lỗi tạo yêu cầu:", err);
      toast.error("Không thể tạo yêu cầu bảo hành!");
    }
  };

  const handleCreateRequest = () => setShowCreateModal(true);
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

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedRequest(null);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderStatusBadge = (status) => {
    const text =
      status === "PENDING"
        ? "Chờ duyệt"
        : status === "APPROVED"
        ? "Đã duyệt"
        : status === "IN_PROGRESS"
        ? "Đang xử lý"
        : status;
    return <span className={`manager-warranty-status ${status.toLowerCase()}`}>{text}</span>;
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

      {/* Stats */}
      <Row className="manager-warranty-stats g-3">
        <Col md={4}>
          <div className="manager-stat-card">
            <h6>Chờ duyệt</h6>
            <div className="stat-number">{stats.pending}</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="manager-stat-card">
            <h6>Đã duyệt</h6>
            <div className="stat-number">{stats.approved}</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="manager-stat-card">
            <h6>Đang xử lý</h6>
            <div className="stat-number">{stats.inProgress}</div>
          </div>
        </Col>
      </Row>

      {/* List */}
      <div className="manager-warranty-list">
        <h5 className="mb-3 fw-semibold">Danh sách yêu cầu</h5>

        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" />
          </div>
        ) : claims.length > 0 ? (
          claims.map((c) => (
            <div key={c.id} className="manager-warranty-card">
              <div className="manager-warranty-card-header">
                <div className="manager-warranty-id">
                  WR{c.id.toString().padStart(3, "0")}
                  {renderStatusBadge(c.status)}
                  <span className="manager-warranty-category">{c.issueType}</span>
                </div>
              </div>
              <h6 className="manager-warranty-title">{c.failureDesc}</h6>
              <p className="manager-warranty-subtitle">
                {c.carModel} - {c.vin}
              </p>

              <div className="manager-warranty-details">
                <div><strong>Khách hàng:</strong> {c.customerName || "—"}</div>
                <div><strong>Trung tâm:</strong> {c.serviceCenterName || "—"}</div>
                <div><strong>Mã phụ tùng:</strong> {c.partCode || "—"}</div>
                <div><strong>Ngày tạo:</strong> {c.createdAt?.split("T")[0]}</div>
                <div><strong>Chi phí:</strong> {c.cost ? c.cost.toLocaleString() + " VND" : "—"}</div>
              </div>

              <div className="manager-warranty-actions">
                <Button variant="outline-primary" onClick={() => handleViewDetails(c)}>
                  <Eye size={16} className="me-1" /> Xem chi tiết
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="manager-warranty-empty">
            <FileText />
            <h5>Chưa có yêu cầu bảo hành</h5>
            <p>Tạo yêu cầu mới để bắt đầu quy trình</p>
          </div>
        )}
      </div>

      {/* Modal Tạo mới */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Tạo yêu cầu bảo hành mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitRequest}>
            <h6>Thông tin khách hàng</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên khách hàng</Form.Label>
                  <Form.Control
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
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
              />
            </Form.Group>

            <h6>Thông tin xe</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Dòng xe</Form.Label>
                  <Form.Control
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleInputChange}
                    placeholder="VD: VinFast VF 8"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>VIN</Form.Label>
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

            <h6>Thông tin sự cố</h6>
            <Form.Group className="mb-3">
              <Form.Label>Loại sự cố</Form.Label>
              <Form.Select
                name="issueType"
                value={formData.issueType}
                onChange={handleInputChange}
              >
                <option value="Pin">Pin</option>
                <option value="Động cơ">Động cơ</option>
                <option value="Điện">Điện</option>
                <option value="Cơ khí">Cơ khí</option>
                <option value="Khác">Khác</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả sự cố</Form.Label>
              <Form.Control
                as="textarea"
                name="issueDescription"
                rows={3}
                value={formData.issueDescription}
                onChange={handleInputChange}
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

      {/* Modal Chi tiết */}
      <Modal show={showDetailModal} onHide={handleCloseDetailModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết yêu cầu bảo hành</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <h5>
                WR{selectedRequest.id.toString().padStart(3, "0")}{" "}
                {renderStatusBadge(selectedRequest.status)}
              </h5>
              <p className="text-muted">{selectedRequest.failureDesc}</p>
              <hr />
              <p><strong>Dòng xe:</strong> {selectedRequest.carModel}</p>
              <p><strong>VIN:</strong> {selectedRequest.vin}</p>
              <p><strong>Khách hàng:</strong> {selectedRequest.customerName}</p>
              <p><strong>Trung tâm:</strong> {selectedRequest.serviceCenterName}</p>
              <p><strong>Ngày tạo:</strong> {selectedRequest.createdAt?.split("T")[0]}</p>
              <p><strong>Chi phí:</strong> {selectedRequest.cost ? selectedRequest.cost + " VND" : "—"}</p>
            </>
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
