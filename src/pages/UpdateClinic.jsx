import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import CreateClinicForm from "../components/clinic/CreateClinicForm";
import ApiService from "../services/service";

const UpdateClinic = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [clinic, setClinic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadClinic = async () => {
      setIsLoading(true);
      try {
        const response = await ApiService.getClinic(id);
        if (!isActive) return;
        const data = response.data?.data;
        setClinic(data?.clinic || data);
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

  return (
    <div>
      <div className="mb-6">
        <div className="mb-1 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/clinic")}
            className="rounded-lg p-1 transition-colors hover:bg-border/50"
            aria-label="Back to clinics"
          >
            <ArrowLeft className="h-5 w-5 text-text-secondary" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Update Clinic</h1>
        </div>
        <p className="ml-8 text-xs text-text-secondary">
          Update the clinic, owner, and address information.
        </p>
      </div>
      <CreateClinicForm clinicId={id} initialClinic={clinic} />
    </div>
  );
};

export default UpdateClinic;
