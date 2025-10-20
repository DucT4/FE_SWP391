import React, { useState } from "react";
import { Spinner, Badge, Card, Pagination } from "react-bootstrap";
import { getWarrantyHistory } from "../../services/warrantyService"; 
import toast from "react-hot-toast";

const WarrantyHistory = () => {
  const [vin, setVin] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async (pageNum = 0) => {
    if (!vin.trim()) {
      toast.error("Vui lòng nhập số VIN!");
      return;
    }

    setLoading(true);
    try {
      const res = await getWarrantyHistory(vin.trim(), pageNum, 5);
      console.log("📘 History result:", res);

      // ✅ Lấy đúng dữ liệu từ response
      const content = res.data?.content || [];
      const total = res.data?.totalPages || 0;

      setData(content);
      setTotalPages(total);
      setPage(pageNum);
    } catch (err) {
      console.error("❌ Lỗi lấy lịch sử bảo hành:", err);
      toast.error("Không thể tải dữ liệu lịch sử bảo hành!");
    } finally {
      setLoading(false);
    }
  };

  const renderBadge = (status) => {
    switch (status) {
      case "COMPLETED":
        return <Badge bg="success">Hoàn thành</Badge>;
      case "IN_PROGRESS":
        return (
          <Badge bg="warning" text="dark">
            Đang xử lý
          </Badge>
        );
      case "CANCELLED":
        return <Badge bg="danger">Đã hủy</Badge>;
      default:
        return <Badge bg="secondary">{status || "Không rõ"}</Badge>;
    }
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-3">📜 Lịch sử bảo hành</h4>

      {/* Thanh tìm kiếm */}
      <div className="d-flex gap-2 mb-4">
        <input
          className="form-control"
          placeholder="Nhập số VIN để tra cứu..."
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch(0)}
        />
        <button
          className="btn btn-dark"
          onClick={() => handleSearch(0)}
          disabled={loading}
        >
          {loading ? "Đang tải..." : "Tra cứu"}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Đang tải dữ liệu...</p>
        </div>
      )}

      {/* Kết quả */}
      {!loading && data.length > 0 && (
        <>
          {data.map((item, idx) => (
            <Card key={idx} className="mb-3 shadow-sm p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0">{item.description}</h6>
                {renderBadge(item.status)}
              </div>
              <p className="mb-1 text-muted">
                Phụ tùng: {item.partsUsed || "Không rõ"}
              </p>
              <small className="text-muted">
                Ngày sửa:{" "}
                {item.repairDate
                  ? new Date(item.repairDate).toLocaleString("vi-VN")
                  : "Không có thông tin"}
              </small>
            </Card>
          ))}

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i === page}
                    onClick={() => handleSearch(i)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* Khi chưa có dữ liệu */}
      {!loading && data.length === 0 && (
        <p className="text-muted">
          Nhập VIN ở trên và nhấn <b>Tra cứu</b> để xem lịch sử bảo hành.
        </p>
      )}
    </div>
  );
};

export default WarrantyHistory;
