import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;