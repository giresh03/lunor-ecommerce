import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        // GSAP animations - ensure content is visible
        if (titleRef.current) {
            gsap.from(titleRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                delay: 0.3
            });
        }

        // Set initial opacity to ensure visibility
        setTimeout(() => {
            const heroTexts = document.querySelectorAll('.hero-text');
            heroTexts.forEach(el => {
                if (el) {
                    gsap.to(el, {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                }
            });
        }, 100);
    }, []);

    return (
        <motion.div 
            ref={heroRef}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='relative w-full min-h-screen flex items-center justify-center overflow-hidden'
            style={{ minHeight: '100vh', position: 'relative' }}
        >
            {/* Modern Gradient Background - CSS only, no animations */}
            <div className='absolute inset-0 w-full h-full z-0'>
                {/* Base gradient */}
                <div 
                    className='absolute inset-0 w-full h-full'
                    style={{
                        background: `
                            radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.08) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, rgba(255, 0, 255, 0.08) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 1) 100%)
                        `,
                    }}
                />
                
                {/* Subtle grid pattern - static */}
                <div 
                    className='absolute inset-0 w-full h-full opacity-30'
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '100px 100px',
                    }}
                />
                
                {/* Modern accent lines - static design */}
                <div className='absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent' />
                <div className='absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-magenta-500/20 to-transparent' />
                
                {/* Subtle corner accents */}
                <div 
                    className='absolute top-0 right-0 w-96 h-96'
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        opacity: 0.5
                    }}
                />
                <div 
                    className='absolute bottom-0 left-0 w-96 h-96'
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 0, 255, 0.1) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        opacity: 0.5
                    }}
                />
            </div>

            {/* Content Overlay */}
            <div className='relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 mt-24 sm:mt-28 md:mt-32'>
                <div className='flex flex-col items-center justify-center text-center'>
                    <motion.div 
                        className='flex items-center gap-2 mb-4 hero-text'
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div 
                            className='w-8 md:w-11 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-magenta'
                            animate={{ width: ['2rem', '3rem', '2rem'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <p className='font-medium text-sm md:text-base text-white tracking-wider drop-shadow-lg' style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
                            TRENDING NOW
                        </p>
                    </motion.div>
                    
                    <motion.h1 
                        ref={titleRef}
                        className='prata-regular text-5xl sm:text-6xl lg:text-8xl leading-tight mb-6 text-white drop-shadow-2xl'
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)' }}
                    >
                        Latest Arrivals
                    </motion.h1>
                    
                    <motion.p 
                        className='text-white text-lg sm:text-xl mb-8 hero-text max-w-2xl drop-shadow-lg'
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}
                    >
                        Discover our premium collection of fashion-forward designs. 
                        Quality meets style in every piece.
                    </motion.p>
                    
                    <motion.div 
                        className='flex items-center gap-4 hero-text'
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                    >
                        <Link to="/collection">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                className='neon-button px-8 py-4 text-base font-semibold'
                            >
                                SHOP NOW
                            </motion.button>
                        </Link>
                        <motion.div 
                            className='w-8 md:w-11 h-[1px] bg-gradient-to-r from-neon-cyan to-neon-magenta'
                            animate={{ scaleX: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Hero;
