import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ButtonProps } from '@/types';

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  href, 
  className,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-mesh-purple to-mesh-green text-white hover:shadow-lg hover:shadow-mesh-purple/25 focus:ring-mesh-purple",
    secondary: "bg-mesh-green text-white hover:bg-mesh-green/90 hover:shadow-lg hover:shadow-mesh-green/25 focus:ring-mesh-green border-none",
    outline: "border border-mesh-purple text-mesh-purple hover:bg-mesh-purple hover:text-white focus:ring-mesh-purple"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-md",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-xl"
  };

  const Component = href ? 'a' : 'button';

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Component
        href={href}
        onClick={onClick}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
};

export default Button;
