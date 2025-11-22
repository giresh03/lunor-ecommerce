import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

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

    // Auto-play video
    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;
            video.muted = isMuted;
            video.play().catch(err => console.log('Video autoplay prevented:', err));
        }
    }, [isMuted]);

    const handleVideoEnd = () => {
        // Loop video
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
        }
    };

    return (
        <motion.div 
            ref={heroRef}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className='relative w-full min-h-screen flex items-center justify-center overflow-hidden'
            style={{ minHeight: '100vh' }}
        >
            {/* Full Screen Background Video */}
            <div className='fixed inset-0 w-full h-full z-0'>
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className='absolute inset-0 w-full h-full'
                >
                    <video
                        ref={videoRef}
                        className='w-full h-full object-cover'
                        src={assets.video2}
                        muted={isMuted}
                        loop
                        playsInline
                        autoPlay
                        onEnded={handleVideoEnd}
                        poster={assets.hero_img}
                        style={{ minHeight: '100vh', minWidth: '100vw' }}
                    />
                    {/* Dark overlay for better text readability */}
                    <div className='absolute inset-0 bg-gradient-to-b from-dark-primary/30 via-dark-primary/20 to-dark-primary/40 pointer-events-none' />
                </motion.div>
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

            {/* Unmute Button - Instagram Style */}
            <motion.button
                onClick={toggleMute}
                className='fixed bottom-6 right-6 z-40 bg-black/40 backdrop-blur-md rounded-full p-3 border border-white/30 hover:border-neon-cyan transition-all group shadow-xl'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isMuted ? (
                    <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className='w-6 h-6 text-white'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z' />
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2' />
                    </motion.svg>
                ) : (
                    <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className='w-6 h-6 text-neon-cyan'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z' />
                    </motion.svg>
                )}
                <span className='absolute -bottom-8 right-0 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
                    {isMuted ? 'Tap to unmute' : 'Tap to mute'}
                </span>
            </motion.button>
        </motion.div>
    );
};

export default Hero;
