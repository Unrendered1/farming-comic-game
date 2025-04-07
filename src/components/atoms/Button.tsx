"use client";

import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  motionProps?: MotionProps;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
  children, 
  motionProps, 
  variant = 'primary', 
  ...buttonProps
}) => {
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };

  return (
    <motion.button
      {...motionProps}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className={`
        px-4 py-2 rounded-md transition-colors 
        ${variantClasses[variant]}
        ${buttonProps.className || ''}
      `}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
};

export default Button;
