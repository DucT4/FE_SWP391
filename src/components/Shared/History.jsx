// import React, { useState } from "react";
// import "../../styles/History.css";
// import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
// import api from "../../config/apiConfig";

// const History = ({ role }) => {
//   const [activeTab, setActiveTab] = useState("warranty");
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const [keyWord, setKeyWord] = useState("");
//   const [results, setResults] = useState(null);

//   const handleSearch = async () => {
//     try {
//       const res = await api.get("/warranty/history", {
//         params: { vin: keyWord }
//       });

//       if (res.status === 200) {
//         console.log(res.data);
//         setResults(res.data.content);
//       }
//     } catch (err) {
//       console.error("Lỗi:", err);
//     }
//   }

//   const handleShow = (req) => {
//     setSelectedRequest(req);
//     setShowModal(true);
//   };

//   const handleClose = () => setShowModal(false);
//   // Mock data
//   const warrantyRequests = [
//     {
//       id: "WR002",
//       status: "Chờ duyệt",
//       category: "Động cơ",
//       car: "VinFast VF 9",
//       customer: "Trần Thị B",
//       center: "Trung tâm Hà Nội",
//       cost: "20.000.000",
//       part: "MOTOR-RF9002",
//       date: "25/9/2024",
//       note: "Động cơ phát ra tiếng kêu bất thường",
//     },
//     {
//       id: "WR003",
//       status: "Đang xử lý",
//       category: "Điện",
//       car: "VinFast VF 6",
//       customer: "Lê Văn C",
//       center: "Trung tâm TP.HCM",
//       cost: "12.000.000",
//       part: "AC-RF9007",
//       date: "18/9/2024",
//       note: "Xe không hoạt động",
//     },
//     {
//       id: "WR001",
//       status: "Đã duyệt",
//       category: "Pin",
//       car: "VinFast VF 8",
//       customer: "Nguyễn Văn A",
//       center: "Trung tâm Hà Nội",
//       cost: "15.000.000",
//       part: "BMS-RF9001",
//       date: "15/9/2024",
//       note: "Lỗi BMS, cần thay module BMS",
//     },
//   ];

//   const recallRequests = [
//     {
//       id: "RC001",
//       status: "Hoàn thành",
//       title: "Cập nhật firmware BMS lên phiên bản 2.1.5",
//       customer: "Nguyễn Văn A",
//       date: "10/9/2024",
//       center: "Trung tâm Hà Nội",
//     },
//     {
//       id: "RC002",
//       status: "Đang thực hiện",
//       title: "Thay dây điện AC do lỗi vật liệu",
//       customer: "Lê Văn C",
//       date: "25/9/2024",
//       center: "Trung tâm TP.HCM",
//     },
//   ];

//   const renderStatus = (status) => {
//     switch (status) {
//       case "Đã duyệt":
//         return <span className="status status-approved">Đã duyệt</span>;
//       case "Đang xử lý":
//         return <span className="status status-processing">Đang xử lý</span>;
//       case "Chờ duyệt":
//         return <span className="status status-pending">Chờ duyệt</span>;
//       default:
//         return <span className="status">{status}</span>;
//     }
//   };

//   return (
//     <div className="history-container">
//       <Container className="py-4">
//         <h3 className="mb-1">Lịch sử bảo hành</h3>

//         {/* Bộ lọc */}
//         <div className="filter-bar">
//           <div style={{ flex: 1 }}>
//             <p>Tìm kiếm</p>
//             <input
//               value={keyWord}
//               onChange={(e) => setKeyWord(e.target.value)}
//               className="search-input"
//               type="text"
//               placeholder="🔍 Mã yêu cầu, VIN, khách hàng..."
//             />
//           </div>
//           {/* <div>
//             <p>Trạng thái</p>
//             <select className="filter-select">
//               <option>Tất cả trạng thái</option>
//               <option>Đã duyệt</option>
//               <option>Chờ duyệt</option>
//               <option>Đang xử lý</option>
//             </select>
//           </div>

//           <div>
//             <p>Trung tâm</p>
//             <select className="filter-select">
//               <option>Tất cả trung tâm</option>
//               <option>Trung tâm Hà Nội</option>
//               <option>Trung tâm TP.HCM</option>
//             </select>
//           </div> */}

//           <button onClick={() => handleSearch()} style={{ borderRadius: 8, backgroundColor: '#000', color: 'white', padding: "6px 10px" }}>Tra cứu</button>



//         </div>


//         {activeTab === "warranty" && (
//           <div className="request-list">
//             <h3 className="section-title">Danh sách yêu cầu</h3>
//             {warrantyRequests.map((req) => (
//               <div key={req.id} className="request-card">
//                 <div className="request-header">
//                   <div>
//                     <span className="req-id">{req.id}</span>
//                     {renderStatus(req.status)}
//                     <span className="req-category">{req.category}</span>
//                   </div>
//                   <Button
//                     size="sm"
//                     variant="outline-primary"
//                     onClick={() => handleShow(req)}
//                   >
//                     Xem
//                   </Button>
//                 </div>

//                 <div className="req-info">
//                   <p className="car">{req.car}</p>
//                   <p className="note">{req.note}</p>
//                   <div className="meta">
//                     <p>Khách hàng: {req.customer}</p>
//                     <p>Trung tâm: {req.center}</p>
//                     <p>Mã phụ tùng: {req.part}</p>
//                     <p>Chi phí: {req.cost} VND</p>
//                     <p>Ngày tạo: {req.date}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <p className="footer-text">Hiển thị {warrantyRequests.length} / {warrantyRequests.length} yêu cầu</p>
//           </div>
//         )}

//         {activeTab === "recall" && (role === "SCStaff" || role === "Admin") && (
//           <div className="request-list">
//             <h3 className="section-title">Đơn Recall</h3>
//             {recallRequests.map((recall) => (
//               <div key={recall.id} className="request-card">
//                 <div className="request-header">
//                   <div>
//                     <span className="req-id">{recall.id}</span>
//                     <span
//                       className={`status ${recall.status === "Hoàn thành"
//                         ? "status-approved"
//                         : "status-pending"
//                         }`}
//                     >
//                       {recall.status}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="req-info">
//                   <p className="car">{recall.title}</p>
//                   <div className="meta">
//                     <p>Khách hàng: {recall.customer}</p>
//                     <p>Trung tâm: {recall.center}</p>
//                     <p>Ngày: {recall.date}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         <Modal show={showModal} onHide={handleClose} size="lg" centered>
//           {selectedRequest && (
//             <>
//               <Modal.Header closeButton>
//                 <Modal.Title>
//                   <strong>Chi tiết yêu cầu:</strong> {selectedRequest.id}
//                 </Modal.Title>
//               </Modal.Header>

//               <Modal.Body>
//                 <p className="text-muted mb-4">
//                   Thông tin chi tiết về yêu cầu bảo hành
//                 </p>

//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <p className="mb-1 fw-semibold">Xe</p>
//                     <p>
//                       {selectedRequest.car} <br />
//                       <a href="#" className="text-primary text-decoration-none">
//                         {selectedRequest.vin || "2HGHB41JXMN109187"}
//                       </a>
//                     </p>
//                   </Col>
//                   <Col md={6}>
//                     <p className="mb-1 fw-semibold">Trạng thái</p>
//                     <span
//                       className={`badge ${selectedRequest.status === "Chờ duyệt"
//                         ? "bg-warning text-dark"
//                         : selectedRequest.status === "Đang xử lý"
//                           ? "bg-info text-dark"
//                           : "bg-success"
//                         }`}
//                     >
//                       {selectedRequest.status}
//                     </span>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <p className="mb-1 fw-semibold">Mô tả sự cố</p>
//                     <p>{selectedRequest.note}</p>
//                   </Col>
//                   <Col md={6}>
//                     <p className="mb-1 fw-semibold">Loại sự cố</p>
//                     <p>{selectedRequest.category}</p>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <p className="mb-1 fw-semibold">Khách hàng</p>
//                     <p>{selectedRequest.customer}</p>
//                   </Col>
//                   <Col md={6}>
//                     <p className="mb-1 fw-semibold">Người thực hiện</p>
//                     <p>{selectedRequest.assignTo || "Trần Văn B"}</p>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <p className="mb-1 fw-semibold">Trung tâm</p>
//                     <p>{selectedRequest.center}</p>
//                     <p className="text-muted small">
//                       {selectedRequest.address ||
//                         "123 Đường Láng, Đống Đa, Hà Nội"}
//                     </p>
//                   </Col>
//                   <Col md={6}>
//                     <p className="mb-1 fw-semibold">SĐT người thực hiện</p>
//                     <p>{selectedRequest.phone || "0902222222"}</p>
//                   </Col>
//                 </Row>

//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <p className="mb-1 fw-semibold">Mã phụ tùng</p>
//                     <p>{selectedRequest.part}</p>
//                   </Col>
//                   <Col md={6}>
//                     <p className="mb-1 fw-semibold">Ngày hẹn</p>
//                     <p>{selectedRequest.appointment || "1/10/2024"}</p>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col md={6}>
//                     <p className="mb-1 fw-semibold">Chi phí dự kiến</p>
//                     <p>{selectedRequest.cost} VND</p>
//                   </Col>
//                   <Col md={3}>
//                     <p className="mb-1 fw-semibold">Ngày tạo</p>
//                     <p>{selectedRequest.date}</p>
//                   </Col>
//                   <Col md={3}>
//                     <p className="mb-1 fw-semibold">Cập nhật lần cuối</p>
//                     <p>{selectedRequest.lastUpdate || selectedRequest.date}</p>
//                   </Col>
//                 </Row>
//               </Modal.Body>

//               <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                   Đóng
//                 </Button>
//                 {role === "SCManager" && (
//                   <>
//                     <Button variant="success">Duyệt yêu cầu</Button>
//                     <Button variant="danger">Từ chối</Button>
//                   </>
//                 )}
//               </Modal.Footer>
//             </>
//           )}
//         </Modal>
//       </Container>

//     </div>
//   );
// };

// export default History;
