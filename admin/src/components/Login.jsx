import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Login = ({setToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            // Ensure login elements are visible immediately
            const elements = document.querySelectorAll('.login-element');
            elements.forEach(el => {
              if(el) {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
              }
            });
            
            gsap.from('.login-element', {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.out'
            });
        }
    }, []);

    const onSubmitHandler = async (e) => {
        try{
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', {email, password})
            if(response.data.success){
                setToken(response.data.token);
                toast.success('Login successful!');
            }
            else{
                toast.error(response.data.message)
            }
        }
        catch (error){
            console.log(error);
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full relative z-10 px-4 overflow-hidden bg-white'>
            
            <motion.div
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className='glass rounded-3xl px-10 py-12 max-w-md w-full border border-white/50 backdrop-blur-xl shadow-2xl relative z-10'
                style={{
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                }}
            >
                {/* Decorative gradient overlay */}
                <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-100/30 via-transparent to-purple-100/30 opacity-60 pointer-events-none' />
                
                <form ref={formRef} onSubmit={onSubmitHandler} className='relative z-10'>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className='text-center mb-8'
                    >
                        <h1 className='text-4xl font-bold mb-2 gradient-text login-element'>
                            Welcome Back
                        </h1>
                        <p className='text-sm text-gray-600 font-medium'>Sign in to your admin account</p>
                    </motion.div>
                    
                    <div className='mb-5 login-element'>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Email Address
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.02, borderColor: '#0066ff' }}
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className='rounded-xl w-full px-4 py-3.5 bg-white/80 border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm' 
                            type="email" 
                            placeholder='admin@example.com' 
                            required
                        />
                    </div>
                    
                    <div className='mb-7 login-element'>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Password
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.02, borderColor: '#0066ff' }}
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            className='rounded-xl w-full px-4 py-3.5 bg-white/80 border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm' 
                            type="password" 
                            placeholder='Enter your password' 
                            required 
                        />
                    </div>
                    
                    <motion.button
                        whileHover={{ 
                            scale: 1.02, 
                            boxShadow: '0 0 40px rgba(0, 102, 255, 0.5)' 
                        }}
                        whileTap={{ scale: 0.98 }}
                        className='neon-button w-full py-4 text-base font-semibold login-element relative overflow-hidden group' 
                        type='submit'
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Sign In
                            <motion.svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                initial={{ x: -10, opacity: 0 }}
                                whileHover={{ x: 0, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </motion.svg>
                        </span>
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
