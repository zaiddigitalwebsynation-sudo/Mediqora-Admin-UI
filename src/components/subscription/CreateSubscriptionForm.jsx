import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSubscriptionSchema } from '../../validation/validation';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/service';
import { toast } from 'react-toastify';
import { 
  Building2, 
  MapPin, 
  ChevronDown, 
  Plus, 
  Calendar, 
  DollarSign, 
  Award, 
  RotateCw 
} from 'lucide-react';

const CreateSubscriptionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [isLoadingClinics, setIsLoadingClinics] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(createSubscriptionSchema),
    defaultValues: {
      clinicId: '',
      plan: '',
      billingCycle: '',
      amount: '',
      startDate: '',
      expiryDate: ''
    }
  });

  const clinicId = watch("clinicId");

  useEffect(() => {
    let isActive = true;

    const loadClinics = async () => {
      try {
        const response = await ApiService.getClinics();
        const fetchedClinics = response.data?.data?.clinics || [];
        if (!isActive) return;
        setClinics(fetchedClinics);
        const requestedClinicId = location.state?.clinicId || "";
        if (requestedClinicId) {
          setValue("clinicId", requestedClinicId, { shouldValidate: true });
        }
      } catch (error) {
        if (isActive) {
          toast.error(error?.response?.data?.message || "Unable to load clinics.");
        }
      } finally {
        if (isActive) setIsLoadingClinics(false);
      }
    };

    loadClinics();
    return () => {
      isActive = false;
    };
  }, [location.state, setValue]);

  useEffect(() => {
    if (!clinicId) {
      setSelectedClinic(null);
      return undefined;
    }

    let isActive = true;
    const clinicFromList = clinics.find((clinic) => clinic._id === clinicId);
    setSelectedClinic(clinicFromList || null);

    const loadClinicDetails = async () => {
      try {
        const response = await ApiService.getClinic(clinicId);
        if (isActive) {
          setSelectedClinic(response.data?.data?.clinic || clinicFromList || null);
        }
      } catch (error) {
        if (isActive) {
          toast.error(error?.response?.data?.message || "Unable to load clinic details.");
        }
      }
    };

    loadClinicDetails();
    return () => {
      isActive = false;
    };
  }, [clinicId, clinics]);

  const handleClinicChange = (e) => {
    setValue("clinicId", e.target.value, { shouldValidate: true });
  };

  const handleReset = () => {
    reset({
      clinicId: selectedClinic?._id || "",
      plan: '',
      billingCycle: '',
      amount: '',
      startDate: '',
      expiryDate: ''
    });
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        clinic: data.clinicId,
        plan: data.plan,
        billingCycle: data.billingCycle,
        amount: data.amount,
        startDate: data.startDate,
        expiryDate: data.expiryDate,
      };
      const response = await ApiService.createSubscription(payload);
      const responseData = response.data?.data || response.data;
      const createdSubscription = responseData?.subscription || responseData;
      const subscriptionId = createdSubscription?._id || createdSubscription?.id;
      toast.success("Subscription created successfully.");
      navigate("/payment/create", {
        state: {
          clinicId: payload.clinic,
          subscription: {
            ...createdSubscription,
            _id: subscriptionId,
            plan: payload.plan,
            billingCycle: payload.billingCycle,
            amount: payload.amount,
            startDate: payload.startDate,
            expiryDate: payload.expiryDate,
          },
        },
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to create subscription. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 1. Clinic Selection Card */}
      <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary-light text-primary rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">Clinic Selection</h2>
            <p className="text-xs text-text-secondary">Choose the clinic for which you want to create a subscription.</p>
          </div>
        </div>

        {/* Dropdown */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-text-primary mb-1.5">
            Clinic Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            <select
              {...register("clinicId")}
              value={clinicId}
              onChange={handleClinicChange}
              disabled={isLoadingClinics || clinics.length === 0}
              className={`w-full pl-9 pr-8 py-2 bg-background border ${
                errors.clinicId ? 'border-red-500' : 'border-border'
              } rounded-lg text-sm text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer`}
            >
              <option value="" disabled>
                {isLoadingClinics
                  ? "Loading clinics..."
                  : clinics.length > 0
                    ? "Select a clinic"
                    : "No clinics available"}
              </option>
              {clinics.map((clinic) => (
                <option key={clinic._id} value={clinic._id}>
                  {clinic.clinicName}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>
          {errors.clinicId && (
            <span className="text-xs text-red-500 mt-1 block">{errors.clinicId.message}</span>
          )}
        </div>

        {/* Selected Clinic Preview Box */}
        {selectedClinic && (
          <div className="p-4 rounded-xl border border-border bg-background/50 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-primary-light text-primary rounded-lg shrink-0 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-text-primary">{selectedClinic.clinicName}</h3>
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                    selectedClinic.status?.toLowerCase() === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedClinic.status}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  <span className="font-medium text-text-primary">Owner:</span> {selectedClinic.owner?.name || "—"}
                </p>
                <p className="text-xs text-text-secondary">
                  <span className="font-medium text-text-primary">Email:</span> {selectedClinic.clinicEmail || "—"} &nbsp;|&nbsp; <span className="font-medium text-text-primary">Phone:</span> {selectedClinic.phone || "—"}
                </p>
                <p className="text-xs text-text-secondary">
                  <span className="font-medium text-text-primary">Owner contact:</span> {selectedClinic.owner?.email || "—"} &nbsp;|&nbsp; {selectedClinic.owner?.phone || "—"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:border-l md:border-border md:pl-6">
              <div className="p-2.5 bg-primary-light text-primary rounded-lg shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-text-primary">Address</h4>
                <p className="text-xs text-text-secondary">{selectedClinic.address?.addressLine || "—"}</p>
                <p className="text-xs text-text-secondary">
                  {[selectedClinic.address?.city, selectedClinic.address?.state, selectedClinic.address?.pincode]
                    .filter(Boolean)
                    .join(", ") || "—"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Subscription Details Card */}
      <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary-light text-primary rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">Subscription Details</h2>
            <p className="text-xs text-text-secondary">Enter the subscription information.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Plan Dropdown */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Plan <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <select
                {...register("plan")}
                className={`w-full pl-9 pr-8 py-2 bg-background border ${
                  errors.plan ? 'border-red-500' : 'border-border'
                } rounded-lg text-sm text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer`}
              >
                <option value="" disabled>Select a plan</option>
                <option value="Basic">Basic</option>
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
            {errors.plan && (
              <span className="text-xs text-red-500 mt-1 block">{errors.plan.message}</span>
            )}
          </div>

          {/* Billing Cycle Dropdown */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Billing Cycle <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <RotateCw className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <select
                {...register("billingCycle")}
                className={`w-full pl-9 pr-8 py-2 bg-background border ${
                  errors.billingCycle ? 'border-red-500' : 'border-border'
                } rounded-lg text-sm text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer`}
              >
                <option value="" disabled>Select billing cycle</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
            {errors.billingCycle && (
              <span className="text-xs text-red-500 mt-1 block">{errors.billingCycle.message}</span>
            )}
          </div>
        </div>

        {/* Amount, Start Date, Expiry Date Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {/* Amount */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Amount (₹) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="number"
                placeholder="Enter amount"
                {...register("amount")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.amount ? 'border-red-500' : 'border-border'
                } rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.amount && (
              <span className="text-xs text-red-500 mt-1 block">{errors.amount.message}</span>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Start Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                type="date"
                {...register("startDate")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.startDate ? 'border-red-500' : 'border-border'
                } rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.startDate && (
              <span className="text-xs text-red-500 mt-1 block">{errors.startDate.message}</span>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                type="date"
                {...register("expiryDate")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.expiryDate ? 'border-red-500' : 'border-border'
                } rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.expiryDate && (
              <span className="text-xs text-red-500 mt-1 block">{errors.expiryDate.message}</span>
            )}
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleReset}
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
          {isSubmitting ? 'Creating...' : 'Create Subscription'}
        </button>
      </div>
    </form>
  );
};

export default CreateSubscriptionForm;