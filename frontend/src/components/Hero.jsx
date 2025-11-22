import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const containerRef = useRef(null);

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
            style={{ minHeight: '100vh', position: 'relative', background: '#000000' }}
        >
            {/* 3D Animated Background */}
            <div ref={containerRef} className='absolute inset-0 w-full h-full z-0 overflow-hidden'>
                {/* Animated Gradient Background */}
                <motion.div
                    className='absolute inset-0 w-full h-full'
                    animate={{
                        background: [
                            'radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 80% 50%, rgba(255, 0, 255, 0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 50% 20%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 50% 80%, rgba(255, 0, 255, 0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />

                {/* Floating 3D Geometric Shapes */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`shape-${i}`}
                        className='absolute'
                        style={{
                            width: `${20 + Math.random() * 60}px`,
                            height: `${20 + Math.random() * 60}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            borderRadius: Math.random() > 0.5 ? '50%' : `${Math.random() * 30}%`,
                            background: i % 2 === 0 
                                ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(0, 255, 255, 0.05))'
                                : 'linear-gradient(135deg, rgba(255, 0, 255, 0.3), rgba(255, 0, 255, 0.05))',
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${i % 2 === 0 ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 255, 0.5)'}`,
                            boxShadow: `0 0 ${20 + Math.random() * 40}px ${i % 2 === 0 ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 255, 0.5)'}`,
                        }}
                        animate={{
                            y: [0, -30 + Math.random() * 60, 0],
                            x: [0, -20 + Math.random() * 40, 0],
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: Math.random() * 2,
                        }}
                    />
                ))}

                {/* 3D Wireframe Grid */}
                <motion.div
                    className='absolute inset-0 w-full h-full'
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                        perspective: '1000px',
                    }}
                    animate={{
                        backgroundPosition: ['0px 0px', '50px 50px'],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />

                {/* Animated Particles/Light Rays */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className='absolute'
                        style={{
                            width: '2px',
                            height: `${100 + Math.random() * 200}px`,
                            left: `${Math.random() * 100}%`,
                            top: '-100px',
                            background: `linear-gradient(to bottom, 
                                transparent, 
                                ${i % 2 === 0 ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 0, 255, 0.8)'}, 
                                transparent)`,
                            borderRadius: '50%',
                            boxShadow: `0 0 ${10 + Math.random() * 20}px ${i % 2 === 0 ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 0, 255, 0.8)'}`,
                            transformOrigin: 'center top',
                        }}
                        animate={{
                            y: [0, window.innerHeight + 200],
                            x: [0, -50 + Math.random() * 100],
                            opacity: [0, 1, 0],
                            rotate: [-5 + Math.random() * 10, -5 + Math.random() * 10],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 3,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: Math.random() * 5,
                        }}
                    />
                ))}

                {/* Large Floating Orbs */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`orb-${i}`}
                        className='absolute rounded-full'
                        style={{
                            width: `${200 + i * 150}px`,
                            height: `${200 + i * 150}px`,
                            left: `${20 + i * 30}%`,
                            top: `${30 + i * 20}%`,
                            background: `radial-gradient(circle, 
                                ${i === 0 ? 'rgba(0, 255, 255, 0.2)' : i === 1 ? 'rgba(255, 0, 255, 0.2)' : 'rgba(0, 255, 255, 0.15)'}, 
                                transparent 70%)`,
                            filter: 'blur(40px)',
                        }}
                        animate={{
                            x: [0, 50 + Math.random() * 100, 0],
                            y: [0, 50 + Math.random() * 100, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 6 + i * 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 2,
                        }}
                    />
                ))}

                {/* 3D Rotating Cubes */}
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={`cube-${i}`}
                        className='absolute'
                        style={{
                            width: '60px',
                            height: '60px',
                            left: `${15 + i * 25}%`,
                            top: `${20 + (i % 2) * 40}%`,
                            transformStyle: 'preserve-3d',
                        }}
                        animate={{
                            rotateX: [0, 360],
                            rotateY: [0, 360],
                            rotateZ: [0, 180],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 1.5,
                        }}
                    >
                        {/* Cube faces */}
                        {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face, faceIdx) => (
                            <motion.div
                                key={face}
                                className='absolute w-full h-full'
                                style={{
                                    background: `linear-gradient(135deg, 
                                        ${i % 2 === 0 ? 'rgba(0, 255, 255, 0.4)' : 'rgba(255, 0, 255, 0.4)'}, 
                                        ${i % 2 === 0 ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 0, 255, 0.1)'})`,
                                    border: `1px solid ${i % 2 === 0 ? 'rgba(0, 255, 255, 0.6)' : 'rgba(255, 0, 255, 0.6)'}`,
                                    transform: face === 'front' ? 'translateZ(30px)' :
                                              face === 'back' ? 'translateZ(-30px) rotateY(180deg)' :
                                              face === 'right' ? 'rotateY(90deg) translateZ(30px)' :
                                              face === 'left' ? 'rotateY(-90deg) translateZ(30px)' :
                                              face === 'top' ? 'rotateX(90deg) translateZ(30px)' :
                                              'rotateX(-90deg) translateZ(30px)',
                                    backdropFilter: 'blur(5px)',
                                    boxShadow: `0 0 ${10}px ${i % 2 === 0 ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 255, 0.5)'}`,
                                }}
                            />
                        ))}
                    </motion.div>
                ))}

                {/* Light overlay for better text readability */}
                <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40 pointer-events-none' />
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