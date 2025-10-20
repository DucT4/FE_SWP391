import { useState } from 'react';
import { createRecallWorkOrder } from '../../services/RecallWorkOrder';
import { Container, Row, Col, Card, Badge, ProgressBar, Button, Modal, Form } from 'react-bootstrap';
import { Plus, X } from 'react-bootstrap-icons';
import '../../styles/RecallCampaignContent.css';

function RecallCampaignContent() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    campaignId: '',
    vin: '',
    performedDate: '',
    workDescription: '',
    technicianName: ''
  });

  const stats = [
    { title: 'Đang triển khai', value: 3, variant: 'primary' },
    { title: 'Đã hoàn thành', value: 1, variant: 'success' },
    { title: 'Tổng chiến dịch', value: 4, variant: 'info' }
  ];

  const campaigns = [
    {
      id: 1,
      title: 'Cập nhật phần mềm hệ thống phanh',
      status: 'ongoing',
      statusText: 'Đang triển khai',
      type: 'Phần mềm',
      description: 'Cập nhật firmware cho hệ thống phanh ABS để khắc phục lỗi cảnh báo không chính xác trong một số trường hợp.',
      vehicles: 'VinFast VF 8, VinFast VF 9',
      years: '2023, 2024',
      progress: 66,
      completed: 823,
      total: 1250
    },
    {
      id: 2,
      title: 'Kiểm tra hệ thống pin',
      status: 'ongoing',
      statusText: 'Đang triển khai',
      type: 'Phần cứng',
      description: 'Kiểm tra và thay thế module BMS có dấu hiệu bất thường trong việc quản lý nhiệt độ pin.',
      vehicles: 'VinFast VF 8',
      years: '2023',
      progress: 45,
      completed: 678,
      total: 1500
    },
    {
      id: 3,
      title: 'Cập nhật hệ thống điều hòa',
      status: 'completed',
      statusText: 'Đã hoàn thành',
      type: 'Phần mềm',
      description: 'Cập nhật phần mềm điều khiển điều hòa để tối ưu hiệu suất làm mát.',
      vehicles: 'VinFast VF 5',
      years: '2023',
      progress: 100,
      completed: 450,
      total: 450
    },
    {
      id: 4,
      title: 'Thay thế cụm đèn pha',
      status: 'ongoing',
      statusText: 'Đang triển khai',
      type: 'Phần cứng',
      description: 'Thay thế cụm đèn pha LED có vấn đề về độ sáng không đồng đều.',
      vehicles: 'VinFast VF 8',
      years: '2023',
      progress: 20,
      completed: 150,
      total: 750
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      ongoing: 'primary',
      completed: 'success',
      pending: 'warning'
    };
    return variants[status] || 'secondary';
  };

  const handleCreateCampaign = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFormData({
      campaignId: '',
      vin: '',
      performedDate: '',
      workDescription: '',
      technicianName: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.campaignId || !formData.vin || !formData.performedDate) {
      alert('Vui lòng nhập đầy đủ Campaign ID, VIN, Ngày thực hiện');
      return;
    }
    try {
      // Chỉ gửi các trường đúng với backend yêu cầu
      const reqBody = {
        vin: formData.vin,
        performedDate: formData.performedDate,
        workDescription: formData.workDescription,
        technicianName: formData.technicianName
      };
      await createRecallWorkOrder(formData.campaignId, reqBody);
      alert('Tạo công việc chiến dịch thành công!');
      handleCloseModal();
    } catch (error) {
      alert('Tạo công việc chiến dịch thất bại!');
    }
  };

  return (
    <Container fluid className="recall-campaign-content">
      {/* Statistics Cards */}
      <Row className="mb-4 g-3">
        {stats.map((stat, index) => (
          <Col md={4} key={index}>
            <Card className={`stat-card stat-${stat.variant}`}>
              <Card.Body>
                <div className="stat-title">{stat.title}</div>
                <div className="stat-value">{stat.value}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Header with Create Button */}
      <div className="campaigns-header">
        <h5>Danh sách chiến dịch Recall</h5>
        <Button variant="primary" onClick={handleCreateCampaign}>
          <Plus size={20} /> Tạo công việc chiến dịch
        </Button>
      </div>

      {/* Campaigns List */}
      <Row className="g-3">
        {campaigns.map((campaign) => (
          <Col md={6} key={campaign.id}>
            <Card className="campaign-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="campaign-title">{campaign.title}</h6>
                  <Badge bg={getStatusBadge(campaign.status)}>
                    {campaign.statusText}
                  </Badge>
                </div>
                <p className="campaign-description">{campaign.description}</p>
                <div className="campaign-details">
                  <div className="detail-item">
                    <strong>Loại:</strong> {campaign.type}
                  </div>
                  <div className="detail-item">
                    <strong>Xe:</strong> {campaign.vehicles}
                  </div>
                  <div className="detail-item">
                    <strong>Năm sản xuất:</strong> {campaign.years}
                  </div>
                </div>
                <div className="progress-section">
                  <div className="progress-label">
                    <span>Tiến độ: {campaign.completed} / {campaign.total}</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <ProgressBar
                    now={campaign.progress}
                    variant={getStatusBadge(campaign.status)}
                    className="progress-bar-custom"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Create Campaign Modal */}
      <Modal
        show={showCreateModal}
        onHide={handleCloseModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo công việc chiến dịch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Campaign ID <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                name="campaignId"
                value={formData.campaignId}
                onChange={handleInputChange}
                placeholder="ID chiến dịch liên quan"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>VIN <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="vin"
                value={formData.vin}
                onChange={handleInputChange}
                placeholder="Nhập số VIN"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ngày thực hiện <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="date"
                name="performedDate"
                value={formData.performedDate}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                placeholder="Nhập mô tả công việc"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên kỹ thuật viên</Form.Label>
              <Form.Control
                type="text"
                name="technicianName"
                value={formData.technicianName}
                onChange={handleInputChange}
                placeholder="Nhập tên kỹ thuật viên"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                <X size={18} /> Hủy
              </Button>
              <Button variant="primary" type="submit">
                <Plus size={18} /> Tạo công việc
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default RecallCampaignContent;
