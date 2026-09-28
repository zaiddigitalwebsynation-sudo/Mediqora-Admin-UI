import React from "react";
import {
  Search,
  SlidersHorizontal,
  Download,
  Plus,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Clinic = () => {
  const navigate = useNavigate();
  const clinics = [
    { 
      _id: "1",
      name: "City Care Clinic",
      location: "Noida, Uttar Pradesh",
      owner: "Dr. Zaid Malik",
      email: "zaid@example.com",
      plan: "Professional",
      subscription: "24 Sep 2026",
      subscriptionText: "Expires in 1 day",
      status: "Active",
    },
    {
      _id: "2",
      name: "Health Plus Clinic",
      location: "Sector 62, Noida",
      owner: "Dr. Rahul Sharma",
      email: "rahul@example.com",
      plan: "Basic",
      subscription: "8 Nov 2026",
      subscriptionText: "Expires in 45 days",
      status: "Active",
    },
    {
      _id: "3",
      name: "Wellness Care",
      location: "Lajpat Nagar, Delhi",
      owner: "Dr. Priya Verma",
      email: "priya@example.com",
      plan: "Professional",
      subscription: "10 Sep 2026",
      subscriptionText: "Expired 12 days ago",
      status: "Expired",
    },
    {
      _id: "4",
      name: "Sunrise Medical Center",
      location: "Gurugram, Haryana",
      owner: "Dr. Aman Gupta",
      email: "aman@example.com",
      plan: "Enterprise",
      subscription: "2 Jan 2027",
      subscriptionText: "Expires in 100 days",
      status: "Active",
    },
    {
      _id: "5",
      name: "Family Health Clinic",
      location: "Dwarka, Delhi",
      owner: "Dr. Neha Kapoor",
      email: "neha@example.com",
      plan: "Basic",
      subscription: "30 Sep 2026",
      subscriptionText: "Trial - 7 days left",
      status: "Trial",
    },
  ];
 

  const getPlanStyle = (plan) => {
    switch (plan) {
      case "Professional":
        return "bg-blue-100 text-blue-800";

      case "Enterprise":
        return "bg-primary text-white";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Expired":
        return "bg-red-100 text-red-600";

      case "Trial":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            All Clinics
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage registered clinics.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search clinic name, owner or email..."
              className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-64"
            />
          </div>

         

          {/* Add Clinic */}
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" />
            Add Clinic
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            {/* Table Header */}
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">
                  Clinic
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-gray-600">
                  Owner
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-gray-600">
                  Contact
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-gray-600">
                  Plan
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-gray-600">
                  Subscription
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-5 py-3 text-xs font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {clinics.map((clinic) => (
                <tr
                  key={clinic.name}
                  className="transition hover:bg-gray-50/70"
                >
                  {/* Clinic */}
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {clinic.name}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-500">
                        {clinic.location}
                      </p>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-800">
                      {clinic.owner}
                    </p>
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-500">
                      {clinic.email}
                    </p>
                  </td>

                  {/* Plan */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${getPlanStyle(
                        clinic.plan
                      )}`}
                    >
                      {clinic.plan}
                    </span>
                  </td>

                  {/* Subscription */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-800">
                      {clinic.subscription}
                    </p>

                    <p
                      className={`mt-0.5 text-[11px] ${
                        clinic.status === "Expired"
                          ? "text-red-500"
                          : clinic.status === "Trial"
                          ? "text-blue-500"
                          : "text-orange-500"
                      }`}
                    >
                      {clinic.subscriptionText}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(
                        clinic.status
                      )}`}
                    >
                      {clinic.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <button
                      onClick={() => navigate(`/clinic/${clinic._id}`)}
                      type="button"
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
                    >
                      View
                      {/* <ArrowRight className="h-3.5 w-3.5" /> */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Result Count */}
          <p className="text-xs text-gray-500">
            Showing <span className="font-medium text-gray-700">1–5</span>{" "}
            of <span className="font-medium text-gray-700">128</span> clinics
          </p>

          {/* Pagination Controls */}
          <div className="flex items-center gap-1.5">
            {/* Previous */}
            <button
              type="button"
              className="flex h-8 items-center gap-1 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Previous
            </button>

            {/* Page 1 */}
            <button
              type="button"
              className="h-8 w-8 rounded-lg bg-primary text-xs font-medium text-white"
            >
              1
            </button>

            {/* Page 2 */}
            <button
              type="button"
              className="h-8 w-8 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100"
            >
              2
            </button>

            {/* Page 3 */}
            <button
              type="button"
              className="h-8 w-8 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100"
            >
              3
            </button>

            <span className="px-1 text-xs text-gray-400">...</span>

            {/* Page 13 */}
            <button
              type="button"
              className="h-8 w-8 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100"
            >
              13
            </button>

            {/* Next */}
            <button
              type="button"
              className="flex h-8 items-center gap-1 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>

            {/* Limit */}
            <select className="h-8 rounded-lg border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none focus:border-primary">
              <option>10 / page</option>
              <option>20 / page</option>
              <option>50 / page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clinic;