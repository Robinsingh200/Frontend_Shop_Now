import React from "react";

export const CheckEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          ✅ Registration Successful
        </h2>

        <p className="text-gray-600">
          Please check your email to verify your account.
        </p>

        <p className="text-sm text-gray-500 mt-3">
          Didn’t receive the email? Check your spam folder.
        </p>
      </div>
    </div>
  );
};
