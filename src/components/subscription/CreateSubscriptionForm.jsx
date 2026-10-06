import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSubscriptionSchema } from '../../validation/validation';
import { 
  Building2, 
  MapPin, 
  ChevronDown, 
  Plus, 
  Calendar, 
  DollarSign, 
  Clock, 
  Settings, 
  Award, 
  RotateCw 
} from 'lucide-react';

// Sample dummy data (aap isse API se dynamic laa sakte hain)
const mockClinics = [
  {
    id: "clinic-1",
    name: "City Care Clinic",
    status: "Active",
    owner: "Dr. Zaid Malik",
    email: "citycare@gmail.com",
    phone: "+91 98765 43210",
    address: "Sector 16, Noida",
    statePincode: "Uttar Pradesh - 201301"
  },
  {
    id: "clinic-2",
    name: "Apex Healthcare",
    status: "Active",
    owner: "Dr. Rahul Sharma",
    email: "apex@health.com",
    phone: "+91 91234 56789",
    address: "Connaught Place, New Delhi",
    statePincode: "Delhi - 110001"
  }
];

const CreateSubscriptionForm = () => {
  const [selectedClinic, setSelectedClinic] = useState(mockClinics[0]);

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
      clinicId: mockClinics[0].id,
      plan: 'Professional',
      billingCycle: 'Yearly',
      amount: 9999,
      startDate: '2025-10-01',
      expiryDate: '2026-09-30',
      status: 'Pending',
      remarks: ''
    }
  });

  const remarksValue = watch("remarks", "");

  const handleClinicChange = (e) => {
    const id = e.target.value;
    setValue("clinicId", id);
    const found = mockClinics.find(c => c.id === id);
    setSelectedClinic(found || null);
  };

  const onSubmit = async (data) => {
    console.log("Submitted Payload:", JSON.stringify(data, null, 2));
    // Yahan API Call karein:
    // await axios.post('/api/v1/subscriptions', data);
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
              onChange={handleClinicChange}
              className={`w-full pl-9 pr-8 py-2 bg-background border ${
                errors.clinicId ? 'border-red-500' : 'border-border'
              } rounded-lg text-sm text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer`}
            >
              {mockClinics.map((clinic) => (
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

        {/* Selected Clinic Preview Box */}
        {selectedClinic && (
          <div className="p-4 rounded-xl border border-border bg-background/50 grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="flex items-start gap-3 md:border-l md:border-border md:pl-6">
              <div className="p-2.5 bg-primary-light text-primary rounded-lg shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-text-primary">Address</h4>
                <p className="text-xs text-text-secondary">{selectedClinic.address}</p>
                <p className="text-xs text-text-secondary">{selectedClinic.statePincode}</p>
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

        {/* Status Dropdown */}
        <div>
          <label className="block text-xs font-medium text-text-primary mb-1.5">
            Status <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            <select
              {...register("status")}
              className={`w-full pl-9 pr-8 py-2 bg-background border ${
                errors.status ? 'border-red-500' : 'border-border'
              } rounded-lg text-sm text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer`}
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>
          {errors.status && (
            <span className="text-xs text-red-500 mt-1 block">{errors.status.message}</span>
          )}
        </div>
      </div>

      {/* 3. Additional Information Card */}
      <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary-light text-primary rounded-xl">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-primary">Additional Information</h2>
            <p className="text-xs text-text-secondary">Add any additional notes or remarks (optional).</p>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <label className="block text-xs font-medium text-text-primary mb-1.5">Remarks</label>
          <div className="relative">
            <textarea
              rows={4}
              maxLength={500}
              placeholder="e.g. First year subscription, special discount, etc..."
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
          {isSubmitting ? 'Creating...' : 'Create Subscription'}
        </button>
      </div>
    </form>
  );
};

export default CreateSubscriptionForm;