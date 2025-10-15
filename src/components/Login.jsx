import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash, Telephone, Envelope, CarFrontFill } from 'react-bootstrap-icons';
import authService from '../services/authService';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    console.log('🔵 Bắt đầu đăng nhập với:', { username, password });
    
    try {
      // Gọi API login
      const response = await authService.login(username, password);
      console.log('✅ Đăng nhập thành công:', response);
      console.log('🔵 Gọi onLogin callback với data:', response);
      
      // Sau khi đăng nhập thành công, gọi callback
      if (onLogin) {
        onLogin(response);
        console.log('✅ onLogin callback đã được gọi');
      } else {
        console.error('❌ onLogin callback không tồn tại!');
      }
    } catch (err) {
      console.error('❌ Lỗi đăng nhập:', err);
      console.error('❌ Chi tiết lỗi:', err.response?.data || err.message);
      setError(err.message || 'Tên đăng nhập hoặc mật khẩu không chính xác');
    } finally {
      setIsLoading(false);
      console.log('🔵 Kết thúc xử lý login');
    }
  };

  return (
    <div className="login-container">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xs={12} sm={10} md={8} lg={5} xl={4}>
            <Card className="login-card shadow-lg border-0">
              <Card.Body className="p-4 p-md-5">
                {/* Icon */}
                <div className="text-center mb-4">
                  <div className="login-icon-wrapper">
                    <CarFrontFill size={60} className="text-primary" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-center fw-bold mb-2">Hệ thống bảo hành xe điện</h2>
                <p className="text-center text-muted mb-4">Vui lòng đăng nhập để tiếp tục</p>

                {/* Error Alert */}
                {error && (
                  <Alert variant="danger" dismissible onClose={() => setError('')}>
                    {error}
                  </Alert>
                )}

                {/* Form */}
                <Form onSubmit={handleSubmit}>
                  {/* Username */}
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên đăng nhập"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      disabled={isLoading}
                      size="lg"
                    />
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <InputGroup size="lg">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        minLength={6}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeSlash /> : <Eye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {/* Remember Me & Forgot Password */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      id="rememberMe"
                      label="Ghi nhớ đăng nhập"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                    />
                    <a href="#forgot-password" className="text-decoration-none">
                      Quên mật khẩu?
                    </a>
                  </div>

                  {/* Login Button */}
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    className="w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Đang đăng nhập...
                      </>
                    ) : (
                      'Đăng nhập'
                    )}
                  </Button>
                </Form>

                {/* Support Info */}
                <div className="text-center pt-4 border-top mt-4">
                  <p className="text-muted mb-2 fw-semibold">Cần hỗ trợ?</p>
                  <div className="d-flex flex-column gap-2 align-items-center">
                    <a href="tel:0123456789" className="text-decoration-none d-flex align-items-center gap-2">
                      <Telephone size={16} />
                      <span>Hotline: 0123-456-789</span>
                    </a>
                    <a href="mailto:support@warranty.com" className="text-decoration-none d-flex align-items-center gap-2">
                      <Envelope size={16} />
                      <span>support@warranty.com</span>
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
