import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRouteAuth() {
  const token = localStorage.getItem('Token');
  return token ?  <Navigate to="/" /> : <Outlet />;
}