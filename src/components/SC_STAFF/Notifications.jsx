import { useState } from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap';
import { Bell, BellFill, Trash } from 'react-bootstrap-icons';
import '../../styles/Notifications.css';

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Thông báo về chiến dịch Recall mới',
      message: 'Vui lòng kiểm tra và triển khai chiến dịch recall cho dòng VinFast VF 8 năm 2023 liên quan đến vấn đề phần mềm hệ thống phanh.',
      sender: 'Admin',
      date: '1/10/2024',
      isNew: true,
      type: 'campaign'
    },
    {
      id: 2,
      title: 'Cập nhật quy trình xử lý bảo hành',
      message: 'Từ ngày 05/10/2024, tất cả các yêu cầu bảo hành cần được phân công trong vòng 24 giờ kể từ khi được duyệt.',
      sender: 'Admin',
      date: '28/9/2024',
      isNew: false,
      type: 'policy'
    },
    {
      id: 3,
      title: 'Đào tạo về linh kiện mới',
      message: 'Buổi đào tạo về module pin BMS thế hệ mới sẽ được tổ chức vào ngày 10/10/2024. Vui lòng sắp xếp thời gian tham dự.',
      sender: 'Admin',
      date: '25/9/2024',
      isNew: false,
      type: 'training'
    }
  ]);

  const [filter, setFilter] = useState('all'); // all, new, read

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isNew: false } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isNew: false }))
    );
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'new') return notif.isNew;
    if (filter === 'read') return !notif.isNew;
    return true;
  });

  const newCount = notifications.filter(n => n.isNew).length;

  const getNotificationIcon = (type) => {
    return type === 'campaign' ? '📢' : type === 'training' ? '📚' : '📋';
  };

  return (
    <div className="notifications-page">
      <Container className="py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="mb-1">
              Thông báo từ Admin ({notifications.length})
            </h3>
            {newCount > 0 && (
              <p className="text-muted mb-0">
                Bạn có {newCount} thông báo mới chưa đọc
              </p>
            )}
          </div>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={newCount === 0}
          >
            Đánh dấu tất cả đã đọc
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons mb-4">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline-secondary'}
            size="sm"
            onClick={() => setFilter('all')}
            className="me-2"
          >
            Tất cả ({notifications.length})
          </Button>
          <Button
            variant={filter === 'new' ? 'primary' : 'outline-secondary'}
            size="sm"
            onClick={() => setFilter('new')}
            className="me-2"
          >
            Mới ({newCount})
          </Button>
          <Button
            variant={filter === 'read' ? 'primary' : 'outline-secondary'}
            size="sm"
            onClick={() => setFilter('read')}
          >
            Đã đọc ({notifications.length - newCount})
          </Button>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center py-5">
                <Bell size={48} className="text-muted mb-3" />
                <p className="text-muted mb-0">
                  {filter === 'new' ? 'Không có thông báo mới' : 'Không có thông báo'}
                </p>
              </Card.Body>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`notification-card border-0 shadow-sm mb-3 ${notification.isNew ? 'notification-new' : ''}`}
                onClick={() => notification.isNew && handleMarkAsRead(notification.id)}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      {/* Title and Badge */}
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="notification-icon">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <h5 className="mb-0 notification-title">
                          {notification.title}
                        </h5>
                        {notification.isNew && (
                          <Badge bg="danger" pill className="ms-2">
                            Mới
                          </Badge>
                        )}
                      </div>

                      {/* Message */}
                      <p className="notification-message text-muted mb-2">
                        {notification.message}
                      </p>

                      {/* Footer */}
                      <div className="notification-footer d-flex align-items-center gap-3 text-muted small">
                        <span>
                          <strong>Người gửi:</strong> {notification.sender}
                        </span>
                        <span>•</span>
                        <span>{notification.date}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="notification-actions">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-danger p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                        title="Xóa thông báo"
                      >
                        <Trash size={18} />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </div>

        {/* Empty state when all filtered out */}
        {filteredNotifications.length === 0 && notifications.length > 0 && (
          <div className="text-center mt-4">
            <Button
              variant="outline-primary"
              onClick={() => setFilter('all')}
            >
              Xem tất cả thông báo
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Notifications;
