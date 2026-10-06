import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPaymentSchema } from '../../validation/validation';
import { 
  Building2, 
  ChevronDown, 
  Plus, 
  Calendar, 
  DollarSign, 
  CreditCard, 
  CheckCircle2, 
  Hash, 
  FileText, 
  Award, 
  Receipt
} from 'lucide-react';

// Sample Mock Data (isey aap API se integrate kar sakte hain)
const mockClinicsWithSubscriptions = [
  {
    id: "clinic-1",
    name: "City Care Clinic",
    status: "Active",
    owner: "Dr. Zaid Malik",
    email: "citycare@gmail.com",
    phone: "+91 98765 43210",
    subscriptions: [
      {
        id: "sub-1",
        label: "Professional (Yearly) - ₹9999",
        plan: "Professional",
        billingCycle: "Yearly",
        amount: 9999,
        expiryDate: "2026-09-30"
      },
      {
        id: "sub-2",
        label: "Basic (Monthly) - ₹999",
        plan: "Basic",
        billingCycle: "Monthly",
        amount: 999,
        expiryDate: "2026-10-30"
      }
    ]
  },
  {
    id: "clinic-2",
    name: "Apex Healthcare",
    status: "Active",
    owner: "Dr. Rahul Sharma",
    email: "apex@health.com",
    phone: "+91 91234 56789",
    subscriptions: [
      {
        id: "sub-3",
        label: "Enterprise (Yearly) - ₹24999",
        plan: "Enterprise",
        billingCycle: "Yearly",
        amount: 24999,
        expiryDate: "2027-01-15"
      }
    ]
  }
];

const CreatePaymentForm = () => {
  const [selectedClinic, setSelectedClinic] = useState(mockClinicsWithSubscriptions[0]);
  const [selectedSubscription, setSelectedSubscription] = useState(mockClinicsWithSubscriptions[0].subscriptions[0]);

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
      clinicId: mockClinicsWithSubscriptions[0].id,
      subscriptionId: mockClinicsWithSubscriptions[0].subscriptions[0].id,
      amount: mockClinicsWithSubscriptions[0].subscriptions[0].amount,
      paymentDate: '2025-10-01',
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      referenceNumber: 'UPI1123456',
      remarks: ''
    }
  });

  const remarksValue = watch("remarks", "");

  // Handle Clinic Dropdown Change
  const handleClinicChange = (e) => {
    const clinicId = e.target.value;
    setValue("clinicId", clinicId);
    
    const foundClinic = mockClinicsWithSubscriptions.find(c => c.id === clinicId);
    setSelectedClinic(foundClinic || null);

    if (foundClinic && foundClinic.subscriptions.length > 0) {
      const firstSub = foundClinic.subscriptions[0];
      setSelectedSubscription(firstSub);
      setValue("subscriptionId", firstSub.id);
      setValue("amount", firstSub.amount);
    } else {
      setSelectedSubscription(null);
      setValue("subscriptionId", "");
      setValue("amount", 0);
    }
  };

  // Handle Subscription Dropdown Change
  const handleSubscriptionChange = (e) => {
    const subId = e.target.value;
    setValue("subscriptionId", subId);

    if (selectedClinic) {
      const foundSub = selectedClinic.subscriptions.find(s => s.id === subId);
      setSelectedSubscription(foundSub || null);
      if (foundSub) {
        setValue("amount", foundSub.amount);
      }
    }
  };

  const onSubmit = async (data) => {
    console.log("Payment Record Payload:", JSON.stringify(data, null, 2));
    // Yahan API Call karein:
    // await axios.post('/api/v1/payments', data);
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
                onChange={handleClinicChange}
                className={`w-full pl-9 pr-8 py-2 bg-background border ${
                  errors.clinicId ? 'border-red-500' : 'border-border'
                } rounded-lg text-sm text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer`}
              >
                {mockClinicsWithSubscriptions.map((clinic) => (
                  <option key={clinic.id} value={clinic.id}>
                    {clinic.name}
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
                onChange={handleSubscriptionChange}
                className={`w-full pl-9 pr-8 py-2 bg-background border ${
                  errors.subscriptionId ? 'border-red-500' : 'border-border'
                } rounded-lg text-sm text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer`}
              >
                {selectedClinic?.subscriptions.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.label}
                  </option>
                ))}
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
                  <h3 className="text-sm font-semibold text-text-primary">{selectedClinic.name}</h3>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-medium rounded-full">
                    {selectedClinic.status}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  <span className="font-medium text-text-primary">Owner:</span> {selectedClinic.owner}
                </p>
                <p className="text-xs text-text-secondary">
                  <span className="font-medium text-text-primary">Email:</span> {selectedClinic.email} &nbsp;|&nbsp; <span className="font-medium text-text-primary">Phone:</span> {selectedClinic.phone}
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
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Card">Credit/Debit Card</option>
                <option value="Cash">Cash</option>
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
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
            {errors.paymentStatus && (
              <span className="text-xs text-red-500 mt-1 block">{errors.paymentStatus.message}</span>
            )}
          </div>
        </div>

        {/* Reference Number & Remarks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Reference Number */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Reference Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="e.g. UPI1123456"
                {...register("referenceNumber")}
                className={`w-full pl-9 pr-3 py-2 bg-background border ${
                  errors.referenceNumber ? 'border-red-500' : 'border-border'
                } rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
              />
            </div>
            {errors.referenceNumber && (
              <span className="text-xs text-red-500 mt-1 block">{errors.referenceNumber.message}</span>
            )}
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">Remarks</label>
            <div className="relative">
              <textarea
                rows={4}
                maxLength={500}
                placeholder="e.g. Yearly subscription payment"
                {...register("remarks")}
                className={`w-full p-3 bg-background border ${
                  errors.remarks ? 'border-red-500' : 'border-border'
                } rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none`}
              />
              <span className="absolute right-3 bottom-3 text-[10px] text-text-muted">
                {remarksValue ? remarksValue.length : 0}/500
              </span>
            </div>
            {errors.remarks && (
              <span className="text-xs text-red-500 mt-1 block">{errors.remarks.message}</span>
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
          {isSubmitting ? 'Recording...' : 'Record Payment'}
        </button>
      </div>
    </form>
  );
};

export default CreatePaymentForm;