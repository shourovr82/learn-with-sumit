import React from "react";
import { Navigate } from "react-router-dom";
import useAdminAuth from "../components/hooks/useAdminAuth";

const AdminRoute = ({ children }) => {
  const isAdminLoggedIn = useAdminAuth();

  return isAdminLoggedIn ? children : <Navigate to="/admin" />;
};

export default AdminRoute;