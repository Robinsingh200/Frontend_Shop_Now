import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "@/config/app";
import { useNavigate } from "react-router-dom";

export const VerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pastedOtp = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedOtp)) return;

    const newOtp = pastedOtp.split("");
    setOtp(newOtp);
    inputsRef.current[5].focus();
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      return toast.error("Enter valid 6-digit OTP");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/verify-otp`,
        { otp: finalOtp },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("OTP verified successfully");
        navigate("/reset-password");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[380px]">
        <h2 className="text-2xl font-semibold text-center">
          Verify OTP
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Enter the 6-digit OTP sent to your email
        </p>

        <div
          className="flex justify-between mt-6"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Didn’t receive OTP?{" "}
          <span className="text-blue-600 cursor-pointer">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};
