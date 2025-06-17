
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { isAuthenticated, checkSession } = useAdminAuth();

  // Check session on component mount
  React.useEffect(() => {
    checkSession();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
