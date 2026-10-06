import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .regex(/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/, {
      message: "Please Enter a Valid Email Address",
    }),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .regex(/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/, {
      message: "Please Enter a Valid Email Address",
    }),
});

export const resetPasswordSchema = z.object({
    newPassword: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()

      .min(1, { message: "Please confirm your password" }),
  }) .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createClinicSchema = z.object({
  clinicName: z.string().min(2, "Clinic name is required"),
  clinicEmail: z.string().email("Invalid clinic email address"),
  phone: z.string().min(10, "Valid phone number is required"),

  owner: z.object({
    name: z.string().min(2, "Owner name is required"),
    email: z.string().email("Invalid owner email address"),
    phone: z.string().min(10, "Valid owner phone number is required"),
  }),

  address: z.object({
    addressLine: z.string().min(3, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "Please select state"),
    pincode: z.string().length(6, "Pincode must be 6 digits"),
  }),
});

export const createSubscriptionSchema = z.object({
  clinicId: z.string().min(1, "Please select a clinic"),
  plan: z.string().min(1, "Please select a subscription plan"),
  billingCycle: z.string().min(1, "Please select a billing cycle"),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  startDate: z.string().min(1, "Start date is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
});

export const createPaymentSchema = z.object({
  clinicId: z.string().min(1, "Please select a clinic"),
  subscriptionId: z.string().min(1, "Please select a subscription"),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  paymentDate: z.string().min(1, "Payment date is required"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
  paymentStatus: z.string().min(1, "Please select payment status"),
});