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
              className='flex items-center gap-2 transition-colors'
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:8309815563" className="hover:text-neon-cyan transition-colors">8309815563</a>
            </motion.li>
            <motion.li 
              whileHover={{ x: 5, color: '#00ffff' }}
              className='flex items-center gap-2 transition-colors'
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:luno.ko@gmail.com" className="hover:text-neon-cyan transition-colors">luno.ko@gmail.com</a>
            </motion.li>
            <motion.li 
              whileHover={{ x: 5, color: '#00ffff' }}
              className='flex items-center gap-2 transition-colors'
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Chennai, Vandalur</span>
            </motion.li>
          </ul>
          
          {/* Social Media - Instagram */}
          <div className='mt-6'>
            <p className='text-sm font-semibold mb-3 text-gray-300'>FOLLOW US</p>
            <motion.a
              href="https://www.instagram.com/lunor.ko?igsh=YWJiMHA3bTI1bGNj"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className='inline-flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors group'
            >
              <svg 
                className="w-6 h-6 transition-transform group-hover:rotate-12" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className='text-sm font-medium'>@lunor.ko</span>
            </motion.a>
          </div>
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
