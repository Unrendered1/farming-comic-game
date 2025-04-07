"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiGrid, FiImage, FiUsers, 
  FiShoppingCart, FiMenu, FiX 
} from 'react-icons/fi';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';

const ResponsiveNavigation: React.FC = () => {
  const { isMobile } = useResponsiveLayout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navigationItems = [
    { 
      href: '/', 
      icon: <FiHome />, 
      label: 'Home' 
    },
    { 
      href: '/farm', 
      icon: <FiGrid />, 
      label: 'Farm' 
    },
    { 
      href: '/comic-panel', 
      icon: <FiImage />, 
      label: 'Comic Panel' 
    },
    { 
      href: '/multiplayer', 
      icon: <FiUsers />, 
      label: 'Multiplayer' 
    },
    { 
      href: '/market', 
      icon: <FiShoppingCart />, 
      label: 'Market' 
    }
  ];

  const NavigationContent = () => (
    <>
      {navigationItems.map((item) => (
        <Link 
          key={item.href}
          href={item.href}
          className={`
            flex items-center 
            relative
            ${isMobile 
              ? 'px-4 py-3 text-lg border-b border-gray-200 hover:bg-gray-100' 
              : 'px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors'}
          `}
        >
          <div className="flex items-center w-full">
            <motion.div 
              initial={{ scale: 1, rotate: 0 }}
              whileHover={{ 
                scale: 1.05,
                rotate: 5,
                transition: { 
                  duration: 0.2,
                  type: "spring",
                  stiffness: 300
                }
              }}
              className="flex items-center"
            >
              {item.icon}
            </motion.div>
            <motion.span 
              initial={{ 
                width: 0, 
                opacity: 0,
                marginLeft: 0
              }}
              animate={{ 
                width: isHovered && !isMobile ? 'auto' : 0, 
                opacity: isHovered && !isMobile ? 1 : 0,
                marginLeft: isHovered && !isMobile ? '0.5rem' : 0
              }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 120,
                damping: 14
              }}
              className={`
                whitespace-nowrap 
                overflow-hidden 
                text-gray-700
                text-sm
              `}
            >
              {item.label}
            </motion.span>
          </div>
        </Link>
      ))}
    </>
  );

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="flex justify-between items-center">
          <div className="flex-1 flex justify-around">
            <NavigationContent />
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-4 text-2xl"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute bottom-full left-0 right-0 bg-white shadow-lg"
            >
              <div className="flex flex-col">
                <NavigationContent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    );
  }

  return (
    <motion.nav 
      initial={{ 
        width: '4rem',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
      }}
      animate={{ 
        width: isHovered ? '12rem' : '4rem',
        backgroundColor: isHovered 
          ? 'rgba(255, 255, 255, 1)' 
          : 'rgba(255, 255, 255, 0.8)'
      }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 120,
        damping: 14
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="fixed left-0 top-0 bottom-0 bg-white/80 shadow-lg z-50 overflow-hidden"
    >
      <div className="flex flex-col h-full py-4 items-start px-2">
        <div className="flex flex-col space-y-2 w-full">
          <NavigationContent />
        </div>
      </div>
    </motion.nav>
  );
};

export default ResponsiveNavigation;
