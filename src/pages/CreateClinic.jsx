import { useNavigate } from "react-router-dom";
import CreateClinicForm from "../components/clinic/CreateClinicForm";
import { ArrowLeft } from "lucide-react";

const CreateClinic = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => navigate("/clinic")}
            className="p-1 hover:bg-border/50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-text-secondary" />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">
            Create Clinic
          </h1>
        </div>
        <p className="text-xs text-text-secondary ml-8">
          Add a new clinic to the system. You can manage subscription and
          payments later.
        </p>
      </div>
      <CreateClinicForm />
    </div>
  );
};

export default CreateClinic;
