import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!user || !user.role || user.role !== 'admin') {
    // Redirect to login if no user or user is not an admin
    return <Navigate to="/" />;
  }

  return children; // Allow access to the child components if user is admin
};

export default ProtectedRoute;
