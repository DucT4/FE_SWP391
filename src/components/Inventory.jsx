import React, { useState } from "react";
import { Button, Table, Form, Row, Col, Card, Container } from "react-bootstrap";
import { Pencil, Trash, Plus } from "lucide-react";
import "./Inventory.css";

const Inventory = () => {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("Tất cả");

    const parts = [
        {
            code: "BMS-VF8-001",
            name: "Module quản lý pin BMS",
            type: "Pin",
            quantity: 12,
            minStock: 5,
            price: 15000000,
            total: 180000000,
            status: "Đủ hàng",
            updated: "2/10/2024",
        },
        {
            code: "AC-VF6-007",
            name: "Compressor điều hòa",
            type: "Điện",
            quantity: 8,
            minStock: 3,
            price: 12000000,
            total: 96000000,
            status: "Đủ hàng",
            updated: "1/10/2024",
        },
        {
            code: "CHRG-PORT-V2",
            name: "Cổng sạc nhanh CCS2",
            type: "Điện",
            quantity: 15,
            minStock: 5,
            price: 5000000,
            total: 75000000,
            status: "Đủ hàng",
            updated: "2/10/2024",
        },
        {
            code: "WIPER-MOTOR",
            name: "Mô tơ gạt nước",
            type: "Điện",
            quantity: 20,
            minStock: 8,
            price: 2500000,
            total: 50000000,
            status: "Đủ hàng",
            updated: "1/10/2024",
        },
        {
            code: "BRAKE-ABS-001",
            name: "Bộ ABS chống bó cứng phanh",
            type: "Cơ khí",
            quantity: 4,
            minStock: 2,
            price: 22000000,
            total: 88000000,
            status: "Đủ hàng",
            updated: "30/9/2024",
        },
    ];

    const filteredParts = parts.filter(
        (p) =>
            (filterType === "Tất cả" || p.type === filterType) &&
            (p.code.toLowerCase().includes(search.toLowerCase()) ||
                p.name.toLowerCase().includes(search.toLowerCase()))
    );

    const totalValue = parts.reduce((sum, p) => sum + p.total, 0);

    return (
        <Container className="py-4 inventory-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Quản lý kho hàng - Trung tâm</h4>
                <Button variant="dark">
                    <Plus size={16} /> Thêm linh kiện mới
                </Button>
            </div>

            {/* --- Thống kê tổng quan --- */}
            <Row className="mb-4 g-3">
                <Col md={4}>
                    <Card className="summary-card">
                        <Card.Body>
                            <p className="mb-1 text-muted">Tổng số loại linh kiện</p>
                            <h5>{parts.length}</h5>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="summary-card">
                        <Card.Body>
                            <p className="mb-1 text-muted">Cảnh báo tồn kho thấp</p>
                            <h5>
                                {parts.filter((p) => p.quantity <= p.minStock).length}
                            </h5>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="summary-card">
                        <Card.Body>
                            <p className="mb-1 text-muted">Tổng giá trị kho</p>
                            <h5>{totalValue.toLocaleString()} VNĐ</h5>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* --- Bộ lọc --- */}
            <Row className="align-items-center mb-3">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="🔍 Mã linh kiện, tên..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option>Tất cả</option>
                        <option>Pin</option>
                        <option>Điện</option>
                        <option>Cơ khí</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* --- Bảng dữ liệu --- */}
            <Card>
                <Card.Body>
                    <h6 className="mb-3 fw-bold">Danh sách tồn kho</h6>
                    <Table hover responsive className="align-middle">
                        <thead>
                            <tr>
                                <th>Mã linh kiện</th>
                                <th>Tên linh kiện</th>
                                <th>Loại</th>
                                <th>Số lượng</th>
                                <th>Tồn tối thiểu</th>
                                <th>Đơn giá</th>
                                <th>Tổng giá trị</th>
                                <th>Trạng thái</th>
                                <th>Cập nhật</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredParts.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="fw-semibold">{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.type}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.minStock}</td>
                                    <td>{item.price.toLocaleString()} VNĐ</td>
                                    <td>{item.total.toLocaleString()} VNĐ</td>
                                    <td>
                                        <span
                                            className={`badge ${item.status === "Đủ hàng"
                                                    ? "bg-success"
                                                    : "bg-warning text-dark"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td>{item.updated}</td>
                                    <td>
                                        <Button variant="outline-secondary" size="sm" className="me-2">
                                            <Pencil size={14} />
                                        </Button>
                                        <Button variant="outline-danger" size="sm">
                                            <Trash size={14} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <p className="text-muted small mt-3">
                        Hiển thị {filteredParts.length} / {parts.length} linh kiện
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Inventory;
