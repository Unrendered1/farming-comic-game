"use client";

import { Inter, Comic_Neue } from 'next/font/google';
import Link from 'next/link';
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';
import { FaHome } from 'react-icons/fa';  // Import home icon
import ResponsiveNavigation from '@/features/responsive/components/ResponsiveNavigation';
import { metadata as siteMetadata } from './metadata';

import './globals.css';

// Configure fonts with increased visibility
const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700'],
  display: 'swap'
});

const comicNeue = Comic_Neue({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-comic-neue'
});

// Lazy-loaded components
const FarmGrid = lazy(() => import('@/features/farm/components/FarmGrid'));
const FarmProgressOverview = lazy(() => import('@/features/farm/components/FarmProgressOverview'));
const FarmQuests = lazy(() => import('@/features/farm/components/FarmQuests'));
const FarmInventory = lazy(() => import('@/features/farm/components/FarmInventory'));

// Performance-optimized loading spinner
const LoadingSpinner = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="flex justify-center items-center h-full"
  >
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500" />
  </motion.div>
);

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong className="font-bold text-2xl">Oops! Something went wrong: </strong>
    <span className="block sm:inline text-lg">{error.message}</span>
    <button 
      onClick={resetErrorBoundary}
      className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-xl"
    >
      Try Again
    </button>
  </motion.div>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${comicNeue.variable}`}>
      <head>
        <title>{siteMetadata.title}</title>
        <meta 
          name="description" 
          content={siteMetadata.description} 
        />
        <meta 
          name="viewport" 
          content={siteMetadata.viewport} 
        />
        <link rel="preload" href="/fonts/comic-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.supabase.co" />
      </head>
      <body className="bg-gradient-to-br from-green-100 via-white to-blue-100 min-h-screen">
        <div className="background-container" />
        <div className="flex">
          <ResponsiveNavigation />
          
          <main className="flex-grow p-4 md:p-8 
            md:ml-16 
            transition-all duration-300 
            min-h-screen 
            w-full
            md:max-w-[calc(100%-4rem)]
            main-content
          ">
            <ErrorBoundary 
              fallbackRender={ErrorFallback}
              onReset={() => {
                // Reset the state of your app here
                window.location.reload();
              }}
            >
              <Suspense fallback={<LoadingSpinner />}>
                {children}
              </Suspense>
            </ErrorBoundary>
          </main>
        </div>
      </body>
    </html>
  );
}
