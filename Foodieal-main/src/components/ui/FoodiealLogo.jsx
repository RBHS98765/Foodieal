import React from 'react';
import { motion } from 'framer-motion';

export default function FoodiealLogo({ variant = 'full', size = 'md', className = '' }) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 48, text: 'text-2xl' },
    lg: { icon: 64, text: 'text-4xl' },
    xl: { icon: 80, text: 'text-5xl' }
  };

  const { icon, text } = sizes[size];

  const LogoIcon = () => (
    <svg 
      width={icon} 
      height={icon} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Delivery bag shape */}
      <motion.path
        d="M20 35 L20 80 C20 85 25 90 30 90 L70 90 C75 90 80 85 80 80 L80 35"
        fill="#D62828"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Bag handle */}
      <motion.path
        d="M35 35 L35 25 C35 15 45 10 50 10 C55 10 65 15 65 25 L65 35"
        stroke="#F77F00"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      
      {/* Fork icon inside bag */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <rect x="40" y="50" width="4" height="25" rx="2" fill="#FCBF49" />
        <rect x="48" y="50" width="4" height="25" rx="2" fill="#FCBF49" />
        <rect x="56" y="50" width="4" height="25" rx="2" fill="#FCBF49" />
        <rect x="38" y="70" width="24" height="4" rx="2" fill="#FCBF49" />
      </motion.g>
      
      {/* Comparison arrows */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <path
          d="M15 50 L8 50 L8 45 L0 52 L8 59 L8 54 L15 54 Z"
          fill="#F77F00"
        />
        <path
          d="M85 50 L92 50 L92 45 L100 52 L92 59 L92 54 L85 54 Z"
          fill="#F77F00"
        />
      </motion.g>
      
      {/* Price tag */}
      <motion.g
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <circle cx="75" cy="25" r="12" fill="#FCBF49" />
        <text x="75" y="29" textAnchor="middle" fill="#2B2B2B" fontSize="12" fontWeight="bold">₹</text>
      </motion.g>
    </svg>
  );

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  if (variant === 'monochrome') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <svg width={icon} height={icon} viewBox="0 0 100 100" fill="none">
          <path d="M20 35 L20 80 C20 85 25 90 30 90 L70 90 C75 90 80 85 80 80 L80 35" fill="#2B2B2B" />
          <path d="M35 35 L35 25 C35 15 45 10 50 10 C55 10 65 15 65 25 L65 35" stroke="#2B2B2B" strokeWidth="6" fill="none" strokeLinecap="round" />
          <rect x="40" y="50" width="4" height="25" rx="2" fill="white" />
          <rect x="48" y="50" width="4" height="25" rx="2" fill="white" />
          <rect x="56" y="50" width="4" height="25" rx="2" fill="white" />
          <rect x="38" y="70" width="24" height="4" rx="2" fill="white" />
        </svg>
        <span className={`font-bold text-[#2B2B2B] ${text}`}>Foodieal</span>
      </div>
    );
  }

  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LogoIcon />
      <span className={`font-bold bg-gradient-to-r from-[#D62828] to-[#F77F00] bg-clip-text text-transparent ${text}`}>
        Foodieal
      </span>
    </motion.div>
  );
}