import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteAuth: React.FC<any> = () => {
  const token = localStorage.getItem("AdminToken");
  return <div>{token ? <Navigate to='/admin/admin-dash' /> : <Outlet />}</div>;
};

export default PrivateRouteAuth;
