import React from 'react';
import { motion } from 'framer-motion';

export function Confetti({ count = 50 }) {
  const colors = ['#D62828', '#F77F00', '#FCBF49', '#2B2B2B'];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3"
          style={{
            backgroundColor: colors[i % colors.length],
            borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '0%' : '2px',
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          initial={{ top: -20, opacity: 1 }}
          animate={{
            top: '110%',
            x: (Math.random() - 0.5) * 400,
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1) * 3,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;