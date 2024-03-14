import React from "react";
import { Navigate, useOutletContext, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const context = useOutletContext();

    // Check if access token exists in local storage
    const accessToken = localStorage.getItem('accessToken');
    //if roles based protect your routes then use of it
    // if (!accessToken || !context.user || !context.user.role.includes(role)) {
    //     return <Navigate to="/login" replace />;
    // }

    // If access token doesn't exist or user role doesn't match, redirect to login
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    // If access token exists and user role matches, render the protected route
    return <Outlet context={context} />;
};

export default ProtectedRoute;
