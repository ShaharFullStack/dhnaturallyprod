import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/auth-context';
import { AdminLogin } from '../pages/Admin/AdminLogin';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    children, 
    requireAdmin = false 
}) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <div>Loading...</div>
            </div>
        );
    }

    // If not authenticated, show login page
    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    // If admin access is required but user is not admin, redirect to home
    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    // If all checks pass, render the protected content
    return <>{children}</>;
};
