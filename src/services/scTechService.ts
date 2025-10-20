import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// ✅ Lấy danh sách công việc bảo hành của kỹ thuật viên
export const getRepairsByTech = async (techId: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_BASE_URL}/warranty/repairs/technician/${techId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Dữ liệu trả về: [{ id, vin, claimId, customerName, estimatedCost, ... }]
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách bảo hành:", error);
    throw error;
  }
};

// ✅ Cập nhật trạng thái ca sửa
export const updateRepairStatus = async (
  repairId: number,
  status: string,
  remark?: string
) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}/warranty/repairs/${repairId}/status`,
      null,
      {
        params: { status, remark },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật trạng thái:", error);
    throw error;
  }
};

// ✅ Gửi yêu cầu thực hiện bảo hành (Technician POST)
export const performRepair = async (payload: any) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/warranty/repairs`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi tạo yêu cầu bảo hành:", error);
    throw error;
  }
};
