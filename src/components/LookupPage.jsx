import React, { useState } from "react";
import { getWarrantyLookup } from "../services/warrantyService"; 
import toast from "react-hot-toast";

const LookupPage = () => {
  const [vin, setVin] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!vin.trim()) {
      toast.error("Vui lòng nhập số VIN!");
      return;
    }

    try {
      setLoading(true);
      const data = await getWarrantyLookup(vin.trim());
      setResult(data);
      if (!data) toast.error("Không tìm thấy thông tin bảo hành!");
    } catch (err) {
      console.error("Lookup error:", err);
      toast.error("Không tìm thấy thông tin bảo hành hoặc có lỗi xảy ra!");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="lookup-container" style={{ padding: "30px 60px" }}>
      <h2 className="text-xl font-bold mb-4">🔍 Tra cứu bảo hành xe</h2>

      <div className="flex gap-3 mb-4">
        <input
          className="border rounded-lg px-3 py-2 flex-1"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          placeholder="Nhập số VIN để tra cứu..."
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Đang tra..." : "Tra cứu"}
        </button>
      </div>

      {/* Kết quả */}
      {result && (
        <div className="border rounded-lg p-4 bg-gray-50 shadow-sm w-full max-w-2xl">
          <p>
            <b>🚗 Mẫu xe:</b> {result.vehicleModel || "Không rõ"}
          </p>
          <p>
            <b>🏭 Trung tâm bảo hành:</b> {result.serviceCenter || "Chưa có"}
          </p>
          <p>
            <b>📅 Ngày kích hoạt bảo hành:</b> {result.startDate || "N/A"}
          </p>
          <p>
            <b>📅 Ngày hết hạn bảo hành:</b> {result.endDate || "N/A"}
          </p>
          <p>
            <b>⚙️ Trạng thái bảo hành:</b> {result.coverageStatus || "N/A"}
          </p>
        </div>
      )}

      {/* Trạng thái rỗng */}
      {!result && !loading && (
        <div className="text-gray-500 mt-6">
          Nhập số VIN ở trên và nhấn <b>Tra cứu</b> để xem thông tin bảo hành.
        </div>
      )}
    </div>
  );
};

export default LookupPage;
