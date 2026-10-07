import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  User,
  IndianRupee,
  Clock3,
  History,
} from "lucide-react";
import { toast } from "react-toastify";
import ApiService from "../services/service";

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

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
    case "paid":
      return "bg-green-100 text-green-700";
    case "pending":
    case "trial":
      return "bg-orange-100 text-orange-700";
    case "expired":
    case "inactive":
    case "failed":
    case "cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const ViewClinic = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [clinic, setClinic] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  useEffect(() => {
    let isActive = true;

    const loadClinic = async () => {
      setIsLoading(true);
      try {
        const response = await ApiService.getClinic(id);
        if (!isActive) return;
        const data = response.data?.data;
        setClinic(data?.clinic || null);
        setSubscription(data?.subscription || data?.clinic?.currentSubscription || null);
        setPaymentSummary(data?.paymentSummary || null);
        setPayments(data?.payments || []);
      } catch (error) {
        if (isActive) {
          toast.error(error?.response?.data?.message || "Unable to load clinic details.");
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadClinic();
    return () => {
      isActive = false;
    };
  }, [id]);

  const toggleSubscriptionHistory = async () => {
    if (isHistoryVisible) {
      setIsHistoryVisible(false);
      return;
    }

    setIsHistoryVisible(true);
    if (subscriptionHistory.length > 0 || isHistoryLoading) return;

    setIsHistoryLoading(true);
    try {
      const response = await ApiService.getClinicSubscriptionHistory(id);
      const data = response.data?.data;
      setSubscriptionHistory(data?.subscriptions || []);
      setTotalSubscriptions(data?.totalSubscriptions || 0);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to load subscription history.");
    } finally {
      setIsHistoryLoading(false);
    }
  };

  if (isLoading) {
    return <p className="py-12 text-center text-sm text-gray-500">Loading clinic details...</p>;
  }

  if (!clinic) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => navigate("/clinic")}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to clinics
        </button>
        <p className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          Clinic details are not available.
        </p>
      </div>
    );
  }

  const lastPayment = paymentSummary?.lastPayment || payments[0] || null;
  const remainingDays = subscription?.expiryDate
    ? Math.ceil((new Date(subscription.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/clinic")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          aria-label="Back to clinics"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold text-gray-900">{clinic.clinicName}</h1>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(clinic.status)}`}>
              <CheckCircle2 className="h-3 w-3" />
              {clinic.status || "Unknown"}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleSubscriptionHistory}
          aria-expanded={isHistoryVisible}
          className="ml-auto inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-primary hover:text-primary"
        >
          <History className="h-4 w-4" />
          {isHistoryVisible ? "Hide Subscription History" : "View Subscription History"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <section className="rounded-xl border border-gray-200 bg-white">
            <SectionHeader title="Clinic Information" description="Basic information about the clinic." />
            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
              <InfoItem icon={Building2} label="Clinic Name" value={clinic.clinicName} />
              <InfoItem icon={User} label="Clinic Owner" value={clinic.owner?.name} />
              <InfoItem icon={Mail} label="Clinic Email" value={clinic.clinicEmail} />
              <InfoItem icon={Phone} label="Clinic Phone" value={clinic.phone} />
              <InfoItem icon={CalendarDays} label="Joined Date" value={formatDate(clinic.joinedDate || clinic.createdAt)} />
              <InfoItem
                icon={MapPin}
                label="Location"
                value={[clinic.address?.city, clinic.address?.state].filter(Boolean).join(", ")}
              />
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white">
            <SectionHeader title="Owner Information" description="Registered clinic owner details." />
            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-3">
              <InfoItem icon={User} label="Owner Name" value={clinic.owner?.name} />
              <InfoItem icon={Mail} label="Owner Email" value={clinic.owner?.email} />
              <InfoItem icon={Phone} label="Owner Phone" value={clinic.owner?.phone} />
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white">
            <SectionHeader title="Clinic Address" />
            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
              <InfoItem icon={MapPin} label="Address" value={clinic.address?.addressLine} />
              <InfoItem icon={MapPin} label="City" value={clinic.address?.city} />
              <InfoItem icon={MapPin} label="State" value={clinic.address?.state} />
              <InfoItem icon={MapPin} label="Pincode" value={clinic.address?.pincode} />
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Subscription</h2>
                  <p className="mt-1 text-xs text-gray-500">Current subscription plan</p>
                </div>
                {subscription && (
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(subscription.status)}`}>
                    {subscription.status}
                  </span>
                )}
              </div>
            </div>
            {subscription ? (
              <div className="p-5">
                <div className="rounded-xl bg-primary p-4 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-white/60">Current Plan</p>
                      <h3 className="mt-1 text-lg font-semibold">{subscription.plan || "—"}</h3>
                    </div>
                    <CreditCard className="h-5 w-5 text-white/70" />
                  </div>
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-white/60">Billing Cycle</p>
                      <p className="mt-1 text-sm font-medium">{subscription.billingCycle || "—"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/60">Amount</p>
                      <p className="mt-1 text-lg font-semibold">{formatCurrency(subscription.amount)}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 space-y-4">
                  <DetailRow icon={CalendarDays} label="Start Date" value={formatDate(subscription.startDate)} />
                  <DetailRow icon={CalendarDays} label="Expiry Date" value={formatDate(subscription.expiryDate)} />
                  <DetailRow
                    icon={Clock3}
                    label="Remaining"
                    value={remainingDays === null ? "—" : `${Math.max(remainingDays, 0)} day(s)`}
                    valueClass="text-orange-500"
                  />
                </div>
              </div>
            ) : (
              <p className="p-5 text-sm text-gray-500">No current subscription.</p>
            )}
          </section>

          <section className="rounded-xl border border-gray-200 bg-white">
            <SectionHeader title="Payment Summary" />
            <div className="space-y-4 p-5">
              <DetailRow
                icon={IndianRupee}
                label="Total Paid"
                value={formatCurrency(paymentSummary?.totalPayment)}
              />
              <DetailRow
                icon={CreditCard}
                label="Total Payments"
                value={paymentSummary?.totalPayments ?? payments.length}
              />
              <DetailRow
                icon={CalendarDays}
                label="Last Payment"
                value={formatDate(lastPayment?.paymentDate)}
              />
              {lastPayment && (
                <DetailRow
                  icon={CreditCard}
                  label="Last Payment Status"
                  value={lastPayment.paymentStatus || "—"}
                />
              )}
              {payments.length > 0 && (
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Payment History
                  </h3>
                  <div className="space-y-3">
                    {payments.map((payment) => (
                      <div
                        key={payment._id}
                        className="flex items-start justify-between gap-3 rounded-lg bg-gray-50 p-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatCurrency(payment.amount)}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {formatDate(payment.paymentDate)}
                            {payment.paymentMethod
                              ? ` · ${payment.paymentMethod.toUpperCase()}`
                              : ""}
                          </p>
                          {payment.referenceNumber && (
                            <p className="mt-1 text-xs text-gray-400">
                              Ref: {payment.referenceNumber}
                            </p>
                          )}
                        </div>
                        <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${getStatusStyle(payment.paymentStatus)}`}>
                          {payment.paymentStatus || "Unknown"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {isHistoryVisible && (
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <SectionHeader
            title="Subscription History"
            description={`${totalSubscriptions} subscription(s)`}
          />
          {isHistoryLoading ? (
            <p className="p-5 text-sm text-gray-500">Loading subscription history...</p>
          ) : subscriptionHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-600">Plan</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-600">Billing Cycle</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-600">Amount</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-600">Start Date</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-600">Expiry Date</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {subscriptionHistory.map((historyItem) => (
                    <tr key={historyItem._id}>
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">
                        {historyItem.plan || "—"}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {historyItem.billingCycle || "—"}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {formatCurrency(historyItem.amount)}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {formatDate(historyItem.startDate)}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {formatDate(historyItem.expiryDate)}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(historyItem.status)}`}>
                          {historyItem.status || "Unknown"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-5 text-sm text-gray-500">No subscription history found.</p>
          )}
        </section>
      )}
    </div>
  );
};

const SectionHeader = ({ title, description }) => (
  <div className="border-b border-gray-200 px-5 py-4">
    <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
    {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
  </div>
);

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-gray-900">{value || "—"}</p>
    </div>
  </div>
);

const DetailRow = ({ icon: Icon, label, value, valueClass = "text-gray-900" }) => (
  <div className="flex items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-gray-400" />
      <span className="text-sm text-gray-500">{label}</span>
    </div>
    <span className={`text-right text-sm font-medium ${valueClass}`}>{value || "—"}</span>
  </div>
);

export default ViewClinic;
