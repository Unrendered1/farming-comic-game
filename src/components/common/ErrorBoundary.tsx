"use client";

import React, { ErrorInfo, ReactNode } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Optional: Log error to error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center text-red-500 space-x-2 p-4 bg-red-100 rounded-lg">
          <FaExclamationTriangle />
          <div>
            <h2 className="font-bold">Something went wrong</h2>
            <p>{this.state.error?.message}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
