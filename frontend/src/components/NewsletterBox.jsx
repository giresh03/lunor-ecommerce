import React from 'react';
import { motion } from 'framer-motion';

const NewsletterBox = () => {
    const onSubmitHandler=(event)=>{
        event.preventDefault();
    };
    
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='text-center glass rounded-3xl border border-white/10 p-8 md:p-12 my-16'
    >
        <p className='text-3xl font-bold gradient-text mb-4'>Subscribe now & get 20% off</p>
        <p className='text-white text-lg mt-3 mb-6'>Stay updated with our latest offers and exclusive deals. Join our newsletter today!</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-2/3 lg:w-1/2 flex items-center gap-3 mx-auto glass rounded-full border border-white/20 p-2 pl-6'>
            <input 
              className='w-full sm:flex-1 outline-none bg-transparent text-white placeholder-gray-500' 
              type="email" 
              placeholder='Enter your email' 
              required
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='neon-button text-xs px-8 py-3' 
              type='submit'
            >
              SUBSCRIBE
            </motion.button>
        </form>
    </motion.div>
  );
};

export default NewsletterBox;
