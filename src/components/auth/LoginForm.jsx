import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../../validation/validation";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Login Data:", data);

   
  };

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[560px]">

      
        <div className="hidden md:flex bg-primary text-white p-10 flex-col justify-between">
          
          {/* Logo */}
          <div>
            <img
              src={Logo}
              alt="Clinic Logo"
              className="w-36 h-auto object-contain brightness-0 invert"
            />
          </div>

          {/* Content */}
          <div className="max-w-md">
            <div className="mb-6">
              <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <span className="text-2xl font-bold">+</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Manage your clinic
              <span className="block text-white/80">
                smarter & faster.
              </span>
            </h1>

            <p className="mt-5 text-white/70 leading-relaxed">
              Manage patients, appointments, prescriptions and billing
              from one simple platform designed for modern clinics.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-4">
              {[
                "Patient & appointment management",
                "Digital prescriptions",
                "Simple clinic billing",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-white/80"
                >
                  <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
                    ✓
                  </div>

                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-white/50">
            © 2026 Clinic Management. All rights reserved.
          </p>
        </div>

       
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="flex justify-center md:hidden mb-8">
              <img
                src={Logo}
                alt="Clinic Logo"
                className="w-32 h-auto object-contain"
              />
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Sign in to continue to your clinic dashboard.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

             
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>

                <div
                  className={`relative flex items-center rounded-lg border transition ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 focus-within:border-primary"
                  }`}
                >
                  <FiMail className="absolute left-3 text-gray-400" size={19} />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    {...register("email")}
                    className="w-full pl-10 pr-4 py-3 rounded-lg outline-none text-sm text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

          
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline"
                    onClick={() => {
                      navigate("/forgot-password")
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <div
                  className={`relative flex items-center rounded-lg border transition ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 focus-within:border-primary"
                  }`}
                >
                  <FiLock
                    className="absolute left-3 text-gray-400"
                    size={19}
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...register("password")}
                    className="w-full pl-10 pr-12 py-3 rounded-lg outline-none text-sm text-gray-900 placeholder:text-gray-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 text-gray-400 hover:text-gray-700 transition"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff size={19} />
                    ) : (
                      <FiEye size={19} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign in
                    <FiArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Bottom text */}
            <p className="text-center text-xs text-gray-400 mt-8">
              Secure access to your clinic management system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;