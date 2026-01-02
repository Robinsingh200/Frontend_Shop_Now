import { API_URL } from "@/config/app";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      return toast.error("Email is required");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/forget`,
        { gmail: email },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("OTP sent to your email");
        // 👉 navigate to OTP verify page if needed
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[380px]">
        <h2 className="text-2xl font-semibold text-center">
          Forget Password OTP
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Enter your email to receive OTP
        </p>

        <div className="flex flex-col mt-5">
          <label className="mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            name="gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Sending OTP..." : "Verify for OTP"}
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
