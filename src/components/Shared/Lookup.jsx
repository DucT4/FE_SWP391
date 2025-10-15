import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import "../../styles/Lookup.css";
import { useState } from "react";
import api from "../../config/apiConfig";

export default function Lookup() {
    const [keyWord, setKeyWord] = useState("");
    const [result, setResult] = useState(null);

    const handleLookup = async () => {
        try {
            const res = await api.get("/warranty/lookup", {
                params: { vin: keyWord }
            });

            if (res.status === 200) {
                console.log(res.data);
                setResult(res.data);
            }
        } catch (err) {
            console.error("Lỗi lookup:", err);
        }
    };


    return (
        <div className="lookup-container">
            <Container className="py-4">
                <h3 className="mb-1">
                    Tra cứu thông tin bảo hành linh kiện
                </h3>
                <div className="search-border">
                    <p>Nhập mã linh kiện</p>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <input value={keyWord} onChange={(e) => setKeyWord(e.target.value)} className="search-input" placeholder="Ví dụ: BMS - VF8 - 001" type="text" />
                        <button onClick={() => handleLookup()} style={{ borderRadius: 8, backgroundColor: '#000', color: 'white', padding: "6px 10px" }}>Tra cứu</button>
                    </div>
                </div>

                {!result && (
                    <Card className="mt-4 p-3 shadow-sm">
                        <h5 className="fw-bold">{result?.partCode}</h5>
                        <p className="text-muted mb-1">{result?.partName}</p>
                        <p>{result?.description}</p>

                        <Row className="mt-3">
                            {/* Thông tin bảo hành */}
                            <Col md={6}>
                                <Card className="p-3 mb-3">
                                    <h6 className="fw-semibold mb-3">
                                        <i className="bi bi-shield-check text-success me-2"></i>
                                        Thông tin bảo hành
                                    </h6>
                                    <p className="mb-1 fw-medium">
                                        Thời gian bảo hành:{" "}
                                        <span className="fw-semibold text-dark">
                                            {result?.warrantyPeriod || "24 tháng"}
                                        </span>
                                    </p>
                                    <p className="fw-semibold mt-3">Điều kiện bảo hành</p>
                                    <ul className="mb-2">
                                        <li>Bảo hành lỗi do nhà sản xuất</li>
                                        <li>Linh kiện chính hãng, còn trong thời hạn</li>
                                        <li>Không có dấu hiệu va chạm hoặc tác động ngoại lực</li>
                                        <li>Sử dụng đúng hướng dẫn của nhà sản xuất</li>
                                    </ul>

                                    <p className="fw-semibold">Không bảo hành</p>
                                    <ul>
                                        <li>Hư hỏng do va chạm, tai nạn</li>
                                        <li>Sử dụng sai mục đích</li>
                                        <li>Tự ý sửa chữa, thay đổi</li>
                                        <li>Hết thời hạn bảo hành</li>
                                    </ul>
                                </Card>
                            </Col>

                            {/* Thông tin kỹ thuật & Quy trình */}
                            <Col md={6}>
                                <Card className="p-3 mb-3">
                                    <h6 className="fw-semibold mb-3">Thông tin kỹ thuật</h6>
                                    <p className="mb-1">
                                        <strong>Loại linh kiện:</strong> {result?.type || "Pin"}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Dòng xe tương thích:</strong>
                                    </p>
                                    <div className="d-flex gap-2 mb-2 flex-wrap">
                                        {result?.compatibleCars?.map((car, i) => (
                                            <Badge key={i} bg="light" text="dark">
                                                {car}
                                            </Badge>
                                        )) || (
                                                <>
                                                    <Badge bg="light" text="dark">
                                                        VinFast VF 8
                                                    </Badge>
                                                    <Badge bg="light" text="dark">
                                                        VinFast VF 9
                                                    </Badge>
                                                </>
                                            )}
                                    </div>
                                    <p>
                                        <strong>Giá tham khảo:</strong>{" "}
                                        {result?.price
                                            ? result?.price.toLocaleString("vi-VN") + " VND"
                                            : "15.000.000 VND"}
                                    </p>
                                </Card>

                                <Card className="p-3">
                                    <h6 className="fw-semibold mb-3">Quy trình bảo hành</h6>
                                    <ol className="mb-0">
                                        <li>Kiểm tra tình trạng linh kiện và điều kiện bảo hành</li>
                                        <li>Tạo yêu cầu bảo hành trên hệ thống</li>
                                        <li>Chờ phê duyệt từ EVM Staff (1-2 ngày làm việc)</li>
                                        <li>Tiến hành thay thế/sửa chữa sau khi được duyệt</li>
                                        <li>
                                            Hoàn thành và cập nhật kết quả lên hệ thống
                                        </li>
                                    </ol>
                                </Card>
                            </Col>
                        </Row>

                        <div className="mt-3 text-muted">
                            <i className="bi bi-info-circle me-1"></i>
                            Lưu ý: Thông tin bảo hành có thể thay đổi theo chính sách của nhà
                            sản xuất.
                        </div>
                    </Card>
                )}
            </Container>
        </div>
    )
}