import React, { useEffect, useState } from "react";
import {
  FiBriefcase,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiCreditCard,
  FiDollarSign,
  FiActivity,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../services/service";

const DashBoard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [recentClinics, setRecentClinics] = useState([]);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(true);
  const [isLoadingClinics, setIsLoadingClinics] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadDashboard = async () => {
      try {
        const response = await ApiService.getDashboard();
        if (isActive) setDashboardData(response.data?.data);
      } catch (error) {
        if (isActive) {
          toast.error(error?.response?.data?.message || "Unable to load dashboard analytics.");
        }
      } finally {
        if (isActive) setIsLoadingDashboard(false);
      }
    };

    const loadRecentClinics = async () => {
      try {
        const response = await ApiService.getClinics({ page: 1, limit: 5 });
        if (isActive) setRecentClinics(response.data?.data?.clinics || []);
      } catch (error) {
        if (isActive) {
          toast.error(error?.response?.data?.message || "Unable to load clinics.");
        }
      } finally {
        if (isActive) setIsLoadingClinics(false);
      }
    };

    loadDashboard();
    loadRecentClinics();

    return () => {
      isActive = false;
    };
  }, []);

  const formatCount = (value) => (value ?? 0).toLocaleString();
  const formatCurrency = (value) =>
    `₹${(value ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

  const stats = [
    {
      title: "Total Onboarded Clinics",
      value: dashboardData ? formatCount(dashboardData.clinics?.totalOnboarded) : "—",
      description: "Total registered clinics",
      icon: <FiBriefcase />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Clinics",
      value: dashboardData ? formatCount(dashboardData.clinics?.active) : "—",
      description: "Currently active clinics",
      icon: <FiCheckCircle />,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Inactive Clinics",
      value: dashboardData ? formatCount(dashboardData.clinics?.inactive) : "—",
      description: "Currently inactive clinics",
      icon: <FiXCircle />,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Expiring Soon",
      value: dashboardData ? formatCount(dashboardData.subscriptions?.expiringSoon) : "—",
      description: "Subscriptions expiring soon",
      icon: <FiAlertTriangle />,
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      title: "Total Payment Done",
      value: dashboardData ? formatCurrency(dashboardData.payments?.totalPayment) : "—",
      description: "Total collected payments",
      icon: <FiCreditCard />,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Monthly Payment",
      value: dashboardData ? formatCurrency(dashboardData.payments?.monthlyPayment) : "—",
      description: "Payments collected this month",
      icon: <FiDollarSign />,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
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
            <p className="text-xs text-gray-400 mt-5">
              {isLoadingDashboard ? "Loading analytics..." : stat.description}
            </p>
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

          <button onClick={() => navigate("/clinic")} className="text-sm font-medium text-primary hover:underline">
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
                <tr key={clinic._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {clinic.clinicName}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {clinic.clinicEmail}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {clinic.currentSubscription?.plan || "—"}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {clinic.currentSubscription
                      ? formatCurrency(clinic.currentSubscription.amount)
                      : "—"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        clinic.status?.toLowerCase() === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {clinic.status || "Unknown"}
                    </span>
                  </td>
                </tr>
              ))}
              {!isLoadingClinics && recentClinics.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                    No clinics found.
                  </td>
                </tr>
              )}
              {isLoadingClinics && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                    Loading clinics...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
