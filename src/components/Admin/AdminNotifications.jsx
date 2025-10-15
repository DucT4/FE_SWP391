import React, { useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { Bell, Plus } from "lucide-react";
import "../../styles/AdminNotifications.css";

const AdminNotifications = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // Mock data - Lịch sử thông báo
  const notifications = [
    {
      id: 1,
      title: "Thông báo về chiến dịch Recall mới",
      content:
        "Vui lòng kiểm tra và triển khai chiến dịch recall cho dòng VinFast VF 8 năm 2023 liên quan đến vấn đề phần mềm hệ thống phanh.",
      sender: "Admin",
      date: "1/10/2024",
    },
    {
      id: 2,
      title: "Cập nhật quy trình xử lý bảo hành",
      content:
        "Từ ngày 05/10/2024, tất cả các yêu cầu bảo hành cần được phân công trong vòng 24 giờ kể từ khi được duyệt.",
      sender: "Admin",
      date: "28/9/2024",
    },
    {
      id: 3,
      title: "Đào tạo về linh kiện mới",
      content:
        "Buổi đào tạo về module pin BMS thế hệ mới sẽ được tổ chức vào ngày 10/10/2024. Vui lòng sắp xếp thời gian tham dự.",
      sender: "Admin",
      date: "25/9/2024",
    },
  ];

  const handleCreateNotification = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFormData({
      title: "",
      content: "",
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
    console.log("Create notification:", formData);
    handleCloseModal();
  };

  return (
    <Container fluid className="admin-notifications">
      {/* Header */}
      <div className="admin-notifications-header">
        <div>
          <h4>Gửi thông báo đến SC Staff</h4>
          <p className="admin-notifications-subtitle">
            Tạo và gửi thông báo tới tất cả nhân viên trung tâm dịch vụ
          </p>
        </div>
        <Button
          className="btn-create-notification"
          onClick={handleCreateNotification}
        >
          <Plus size={18} />
          Tạo thông báo mới
        </Button>
      </div>

      {/* Notification History */}
      <div>
        <h5 className="mb-3" style={{ fontWeight: 600 }}>
          Lịch sử thông báo ({notifications.length})
        </h5>

        {notifications.map((notification) => (
          <div key={notification.id} className="notification-card">
            <div className="notification-card-header">
              <div>
                <h6 className="notification-title">{notification.title}</h6>
                <p className="notification-content">{notification.content}</p>
              </div>
              <span className="notification-date">{notification.date}</span>
            </div>
            <div className="notification-meta">
              <Bell size={14} />
              <span>Người gửi: {notification.sender}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Notification Modal */}
      <Modal
        show={showCreateModal}
        onHide={handleCloseModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo thông báo mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-3">Gửi thông báo đến SC Staff</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                Tiêu đề <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Nhập tiêu đề thông báo"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Nội dung <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Nhập nội dung thông báo"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Gửi thông báo
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminNotifications;
