import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../features/store';

interface NotProtectedRouteProps {
  children: React.ReactNode;
}

const NotProtectedRoute = ({ children }: NotProtectedRouteProps) => {
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);
  if (!isAuth && !isLoading) return <>{children}</>;
  return <Navigate to="/" replace />;
};

export default NotProtectedRoute;
