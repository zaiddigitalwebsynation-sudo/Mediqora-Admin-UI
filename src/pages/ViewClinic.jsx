import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Edit,
  Mail,
  MapPin,
  Phone,
  User,
  IndianRupee,
  Clock3,
} from "lucide-react";

const ViewClinic = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Temporary static data
  // Later you can replace this with API data using `id`
  const clinic = {
    id,
    name: "City Care Clinic",
    location: "Noida, Uttar Pradesh",
    status: "Active",

    owner: {
      name: "Dr. Zaid Malik",
      email: "zaid@example.com",
      phone: "+91 98765 43210",
    },

    contact: {
      email: "contact@citycareclinic.com",
      phone: "+91 98765 43210",
    },

    subscription: {
      plan: "Professional",
      startDate: "24 Sep 2025",
      expiryDate: "24 Sep 2026",
      billingCycle: "Yearly",
      amount: "₹9,999",
      status: "Active",
      daysRemaining: 1,
    },

    address: {
      addressLine: "Sector 16, Noida",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
    },

    joinedDate: "24 Sep 2025",
    lastPayment: "24 Sep 2025",
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/clinic")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-gray-900">
                {clinic.name}
              </h1>

              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-medium text-green-700">
                <CheckCircle2 className="h-3 w-3" />
                {clinic.status}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Clinic ID: #{clinic.id}
            </p>
          </div>
        </div>

       
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Left Content */}
        <div className="space-y-5 xl:col-span-2">
          {/* Clinic Information */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Clinic Information
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Basic information about the clinic.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
              {/* Clinic Name */}
              <InfoItem
                icon={Building2}
                label="Clinic Name"
                value={clinic.name}
              />

              {/* Owner */}
              <InfoItem
                icon={User}
                label="Clinic Owner"
                value={clinic.owner.name}
              />

              {/* Email */}
              <InfoItem
                icon={Mail}
                label="Email Address"
                value={clinic.contact.email}
              />

              {/* Phone */}
              <InfoItem
                icon={Phone}
                label="Phone Number"
                value={clinic.contact.phone}
              />

              {/* Joined Date */}
              <InfoItem
                icon={CalendarDays}
                label="Joined Date"
                value={clinic.joinedDate}
              />

              {/* Location */}
              <InfoItem
                icon={MapPin}
                label="Location"
                value={`${clinic.address.city}, ${clinic.address.state}`}
              />
            </div>
          </div>

          {/* Owner Information */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Owner Information
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Registered clinic owner details.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-3">
              <InfoItem
                icon={User}
                label="Owner Name"
                value={clinic.owner.name}
              />

              <InfoItem
                icon={Mail}
                label="Email"
                value={clinic.owner.email}
              />

              <InfoItem
                icon={Phone}
                label="Phone"
                value={clinic.owner.phone}
              />
            </div>
          </div>

          {/* Address */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Clinic Address
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
              <InfoItem
                icon={MapPin}
                label="Address"
                value={clinic.address.addressLine}
              />

              <InfoItem
                icon={MapPin}
                label="City"
                value={clinic.address.city}
              />

              <InfoItem
                icon={MapPin}
                label="State"
                value={clinic.address.state}
              />

              <InfoItem
                icon={MapPin}
                label="Pincode"
                value={clinic.address.pincode}
              />
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-5">
          {/* Subscription Card */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Subscription
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Current subscription plan
                  </p>
                </div>

                <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-medium text-green-700">
                  Active
                </span>
              </div>
            </div>

            <div className="p-5">
              {/* Plan */}
              <div className="rounded-xl bg-primary p-4 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-white/60">
                      Current Plan
                    </p>

                    <h3 className="mt-1 text-lg font-semibold">
                      {clinic.subscription.plan}
                    </h3>
                  </div>

                  <CreditCard className="h-5 w-5 text-white/70" />
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-white/60">
                      Billing Cycle
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {clinic.subscription.billingCycle}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-white/60">
                      Amount
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                      {clinic.subscription.amount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="mt-5 space-y-4">
                <DetailRow
                  icon={CalendarDays}
                  label="Start Date"
                  value={clinic.subscription.startDate}
                />

                <DetailRow
                  icon={CalendarDays}
                  label="Expiry Date"
                  value={clinic.subscription.expiryDate}
                />

                <DetailRow
                  icon={Clock3}
                  label="Remaining"
                  value={`${clinic.subscription.daysRemaining} day`}
                  valueClass="text-orange-500"
                />

                <DetailRow
                  icon={IndianRupee}
                  label="Last Payment"
                  value={clinic.lastPayment}
                />
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Payment Summary
              </h2>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Current Plan
                </span>

                <span className="text-sm font-medium text-gray-900">
                  {clinic.subscription.plan}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Billing Cycle
                </span>

                <span className="text-sm font-medium text-gray-900">
                  {clinic.subscription.billingCycle}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Total Paid
                  </span>

                  <span className="text-lg font-semibold text-primary">
                    {clinic.subscription.amount}
                  </span>
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

/* Reusable Information Item */
const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
        <Icon className="h-4 w-4 text-primary" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>

        <p className="mt-1 truncate text-sm font-medium text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
};

/* Reusable Detail Row */
const DetailRow = ({
  icon: Icon,
  label,
  value,
  valueClass = "text-gray-900",
}) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-gray-400" />

        <span className="text-sm text-gray-500">{label}</span>
      </div>

      <span className={`text-sm font-medium ${valueClass}`}>
        {value}
      </span>
    </div>
  );
};

export default ViewClinic;