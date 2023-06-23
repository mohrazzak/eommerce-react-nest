import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../features/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (isAuth) return <>{children}</>;

  return <Navigate to={'signin'} replace />;
};

export default ProtectedRoute;
