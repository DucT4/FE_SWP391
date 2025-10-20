import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form, Spinner } from "react-bootstrap";
import { Plus, FileText } from "lucide-react";
import toast from "react-hot-toast";
import { createClaim, getClaimsByTechnician } from "../../services/claimService";
import "../../styles/Claims.css";

const ClaimsTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vin: "",
    failureDesc: "",
    serviceCenterId: 1,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const technicianId = user?.userId || user?.id;

  // ✅ Load claims của technician
  const loadClaims = async () => {
    try {
      setLoading(true);
      const res = await getClaimsByTechnician(technicianId);

      console.log("📦 API trả về (claims):", res);

      // ✅ Đảm bảo luôn là mảng để tránh lỗi filter
      if (Array.isArray(res)) {
        setClaims(res);
      } else if (res && Array.isArray(res.data)) {
        setClaims(res.data);
      } else {
        console.warn("⚠️ API không trả về mảng hợp lệ:", res);
        setClaims([]);
      }
    } catch (err) {
      console.error("❌ Lỗi tải danh sách claim:", err);
      toast.error("Không thể tải danh sách claim!");
      setClaims([]); // fallback để tránh lỗi filter
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClaims();
  }, []);

  // ✅ Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit tạo claim mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vin || !formData.failureDesc) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      await createClaim(formData.vin, formData.failureDesc, formData.serviceCenterId);
      toast.success("Tạo claim thành công!");
      setShowModal(false);
      setFormData({ vin: "", failureDesc: "", serviceCenterId: 1 });
      loadClaims(); // reload danh sách
    } catch (err) {
      console.error("❌ Lỗi tạo claim:", err);
      toast.error("Không thể tạo claim!");
    }
  };

  // ✅ Badge trạng thái
  const renderStatusBadge = (status) => {
    switch (status) {
      case "DRAFT":
        return <span className="claim-status-badge waiting">Chờ duyệt</span>;
      case "APPROVED":
        return <span className="claim-status-badge approved">Đã duyệt</span>;
      case "REJECTED":
        return <span className="claim-status-badge rejected">Từ chối</span>;
      default:
        return <span className="claim-status-badge">{status}</span>;
    }
  };

  // ✅ Đếm theo trạng thái (đảm bảo không crash)
  const countByStatus = (status) => {
    const safeClaims = Array.isArray(claims) ? claims : [];
    return safeClaims.filter((c) => c.status === status).length;
  };

  return (
    <Container fluid className="claims-container">
      {/* Stats Cards */}
      <Row className="claims-stats-row g-3">
        <Col md={4}>
          <div className="claims-stat-card">
            <h6>Chờ duyệt</h6>
            <div className="stat-number">{countByStatus("DRAFT")}</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="claims-stat-card">
            <h6>Đã duyệt</h6>
            <div className="stat-number">{countByStatus("APPROVED")}</div>
          </div>
        </Col>
        <Col md={4}>
          <div className="claims-stat-card">
            <h6>Từ chối</h6>
            <div className="stat-number">{countByStatus("REJECTED")}</div>
          </div>
        </Col>
      </Row>

      {/* Header */}
      <div className="claims-section-header">
        <div>
          <h5>Claims (Báo cáo chi phí)</h5>
          <p className="claims-section-subtitle">Danh sách các claim đã tạo</p>
        </div>
        <Button className="btn-create-claim" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Tạo Claim
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-2">Đang tải dữ liệu...</p>
        </div>
      )}

      {/* Claims list */}
      {!loading && Array.isArray(claims) && claims.length > 0 ? (
        claims.map((claim) => (
          <div key={claim.id} className="claim-item-card">
            <div className="claim-item-header">
              <div className="claim-id-badge">
                CL{claim.id}
                {renderStatusBadge(claim.status)}
              </div>
            </div>

            <h6 className="claim-item-title">
              {claim.failureDesc || "Không có mô tả"}
            </h6>

            <div className="claim-item-details">
              <div className="claim-detail-item">
                <span className="claim-detail-label">VIN:</span>
                <span className="claim-detail-value">{claim.vin}</span>
              </div>
              <div className="claim-detail-item">
                <span className="claim-detail-label">Trung tâm:</span>
                <span className="claim-detail-value">{claim.serviceCenterName || "—"}</span>
              </div>
              <div className="claim-detail-item">
                <span className="claim-detail-label">Ngày tạo:</span>
                <span className="claim-detail-value">
                  {claim.createdAt
                    ? new Date(claim.createdAt).toLocaleString("vi-VN")
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        !loading && (
          <div className="claims-empty-state">
            <FileText />
            <h5>Chưa có claim nào</h5>
            <p>Tạo claim mới để bắt đầu</p>
          </div>
        )
      )}

      {/* Modal tạo claim */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tạo Claim mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>VIN</Form.Label>
              <Form.Control
                type="text"
                name="vin"
                value={formData.vin}
                onChange={handleInputChange}
                placeholder="VD: VF3XYZ9876543210"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả lỗi</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="failureDesc"
                value={formData.failureDesc}
                onChange={handleInputChange}
                placeholder="VD: Xe bị lỗi cảm biến nhiệt độ"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            Tạo Claim
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ClaimsTab;
