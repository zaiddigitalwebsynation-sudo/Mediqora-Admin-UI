import { Routes, Route } from "react-router-dom";
import DashBoard from "../pages/Dashboard";
import ViewClinic from "../pages/ViewClinic";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Layout from "../layout/Layout";
import Clinic from "../pages/Clinic";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      {/* Protected/Layout Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/clinic" element={<Clinic />} />
        <Route path="/clinic/:id" element={<ViewClinic />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;