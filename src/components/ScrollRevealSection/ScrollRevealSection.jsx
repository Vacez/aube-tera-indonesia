import React from 'react';
import { motion } from 'framer-motion';

export const ScrollRevealSection = ({ children, className = '', id = '' }) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 55, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
