import { API_URL } from "@/config/app";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

export const NewPasswordAdd = () => {
  const { gmail } = useParams(); // from URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/new-password/${gmail}`,
        {
          newPassword,
          confirfomPassword: confirmPassword, // must match backend
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Password changed successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[380px]">
        <h2 className="text-2xl font-semibold text-center">
          Reset Password
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Enter your new password
        </p>

        <div className="flex flex-col mt-5">
          <label className="mb-2 font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label className="mb-2 font-medium">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};
