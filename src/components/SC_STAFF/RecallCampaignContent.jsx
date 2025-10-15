import { useState } from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar, Button, Modal, Form } from 'react-bootstrap';
import { Plus, X } from 'react-bootstrap-icons';
import '../../styles/RecallCampaignContent.css';

function RecallCampaignContent() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    vehicles: '',
    years: '',
    issueType: '',
    priority: 'Trung bình',
    startDate: '',
    totalVehicles: ''
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
      title: '',
      description: '',
      vehicles: '',
      years: '',
      issueType: '',
      priority: 'Trung bình',
      startDate: '',
      totalVehicles: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Create campaign:', formData);
    handleCloseModal();
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
          <Plus size={20} /> Tạo chiến dịch mới
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
          <Modal.Title>Tạo chiến dịch Recall mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề chiến dịch <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Nhập tiêu đề chiến dịch"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Mô tả chi tiết về vấn đề và giải pháp"
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Dòng xe <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicles"
                    value={formData.vehicles}
                    onChange={handleInputChange}
                    placeholder="VD: VinFast VF 8, VF 9"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Năm sản xuất <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="years"
                    value={formData.years}
                    onChange={handleInputChange}
                    placeholder="VD: 2023, 2024"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Loại vấn đề <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn loại vấn đề</option>
                    <option value="software">Phần mềm</option>
                    <option value="hardware">Phần cứng</option>
                    <option value="safety">An toàn</option>
                    <option value="performance">Hiệu suất</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mức độ ưu tiên <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Cao">Cao</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Thấp">Thấp</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ngày bắt đầu <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tổng số xe dự kiến <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    name="totalVehicles"
                    value={formData.totalVehicles}
                    onChange={handleInputChange}
                    placeholder="Nhập số lượng xe"
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            <X size={18} /> Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            <Plus size={18} /> Tạo chiến dịch
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RecallCampaignContent;
