import { Routes, Route } from 'react-router-dom';
import SignIn from '../features/auth/pages/SignIn';
import Dashboard from '../pages/Dashboard';
import AuthLayout from '../components/layout/AuthLayout';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import UserProfile from '@/features/user/pages/UserProfile';
import Components from '@/features/reuseComponents/pages/Components';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes dùng layout nhẹ */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<div>Sign up page</div>} />
        <Route path="/reset-password" element={<div>Reset password page</div>} />
      </Route>

      {/* App routes cần login và dùng layout chính */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
           <Route path="/profile" element={<UserProfile />} />
           <Route path="/components" element={<Components />} />
          {/* các route khác */}
        </Route>
      </Route>
    </Routes>
  );
}
