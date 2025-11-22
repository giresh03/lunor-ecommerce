import React from 'react';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    gsap.from('.contact-element', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='text-center text-2xl pt-8 border-t border-white/10 contact-element'
      >
        <Title text1={'CONTACT'} text2={'US'}/>
      </motion.div>
      
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 contact-element'>
        <motion.img 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='w-full md:max-w-[480px] glass rounded-2xl border border-white/10' 
          src={assets.contact_img} 
          alt="Contact us" 
        />
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='flex flex-col justify-center items-start gap-6 glass rounded-2xl border border-white/10 p-8'
        >
          <p className='font-bold text-2xl gradient-text'>Our Store</p>
          <p className='text-white text-lg leading-relaxed'>54709 Willms Station <br /> Suite 350, Washington, USA </p>
          <p className='text-white text-lg leading-relaxed'>Tel: 9600089896 <br /> Email: admin@lunor.ko</p>
          <p className='font-bold text-2xl gradient-text mt-4'>Careers at lunor.ko</p>
          <p className='text-white text-lg leading-relaxed'>Learn more about our teams and job openings.</p>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className='neon-button mt-2'
          >
            Explore Jobs
          </motion.button>
        </motion.div>
      </div>
      
      <NewsletterBox/>
    </div>
  );
};

export default Contact;
