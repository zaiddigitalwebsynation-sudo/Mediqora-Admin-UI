import React from "react";
import {
  FiBriefcase,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiAlertTriangle,
  FiCreditCard,
  FiDollarSign,
  FiArrowUpRight,
  FiArrowDownRight,
  FiActivity,
} from "react-icons/fi";

const DashBoard = () => {
  // Dummy dashboard data
  const stats = [
    {
      title: "Total Onboarded Clinics",
      value: "248",
      description: "Total registered clinics",
      icon: <FiBriefcase />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "+12.5%",
      trendType: "up",
    },
    {
      title: "Active Clinics",
      value: "214",
      description: "Currently active clinics",
      icon: <FiCheckCircle />,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      trend: "+8.2%",
      trendType: "up",
    },
    {
      title: "Inactive Clinics",
      value: "34",
      description: "Currently inactive clinics",
      icon: <FiXCircle />,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      trend: "-2.4%",
      trendType: "down",
    },
    {
      title: "Subscription Pending",
      value: "18",
      description: "Clinics awaiting subscription",
      icon: <FiClock />,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      trend: "+4.1%",
      trendType: "up",
    },
    {
      title: "Expiring Soon",
      value: "12",
      description: "Subscriptions expiring in 7 days",
      icon: <FiAlertTriangle />,
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
      trend: "+1.8%",
      trendType: "up",
    },
    {
      title: "Total Payment Done",
      value: "₹12,48,500",
      description: "Total collected payments",
      icon: <FiCreditCard />,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      trend: "+14.6%",
      trendType: "up",
    },
    {
      title: "Monthly Payment",
      value: "₹2,18,400",
      description: "Payments collected this month",
      icon: <FiDollarSign />,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
      trend: "+10.2%",
      trendType: "up",
    },
  ];

  const recentClinics = [
    {
      name: "City Care Clinic",
      email: "citycare@example.com",
      plan: "Yearly",
      status: "Active",
      amount: "₹9,999",
    },
    {
      name: "Health Plus Center",
      email: "healthplus@example.com",
      plan: "Monthly",
      status: "Active",
      amount: "₹999",
    },
    {
      name: "Wellness Clinic",
      email: "wellness@example.com",
      plan: "Monthly",
      status: "Pending",
      amount: "₹999",
    },
    {
      name: "MediCare Clinic",
      email: "medicare@example.com",
      plan: "Yearly",
      status: "Inactive",
      amount: "₹9,999",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">Overview</p>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Monitor your clinics, subscriptions and payments.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600">
          <FiActivity className="text-primary" />
          <span>System Overview</span>
        </div>
      </div>

      {/* ================= STATISTICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200"
          >
            {/* Card top */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500 leading-5">{stat.title}</p>

                <h2 className="text-2xl font-bold text-gray-900 mt-3">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${stat.iconBg} ${stat.iconColor}`}
              >
                {stat.icon}
              </div>
            </div>

            {/* Card bottom */}
            <div className="flex items-center justify-between gap-2 mt-5">
              <p className="text-xs text-gray-400">{stat.description}</p>

              <span
                className={`flex items-center gap-1 text-xs font-medium whitespace-nowrap ${
                  stat.trendType === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trendType === "up" ? (
                  <FiArrowUpRight />
                ) : (
                  <FiArrowDownRight />
                )}

                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      

      {/* ================= RECENT CLINICS ================= */}
      <div className="bg-white border border-gray-200 rounded-xl mt-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Clinics
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recently registered clinics
            </p>
          </div>

          <button className="text-sm font-medium text-primary hover:underline">
            View All Clinics →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[650px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Clinic
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Plan
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Amount
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {recentClinics.map((clinic) => (
                <tr key={clinic.email} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {clinic.name}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {clinic.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {clinic.plan}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {clinic.amount}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        clinic.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : clinic.status === "Pending"
                            ? "bg-orange-50 text-orange-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {clinic.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
