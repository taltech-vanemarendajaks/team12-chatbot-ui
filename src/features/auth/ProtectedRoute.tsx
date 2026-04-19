import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';
import React from 'react';

type ProtectedRouteProps = {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps){
    const { authUser, isLoading, isAuthenticated } = useAuthStore();

    if(isLoading){
        return null;
    }

    if(!isAuthenticated || !authUser){
        return <Navigate to="/login" replace />
    }

    return <>{children}</>;
}
