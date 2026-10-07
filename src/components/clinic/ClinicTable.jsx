import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { toast } from "react-toastify";
import ApiService from "../../services/service";

const PAGE_SIZE = 10;

const formatDate = (date) => {
  if (!date) return "—";
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? "—"
    : parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

const formatCurrency = (amount) =>
  typeof amount === "number"
    ? `₹${amount.toLocaleString("en-IN")}`
    : "—";

const getRemainingDays = (expiryDate) => {
  if (!expiryDate) return null;
  const expiryTime = new Date(expiryDate).getTime();
  if (Number.isNaN(expiryTime)) return null;
  return Math.ceil((expiryTime - Date.now()) / (1000 * 60 * 60 * 24));
};

const formatRemainingDays = (expiryDate) => {
  const remainingDays = getRemainingDays(expiryDate);
  return remainingDays === null
    ? "Remaining: —"
    : `Remaining: ${Math.max(remainingDays, 0)} day(s)`;
};

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-700";
    case "trial":
      return "bg-blue-100 text-blue-700";
    case "pending":
      return "bg-orange-100 text-orange-700";
    case "expired":
    case "inactive":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const ClinicTable = () => {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: PAGE_SIZE,
    totalClinics: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingClinicIds, setUpdatingClinicIds] = useState([]);

  useEffect(() => {
    let isActive = true;

    const loadClinics = async () => {
      setIsLoading(true);
      try {
        const response = await ApiService.getClinics({ page, limit: PAGE_SIZE });
        if (!isActive) return;
        setClinics(response.data?.data?.clinics || []);
        setPagination(response.data?.data?.pagination || {
          currentPage: page,
          limit: PAGE_SIZE,
          totalClinics: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        });
      } catch (error) {
        if (isActive) {
          toast.error(error?.response?.data?.message || "Unable to load clinics.");
          setClinics([]);
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadClinics();
    return () => {
      isActive = false;
    };
  }, [page]);

  const handleClinicStatusChange = async (clinicId, status) => {
    setUpdatingClinicIds((currentIds) => [...currentIds, clinicId]);
    try {
      await ApiService.updateClinicStatus(clinicId, { status });
      setClinics((currentClinics) =>
        currentClinics.map((clinic) =>
          clinic._id === clinicId ? { ...clinic, status } : clinic,
        ),
      );
      toast.success("Clinic status updated successfully.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update clinic status.");
    } finally {
      setUpdatingClinicIds((currentIds) =>
        currentIds.filter((id) => id !== clinicId),
      );
    }
  };

  const filteredClinics = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return clinics;

    return clinics.filter((clinic) =>
      [
        clinic.clinicName,
        clinic.clinicEmail,
        clinic.owner?.name,
        clinic.address?.city,
        clinic.address?.state,
      ].some((value) => value?.toLowerCase().includes(query)),
    );
  }, [clinics, search]);

  const firstClinic = pagination.totalClinics === 0
    ? 0
    : (pagination.currentPage - 1) * pagination.limit + 1;
  const lastClinic = Math.min(
    pagination.currentPage * pagination.limit,
    pagination.totalClinics,
  );

  return (
    <div className="min-h-full">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">All Clinics</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage registered clinics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search this page..."
              aria-label="Search clinics on this page"
              className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-64"
            />
          </div>
          <button
            type="button"
            onClick={() => navigate("/clinic/create")}
            className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" />
            Add Clinic
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">Clinic</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">Owner</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">Contact</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">Plan</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">Subscription</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">Subscription Status</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">Clinic Status</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {!isLoading && filteredClinics.map((clinic) => (
                <tr key={clinic._id} className="transition hover:bg-gray-50/70">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900">{clinic.clinicName}</p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {[clinic.address?.city, clinic.address?.state].filter(Boolean).join(", ") || "—"}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-800">
                    {clinic.owner?.name || "—"}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-500">{clinic.clinicEmail || "—"}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{clinic.phone || "—"}</p>
                  </td>
                  <td className="px-5 py-4">
                    {clinic.currentSubscription ? (
                      <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-medium text-blue-800">
                        {clinic.currentSubscription.plan}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">No subscription</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {clinic.currentSubscription ? (
                      <>
                        <p className="text-sm font-medium text-gray-800">
                          {formatDate(clinic.currentSubscription.expiryDate)}
                        </p>
                        <p className="mt-0.5 text-[11px] text-gray-500">
                          {clinic.currentSubscription.billingCycle} · {formatCurrency(clinic.currentSubscription.amount)}
                        </p>
                        <p className="mt-1 text-[11px] font-medium text-orange-600">
                          {formatRemainingDays(clinic.currentSubscription.expiryDate)}
                        </p>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {clinic.currentSubscription?.status ? (
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(clinic.currentSubscription.status)}`}>
                        {clinic.currentSubscription.status}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={clinic.status?.toLowerCase() || ""}
                      onChange={(event) => handleClinicStatusChange(clinic._id, event.target.value)}
                      disabled={updatingClinicIds.includes(clinic._id)}
                      aria-label={`Status for ${clinic.clinicName}`}
                      className={`rounded-full border-0 px-2.5 py-1 text-[11px] font-medium capitalize outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-wait disabled:opacity-60 ${getStatusStyle(clinic.status)}`}
                    >
                      {clinic.status?.toLowerCase() !== "active"
                        && clinic.status?.toLowerCase() !== "inactive"
                        && <option value={clinic.status?.toLowerCase() || ""}>{clinic.status || "Unknown"}</option>}
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => navigate(`/clinic/${clinic._id}`)}
                      type="button"
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {!isLoading && filteredClinics.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-sm text-gray-500">
                    {search ? "No clinics match your search on this page." : "No clinics found."}
                  </td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-sm text-gray-500">
                    Loading clinics...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Showing {firstClinic}–{lastClinic} of {pagination.totalClinics} clinics
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
              disabled={isLoading || !pagination.hasPreviousPage}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <span className="px-2 text-sm text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={isLoading || !pagination.hasNextPage}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicTable;
