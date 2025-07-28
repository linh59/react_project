
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from './app/store';


import { useState } from "react";
import AppRoutes from './routes/AppRoutes';
import { restoreSession } from './features/auth/authActions';
import { Toaster } from './components/ui/toaster';
import { ToasterSonner } from './components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { LayoutProvider } from './contexts/LayoutContext';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  }));

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LayoutProvider>
          <TooltipProvider>
            <Toaster />
            <ToasterSonner richColors />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </LayoutProvider>
      </ThemeProvider>

    </QueryClientProvider>
  );
};

export default App;
