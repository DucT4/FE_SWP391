import axios from "axios";

const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || "http://localhost:8080/api";

// =============================================================
// 🟢 LẤY DANH SÁCH CLAIM THEO TECHNICIAN ID
// =============================================================
export const getClaimsByTechnician = async (techId) => {
  try {
    const token = localStorage.getItem("token");

    if (!techId) {
      console.warn("⚠️ Không có technicianId hợp lệ:", techId);
      return [];
    }

    const res = await axios.get(`${API_BASE_URL}/claims/technician/${techId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📦 Toàn bộ response getClaimsByTechnician:", res);

    // ✅ Trường hợp interceptor unwrap (res là mảng)
    if (Array.isArray(res)) {
      console.log("✅ API trả về trực tiếp là mảng:", res);
      return res;
    }

    // ✅ Trường hợp backend trả về mảng thuần trong res.data
    if (Array.isArray(res.data)) {
      console.log("✅ API trả về mảng trong res.data:", res.data);
      return res.data;
    }

    // ✅ Trường hợp backend bọc trong res.data.data
    if (Array.isArray(res.data?.data)) {
      console.log("✅ API trả về mảng trong res.data.data:", res.data.data);
      return res.data.data;
    }

    // ❌ Không phải mảng
    console.warn("⚠️ API không trả về mảng hợp lệ:", res.data);
    return [];
  } catch (err) {
    console.error("❌ Lỗi khi gọi getClaimsByTechnician:", err);
    return [];
  }
};

// =============================================================
// 🟢 TẠO CLAIM MỚI
// =============================================================
export const createClaim = async (vin, failureDesc, serviceCenterId) => {
  try {
    const token = localStorage.getItem("token");
    const payload = { vin, failureDesc, serviceCenterId };

    const res = await axios.post(`${API_BASE_URL}/claims`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Claim mới đã tạo:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Lỗi khi tạo claim:", err);
    throw err; // để UI có thể hiển thị toast lỗi
  }
};
