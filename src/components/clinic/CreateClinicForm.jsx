import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClinicSchema } from "../../validation/validation";
import {
  Building2,
  Mail,
  Phone,
  User,
  MapPin,
  ChevronDown,
  Plus,
} from "lucide-react";
import ApiService from "../../services/service";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateClinicForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createClinicSchema),
    defaultValues: {
      clinicName: "",
      clinicEmail: "",
      phone: "",
      owner: {
        name: "",
        email: "",
        phone: "",
      },
      address: {
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
      },
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await ApiService.createClinic(data);

      toast.success("Create Clinic Successfully ");

      navigate("/clinic");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Clinic failed. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 1. Clinic Information Card */}
      <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary-light text-primary rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Clinic Information
            </h2>
            <p className="text-xs text-text-secondary">
              Basic information about the clinic.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Clinic Name */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Clinic Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="e.g. City Care Clinic"
                {...register("clinicName")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.clinicName ? "border-red-500" : "border-border"
                } rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.clinicName && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.clinicName.message}
              </span>
            )}
          </div>

          {/* Clinic Email */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Clinic Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="email"
                placeholder="e.g. contact@citycareclinic.com"
                {...register("clinicEmail")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.clinicEmail ? "border-red-500" : "border-border"
                } rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.clinicEmail && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.clinicEmail.message}
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="e.g. +91 98765 43210"
                {...register("phone")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.phone ? "border-red-500" : "border-border"
                } rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.phone && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Owner Information Card */}
      <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary-light text-primary rounded-xl">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Owner Information
            </h2>
            <p className="text-xs text-text-secondary">
              Details of the clinic owner / main contact person.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Owner Name */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Owner Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="e.g. Dr. Jhon"
                {...register("owner.name")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.owner?.name ? "border-red-500" : "border-border"
                } rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.owner?.name && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.owner.name.message}
              </span>
            )}
          </div>

          {/* Owner Email */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Owner Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="email"
                placeholder="e.g. jhon@example.com"
                {...register("owner.email")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.owner?.email ? "border-red-500" : "border-border"
                } rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.owner?.email && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.owner.email.message}
              </span>
            )}
          </div>

          {/* Owner Phone */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Owner Phone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="e.g. +91 98765 43210"
                {...register("owner.phone")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.owner?.phone ? "border-red-500" : "border-border"
                } rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.owner?.phone && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.owner.phone.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Clinic Address Card */}
      <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary-light text-primary rounded-xl">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Clinic Address
            </h2>
            <p className="text-xs text-text-secondary">
              Complete address of the clinic.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Address Line */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="e.g. Sector 16, Noida"
                {...register("address.addressLine")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.address?.addressLine
                    ? "border-red-500"
                    : "border-border"
                } rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.address?.addressLine && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.address.addressLine.message}
              </span>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="e.g. Noida"
                {...register("address.city")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.address?.city ? "border-red-500" : "border-border"
                } rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.address?.city && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.address.city.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* State Select */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              State <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <select
                {...register("address.state")}
                className={`w-full pl-9 pr-8 py-2 bg-background border ${
                  errors.address?.state ? "border-red-500" : "border-border"
                } rounded-lg text-sm text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer`}
              >
                <option value="">Select state</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
            {errors.address?.state && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.address.state.message}
              </span>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Pincode <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="e.g. 201301"
                {...register("address.pincode")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.address?.pincode ? "border-red-500" : "border-border"
                } rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.address?.pincode && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.address.pincode.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2 text-sm font-medium text-text-primary bg-secondary hover:bg-secondary-hover border border-border rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors shadow-sm disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          {isSubmitting ? "Creating..." : "Create Clinic"}
        </button>
      </div>
    </form>
  );
};

export default CreateClinicForm;
