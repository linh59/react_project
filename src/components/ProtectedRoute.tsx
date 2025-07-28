import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
