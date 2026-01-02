import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { API_URL } from "@/config/app";

export const VerifyEmail = () => {
  const [status, setStatus] = useState("Verifying email...");
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `${API_URL}/verify-email/${token}`
        );

        if (res.data.success) {
          setStatus("✅ Email verified successfully");
          toast.success("Email verified successfully ✅");

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setStatus("❌ Verification failed");
        }
      } catch (error) {
        setStatus(
          error?.response?.data?.message ||
          "❌ Invalid or expired verification link"
        );
      }
    };

    if (token) verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center w-[90%] max-w-md">
        <h2 className="text-xl font-semibold text-gray-800">
          {status}
        </h2>
      </div>
    </div>
  );
};
