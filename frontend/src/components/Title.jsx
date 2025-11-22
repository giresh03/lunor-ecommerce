import React from 'react';
import { motion } from 'framer-motion';

const Title = ({ text1, text2 }) => {
  return (
    <motion.div 
      className="inline-flex gap-3 items-center mb-3"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-gray-400 text-lg font-semibold tracking-widest">
        <span className="gradient-text font-bold">{text1}</span>{' '}
        <span className="text-white font-extrabold">{text2}</span>
      </p>
      <motion.div 
        className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-magenta"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </motion.div>
  );
};

export default Title;
