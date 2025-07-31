import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'user' | 'admin';
    redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRole,
    redirectTo = '/login'
}) => {
    const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
    const location = useLocation();

    // Nếu chưa đăng nhập, redirect về login
    if (!isLoggedIn) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Nếu yêu cầu role cụ thể và user không có role đó
    if (requiredRole && user?.role !== requiredRole) {
        // Nếu là admin nhưng truy cập route user, cho phép
        if (user?.role === 'admin') {
            return <>{children}</>;
        }
        // Nếu là user nhưng truy cập route admin, redirect về home
        if (requiredRole === 'admin' && user?.role === 'user') {
            return <Navigate to="/" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute; 