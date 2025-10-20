import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createCampaign } from "../../services/Campaign";

const initialState = {
  id: "",
  campaignId: "",
  vin: "",
  staffId: "",
  performedDate: "",
  workDescription: "",
  technicianName: "",
  createdAt: "",
  campaignPayments: ""
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
        id: formData.id,
        campaignId: formData.campaignId,
        vin: formData.vin,
        staffId: formData.staffId,
        performedDate: formData.performedDate,
        workDescription: formData.workDescription,
        technicianName: formData.technicianName,
        createdAt: formData.createdAt,
        campaignPayments: formData.campaignPayments
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
        <Modal.Title>Tạo công việc chiến dịch</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="number"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="ID (auto hoặc nhập nếu cần)"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Campaign ID</Form.Label>
            <Form.Control
              type="number"
              name="campaignId"
              value={formData.campaignId}
              onChange={handleChange}
              placeholder="ID chiến dịch liên quan"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>VIN</Form.Label>
            <Form.Control
              type="text"
              name="vin"
              value={formData.vin}
              onChange={handleChange}
              placeholder="Nhập mã VIN xe"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Staff ID</Form.Label>
            <Form.Control
              type="number"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              placeholder="ID nhân viên thực hiện"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày thực hiện</Form.Label>
            <Form.Control
              type="date"
              name="performedDate"
              value={formData.performedDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả công việc</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="workDescription"
              value={formData.workDescription}
              onChange={handleChange}
              placeholder="Nhập mô tả công việc"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên kỹ thuật viên</Form.Label>
            <Form.Control
              type="text"
              name="technicianName"
              value={formData.technicianName}
              onChange={handleChange}
              placeholder="Nhập tên kỹ thuật viên"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày tạo</Form.Label>
            <Form.Control
              type="datetime-local"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleChange}
              placeholder="Ngày tạo bản ghi (nếu cần)"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Thông tin thanh toán chiến dịch</Form.Label>
            <Form.Control
              type="text"
              name="campaignPayments"
              value={formData.campaignPayments}
              onChange={handleChange}
              placeholder="Thông tin thanh toán (nếu có)"
            />
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
