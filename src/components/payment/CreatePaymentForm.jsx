import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPaymentSchema } from '../../validation/validation';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/service';
import { toast } from 'react-toastify';
import { 
  Building2, 
  MapPin,
  ChevronDown, 
  Plus, 
  Calendar, 
  DollarSign, 
  CreditCard, 
  CheckCircle2, 
  Award, 
  Receipt
} from 'lucide-react';

const getTodayDate = () => {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
};

const CreatePaymentForm = () => {
  const location = useLocation();
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isLoadingClinics, setIsLoadingClinics] = useState(true);
  const [isLoadingClinicDetails, setIsLoadingClinicDetails] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
      clinicId: '',
      subscriptionId: '',
      amount: '',
      paymentDate: getTodayDate(),
      paymentMethod: '',
      paymentStatus: '',
    }
  });

  const clinicId = watch("clinicId");
  const subscriptionId = watch("subscriptionId", "");

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
      setSelectedSubscription(null);
      setIsLoadingClinicDetails(false);
      return undefined;
    }

    let isActive = true;
    const clinicFromList = clinics.find((clinic) => clinic._id === clinicId);
    setSelectedClinic(clinicFromList || null);
    setSelectedSubscription(null);
    setValue("subscriptionId", "");
    setValue("amount", "");

    const loadClinicDetails = async () => {
      setIsLoadingClinicDetails(true);
      try {
        const response = await ApiService.getClinic(clinicId);
        if (!isActive) return;
        const clinic = response.data?.data?.clinic || clinicFromList || null;
        const clinicSubscription = clinic?.currentSubscription
          || response.data?.data?.subscription
          || null;
        const createdSubscription = location.state?.clinicId === clinicId
          ? location.state?.subscription
          : null;
        const subscription = createdSubscription
          ? {
              ...clinicSubscription,
              ...createdSubscription,
              _id: createdSubscription._id || clinicSubscription?._id,
            }
          : clinicSubscription;
        setSelectedClinic(clinic ? { ...clinic, currentSubscription: subscription } : null);
        setSelectedSubscription(subscription);
        if (subscription) {
          setValue("subscriptionId", subscription._id);
          setValue("amount", subscription.amount);
        }
      } catch (error) {
        if (isActive) {
          toast.error(error?.response?.data?.message || "Unable to load clinic details.");
        }
      } finally {
        if (isActive) setIsLoadingClinicDetails(false);
      }
    };

    loadClinicDetails();
    return () => {
      isActive = false;
    };
  }, [clinicId, clinics, location.state, setValue]);

  const handleClinicChange = (e) => {
    setValue("clinicId", e.target.value, { shouldValidate: true });
  };

  const handleSubscriptionChange = (e) => {
    const subscriptionId = e.target.value;
    setValue("subscriptionId", subscriptionId, { shouldValidate: true });
    if (selectedSubscription?._id === subscriptionId) {
      setValue("amount", selectedSubscription.amount);
    }
  };

  const handleReset = () => {
    reset({
      clinicId: selectedClinic?._id || "",
      subscriptionId: selectedSubscription?._id || "",
      amount: selectedSubscription?.amount ?? "",
      paymentDate: getTodayDate(),
      paymentMethod: '',
      paymentStatus: '',
    });
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        clinic: data.clinicId,
        subscription: data.subscriptionId,
        amount: data.amount,
        paymentDate: data.paymentDate,
        paymentMethod: data.paymentMethod.toLowerCase(),
        paymentStatus: data.paymentStatus.toLowerCase(),
      };
      await ApiService.createPayment(payload);
      toast.success("Payment recorded successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to record payment. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 1. Clinic & Subscription Selection Card */}
      <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary-light text-primary rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">Clinic & Subscription Selection</h2>
            <p className="text-xs text-text-secondary">Choose the clinic and subscription for this payment.</p>
          </div>
        </div>

        {/* Dropdowns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Clinic Dropdown */}
          <div>
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

          {/* Subscription Dropdown */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Subscription <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <select
                {...register("subscriptionId")}
                value={subscriptionId}
                onChange={handleSubscriptionChange}
                disabled={isLoadingClinicDetails || !selectedSubscription}
                className={`w-full pl-9 pr-8 py-2 bg-background border ${
                  errors.subscriptionId ? 'border-red-500' : 'border-border'
                } rounded-lg text-sm text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer`}
              >
                {!selectedSubscription && (
                  <option value="">
                    {isLoadingClinicDetails ? "Loading subscription..." : "No current subscription"}
                  </option>
                )}
                {selectedSubscription && (
                  <option value={selectedSubscription._id}>
                    {selectedSubscription.plan} ({selectedSubscription.billingCycle}) - ₹{selectedSubscription.amount}
                  </option>
                )}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
            {errors.subscriptionId && (
              <span className="text-xs text-red-500 mt-1 block">{errors.subscriptionId.message}</span>
            )}
          </div>
        </div>

        {/* Dynamic Selection Preview Box */}
        {selectedClinic && (
          <div className="p-4 rounded-xl border border-border bg-background/50 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Clinic Info */}
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

            <div className="flex items-start gap-3">
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

            {/* Subscription Info */}
            {selectedSubscription && (
              <div className="flex items-start gap-3 md:border-l md:border-border md:pl-6">
                <div className="p-2.5 bg-primary-light text-primary rounded-lg shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-text-secondary">
                    <span className="font-medium text-text-primary">Plan:</span> {selectedSubscription.plan}
                  </p>
                  <p className="text-text-secondary">
                    <span className="font-medium text-text-primary">Billing Cycle:</span> {selectedSubscription.billingCycle}
                  </p>
                  <p className="text-text-secondary">
                    <span className="font-medium text-text-primary">Amount:</span> ₹{selectedSubscription.amount}
                  </p>
                  <p className="text-text-secondary">
                    <span className="font-medium text-text-primary">Expiry Date:</span> {selectedSubscription.expiryDate}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Payment Details Card */}
      <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary-light text-primary rounded-xl">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">Payment Details</h2>
            <p className="text-xs text-text-secondary">Enter the payment information.</p>
          </div>
        </div>

        {/* Amount & Date Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Amount */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Amount (₹) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="number"
                placeholder="9999"
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

          {/* Payment Date */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Payment Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                type="date"
                {...register("paymentDate")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.paymentDate ? 'border-red-500' : 'border-border'
                } rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.paymentDate && (
              <span className="text-xs text-red-500 mt-1 block">{errors.paymentDate.message}</span>
            )}
          </div>
        </div>

        {/* Method & Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Payment Method Dropdown */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <select
                {...register("paymentMethod")}
                className={`w-full pl-9 pr-8 py-2 bg-background border ${
                  errors.paymentMethod ? 'border-red-500' : 'border-border'
                } rounded-lg text-sm text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer`}
              >
                <option value="" disabled>Select payment method</option>
                <option value="upi">UPI</option>
                <option value="bank transfer">Bank Transfer</option>
                <option value="card">Credit/Debit Card</option>
                <option value="cash">Cash</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
            {errors.paymentMethod && (
              <span className="text-xs text-red-500 mt-1 block">{errors.paymentMethod.message}</span>
            )}
          </div>

          {/* Payment Status Dropdown */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Payment Status <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600 pointer-events-none" />
              <select
                {...register("paymentStatus")}
                className={`w-full pl-9 pr-8 py-2 bg-background border ${
                  errors.paymentStatus ? 'border-red-500' : 'border-border'
                } rounded-lg text-sm text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer`}
              >
                <option value="" disabled>Select payment status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
            {errors.paymentStatus && (
              <span className="text-xs text-red-500 mt-1 block">{errors.paymentStatus.message}</span>
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
          {isSubmitting ? 'Recording...' : 'Record Payment'}
        </button>
      </div>
    </form>
  );
};

export default CreatePaymentForm;