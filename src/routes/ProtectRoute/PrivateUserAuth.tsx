import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateUserAuth: React.FC<any> = () => {
  const token = localStorage.getItem("Token");
  return <div>{token ? <Navigate to='/' /> : <Outlet />}</div>;
};

export default PrivateUserAuth;