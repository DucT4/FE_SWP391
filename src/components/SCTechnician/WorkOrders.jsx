import React, { useEffect, useState } from "react";
import { getRepairsByTech, updateRepairStatus, getRepairDetail } from "../../services/scTechService";
import toast from "react-hot-toast";
import { Wrench, CheckCircle, Clock3, Eye } from "lucide-react";
import { Modal, Button, Spinner } from "react-bootstrap";
import "../../styles/WorkOrders.css";
import authService from "../../services/authService";

const WorkOrders = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // ✅ Lấy thông tin kỹ thuật viên từ localStorage
  const currentUser = authService.getCurrentUser();
  const techId = currentUser?.userId || null;

  // ===== Load danh sách công việc =====
  const loadRepairs = async () => {
    if (!techId) {
      toast.error("Không tìm thấy thông tin kỹ thuật viên!");
      return;
    }

    try {
      setLoading(true);
      const data = await getRepairsByTech(techId);
      setRepairs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Lỗi loadRepairs:", error);
      toast.error("Không thể tải danh sách công việc!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepairs();
  }, [techId]);

  // ===== Cập nhật trạng thái =====
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRepairStatus(id, newStatus);
      toast.success(`Đã cập nhật: ${newStatus}`);
      loadRepairs();
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };

  // ===== Xem chi tiết =====
  const handleViewDetail = async (id) => {
    try {
      setDetailLoading(true);
      const data = await getRepairDetail(id);
      setSelectedRepair(data);
    } catch (error) {
      toast.error("Không thể tải chi tiết công việc!");
    } finally {
      setDetailLoading(false);
    }
  };

  // ===== Thống kê nhanh =====
  const assigned = repairs.filter((r) => r.status === "PENDING").length;
  const inProgress = repairs.filter((r) => r.status === "IN_PROGRESS").length;
  const completed = repairs.filter((r) => r.status === "COMPLETED").length;

  return (
    <div className="work-container">
      <h2 className="page-title">Công việc</h2>

      {/* ---- Thống kê ---- */}
      <div className="stats-box">
        <div className="stat-card assigned">
          <Clock3 size={22} />
          <div>
            <h4>Được giao</h4>
            <p>{assigned}</p>
          </div>
        </div>
        <div className="stat-card inprogress">
          <Wrench size={22} />
          <div>
            <h4>Đang thực hiện</h4>
            <p>{inProgress}</p>
          </div>
        </div>
        <div className="stat-card completed">
          <CheckCircle size={22} />
          <div>
            <h4>Đã hoàn thành</h4>
            <p>{completed}</p>
          </div>
        </div>
      </div>

      {/* ---- Danh sách công việc ---- */}
      <h3 className="section-title">Công việc của tôi</h3>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
          <p className="text-muted mt-2">Đang tải dữ liệu...</p>
        </div>
      ) : repairs.length === 0 ? (
        <div className="empty">
          <Clock3 size={30} />
          <p>Chưa có công việc nào được phân công</p>
        </div>
      ) : (
        repairs.map((r) => (
          <div key={r.id} className={`repair-card ${r.status.toLowerCase()}`}>
            <div className="repair-header">
              <span className={`status-label ${r.status.toLowerCase()}`}>
                {r.status === "COMPLETED"
                  ? "✅ Hoàn thành"
                  : r.status === "IN_PROGRESS"
                  ? "🔧 Đang thực hiện"
                  : r.status === "PENDING"
                  ? "🕓 Được giao"
                  : "❌ Đã hủy"}
              </span>
              <h4>{r.description}</h4>
            </div>

            <p><b>Khách hàng:</b> {r.customerName || "—"}</p>
            <p><b>VIN:</b> {r.vin}</p>
            <p><b>Phụ tùng:</b> {r.partsUsed}</p>
            <p><b>Ngày sửa:</b> {r.repairDate?.split("T")[0]}</p>

            <div className="actions">
              <Button
                variant="link"
                className="text-primary p-0 me-3"
                onClick={() => handleViewDetail(r.id)}
              >
                <Eye size={16} className="me-1" /> Xem chi tiết
              </Button>

              {r.status === "PENDING" && (
                <button
                  className="btn start"
                  onClick={() => handleStatusChange(r.id, "IN_PROGRESS")}
                >
                  Bắt đầu
                </button>
              )}
              {r.status === "IN_PROGRESS" && (
                <>
                  <button
                    className="btn complete"
                    onClick={() => handleStatusChange(r.id, "COMPLETED")}
                  >
                    Hoàn thành
                  </button>
                  <button
                    className="btn cancel"
                    onClick={() => handleStatusChange(r.id, "CANCELLED")}
                  >
                    Hủy
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}

      {/* ===== Modal chi tiết ===== */}
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
              <p className="mt-2 text-muted">Đang tải chi tiết...</p>
            </div>
          ) : selectedRepair ? (
            <>
              <p><strong>Mã công việc:</strong> WO{selectedRepair.id}</p>
              <p><strong>Claim ID:</strong> {selectedRepair.claimId}</p>
              <p><strong>Khách hàng:</strong> {selectedRepair.customerName || "—"}</p>
              <p><strong>VIN:</strong> {selectedRepair.vin}</p>
              <p><strong>Phụ tùng sử dụng:</strong> {selectedRepair.partsUsed}</p>
              <p><strong>Mô tả:</strong> {selectedRepair.description}</p>
              <p><strong>Trạng thái:</strong> {selectedRepair.status}</p>
              <p><strong>Ngày sửa:</strong> {selectedRepair.repairDate?.replace("T", " ")}</p>
              <p><strong>Chi phí ước tính:</strong> {selectedRepair.estimatedCost
                ? `${Number(selectedRepair.estimatedCost).toLocaleString()} VND`
                : "—"}</p>
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
    </div>
  );
};

export default WorkOrders;
