import React, { useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Search, ShieldCheck, Package, Info, AlertCircle } from "lucide-react";
import "../../styles/WarrantyLookup.css";
import { getWarrantyLookup } from "../../services/warrantyService"; // ✅ gọi API thật

const WarrantyLookup = () => {
  const [vin, setVin] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLookup = async () => {
    if (!vin.trim()) {
      setError("Vui lòng nhập số VIN");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await getWarrantyLookup(vin.trim());
      console.log("📦 Lookup result:", data);
      setResult(data);
    } catch (err) {
      console.error("❌ Lỗi tra cứu:", err);
      setError("Không tìm thấy thông tin bảo hành hoặc có lỗi xảy ra!");
    } finally {
      setLoading(false);
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
        <p>Nhập mã VIN để tra cứu thông tin bảo hành hiện tại</p>
      </div>

      {/* Ô tìm kiếm */}
      <div className="lookup-search-box">
        <label className="lookup-search-label">Mã VIN</label>
        <div className="lookup-search-input-group">
          <input
            type="text"
            className="lookup-search-input"
            placeholder="Ví dụ: VF8ABC1234567890"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
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

      {/* Lỗi */}
      {error && (
        <div className="lookup-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Kết quả */}
      {result && !loading && (
        <div className="lookup-result-card mt-4">
          <Row>
            <Col md={6}>
              <div className="lookup-info-card">
                <h6>
                  <ShieldCheck size={20} />
                  Thông tin bảo hành
                </h6>

                <p>
                  <b>VIN:</b> {result.vin}
                </p>
                <p>
                  <b>Trạng thái:</b>{" "}
                  {result.active ? (
                    <span className="text-success">Còn hiệu lực</span>
                  ) : (
                    <span className="text-danger">Hết hạn</span>
                  )}
                </p>
                <p>
                  <b>Ngày tra cứu:</b> {result.asOfDate}
                </p>

                {result.warnings?.length > 0 && (
                  <Alert variant="warning" className="mt-2">
                    <ul>
                      {result.warnings.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </Alert>
                )}
              </div>
            </Col>

            <Col md={6}>
              <div className="lookup-info-card">
                <h6>
                  <Package size={20} /> Gói bảo hành đang hiệu lực
                </h6>

                {result.activeCoverages?.length > 0 ? (
                  <ul>
                    {result.activeCoverages.map((c, i) => (
                      <li key={i}>
                        <b>{c.partCategory}</b> ({c.startDate} → {c.endDate})<br />
                        Giới hạn km: {c.mileageLimit || "Không giới hạn"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Không có gói bảo hành nào đang hoạt động.</p>
                )}
              </div>
            </Col>
          </Row>

          <div className="lookup-info-note mt-3">
            <Info size={18} />
            <span>
              <strong>Lưu ý:</strong> Dữ liệu hiển thị theo thời điểm tra cứu
              (asOfDate). Các gói bảo hành sắp hết hạn sẽ được cảnh báo.
            </span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default WarrantyLookup;
