import { Outlet } from 'react-router-dom';

import BackgroundDecorations from '../background/BackgroundDecorations';

const AuthLayout = () => {
  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 lg:px-8 overflow-x-hidden relative">
      <BackgroundDecorations />
      <div className="relative z-10">
        <Outlet/>
      </div>
    </div>
  );
};

export default AuthLayout;
