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
    const [videoError, setVideoError] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);

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
        if (videoRef.current && !videoError) {
            const video = videoRef.current;
            video.muted = isMuted;
            
            // Handle video loading and playing
            const handleVideoLoad = () => {
                setVideoLoaded(true);
                video.play().then(() => {
                    setVideoPlaying(true);
                }).catch(err => {
                    console.log('Video autoplay prevented:', err);
                    setVideoError(true);
                });
            };
            
            const handleVideoPlay = () => {
                setVideoPlaying(true);
            };
            
            const handleVideoError = () => {
                console.log('Video failed to load, using poster image');
                setVideoError(true);
                setVideoLoaded(false);
            };
            
            video.addEventListener('loadeddata', handleVideoLoad);
            video.addEventListener('play', handleVideoPlay);
            video.addEventListener('playing', handleVideoPlay);
            video.addEventListener('error', handleVideoError);
            
            // Try to load video
            video.load();
            
            return () => {
                video.removeEventListener('loadeddata', handleVideoLoad);
                video.removeEventListener('play', handleVideoPlay);
                video.removeEventListener('playing', handleVideoPlay);
                video.removeEventListener('error', handleVideoError);
            };
        }
    }, [isMuted, videoError]);

    const handleVideoEnd = () => {
        // Loop video
        if (videoRef.current && !videoError) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(err => {
                console.log('Video play error:', err);
                setVideoError(true);
            });
        }
    };
    
    const handleVideoLoadError = () => {
        console.log('Video failed to load, using poster image instead');
        setVideoError(true);
        setVideoLoaded(false);
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
            style={{ minHeight: '100vh', position: 'relative' }}
        >
            {/* Full Screen Background Image - Only on Home page */}
            <div className='absolute inset-0 w-full h-full z-0'>
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className='absolute inset-0 w-full h-full'
                >
                    {/* Hero Background Image */}
                    <img
                        src={assets.hero_img}
                        alt="Hero background"
                        className='absolute inset-0 w-full h-full object-cover'
                        style={{ 
                            minHeight: '100vh', 
                            minWidth: '100vw',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                        onError={(e) => {
                            console.log('Hero image failed to load');
                            e.target.style.display = 'none';
                        }}
                    />
                    {/* Light overlay for better text readability */}
                    <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30 pointer-events-none' />
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

        </motion.div>
    );
};

export default Hero;
