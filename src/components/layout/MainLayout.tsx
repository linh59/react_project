


import BackgroundDecorations from '../background/BackgroundDecorations';

import { Outlet } from 'react-router-dom';

import { useIsMobile } from '@/hooks/use-mobile';
import Navigation from '../Navigation';

const MainLayout = () => {
    const isMobile = useIsMobile();

 return (
  <div className="min-h-screen overflow-x-hidden relative flex bg-background">
      <BackgroundDecorations />
      <div className="relative z-10 flex w-full">
        <Navigation />
        <main className={`flex-1 w-full max-w-full box-border overflow-x-hidden px-4 py-6 md:px-6 lg:px-8 ${
          isMobile ? 'pt-20' : 'pt-6'
        }`}>
          <Outlet/>
        </main>
      </div>
    </div>
   
  );
};
  

export default MainLayout;
