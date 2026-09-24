import React from "react";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen w-full bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Forgot Password</h1>

          <p className="text-gray-500 mt-2 text-sm">
            Enter your registered email address and we’ll send you a reset link.
          </p>
        </div>

        {/* Form */}
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
