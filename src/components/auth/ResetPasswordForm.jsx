import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPasswordSchema } from "../../validation/validation";


const ResetPasswordForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const clearFormState = () => {
    setStatus({
      type: "",
      message: "",
    });
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // clear old state
      clearFormState();

      

      setStatus({
        type: "success",
        message: "Password Reset Successfully",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Password reset failed. Please try again.",
      });

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Status Message */}
      {status.message && (
        <div
          className={`mb-4 rounded-xl border p-3 ${
            status.type === "success"
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <p
            className={`text-sm font-medium ${
              status.type === "success"
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {status.message}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            New Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Enter new password"
              className={`w-full rounded-xl border py-3 pl-10 pr-12 outline-none transition
                ${
                  errors.newPassword
                    ? "border-red-500"
                    : "border-gray-300 focus:border-primary focus:ring-2 "
                }
              `}
              {...register("newPassword", {
                onChange: () => {
                  clearErrors("newPassword");
                  clearFormState();
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm new password"
              className={`w-full rounded-xl border py-3 pl-10 pr-12 outline-none transition
                ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 focus:border-primary focus:ring-2 "
                }
              `}
              {...register("confirmPassword", {
                onChange: () => {
                  clearErrors("confirmPassword");
                  clearFormState();
                },
              })}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-xl bg-primary py-3 font-semibold text-white transition
          hover:bg-primary/50
          disabled:cursor-not-allowed
          disabled:bg-primary/30
          "
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={18} />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>

        {/* Back To Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;