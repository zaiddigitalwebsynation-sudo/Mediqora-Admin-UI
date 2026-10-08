import { Routes, Route, Navigate } from "react-router-dom";

import DashBoard from "../pages/Dashboard";
import ViewClinic from "../pages/ViewClinic";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import Layout from "../layout/Layout";
import Clinic from "../pages/Clinic";
import CreateClinic from "../pages/CreateClinic";

import useAuth from "../hooks/useAuth";
import AuthLoader from "../components/shared/AuthLoader";

import ProtectedRoute from "./ProtectedRoute";
import CreateSubscription from "../pages/CreateSubscription";
import CreatePayment from "../pages/CreatePayment";
import UpdateClinic from "../pages/UpdateClinic";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <AuthLoader />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route element={<ProtectedRoute />}>

        <Route element={<Layout />}>

          <Route path="/" element={<DashBoard />} />

          <Route path="/clinic" element={<Clinic />} />

          <Route path="/clinic/create" element={<CreateClinic />} />

          <Route path="/clinic/:id/edit" element={<UpdateClinic />} />

          <Route path="/clinic/:id" element={<ViewClinic />} />

          <Route path="/subscription/create" element={<CreateSubscription />} />

          <Route path="/payment/create" element={<CreatePayment />} />

        </Route>
        
      </Route>

      <Route
        path="*"
        element={<Navigate to={user ? "/" : "/login"} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
