import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Users, Eye, Edit } from "lucide-react";
import "../../styles/ManagerAssignedWork.css";

const ManagerAssignedWork = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTechnician, setFilterTechnician] = useState("all");

  // Mock data - Công việc đã phân công
  const assignedWorks = [
    {
      id: "WO001",
      status: "in-progress",
      statusText: "Đang thực hiện",
      title: "Thay thế module BMS",
      car: "VinFast VF 8 - 1HGBH41JXMN109186",
      customer: "Nguyễn Văn X",
      technician: {
        name: "Trần Văn B",
        role: "SC Technician",
        avatar: "TB",
      },
      requestId: "WR001",
      cost: "15.000.000 VND",
      assignedDate: "21/9/2024",
      deadline: "25/9/2024",
      progress: 60,
      note: "Khách hàng yêu cầu hoàn thành sớm",
    },
    {
      id: "WO002",
      status: "assigned",
      statusText: "Đã phân công",
      title: "Kiểm tra hệ thống điện",
      car: "VinFast VF 9 - 2HGBH41JXMN109187",
      customer: "Lê Thị D",
      technician: {
        name: "Nguyễn Văn E",
        role: "SC Technician",
        avatar: "NE",
      },
      requestId: "WR004",
      cost: "8.000.000 VND",
      assignedDate: "22/9/2024",
      deadline: "26/9/2024",
      progress: 0,
    },
    {
      id: "WO003",
      status: "completed",
      statusText: "Hoàn thành",
      title: "Thay thế cảm biến phanh",
      car: "VinFast VF 6 - 3HGBH41JXMN109188",
      customer: "Phạm Văn F",
      technician: {
        name: "Trần Văn B",
        role: "SC Technician",
        avatar: "TB",
      },
      requestId: "WR005",
      cost: "5.000.000 VND",
      assignedDate: "18/9/2024",
      deadline: "20/9/2024",
      completedDate: "19/9/2024",
      progress: 100,
    },
  ];

  const renderStatusBadge = (status, text) => {
    return <span className={`manager-assigned-status ${status}`}>{text}</span>;
  };

  const filteredWorks = assignedWorks.filter((work) => {
    if (filterStatus !== "all" && work.status !== filterStatus) return false;
    if (
      filterTechnician !== "all" &&
      work.technician.name !== filterTechnician
    )
      return false;
    return true;
  });

  const handleViewDetails = (workId) => {
    console.log("View details:", workId);
  };

  const handleEditAssignment = (workId) => {
    console.log("Edit assignment:", workId);
  };

  return (
    <Container fluid className="manager-assigned-work-container">
      {/* Header */}
      <div className="manager-assigned-header">
        <div>
          <h4>Công việc đã phân công</h4>
          <p className="manager-assigned-subtitle">
            Theo dõi tiến độ công việc của kỹ thuật viên
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="manager-assigned-filters">
        <Form.Select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ width: "200px" }}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="assigned">Đã phân công</option>
          <option value="in-progress">Đang thực hiện</option>
          <option value="completed">Hoàn thành</option>
          <option value="paused">Tạm dừng</option>
        </Form.Select>

        <Form.Select
          className="filter-select"
          value={filterTechnician}
          onChange={(e) => setFilterTechnician(e.target.value)}
          style={{ width: "200px" }}
        >
          <option value="all">Tất cả kỹ thuật viên</option>
          <option value="Trần Văn B">Trần Văn B</option>
          <option value="Nguyễn Văn E">Nguyễn Văn E</option>
        </Form.Select>
      </div>

      {/* Stats Cards */}
      <Row className="manager-assigned-stats g-3">
        <Col md={3}>
          <div className="manager-assigned-stat-card">
            <h6>Đã phân công</h6>
            <div className="stat-number">1</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="manager-assigned-stat-card">
            <h6>Đang thực hiện</h6>
            <div className="stat-number">1</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="manager-assigned-stat-card">
            <h6>Hoàn thành</h6>
            <div className="stat-number">1</div>
          </div>
        </Col>
        <Col md={3}>
          <div className="manager-assigned-stat-card">
            <h6>Tổng công việc</h6>
            <div className="stat-number">3</div>
          </div>
        </Col>
      </Row>

      {/* Assigned Works List */}
      <div className="manager-assigned-list">
        <h5 className="mb-3 mt-4" style={{ fontWeight: 600 }}>
          Danh sách công việc ({filteredWorks.length})
        </h5>

        {filteredWorks.length > 0 ? (
          filteredWorks.map((work) => (
            <div key={work.id} className="manager-assigned-card">
              <div className="manager-assigned-card-header">
                <div className="manager-assigned-id">
                  {work.id}
                  {renderStatusBadge(work.status, work.statusText)}
                </div>
              </div>

              <h6 className="manager-assigned-title">{work.title}</h6>
              <p className="manager-assigned-subtitle">{work.car}</p>

              <div className="manager-assigned-details">
                <div className="manager-assigned-detail-item">
                  <span className="manager-assigned-detail-label">
                    Yêu cầu bảo hành:
                  </span>
                  <span className="manager-assigned-detail-value">
                    {work.requestId}
                  </span>
                </div>
                <div className="manager-assigned-detail-item">
                  <span className="manager-assigned-detail-label">
                    Khách hàng:
                  </span>
                  <span className="manager-assigned-detail-value">
                    {work.customer}
                  </span>
                </div>
                <div className="manager-assigned-detail-item">
                  <span className="manager-assigned-detail-label">
                    Ngày phân công:
                  </span>
                  <span className="manager-assigned-detail-value">
                    {work.assignedDate}
                  </span>
                </div>
                <div className="manager-assigned-detail-item">
                  <span className="manager-assigned-detail-label">
                    Hạn hoàn thành:
                  </span>
                  <span className="manager-assigned-detail-value">
                    {work.deadline}
                  </span>
                </div>
                <div className="manager-assigned-detail-item">
                  <span className="manager-assigned-detail-label">Chi phí:</span>
                  <span className="manager-assigned-detail-value highlight">
                    {work.cost}
                  </span>
                </div>
              </div>

              {/* Technician Info */}
              <div className="manager-assigned-technician">
                <div className="technician-avatar">
                  {work.technician.avatar}
                </div>
                <div className="technician-info">
                  <div className="technician-name">{work.technician.name}</div>
                  <div className="technician-role">{work.technician.role}</div>
                </div>
              </div>

              {/* Progress Bar */}
              {work.status !== "completed" && (
                <div className="work-progress">
                  <div className="work-progress-label">
                    <span>Tiến độ</span>
                    <span>{work.progress}%</span>
                  </div>
                  <div className="work-progress-bar">
                    <div
                      className="work-progress-fill"
                      style={{ width: `${work.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {work.completedDate && (
                <div
                  className="manager-warranty-note"
                  style={{ backgroundColor: "#d1f4e0", color: "#0f5132" }}
                >
                  <strong>Hoàn thành:</strong> {work.completedDate}
                </div>
              )}

              {work.note && !work.completedDate && (
                <div className="manager-warranty-note">
                  <strong>Ghi chú:</strong> {work.note}
                </div>
              )}

              <div className="manager-assigned-actions">
                <Button
                  variant="outline-primary"
                  onClick={() => handleViewDetails(work.id)}
                >
                  <Eye size={16} className="me-1" />
                  Xem chi tiết
                </Button>
                {work.status !== "completed" && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleEditAssignment(work.id)}
                  >
                    <Edit size={16} className="me-1" />
                    Chỉnh sửa
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="manager-assigned-empty">
            <Users />
            <h5>Không tìm thấy công việc</h5>
            <p>Thử thay đổi bộ lọc hoặc tạo yêu cầu bảo hành mới</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ManagerAssignedWork;
