import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form, Badge } from "react-bootstrap";
import { Users, UserPlus, Edit, Trash2, Mail, Phone, MapPin } from "lucide-react";
import "../../styles/AdminAccountManagement.css";

const AdminAccountManagement = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phone: "",
    role: "SC_STAFF",
    center: "",
  });

  // Mock data - Danh sách tài khoản
  const accounts = [
    {
      id: 1,
      username: "admin",
      fullName: "Admin Hệ thống",
      email: "admin@evm.com",
      phone: "0900000000",
      role: "Admin",
      status: "active",
      statusText: "Hoạt động",
    },
    {
      id: 2,
      username: "staff001",
      fullName: "Nguyễn Văn A",
      email: "staff@evm.com",
      phone: "0901111111",
      role: "SC Staff",
      center: "Trung tâm Hà Nội",
      status: "active",
      statusText: "Hoạt động",
    },
    {
      id: 3,
      username: "tech001",
      fullName: "Trần Văn B",
      email: "tech1@sc.com",
      phone: "0902222222",
      role: "SC Technician",
      center: "Trung tâm Hà Nội",
      status: "active",
      statusText: "Hoạt động",
    },
  ];

  const handleCreateAccount = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFormData({
      username: "",
      email: "",
      password: "",
      fullName: "",
      phone: "",
      role: "SC_STAFF",
      center: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Create account:", formData);
    handleCloseModal();
  };

  const handleEdit = (accountId) => {
    console.log("Edit account:", accountId);
  };

  const handleDelete = (accountId) => {
    console.log("Delete account:", accountId);
  };

  return (
    <Container fluid className="admin-account-management">
      {/* Header */}
      <div className="admin-account-header">
        <div>
          <h4>Quản lý tài khoản</h4>
        </div>
        <Button className="btn-create-account" onClick={handleCreateAccount}>
          <UserPlus size={18} />
          Tạo tài khoản mới
        </Button>
      </div>

      {/* Account List */}
      <div>
        <h5 className="account-list-header">
          Danh sách tài khoản ({accounts.length})
        </h5>

        {accounts.map((account) => (
          <div key={account.id} className="account-card">
            <div className="account-card-header">
              <div className="d-flex align-items-center">
                <span className="account-name">{account.fullName}</span>
                <Badge className="account-role-badge">{account.role}</Badge>
                <Badge
                  className={`account-status-badge ${account.status} ms-2`}
                >
                  {account.statusText}
                </Badge>
              </div>
              <div className="account-actions">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleEdit(account.id)}
                >
                  <Edit size={14} />
                </Button>
                {account.role !== "Admin" && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(account.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                )}
              </div>
            </div>
            <div className="account-info">
              <div className="account-info-item">
                <Mail size={14} />
                <span>{account.email}</span>
              </div>
              <div className="account-info-item">
                <Phone size={14} />
                <span>{account.phone}</span>
              </div>
              {account.center && (
                <div className="account-info-item">
                  <MapPin size={14} />
                  <span>{account.center}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Account Modal */}
      <Modal show={showCreateModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Tạo tài khoản mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Tên đăng nhập <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Nhập tên đăng nhập"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Mật khẩu <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Họ và tên <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Vai trò <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="SC_STAFF">SC Staff</option>
                    <option value="SC_TECHNICIAN">SC Technician</option>
                    <option value="SC_MANAGER">SC Manager</option>
                    <option value="EVM_STAFF">EVM Staff</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {formData.role !== "EVM_STAFF" && (
              <Form.Group className="mb-3">
                <Form.Label>Trung tâm</Form.Label>
                <Form.Select
                  name="center"
                  value={formData.center}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn trung tâm</option>
                  <option value="Trung tâm Hà Nội">Trung tâm Hà Nội</option>
                  <option value="Trung tâm TP.HCM">Trung tâm TP.HCM</option>
                  <option value="Trung tâm Đà Nẵng">Trung tâm Đà Nẵng</option>
                </Form.Select>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Tạo tài khoản
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminAccountManagement;
