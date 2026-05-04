import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';
import React from 'react';

type ProtectedRouteProps = {
    children: React.ReactNode;
    requiredRole?: 'ADMIN' | 'USER';
};

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps){
    const { authUser, isLoading, isAuthenticated } = useAuthStore();

    if(isLoading){
        return null;
    }

    if(!isAuthenticated || !authUser){
        return <Navigate to="/login" replace />
    }

    if (requiredRole && authUser.roleName !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
}
