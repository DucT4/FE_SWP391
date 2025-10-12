import { useState } from 'react';
import { Container, Row, Col, Card, Nav, Badge, ProgressBar, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { 
  ExclamationTriangle, 
  FileText, 
  Bell, 
  Search, 
  ClockHistory,
  Plus,
  CarFrontFill,
  X,
  BoxArrowRight,
  PersonCircle
} from 'react-bootstrap-icons';
import RecallOrders from './RecallOrders';
import Notifications from './Notifications';
import authService from '../services/authService';
import './RecallCampaign.css';

function RecallCampaign({ onLogout, userRole }) {
  const [activeTab, setActiveTab] = useState('recall');
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
      description: 'Kiểm tra và thay thế module pin có khả năng xảy ra lỗi trong điều kiện nhiệt độ cao.',
      vehicles: 'VinFast VF e34',
      years: '2022, 2023',
      progress: 45,
      completed: 340,
      total: 756
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    console.log('Tạo chiến dịch mới:', formData);
    // TODO: Gọi API để tạo chiến dịch
    setShowCreateModal(false);
    // Reset form
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

  return (
    <div className="recall-campaign-page">
      {/* Header */}
      <div className="page-header">
        <Container>
          <div className="d-flex align-items-center justify-content-between py-3">
            <div className="d-flex align-items-center gap-3">
              <div className="header-icon">
                <CarFrontFill size={32} />
              </div>
              <div>
                <h1 className="mb-0">Hệ thống bảo hành xe điện</h1>
                <p className="text-muted mb-0 small">
                  {authService.getCurrentUser()?.username || 'User'} • 
                  {userRole?.replace('ROLE_', '').replace('_', ' ') || 'Role'} • 
                  Trung tâm Hà Nội
                </p>
              </div>
            </div>
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-primary" id="dropdown-user">
                <PersonCircle size={20} className="me-2" />
                {authService.getCurrentUser()?.username || 'User'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <PersonCircle size={16} className="me-2" />
                  Thông tin tài khoản
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogout} className="text-danger">
                  <BoxArrowRight size={16} className="me-2" />
                  Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs-container bg-white border-bottom">
        <Container>
          <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
            <Nav.Item>
              <Nav.Link eventKey="recall" className="d-flex align-items-center gap-2">
                <ExclamationTriangle size={18} />
                Chiến dịch Recall
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="orders" className="d-flex align-items-center gap-2">
                <FileText size={18} />
                Đơn Recall
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="notifications" className="d-flex align-items-center gap-2 position-relative">
                <Bell size={18} />
                Thông báo
                <Badge bg="danger" pill className="ms-1">1</Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="search" className="d-flex align-items-center gap-2">
                <Search size={18} />
                Tra cứu bảo hành
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="history" className="d-flex align-items-center gap-2">
                <ClockHistory size={18} />
                Lịch sử
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </div>

      {/* Main Content */}
      {activeTab === 'recall' && (
        <Container className="py-4">
          {/* Statistics Cards */}
          <Row className="mb-4">
            {stats.map((stat, index) => (
              <Col key={index} xs={12} md={4} className="mb-3">
                <Card className={`stat-card border-0 shadow-sm h-100 border-start border-${stat.variant} border-4`}>
                  <Card.Body>
                    <div className="text-muted small mb-1">{stat.title}</div>
                    <h2 className="mb-0 fw-bold">{stat.value}</h2>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Campaigns Section */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Chiến dịch Recall</h3>
            <Button 
            variant="dark" 
            className="d-flex align-items-center gap-2"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={20} />
            Tạo chiến dịch mới
          </Button>
        </div>

        {/* Campaign Cards */}
        <Row>
          {campaigns.map((campaign) => (
            <Col key={campaign.id} xs={12} className="mb-4">
              <Card className="campaign-card border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className={`campaign-icon bg-${getStatusBadge(campaign.status)} bg-opacity-10`}>
                        <ExclamationTriangle className={`text-${getStatusBadge(campaign.status)}`} size={24} />
                      </div>
                      <div>
                        <h5 className="mb-1">{campaign.title}</h5>
                        <div className="d-flex align-items-center gap-2">
                          <Badge bg={getStatusBadge(campaign.status)}>{campaign.statusText}</Badge>
                          <Badge bg="secondary" className="fw-normal">{campaign.type}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted mb-3">{campaign.description}</p>

                  {/* Details */}
                  <Row className="mb-3">
                    <Col md={6}>
                      <div className="detail-item">
                        <strong>Dòng xe ảnh hưởng</strong>
                        <p className="mb-0">{campaign.vehicles}</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="detail-item">
                        <strong>Năm sản xuất</strong>
                        <p className="mb-0">{campaign.years}</p>
                      </div>
                    </Col>
                  </Row>

                  {/* Progress */}
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <strong>Tiến độ thực hiện</strong>
                      <span className="text-muted">{campaign.completed} / {campaign.total} xe</span>
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
        </Container>
      )}

      {/* Đơn Recall Tab */}
      {activeTab === 'orders' && <RecallOrders />}

      {/* Thông báo Tab */}
      {activeTab === 'notifications' && <Notifications />}

      {/* Placeholder for other tabs */}
      {activeTab === 'search' && (
        <Container className="py-4">
          <h3>Tra cứu bảo hành</h3>
          <p>Trang tra cứu đang được phát triển...</p>
        </Container>
      )}

      {activeTab === 'history' && (
        <Container className="py-4">
          <h3>Lịch sử</h3>
          <p>Trang lịch sử đang được phát triển...</p>
        </Container>
      )}

      {/* Create Campaign Modal */}
      <Modal 
        show={showCreateModal} 
        onHide={handleCloseModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>Tạo chiến dịch Recall mới</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <p className="text-muted mb-4">Điền thông tin để tạo chiến dịch Recall mới</p>
          
          <Form onSubmit={handleCreateCampaign}>
            {/* Tiêu đề chiến dịch */}
            <Form.Group className="mb-3">
              <Form.Label>
                Tiêu đề chiến dịch <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Nhập tiêu đề chiến dịch"
                required
              />
            </Form.Group>

            {/* Mô tả */}
            <Form.Group className="mb-3">
              <Form.Label>
                Mô tả <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Mô tả chi tiết về chiến dịch"
                required
              />
            </Form.Group>

            <Row>
              {/* Dòng xe ảnh hưởng */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Dòng xe ảnh hưởng <span className="text-danger">*</span> (phân cách bằng dấu phẩy)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicles"
                    value={formData.vehicles}
                    onChange={handleInputChange}
                    placeholder="VinFast VF 8, VinFast VF 9"
                    required
                  />
                </Form.Group>
              </Col>

              {/* Năm sản xuất */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Năm sản xuất <span className="text-danger">*</span> (phân cách bằng dấu phẩy)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="years"
                    value={formData.years}
                    onChange={handleInputChange}
                    placeholder="2023, 2024"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {/* Loại vấn đề */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Loại vấn đề <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Phần mềm, Phần cứng...</option>
                    <option value="Phần mềm">Phần mềm</option>
                    <option value="Phần cứng">Phần cứng</option>
                    <option value="Cả hai">Cả hai</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Mức độ ưu tiên */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Mức độ ưu tiên <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Thấp">Thấp</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Cao">Cao</option>
                    <option value="Khẩn cấp">Khẩn cấp</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {/* Ngày bắt đầu */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Ngày bắt đầu <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>

              {/* Tổng số xe ảnh hưởng */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Tổng số xe ảnh hưởng <span className="text-danger">*</span>
                  </Form.Label>
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

            {/* Buttons */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button 
                variant="light" 
                onClick={handleCloseModal}
                className="px-4"
              >
                Hủy
              </Button>
              <Button 
                variant="dark" 
                type="submit"
                className="px-4"
              >
                Tạo chiến dịch
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RecallCampaign;
