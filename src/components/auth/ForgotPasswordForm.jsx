import React, { useState } from "react";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../../validation/validation";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setStatus({ type: "", message: "" });

    setStatus({ type: "success", message: "Forgot Password Successfully" });
  };

  return (
    <>
      {status.message && (
        <div
          className={`mb-4 p-3 rounded-lg border ${
            status.type === "success"
              ? "bg-green-100 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <p
            className={`text-sm ${
              status.type === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {status.message}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none
                ${errors.email ? "border-red-500" : "border-gray-300 focus:border-primary"}
              `}
              {...register("email", {
                onChange: () => {
                  clearErrors("email");

                  setStatus({
                    type: "",
                    message: "",
                  });
                },
              })}
            />
          </div>

          {/* Inline error */}
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary  text-white font-semibold py-3 rounded-xl flex items-center justify-center"
        >
          {loading ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            "Send Reset Link"
          )}
        </button>

        {/* Back To Login */}
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-primary transition"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
