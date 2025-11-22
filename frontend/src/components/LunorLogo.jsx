import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LunorLogo = ({ className = '', size = 'default' }) => {
  const sizeConfig = {
    small: { 
      fontSize: '1.25rem',
      letterSpacing: '0.1em'
    },
    default: { 
      fontSize: '1.5rem',
      letterSpacing: '0.12em'
    },
    large: { 
      fontSize: '2rem',
      letterSpacing: '0.15em'
    }
  };

  const config = sizeConfig[size] || sizeConfig.default;

  const brandText = 'lunor.ko';

  return (
    <Link 
      to="/" 
      className={`inline-flex items-center ${className}`}
      style={{ 
        opacity: 1, 
        visibility: 'visible',
        textDecoration: 'none',
        display: 'inline-flex',
        cursor: 'pointer'
      }}
    >
      <motion.span
        className="font-bold whitespace-nowrap relative"
        style={{
          fontSize: config.fontSize,
          letterSpacing: config.letterSpacing,
          fontWeight: 700,
          fontFamily: "'Space Grotesk', sans-serif",
          display: 'inline-block',
          position: 'relative',
          zIndex: 10,
          background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: '#00ffff' // Fallback color - will show if gradient doesn't work
        }}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ 
          scale: 1.05,
          filter: 'brightness(1.2)',
          transition: { type: 'spring', stiffness: 300 }
        }}
      >
        {brandText}
      </motion.span>
    </Link>
  );
};

export default LunorLogo;

