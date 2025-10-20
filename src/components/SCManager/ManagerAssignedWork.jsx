import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Spinner, Modal } from "react-bootstrap";
import { Users, Eye, Edit } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/ManagerAssignedWork.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const ManagerAssignedWork = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTechnician, setFilterTechnician] = useState("all");
  const [repairs, setRepairs] = useState([]);
  const [stats, setStats] = useState({ assigned: 0, inProgress: 0, completed: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  // 👁 Modal chi tiết
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // ✅ GỌI API LẤY CÔNG VIỆC THEO SERVICE CENTER
  useEffect(() => {
    fetchRepairs();
  }, []);

  const fetchRepairs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const serviceCenterId = user?.serviceCenterId || 1; // fallback demo

      const res = await axios.get(
        `${API_BASE_URL}/warranty/repairs/manager/${serviceCenterId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data || [];
      setRepairs(data);

      // Tính thống kê
      const assigned = data.filter((w) => w.status === "ASSIGNED").length;
      const inProgress = data.filter((w) => w.status === "IN_PROGRESS").length;
      const completed = data.filter((w) => w.status === "COMPLETED").length;
      const total = data.length;

      setStats({ assigned, inProgress, completed, total });
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải danh sách công việc!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ GỌI API LẤY CHI TIẾT CÔNG VIỆC
  const handleViewDetail = async (id) => {
    try {
      setDetailLoading(true);
      const token = localStorage.getItem("token");

      console.log("📡 Gọi API:", `${API_BASE_URL}/warranty/repairs/${id}`);
      const res = await axios.get(`${API_BASE_URL}/warranty/repairs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Chi tiết:", res.data);
      setSelectedRepair(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi xem chi tiết:", err);
      toast.error("Không thể tải chi tiết công việc!");
    } finally {
      setDetailLoading(false);
    }
  };

  // ✅ Hàm render trạng thái
  const renderStatusBadge = (status) => {
    let text = "", cls = "";
    switch (status) {
      case "ASSIGNED":
        text = "Đã phân công";
        cls = "assigned";
        break;
      case "IN_PROGRESS":
        text = "Đang thực hiện";
        cls = "in-progress";
        break;
      case "COMPLETED":
        text = "Hoàn thành";
        cls = "completed";
        break;
      default:
        text = status || "Không xác định";
        cls = "other";
    }
    return <span className={`manager-assigned-status ${cls}`}>{text}</span>;
  };

  // ✅ Lọc theo trạng thái & kỹ thuật viên
  const filteredRepairs = repairs.filter((r) => {
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    if (filterTechnician !== "all" && r.technicianName !== filterTechnician) return false;
    return true;
  });

  return (
    <Container fluid className="manager-assigned-work-container">
      {/* Header */}
      <div className="manager-assigned-header">
        <div>
          <h4>Công việc đã phân công</h4>
          <p className="manager-assigned-subtitle">
            Theo dõi tiến độ công việc của kỹ thuật viên trong trung tâm
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="manager-assigned-filters">
        <Form.Select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ width: "200px" }}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="ASSIGNED">Đã phân công</option>
          <option value="IN_PROGRESS">Đang thực hiện</option>
          <option value="COMPLETED">Hoàn thành</option>
        </Form.Select>

        <Form.Select
          className="filter-select"
          value={filterTechnician}
          onChange={(e) => setFilterTechnician(e.target.value)}
          style={{ width: "200px" }}
        >
          <option value="all">Tất cả kỹ thuật viên</option>
          {[...new Set(repairs.map((r) => r.technicianName).filter(Boolean))].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Form.Select>
      </div>

      {/* Stats */}
      <Row className="manager-assigned-stats g-3">
        <Col md={3}>
          <div className="manager-assigned-stat-card">
            <h6>Đã phân công</h6>
            <div className="stat-number">{stats.assigned}</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="manager-assigned-stat-card">
            <h6>Đang thực hiện</h6>
            <div className="stat-number">{stats.inProgress}</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="manager-assigned-stat-card">
            <h6>Hoàn thành</h6>
            <div className="stat-number">{stats.completed}</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="manager-assigned-stat-card">
            <h6>Tổng công việc</h6>
            <div className="stat-number">{stats.total}</div>
          </div>
        </Col>
      </Row>

      {/* List */}
      <div className="manager-assigned-list mt-3">
        <h5 className="fw-semibold mb-3">Danh sách công việc ({filteredRepairs.length})</h5>

        {loading ? (
          <div className="text-center my-4"><Spinner animation="border" /></div>
        ) : filteredRepairs.length > 0 ? (
          filteredRepairs.map((r) => (
            <div key={r.id} className="manager-assigned-card">
              <div className="manager-assigned-card-header">
                <div className="manager-assigned-id">
                  WO{r.id.toString().padStart(3, "0")} {renderStatusBadge(r.status)}
                </div>
              </div>

              <h6 className="manager-assigned-title">{r.description}</h6>
              <p className="manager-assigned-subtitle">VIN: {r.vin}</p>

              <div className="manager-assigned-details">
                <div><strong>Phụ tùng:</strong> {r.partsUsed || "—"}</div>
                <div><strong>Ngày sửa:</strong> {r.repairDate?.split("T")[0]}</div>
                <div><strong>Kỹ thuật viên ID:</strong> {r.technicianId}</div>
              </div>

              <div className="manager-assigned-actions mt-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleViewDetail(r.id)}
                >
                  <Eye size={16} className="me-1" /> Xem chi tiết
                </Button>
                {r.status !== "COMPLETED" && (
                  <Button variant="outline-secondary" size="sm">
                    <Edit size={16} className="me-1" /> Chỉnh sửa
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="manager-assigned-empty text-center my-4">
            <Users size={32} />
            <h5>Không tìm thấy công việc</h5>
            <p>Thử thay đổi bộ lọc hoặc chờ kỹ thuật viên cập nhật</p>
          </div>
        )}
      </div>

      {/* 👁 Modal xem chi tiết */}
      <Modal
        show={!!selectedRepair}
        onHide={() => setSelectedRepair(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết công việc bảo hành</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailLoading ? (
            <div className="text-center my-4">
              <Spinner animation="border" />
              <p className="text-muted mt-2">Đang tải chi tiết...</p>
            </div>
          ) : selectedRepair ? (
            <>
              <p><strong>ID công việc:</strong> {selectedRepair.id}</p>
              <p><strong>Claim ID:</strong> {selectedRepair.claimId}</p>
              <p><strong>VIN:</strong> {selectedRepair.vin}</p>
              <p><strong>Mô tả:</strong> {selectedRepair.description}</p>
              <p><strong>Phụ tùng:</strong> {selectedRepair.partsUsed}</p>
              <p><strong>Kỹ thuật viên ID:</strong> {selectedRepair.technicianId}</p>
              <p><strong>Trạng thái:</strong> {selectedRepair.status}</p>
              <p><strong>Ngày sửa:</strong> {selectedRepair.repairDate?.replace("T", " ")}</p>
            </>
          ) : (
            <p>Không có dữ liệu để hiển thị.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedRepair(null)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManagerAssignedWork;
