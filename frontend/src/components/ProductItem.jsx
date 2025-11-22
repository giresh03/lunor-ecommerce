import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductItem = ({ id, image, name, price, sizes, index = 0 }) => {
  const { currency } = useContext(ShopContext);
  const productImage = Array.isArray(image) && image.length > 0 ? image[0] : "placeholder.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link className='block text-gray-300 cursor-pointer' to={id ? `/product/${id}` : '#'}>
        <motion.div 
          className='overflow-hidden rounded-3xl glass border border-white/20 backdrop-blur-xl relative h-full'
          whileHover={{ y: -12, scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Animated gradient border on hover */}
          <motion.div 
            className='absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10'
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2))',
              filter: 'blur(20px)',
              transform: 'scale(1.1)'
            }}
          />
          
          {/* Image container with enhanced styling */}
          <div className='relative overflow-hidden rounded-t-3xl aspect-[4/5] bg-gradient-to-br from-gray-900/50 to-gray-800/50'>
            {/* Shimmer effect overlay */}
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10' />
            
            <motion.img 
              className='w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out' 
              src={productImage} 
              alt={name || "Product"}
              loading="lazy"
            />
            
            {/* Gradient overlay at bottom for text readability */}
            <div className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
            
            {/* Quick view indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className='absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            >
              <div className='bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20'>
                <span className='text-xs font-semibold text-white'>View</span>
              </div>
            </motion.div>
          </div>
          
          {/* Product info with enhanced styling */}
          <div className='p-6 relative z-10 bg-gradient-to-b from-transparent to-dark-primary/30'>
            <motion.h3 
              className='text-lg font-bold text-white group-hover:text-neon-cyan transition-colors duration-300 mb-2 line-clamp-2 min-h-[3.5rem]'
              whileHover={{ x: 3 }}
            >
              {name || "No Name"}
            </motion.h3>
            
            <div className='flex items-center justify-between mt-4 pt-4 border-t border-white/10'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className='flex items-baseline gap-1'
              >
                <span className='text-xs text-gray-400 font-medium'>{currency}</span>
                <span className='text-2xl font-extrabold gradient-text tracking-tight'>
                  {price || "0"}
                </span>
              </motion.div>
              
              {/* Arrow indicator */}
              <motion.div
                className='w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 border border-neon-cyan/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                whileHover={{ scale: 1.1, rotate: -45 }}
              >
                <svg className='w-4 h-4 text-neon-cyan' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </motion.div>
            </div>
          </div>
          
          {/* Enhanced glow effect */}
          <motion.div 
            className='absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
            style={{
              boxShadow: '0 0 40px rgba(0, 255, 255, 0.4), 0 0 80px rgba(255, 0, 255, 0.3), inset 0 0 60px rgba(0, 255, 255, 0.1)'
            }}
          />
          
          {/* Corner accent */}
          <div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-neon-cyan/0 to-neon-magenta/0 group-hover:from-neon-cyan/10 group-hover:to-neon-magenta/10 transition-all duration-500 rounded-bl-full opacity-0 group-hover:opacity-100' />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductItem;
