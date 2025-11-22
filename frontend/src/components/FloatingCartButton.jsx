import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { motion } from 'framer-motion';

const FloatingCartButton = () => {
  const { getCartCount } = useContext(ShopContext);
  const cartCount = getCartCount();

  return (
    <Link to="/cart" className="touch-manipulation" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[200] cursor-pointer touch-manipulation"
        style={{
          opacity: 1,
          visibility: 'visible',
          display: 'block',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        <div className="relative">
          <motion.button
            className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta shadow-2xl border-2 border-white/30 hover:border-white/50 transition-all duration-200 touch-manipulation"
            style={{
              boxShadow: '0 8px 32px rgba(0, 255, 255, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              minWidth: '56px',
              minHeight: '56px',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            {/* Cart Icon SVG */}
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2.5"
              className="sm:w-7 sm:h-7"
              style={{ 
                opacity: 1,
                display: 'block'
              }}
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            
            {/* Cart Count Badge */}
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-white text-black rounded-full font-bold shadow-lg"
                style={{ 
                  fontSize: '10px',
                  lineHeight: '24px',
                  minWidth: '24px',
                  minHeight: '24px'
                }}
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
          
          {/* Pulse animation when cart has items */}
          {cartCount > 0 && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta opacity-50"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default FloatingCartButton;

