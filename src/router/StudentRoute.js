import React from "react";
import { Navigate } from "react-router-dom";
import useStudentAuth from "../components/hooks/useStudentAuth";

const StudentRoute = ({ children }) => {
  const isStudentLogin = useStudentAuth();

  return isStudentLogin ? children : <Navigate to="/" />;
};

export default StudentRoute;