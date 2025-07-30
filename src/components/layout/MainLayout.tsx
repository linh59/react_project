


import BackgroundDecorations from '../background/BackgroundDecorations';

import { Outlet } from 'react-router-dom';



import Navigation from '../Navigation';
import { useEffect, useState } from 'react';

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  const [isTablet, setIsTablet] = useState(false);
  // Check for screen sizes with proper breakpoints
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  return (
    <div className="min-h-screen overflow-x-hidden relative flex bg-background">
      <BackgroundDecorations />
      <div className="relative z-10 flex w-full">
        <Navigation />
        <main className={`flex-1 w-full max-w-full box-border overflow-x-hidden px-4 py-6 md:px-6 lg:px-8 transition-all duration-300 ${isMobile
            ? 'pt-20' // Space for mobile header
            : isTablet
              ? 'ml-20' // Left margin for tablet icon-only sidebar (80px)
              : 'ml-60' // Left margin for desktop full sidebar (240px)
          }`}>
          <Outlet />
        </main>
      </div>
    </div>

  );
};


export default MainLayout;
