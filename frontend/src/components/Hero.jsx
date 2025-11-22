import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const containerRef = useRef(null);

    // Generate stable random values for animations
    const shapeData = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
        id: i,
        size: 20 + (i % 7) * 8,
        left: (i * 7.3) % 100,
        top: (i * 11.7) % 100,
        isRound: i % 2 === 0,
        borderRadius: i % 2 === 0 ? 50 : 10 + (i % 5) * 4,
        isCyan: i % 2 === 0,
        yRange: -20 + (i % 5) * 10,
        xRange: -15 + (i % 4) * 8,
        duration: 4 + (i % 4),
        delay: (i * 0.3) % 2,
    })), []);

    const particleData = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: (i * 12.5) % 100,
        height: 120 + (i % 5) * 40,
        isCyan: i % 2 === 0,
        xOffset: -30 + (i % 7) * 10,
        duration: 3 + (i % 4),
        delay: (i * 0.6) % 5,
        rotate: -3 + (i % 7) * 2,
    })), []);

    const orbData = useMemo(() => [
        { size: 200, left: 20, top: 30, isCyan: true, delay: 0 },
        { size: 350, left: 50, top: 50, isCyan: false, delay: 2 },
        { size: 300, left: 80, top: 20, isCyan: true, delay: 4 },
    ], []);

    const cubeData = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
        id: i,
        left: 15 + i * 25,
        top: 20 + (i % 2) * 40,
        isCyan: i % 2 === 0,
        duration: 8 + i * 2,
        delay: i * 1.5,
    })), []);

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
                {shapeData.map((shape) => (
                    <motion.div
                        key={`shape-${shape.id}`}
                        className='absolute'
                        style={{
                            width: `${shape.size}px`,
                            height: `${shape.size}px`,
                            left: `${shape.left}%`,
                            top: `${shape.top}%`,
                            borderRadius: shape.isRound ? '50%' : `${shape.borderRadius}%`,
                            background: shape.isCyan
                                ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(0, 255, 255, 0.05))'
                                : 'linear-gradient(135deg, rgba(255, 0, 255, 0.3), rgba(255, 0, 255, 0.05))',
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${shape.isCyan ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 255, 0.5)'}`,
                            boxShadow: `0 0 ${20 + shape.id * 3}px ${shape.isCyan ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 255, 0.5)'}`,
                        }}
                        animate={{
                            y: [0, shape.yRange, 0],
                            x: [0, shape.xRange, 0],
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: shape.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: shape.delay,
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
                {particleData.map((particle) => (
                    <motion.div
                        key={`particle-${particle.id}`}
                        className='absolute'
                        style={{
                            width: '2px',
                            height: `${particle.height}px`,
                            left: `${particle.left}%`,
                            top: '-100px',
                            background: `linear-gradient(to bottom, 
                                transparent, 
                                ${particle.isCyan ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 0, 255, 0.8)'}, 
                                transparent)`,
                            borderRadius: '50%',
                            boxShadow: `0 0 ${15 + particle.id * 2}px ${particle.isCyan ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 0, 255, 0.8)'}`,
                            transformOrigin: 'center top',
                        }}
                        animate={{
                            y: [0, typeof window !== 'undefined' ? window.innerHeight + 200 : 1000],
                            x: [0, particle.xOffset],
                            opacity: [0, 1, 0],
                            rotate: [-3 + particle.rotate, particle.rotate],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: particle.delay,
                        }}
                    />
                ))}

                {/* Large Floating Orbs */}
                {orbData.map((orb, i) => (
                    <motion.div
                        key={`orb-${i}`}
                        className='absolute rounded-full'
                        style={{
                            width: `${orb.size}px`,
                            height: `${orb.size}px`,
                            left: `${orb.left}%`,
                            top: `${orb.top}%`,
                            background: `radial-gradient(circle, 
                                ${orb.isCyan ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 0, 255, 0.2)'}, 
                                transparent 70%)`,
                            filter: 'blur(40px)',
                        }}
                        animate={{
                            x: [0, 30 + i * 20, 0],
                            y: [0, 40 + i * 15, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 6 + i * 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: orb.delay,
                        }}
                    />
                ))}

                {/* 3D Rotating Cubes */}
                {cubeData.map((cube) => (
                    <motion.div
                        key={`cube-${cube.id}`}
                        className='absolute'
                        style={{
                            width: '60px',
                            height: '60px',
                            left: `${cube.left}%`,
                            top: `${cube.top}%`,
                            transformStyle: 'preserve-3d',
                        }}
                        animate={{
                            rotateX: [0, 360],
                            rotateY: [0, 360],
                            rotateZ: [0, 180],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: cube.duration,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: cube.delay,
                        }}
                    >
                        {/* Cube faces */}
                        {[
                            { name: 'front', transform: 'translateZ(30px)' },
                            { name: 'back', transform: 'translateZ(-30px) rotateY(180deg)' },
                            { name: 'right', transform: 'rotateY(90deg) translateZ(30px)' },
                            { name: 'left', transform: 'rotateY(-90deg) translateZ(30px)' },
                            { name: 'top', transform: 'rotateX(90deg) translateZ(30px)' },
                            { name: 'bottom', transform: 'rotateX(-90deg) translateZ(30px)' },
                        ].map((face) => (
                            <motion.div
                                key={face.name}
                                className='absolute w-full h-full'
                                style={{
                                    background: `linear-gradient(135deg, 
                                        ${cube.isCyan ? 'rgba(0, 255, 255, 0.4)' : 'rgba(255, 0, 255, 0.4)'}, 
                                        ${cube.isCyan ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 0, 255, 0.1)'})`,
                                    border: `1px solid ${cube.isCyan ? 'rgba(0, 255, 255, 0.6)' : 'rgba(255, 0, 255, 0.6)'}`,
                                    transform: face.transform,
                                    backdropFilter: 'blur(5px)',
                                    boxShadow: `0 0 10px ${cube.isCyan ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 255, 0.5)'}`,
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