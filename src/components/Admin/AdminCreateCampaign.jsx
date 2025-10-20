import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createCampaign } from "../../services/Campaign";

const initialState = {
  type: "Recall",
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  status: "Planned"
};

function AdminCreateCampaign({ show, onClose, onCreated }) {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCampaign({
        type: formData.type,
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status
      });
      setFormData(initialState);
      if (onCreated) onCreated();
      if (onClose) onClose();
    } catch (error) {
      alert("Tạo chiến dịch thất bại!\n" + (error?.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tạo chiến dịch Recall mới</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Loại chiến dịch <span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Select name="type" value={formData.type} onChange={handleChange} required>
              <option value="Recall">Recall</option>
              <option value="Service">Service</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên chiến dịch <span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên chiến dịch"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Nhập mô tả chiến dịch"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày bắt đầu <span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày kết thúc <span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Trạng thái <span style={{color: 'red'}}>*</span></Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange} required>
              <option value="Planned">Lên kế hoạch</option>
              <option value="Active">Đang triển khai</option>
              <option value="Closed">Đã kết thúc</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Đang tạo..." : "Tạo chiến dịch"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AdminCreateCampaign;
