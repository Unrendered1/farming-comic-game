import React, { useState, useEffect } from 'react';

// Responsive breakpoint types
export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Breakpoint configuration
export const BREAKPOINTS: Record<BreakpointKey, number> = {
  'xs': 320,   // Mobile (small)
  'sm': 640,   // Mobile (medium)
  'md': 768,   // Tablet
  'lg': 1024,  // Desktop (small)
  'xl': 1280,  // Desktop (medium)
  '2xl': 1536  // Desktop (large)
};

// Responsive layout hook
export function useResponsiveLayout() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointKey>('xs');
  const [isMobile, setIsMobile] = useState(true);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Initial setup
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      // Determine current breakpoint
      const breakpoint = (Object.keys(BREAKPOINTS) as BreakpointKey[])
        .filter(key => width >= BREAKPOINTS[key])
        .sort((a, b) => BREAKPOINTS[b] - BREAKPOINTS[a])[0] || 'xs';
      
      setCurrentBreakpoint(breakpoint);
      setIsMobile(width < BREAKPOINTS['md']);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Initial call
    handleResize();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive layout utilities
  const getResponsiveValue = <T>(
    values: Partial<Record<BreakpointKey, T>>, 
    defaultValue?: T
  ): T | undefined => {
    // Find the largest breakpoint that has a value
    const breakpointKeys = (Object.keys(BREAKPOINTS) as BreakpointKey[])
      .filter(key => values[key as BreakpointKey] !== undefined)
      .sort((a, b) => BREAKPOINTS[b] - BREAKPOINTS[a]);

    for (const key of breakpointKeys) {
      if (screenWidth >= BREAKPOINTS[key]) {
        return values[key as BreakpointKey];
      }
    }

    return defaultValue;
  };

  return {
    currentBreakpoint,
    isMobile,
    screenWidth,
    getResponsiveValue,
    BREAKPOINTS
  };
}

// Responsive component wrapper
export function withResponsiveLayout<P extends { isMobile?: boolean }>(
  Component: React.ComponentType<P>
) {
  return function ResponsiveWrapper(props: Omit<P, 'isMobile'>) {
    const { isMobile } = useResponsiveLayout();
    const componentProps = { ...props, isMobile } as unknown as P;
    return React.createElement(Component, componentProps);
  };
}
