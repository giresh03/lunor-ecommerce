import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-8 text-center py-20'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className='flex-1 glass rounded-2xl border border-white/10 p-8'
      >
        <motion.img 
          src={assets.exchange_icon} 
          className='w-16 m-auto mb-5 brightness-0 invert opacity-80' 
          alt="Exchange" 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        />
        <p className='font-bold text-xl gradient-text mb-3'>Easy Exchange Policy</p>
        <p className='text-white text-base leading-relaxed'>We offer hassle-free exchange policy</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className='flex-1 glass rounded-2xl border border-white/10 p-8'
      >
        <motion.img 
          src={assets.quality_icon} 
          className='w-16 m-auto mb-5 brightness-0 invert opacity-80' 
          alt="Quality" 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        />
        <p className='font-bold text-xl gradient-text mb-3'>Quality Assurance</p>
        <p className='text-white text-base leading-relaxed'>Premium quality products guaranteed</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className='flex-1 glass rounded-2xl border border-white/10 p-8'
      >
        <motion.img 
          src={assets.support_img} 
          className='w-16 m-auto mb-5 brightness-0 invert opacity-80' 
          alt="Support" 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        />
        <p className='font-bold text-xl gradient-text mb-3'>24/7 Support</p>
        <p className='text-white text-base leading-relaxed'>Round-the-clock customer support</p>
      </motion.div>
    </div>
  );
};

export default OurPolicy;
