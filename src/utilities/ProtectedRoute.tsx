import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import user from '../schema/user';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: 'TEACHER' | 'STUDENT';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
