import { Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "../pages/Dashboard";
import ViewClinic from "../pages/ViewClinic";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Layout from "../layout/Layout";
import Clinic from "../pages/Clinic";
import useAuth from "../hooks/useAuth";
import AuthLoader from "../components/shared/AuthLoader";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <AuthLoader />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Protected/Layout Routes */}
      <Route element={<Layout />}>
        <Route
          path="/"
          element={user ? <DashBoard /> : <Navigate to="/login" replace />}
        />
        <Route path="/clinic" element={<Clinic />} />
        <Route path="/clinic/:id" element={<ViewClinic />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
