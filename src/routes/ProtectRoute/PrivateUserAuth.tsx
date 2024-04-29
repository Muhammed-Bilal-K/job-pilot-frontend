import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateUserAuth: React.FC<any> = () => {
  const token = localStorage.getItem("Token");
  const emplo = localStorage.getItem("Emplo");

  if (token) {
    return <Navigate to='/' />;
  } else if (emplo) {
    return <Navigate to='/employer/emplo-dash' />;
  } else {
    return <Outlet />;
  }
};

export default PrivateUserAuth;
