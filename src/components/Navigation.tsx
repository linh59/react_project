
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Headphones, PenTool, MessageCircle, BookOpen, Notebook, Component, User, Settings, Menu, X, LogOut, CreditCard, Receipt } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import LanguageSwitcher from './LanguageSwitcher';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/features/auth/authActions';
import type { AppDispatch } from '@/app/store';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const Navigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    { name: 'Bank Cards', href: '/bank-cards', icon: CreditCard, },
    { name: 'Transactions', href: '/transactions', icon: Receipt },
    { name: 'Settings', href: '/settings', icon: Settings }
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };// Check for screen sizes with proper breakpoints
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

  // Close mobile nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle outside click and prevent background scroll
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as Element;
        if (!target.closest('.nav-mobile') && !target.closest('.mobile-menu-trigger')) {
          setIsOpen(false);
        }
      };
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobile, isOpen]);

  const handleToggleNav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  const renderNavItem = (item: NavItem, isCompact = false) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    const navItem = (
      <Link
        key={item.name}
        to={item.href}
        className={`nav-item touch-target flex items-center p-3 text-sm font-medium rounded-2xl transition-all duration-300 group ${active
            ? 'bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground shadow-lg shadow-primary/25 nav-active scale-105'
            : 'text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-card-nested/80 hover:to-card-nested/60 hover:scale-105 hover:shadow-md clay-button'
          } ${isCompact ? 'justify-center' : 'justify-start'}`}
        onClick={() => isMobile && setIsOpen(false)}
      >
        <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        {!isCompact && (
          <span className="nav-text truncate ml-3 font-medium">{t(item.name)}</span>
        )}
      </Link>
    );

    if (isCompact) {
      return (
        <TooltipProvider key={item.name} delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              {navItem}
            </TooltipTrigger>
            <TooltipContent side="right" className="clay-card bg-popover/95 backdrop-blur-md border-border/50 shadow-xl">
              <p className="text-sm font-medium">{t(item.translationKey)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return navItem;
  };

  const renderUserProfile = (isCompact = false) => (
    <div className={`user-profile border-t border-border/40 bg-gradient-to-b from-card-nested/40 to-card-nested/20 backdrop-blur-sm ${isCompact ? 'p-2' : 'p-4'}`}>
      <div className={`flex items-center mb-3 ${isCompact ? 'justify-center' : 'space-x-3'}`}>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center clay-card-nested flex-shrink-0 shadow-md">
          <User className="h-5 w-5 text-primary" />
        </div>
        {!isCompact && (
          <div className="nav-text flex-1 space-y-1">
            <div className="text-sm font-semibold text-foreground">John Doe</div>
            <Link
              to="/profile"
              className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
              onClick={() => isMobile && setIsOpen(false)}
            >
              {t('common.viewProfile')}
            </Link>
          </div>
        )}
      </div>
      <div className={isCompact ? 'flex justify-center' : ''}>
        <LogOut onClick={handleLogout} className="w-4 h-4 lg:w-5 lg:h-5 text-card-foreground hover:text-purple-700 drop-shadow-sm" />

      </div>
    </div>
  );

  const sidebarContent = (isCompact = false) => (
    <div className="h-full flex flex-col">
      {/* Logo Section */}
      <div className={`logo-section border-b border-border/40 bg-gradient-to-b from-card/80 to-card-nested/60 backdrop-blur-sm ${isCompact ? 'p-3' : 'p-6'}`}>
        <div className={`flex items-center ${isCompact ? 'justify-center' : 'justify-between'}`}>
          <div className={`flex items-center ${isCompact ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            {!isCompact && (
              <span className="nav-text font-baloo font-bold text-lg text-foreground">EduPlatform</span>
            )}
          </div>
          {!isCompact && !isMobile && (
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto sidebar-scroll">
        <div className="space-y-2">
          {mainNavItems.map((item) => renderNavItem(item, isCompact))}
        </div>

        <div className="py-4">
          <Separator className="bg-border/60" />
        </div>

        <div className="space-y-2">
          {!isCompact && (
            <div className="nav-text px-3 py-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
              {t('nav.account')}
            </div>
          )}
          {userNavItems.map((item) => renderNavItem(item, isCompact))}
        </div>
      </nav>

      {/* User Profile Section */}
      {renderUserProfile(isCompact)}
    </div>
  );

  const handleLogout = () => {

    dispatch(logoutUser())
  }

  if (isMobile) {
    return (
      <>
        {/* Mobile Header with Hamburger */}
        <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-card/95 backdrop-blur-xl border-b border-border/40 clay-card-enhanced flex items-center justify-between px-4 shadow-xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleNav}
            className="touch-target mobile-menu-trigger p-2 hover:bg-muted/60 clay-button"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rounded-md flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-baloo font-bold text-base text-foreground">EduPlatform</span>
          </div>

          <LanguageSwitcher />
        </div>

        {/* Overlay */}
        {isOpen && <div className="nav-overlay fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300" />}

        {/* Mobile Navigation */}
        <div className={`nav-mobile fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} clay-card flex flex-col bg-background/98 backdrop-blur-md shadow-xl`}>
        {sidebarContent(false)}
        </div>
      </>
    );
  }

  // Desktop/Tablet Navigation - Fixed Position
  return (
    <div className={`sidebar-container fixed top-0 left-0 h-screen z-30 transition-all duration-300 ease-in-out ${isTablet ? 'w-20' : 'w-60'
      } bg-card/95 backdrop-blur-xl border-r border-border/40 clay-card-enhanced shadow-2xl overflow-hidden`}>
      {sidebarContent(isTablet)}
    </div>
  );
};

export default Navigation;
