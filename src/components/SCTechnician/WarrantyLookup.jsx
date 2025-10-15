import React, { useState } from "react";
import { Container, Row, Col, Badge, Spinner, Alert } from "react-bootstrap";
import { Search, Package, ShieldCheck, Info, AlertCircle } from "lucide-react";
import "../../styles/WarrantyLookup.css";
import api from "../../config/apiConfig";

const WarrantyLookup = () => {
  const [keyWord, setKeyWord] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLookup = async () => {
    if (!keyWord.trim()) {
      setError("Vui lòng nhập mã linh kiện");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await api.get("/warranty/lookup", {
        params: { vin: keyWord.trim() },
      });

      if (res.status === 200) {
        console.log("Lookup result:", res.data);
        setResult(res.data);
      }
    } catch (err) {
      console.error("Lỗi lookup:", err);
      setError(
        err.response?.data?.message ||
          "Không tìm thấy thông tin linh kiện. Vui lòng kiểm tra lại mã."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLookup();
    }
  };

  return (
    <Container fluid className="warranty-lookup-container">
      {/* Header */}
      <div className="lookup-header">
        <h4>
          <Search size={24} className="me-2" />
          Tra cứu thông tin bảo hành linh kiện
        </h4>
        <p>Nhập mã linh kiện để tra cứu thông tin chi tiết và điều kiện bảo hành</p>
      </div>

      {/* Search Box */}
      <div className="lookup-search-box">
        <label className="lookup-search-label">Mã linh kiện</label>
        <div className="lookup-search-input-group">
          <input
            type="text"
            className="lookup-search-input"
            placeholder="Ví dụ: BMS-VF8-001"
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="btn-lookup"
            onClick={handleLookup}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Đang tra cứu...
              </>
            ) : (
              <>
                <Search size={18} className="me-2" />
                Tra cứu
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="lookup-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="lookup-loading">
          <Spinner animation="border" variant="primary" />
          <p>Đang tra cứu thông tin...</p>
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="lookup-result-card">
          <div className="lookup-result-header">
            <h5 className="lookup-part-code">{result.partCode}</h5>
            <p className="lookup-part-name">{result.partName}</p>
            <p className="lookup-part-description">{result.description}</p>
          </div>

          <Row>
            {/* Thông tin bảo hành */}
            <Col md={6}>
              <div className="lookup-info-card">
                <h6>
                  <ShieldCheck size={20} />
                  Thông tin bảo hành
                </h6>

                <div className="lookup-info-item">
                  <span className="lookup-info-label">Thời gian bảo hành:</span>
                  <span className="lookup-info-value highlight">
                    {result.warrantyPeriod || "24 tháng"}
                  </span>
                </div>

                <p className="lookup-list-title">Điều kiện bảo hành</p>
                <ul className="lookup-list">
                  <li>Bảo hành lỗi do nhà sản xuất</li>
                  <li>Linh kiện chính hãng, còn trong thời hạn</li>
                  <li>Không có dấu hiệu va chạm hoặc tác động ngoại lực</li>
                  <li>Sử dụng đúng hướng dẫn của nhà sản xuất</li>
                </ul>

                <p className="lookup-list-title">Không bảo hành</p>
                <ul className="lookup-list">
                  <li>Hư hỏng do va chạm, tai nạn</li>
                  <li>Sử dụng sai mục đích</li>
                  <li>Tự ý sửa chữa, thay đổi</li>
                  <li>Hết thời hạn bảo hành</li>
                </ul>
              </div>
            </Col>

            {/* Thông tin kỹ thuật & Quy trình */}
            <Col md={6}>
              <div className="lookup-info-card mb-3">
                <h6>
                  <Package size={20} />
                  Thông tin kỹ thuật
                </h6>

                <div className="lookup-info-item">
                  <span className="lookup-info-label">Loại linh kiện:</span>
                  <span className="lookup-info-value">
                    {result.type || "Pin"}
                  </span>
                </div>

                <div className="lookup-info-item">
                  <span className="lookup-info-label">Dòng xe tương thích:</span>
                </div>
                <div className="compatible-cars">
                  {result.compatibleCars?.length > 0 ? (
                    result.compatibleCars.map((car, i) => (
                      <span key={i} className="car-badge">
                        {car}
                      </span>
                    ))
                  ) : (
                    <>
                      <span className="car-badge">VinFast VF 8</span>
                      <span className="car-badge">VinFast VF 9</span>
                    </>
                  )}
                </div>

                <div className="lookup-info-item">
                  <span className="lookup-info-label">Giá tham khảo:</span>
                  <span className="lookup-info-value">
                    {result.price
                      ? result.price.toLocaleString("vi-VN") + " VND"
                      : "15.000.000 VND"}
                  </span>
                </div>
              </div>

              <div className="lookup-info-card">
                <h6>Quy trình bảo hành</h6>
                <ol className="process-steps">
                  <li>Kiểm tra tình trạng linh kiện và điều kiện bảo hành</li>
                  <li>Tạo yêu cầu bảo hành trên hệ thống</li>
                  <li>Chờ phê duyệt từ EVM Staff (1-2 ngày làm việc)</li>
                  <li>Tiến hành thay thế/sửa chữa sau khi được duyệt</li>
                  <li>Hoàn thành và cập nhật kết quả lên hệ thống</li>
                </ol>
              </div>
            </Col>
          </Row>

          <div className="lookup-info-note">
            <Info size={18} />
            <span>
              <strong>Lưu ý:</strong> Thông tin bảo hành có thể thay đổi theo chính sách của nhà sản xuất. 
              Vui lòng liên hệ với quản lý để biết thêm chi tiết.
            </span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!result && !loading && !error && keyWord === "" && (
        <div className="lookup-empty-state">
          <Search size={80} />
          <h5>Tra cứu thông tin bảo hành</h5>
          <p>
            Nhập mã linh kiện vào ô tìm kiếm phía trên để xem thông tin chi tiết
            về điều kiện bảo hành, thông số kỹ thuật và quy trình xử lý.
          </p>
        </div>
      )}
    </Container>
  );
};

export default WarrantyLookup;
