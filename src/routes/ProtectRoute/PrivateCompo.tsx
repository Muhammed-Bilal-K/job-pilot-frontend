import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  role: string;
  redirect : string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ role , redirect }) => {
  const token = localStorage.getItem("Token");
  const emplo = localStorage.getItem("Emplo");
  const navigate = useNavigate();

  useEffect(() => {
    if ((role === "candidate" && !token) || (role === "employer" && !emplo)) {
      navigate('/');
    }
  }, [role, token, emplo, navigate]);

  return (
    <div>
      {(role === "candidate" && token) || (role === "employer" && emplo) ? (
        <Outlet />
      ) : (
        redirect
      )}
    </div>
  );
};

export default PrivateRoute;





















