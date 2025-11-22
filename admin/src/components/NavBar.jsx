import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect } from 'react';
import LunorLogo from './LunorLogo';

const NavBar = ({ setToken }) => {
  useEffect(() => {
    // Ensure nav elements are visible immediately
    const elements = document.querySelectorAll('.nav-admin');
    elements.forEach(el => {
      if(el) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      }
    });
    
    gsap.from('.nav-admin', {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.out'
    });
  }, []);

  return (
    <motion.div 
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='flex items-center py-5 px-8 justify-between glass rounded-2xl mx-6 mt-6 backdrop-blur-xl border border-gray-200/50 shadow-xl'
      style={{
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
      }}
    >
      <motion.div
        className='flex items-center gap-4 nav-admin'
        whileHover={{ scale: 1.02 }}
      >
        <div>
          <LunorLogo size="default" />
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Admin Panel</p>
        </div>
      </motion.div>
      
      <motion.button 
        onClick={() => {
          localStorage.removeItem('token');
          setToken('');
        }} 
        className='neon-button px-8 py-3 text-sm nav-admin relative'
        whileHover={{ 
          scale: 1.05, 
          boxShadow: '0 0 30px rgba(0, 102, 255, 0.5)' 
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10">Logout</span>
      </motion.button>
    </motion.div>
  );
};

export default NavBar;
