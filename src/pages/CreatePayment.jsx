import CreatePaymentForm from '../components/payment/CreatePaymentForm';
import { ArrowLeft } from 'lucide-react';

const CreatePayment = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div>
        {/* Top Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <button className="p-1.5 hover:bg-border/40 rounded-lg transition-colors bg-surface border border-border shadow-xs">
              <ArrowLeft className="w-4 h-4 text-text-secondary" />
            </button>
            <h1 className="text-xl font-bold text-text-primary">Create Payment</h1>
          </div>
          <p className="text-xs text-text-secondary ml-9">
            Record a new payment for a subscription. Select the clinic and subscription details.
          </p>
        </div>

        {/* Payment Form */}
        <CreatePaymentForm />
      </div>
    </div>
  );
};

export default CreatePayment;