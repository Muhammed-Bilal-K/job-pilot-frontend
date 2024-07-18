import React, { useEffect } from 'react';
import { useNavigate, Outlet } from "react-router-dom";

export const MessageProtext = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("Token");
    const emplo = localStorage.getItem("Emplo");
    
    useEffect(() => {
        if (!token && !emplo) {
            navigate('/');
        }
    }, [token, emplo, navigate]);

    if (token || emplo) {
        return <Outlet />;
    }
    
    return null;  // Return null to avoid React rendering errors
}
