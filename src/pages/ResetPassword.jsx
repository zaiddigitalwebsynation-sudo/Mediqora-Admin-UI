import ResetPasswordForm from "../components/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="min-h-screen w-full bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
   
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>

          <p className="text-gray-500 mt-2 text-sm">
            Create a new secure password for your account.
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
