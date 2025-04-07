"use client";

import React, { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { motion } from 'framer-motion';

// Lazy Loading für Features
const FarmingView = lazy(() => import('./features/farming/FarmingView'));

// Fallback-Komponente für Fehler
const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => (
  <div role="alert" className="error-fallback">
    <p>Something went wrong:</p>
    <pre style={{ color: 'red' }}>{error.message}</pre>
  </div>
);

// Loading Fallback
const LoadingFallback = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="flex justify-center items-center h-screen"
  >
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
  </motion.div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <FarmingView />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
