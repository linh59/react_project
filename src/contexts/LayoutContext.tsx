
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LayoutContextType {
  layoutPreference: 'sidebar' | 'topnav';
  setLayoutPreference: (layout: 'sidebar' | 'topnav') => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [layoutPreference, setLayoutPreferenceState] = useState<'sidebar' | 'topnav'>(() => {
    const saved = localStorage.getItem('layoutPreference');
    return (saved as 'sidebar' | 'topnav') || 'sidebar';
  });

  const setLayoutPreference = (layout: 'sidebar' | 'topnav') => {
    setLayoutPreferenceState(layout);
    localStorage.setItem('layoutPreference', layout);
  };

  return (
    <LayoutContext.Provider value={{ layoutPreference, setLayoutPreference }}>
      {children}
    </LayoutContext.Provider>
  );
};
