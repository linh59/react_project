
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Headphones, PenTool, MessageCircle, BookOpen, Notebook, Component, User, Settings, Menu, X, LogOut } from 'lucide-react';
// import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import type {  AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/features/auth/authActions';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

  const mainNavItems = [
    { name: 'Home', href: '/', icon: Home },
    // { name: 'Listening', href: '/listening', icon: Headphones },
    // { name: 'Writing', href: '/writing', icon: PenTool },
    // { name: 'Conversation', href: '/conversation', icon: MessageCircle },
    // { name: 'Grammar', href: '/grammar', icon: BookOpen },
    // { name: 'Notebook', href: '/notebook', icon: Notebook },
    { name: 'Components', href: '/components', icon: Component }
  ];

  const userNavItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings }
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  // Close mobile nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle mobile nav state
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobile && isOpen && !target.closest('.nav-mobile') && !target.closest('.mobile-menu-trigger')) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobile, isOpen]);

  const handleToggleNav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

    const handleLogout = () =>{

      dispatch(logoutUser())
    }

  const navContent = (
    <>
      {/* Logo Section */}
      <div className="p-4 lg:p-6 border-b border-border/40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-clay icon-container">
            <BookOpen className="h-4 w-4 lg:h-6 lg:w-6 text-primary-foreground" />
          </div>
          <span className="nav-text font-baloo font-bold text-lg lg:text-xl text-foreground">EduPlatform</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 lg:px-4 py-4 lg:py-6 space-y-2 overflow-y-auto">
        <div className="space-y-1 lg:space-y-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`touch-target flex items-center px-3 lg:px-4 py-2 lg:py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                  active
                    ? 'nav-active text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 clay-card-nested'
                }`}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <Icon className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 flex-shrink-0" />
                <span className="nav-text truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="py-3 lg:py-4">
          {/* <Separator className="bg-border/60" /> */}
        </div>

        <div className="space-y-1 lg:space-y-2">
          <div className="nav-text px-3 lg:px-4 py-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
            Account
          </div>
          {userNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`touch-target flex items-center px-3 lg:px-4 py-2 lg:py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  active
                    ? 'nav-active text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 clay-card-nested'
                }`}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <Icon className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 flex-shrink-0" />
                <span className="nav-text truncate">{item.name}</span>
              </Link>
            );
          })}
             <button 
              className="p-2 lg:p-2.5 rounded-xl hover:bg-card/60 border-2 border-transparent hover:border-border/40 transition-all duration-200 transform hover:scale-105 backdrop-blur-sm touch-target flex-shrink-0"
              aria-label="Sign out"
            >
              <LogOut onClick={handleLogout}  className="w-4 h-4 lg:w-5 lg:h-5 text-card-foreground hover:text-purple-700 drop-shadow-sm" />
            </button>
        </div>
      </nav>
      
      {/* User Profile Section */}
      <div className="p-3 lg:p-4 border-t border-border/40 bg-muted/30 clay-card-nested">
        <div className="flex items-center space-x-2 lg:space-x-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center clay-card-nested icon-container">
            <User className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
          </div>
          <div className="nav-text flex-1 space-y-1">
            <div className="text-sm font-semibold text-foreground">John Doe</div>
            <Link 
              to="/profile" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={() => isMobile && setIsOpen(false)}
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-card/95 backdrop-blur-sm border-b border-border/40 clay-card flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleNav}
            className="touch-target mobile-menu-trigger p-2 clay-button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-clay icon-container">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-baloo font-bold text-lg text-foreground">EduPlatform</span>
          </div>
          
          <div className="w-10" />
        </div>

        {/* Overlay */}
        {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)} />}

        {/* Mobile Navigation */}
        <div className={`nav-mobile clay-card-enhanced ${isOpen ? 'open' : ''} flex flex-col bg-card/98 backdrop-blur-md`}>
          {navContent}
        </div>
      </>
    );
  }

  // Desktop/Tablet Navigation
  return (
    <div className="h-screen bg-card/95 backdrop-blur-sm border-r border-border/40 clay-card flex flex-col sticky top-0 transition-all duration-300 w-16 md:w-64 nav-tablet">
      {navContent}
    </div>
  );
};

export default Navigation;
