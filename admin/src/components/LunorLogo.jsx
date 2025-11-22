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

  // Animation variants for each letter
  const letterVariants = {
    initial: { 
      opacity: 0,
      y: -20,
      scale: 0.8
    },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 12
      }
    }),
    hover: {
      scale: 1.1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Text animation for gradient
  const gradientVariants = {
    initial: { backgroundPosition: '0% 50%' },
    animate: {
      backgroundPosition: '100% 50%',
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear'
      }
    }
  };

  const brandText = 'lunor.ko';
  const letters = brandText.split('');

  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      <motion.div
        className="relative inline-flex items-center justify-center"
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        {/* Animated gradient background */}
        <motion.span
          className="font-bold whitespace-nowrap relative z-10"
          style={{
            fontSize: config.fontSize,
            letterSpacing: config.letterSpacing,
            fontWeight: 700,
            fontFamily: "'Space Grotesk', sans-serif",
            background: 'linear-gradient(90deg, #0066ff 0%, #8b5cf6 50%, #0066ff 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative'
          }}
          variants={gradientVariants}
          initial="initial"
          animate="animate"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              initial="initial"
              animate="animate"
              style={{
                display: 'inline-block',
                position: 'relative'
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.span>
        
        {/* Glowing effect on hover */}
        <motion.div
          className="absolute inset-0 blur-xl opacity-0"
          style={{
            background: 'linear-gradient(90deg, #0066ff 0%, #8b5cf6 100%)',
            zIndex: 0
          }}
          whileHover={{
            opacity: 0.3,
            scale: 1.2,
            transition: { duration: 0.3 }
          }}
        />
      </motion.div>
    </Link>
  );
};

export default LunorLogo;

