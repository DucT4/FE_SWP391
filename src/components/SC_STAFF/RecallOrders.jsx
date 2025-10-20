import { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal, Form } from 'react-bootstrap';
import { FileText, Plus, X } from 'react-bootstrap-icons';
import '../../styles/RecallOrders.css';

function RecallOrders() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    campaignId: '',
    vin: '',
    staffId: '',
    performedDate: '',
    workDescription: '',
    technicianName: '',
    createdAt: '',
    campaignPayments: ''
  });

  const stats = [
    { title: 'Được giao', value: 1, variant: 'info' },
    { title: 'Đang thực hiện', value: 1, variant: 'warning' },
    { title: 'Đã hoàn thành', value: 1, variant: 'success' }
  ];

  const orders = [
    {
      id: 'RO001',
      status: 'completed',
      statusText: 'Hoàn thành',
      campaign: 'Cập nhật phần mềm BMS',
      title: 'Cập nhật firmware BMS lên phiên bản 2.1.5',
      vehicle: 'VinFast VF 8 - 1HGBH41JXMN109186',
      customer: 'Nguyễn Văn A',
      phone: '0901234567',
      technician: 'Trần Văn B',
      center: 'Trung tâm Hà Nội',
      assignedDate: '15/9/2024',
      completedDate: '16/9/2024',
      parts: 'Không yêu cầu',
      notes: 'Đã hoàn thành cập nhật'
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      assigned: 'info',
      inProgress: 'warning',
      completed: 'success',
      cancelled: 'danger'
    };
    return variants[status] || 'secondary';
  };

  const getStatusText = (status) => {
    const texts = {
      assigned: 'Được giao',
      inProgress: 'Đang thực hiện',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy'
    };
    return texts[status] || 'Không xác định';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    console.log('Tạo đơn Recall mới:', formData);
    // TODO: Gọi API để tạo đơn
    setShowCreateModal(false);
    // Reset form
    setFormData({
      id: '',
      campaignId: '',
      vin: '',
      staffId: '',
      performedDate: '',
      workDescription: '',
      technicianName: '',
      createdAt: '',
      campaignPayments: ''
    });
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setFormData({
      id: '',
      campaignId: '',
      vin: '',
      staffId: '',
      performedDate: '',
      workDescription: '',
      technicianName: '',
      createdAt: '',
      campaignPayments: ''
    });
  };

  return (
    <div className="recall-orders-page">
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

        {/* Orders Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="mb-1">Đơn Recall</h3>
            <p className="text-muted mb-0">Tạo đơn recall riêng lẻ và phân công cho kỹ thuật viên</p>
          </div>
        </div>

        {/* Orders List */}
        <div className="orders-section">
          <h5 className="mb-3">Danh sách đơn Recall</h5>
          
          {orders.map((order) => (
            <Card key={order.id} className="order-card border-0 shadow-sm mb-3">
              <Card.Body className="p-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="order-id">
                      <FileText size={24} className="text-primary" />
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h5 className="mb-0">{order.id}</h5>
                        <Badge bg={getStatusBadge(order.status)}>{order.statusText}</Badge>
                        <Badge bg="secondary" className="fw-normal">{order.campaign}</Badge>
                      </div>
                      <p className="text-muted mb-0">{order.title}</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="order-details">
                  <Row>
                    <Col md={6} className="mb-2">
                      <strong className="text-muted">Xe:</strong>
                      <span className="ms-2">{order.vehicle}</span>
                    </Col>
                    <Col md={6} className="mb-2">
                      <strong className="text-muted">Khách hàng:</strong>
                      <span className="ms-2">{order.customer}</span>
                      <span className="text-muted ms-2">• SĐT: {order.phone}</span>
                    </Col>
                    <Col md={6} className="mb-2">
                      <strong className="text-muted">Kỹ thuật viên:</strong>
                      <span className="ms-2">{order.technician}</span>
                      <span className="text-muted ms-2">• Trung tâm: {order.center}</span>
                    </Col>
                    <Col md={6} className="mb-2">
                      <strong className="text-muted">Ngày giao:</strong>
                      <span className="ms-2">{order.assignedDate}</span>
                      {order.completedDate && (
                        <>
                          <span className="text-muted ms-2">• Hoàn thành: {order.completedDate}</span>
                        </>
                      )}
                    </Col>
                    <Col md={12} className="mb-2">
                      <strong className="text-muted">Linh kiện:</strong>
                      <span className="ms-2">{order.parts}</span>
                    </Col>
                    <Col md={12}>
                      <strong className="text-muted">Ghi chú:</strong>
                      <span className="ms-2">{order.notes}</span>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>

      {/* Create Order Modal */}
      <Modal 
        show={showCreateModal} 
        onHide={handleCloseModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>Tạo đơn Recall mới</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <p className="text-muted mb-4">Tạo đơn recall riêng lẻ cho từng xe và phân công cho kỹ thuật viên</p>
          <Form onSubmit={handleCreateOrder}>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="number"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                placeholder="ID (auto hoặc nhập nếu cần)"
              />
            </Form.Group>
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
              <Form.Label>Staff ID <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                name="staffId"
                value={formData.staffId}
                onChange={handleInputChange}
                placeholder="ID nhân viên thực hiện"
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
              <Form.Label>Mô tả công việc <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="workDescription"
                value={formData.workDescription}
                onChange={handleInputChange}
                placeholder="Nhập mô tả công việc"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên kỹ thuật viên <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="technicianName"
                value={formData.technicianName}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                placeholder="Ngày tạo bản ghi (nếu cần)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thông tin thanh toán chiến dịch</Form.Label>
              <Form.Control
                type="text"
                name="campaignPayments"
                value={formData.campaignPayments}
                onChange={handleInputChange}
                placeholder="Thông tin thanh toán (nếu có)"
              />
            </Form.Group>
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
                Tạo đơn
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RecallOrders;
