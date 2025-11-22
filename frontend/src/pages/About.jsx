import React from 'react';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    gsap.from('.about-element', {
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
        className='text-2xl text-center pt-8 border-t border-white/10 about-element'
      >
        <Title text1={'ABOUT'} text2={'US'}/>
      </motion.div>
      
      <div className='my-10 flex flex-col md:flex-row gap-16 about-element'>
        <motion.img 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='w-full md:max-w-[450px] glass rounded-2xl border border-white/10' 
          src={assets.about_img} 
          alt="About us" 
        />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-white leading-relaxed about-element'>
          <p className='text-lg'>lunor.ko was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p className='text-lg'>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <b className='text-2xl gradient-text'>Our Mission</b>
          <p className='text-lg'>Our mission at lunor.ko is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>
      
      <div className='text-xl py-4 about-element'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      
      <div className='flex flex-col md:flex-row text-sm mb-20 gap-6 about-element'>
        <motion.div 
          whileHover={{ scale: 1.05, y: -5 }}
          className='flex-1 glass rounded-2xl border border-white/10 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'
        >
          <b className='text-xl gradient-text'>Quality Assurance:</b>
          <p className='text-white text-base leading-relaxed'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05, y: -5 }}
          className='flex-1 glass rounded-2xl border border-white/10 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'
        >
          <b className='text-xl gradient-text'>Convenience:</b>
          <p className='text-white text-base leading-relaxed'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05, y: -5 }}
          className='flex-1 glass rounded-2xl border border-white/10 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'
        >
          <b className='text-xl gradient-text'>Exceptional Customer Service:</b>
          <p className='text-white text-base leading-relaxed'>Our team of dedicated professionals is here to assist you always, ensuring your satisfaction is our top priority.</p>
        </motion.div>
      </div>
      
      <NewsletterBox/>
    </div>
  );
};

export default About;
