import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ViewClinic from "../pages/ViewClinic"
import Login from "../pages/Login"
import ForgotPassword from "../pages/ForgotPassword"
import ResetPassword from "../pages/ResetPassword"

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:id" element={<ViewClinic />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword />}></Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
