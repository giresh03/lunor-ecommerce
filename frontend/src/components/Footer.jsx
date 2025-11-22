import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LunorLogo from './LunorLogo';

const Footer = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='mt-40 mb-10'
    >
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 glass rounded-3xl p-8 lg:p-12 border border-white/10 backdrop-blur-xl'>
        {/* Logo and Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className='mb-5'>
            <LunorLogo size="large" />
          </div>
          <p className='w-full md:w-2/3 text-gray-400 leading-relaxed'>
            Your premier destination for fashion-forward styles. We bring you the latest 
            trends with quality that lasts. Discover your perfect look with us.
          </p>
        </motion.div>

        {/* Company Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className='text-xl font-bold mb-5 gradient-text'>COMPANY</p>
          <ul className='flex flex-col gap-3 text-gray-400'>
            <motion.li 
              whileHover={{ x: 5, color: '#00ffff' }}
              className='cursor-pointer transition-colors'
            >
              <Link to="/">Home</Link>
            </motion.li>
            <motion.li 
              whileHover={{ x: 5, color: '#00ffff' }}
              className='cursor-pointer transition-colors'
            >
              <Link to="/about">About us</Link>
            </motion.li>
            <motion.li 
              whileHover={{ x: 5, color: '#00ffff' }}
              className='cursor-pointer transition-colors'
            >
              Delivery
            </motion.li>
            <motion.li 
              whileHover={{ x: 5, color: '#00ffff' }}
              className='cursor-pointer transition-colors'
            >
              Privacy Policy
            </motion.li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className='text-xl font-bold mb-5 gradient-text'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-3 text-gray-400'>
            <motion.li 
              whileHover={{ x: 5, color: '#00ffff' }}
              className='cursor-pointer transition-colors'
            >
              9600089896
            </motion.li>
            <motion.li 
              whileHover={{ x: 5, color: '#00ffff' }}
              className='cursor-pointer transition-colors'
            >
              info@company.com
            </motion.li>
          </ul>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className='text-center'
      >
        <div className='h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent mb-5' />
        <p className='text-sm text-gray-500'>
          Copyright 2024@ lunor.ko - All rights reserved.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
