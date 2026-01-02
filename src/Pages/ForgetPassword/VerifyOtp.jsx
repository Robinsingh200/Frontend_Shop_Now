import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "@/config/app";
import { useNavigate } from "react-router-dom";


export const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      return toast.error("Enter 6 digit OTP");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/verify-otp`,
        { otp },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("OTP verified");
        navigate("/reset-password");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg w-[300px] shadow">

        <h2 className="text-lg font-semibold text-center">
          Verify OTP
        </h2>

        <input
          type="text"
          value={otp}
          maxLength="6"
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="border w-full mt-4 p-2 text-center"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

      </div>
    </div>
  );
};
