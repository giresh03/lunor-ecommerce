import React, { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.from('.form-element', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }
  }, [currentState]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    if (!backendUrl) {
      toast.error('Backend not configured. Please contact administrator.');
      console.error('Backend URL is not set. Set VITE_BACKEND_URL in Vercel environment variables.');
      return;
    }
    
    try{
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password}, {
          timeout: 10000
        })
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Account created successfully!')
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response = await axios.post(backendUrl + '/api/user/login', {email, password}, {
          timeout: 10000
        })
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Logged in successfully!')
        }
        else{
          toast.error(response.data.message)
        }
      }
    }
    catch (error){
      console.log(error);
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
        toast.error('Cannot connect to server. Backend may not be available.');
      } else {
        toast.error(error.response?.data?.message || error.message || 'An error occurred')
      }
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  }, [token, navigate])

  return (
    <div className='min-h-screen flex items-center justify-center py-20 px-4'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full max-w-md'
      >
        <div className='glass rounded-3xl p-8 lg:p-12 border border-white/10 backdrop-blur-xl shadow-2xl'>
          {/* Background gradient */}
          <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-magenta/10 opacity-50' />
          
          <form ref={formRef} onSubmit={onSubmitHandler} className='flex flex-col gap-6 relative z-10'>
            <motion.div 
              className='inline-flex items-center gap-3 mb-4 form-element'
              whileHover={{ scale: 1.05 }}
            >
              <motion.p 
                className='prata-regular text-4xl gradient-text'
                key={currentState}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentState}
              </motion.p>
              <motion.div 
                className='h-[2px] w-12 bg-gradient-to-r from-neon-cyan to-neon-magenta'
                animate={{ width: [0, 48, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <AnimatePresence mode="wait">
              {currentState === 'Sign Up' && (
                <motion.input
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onChange={(e)=>setName(e.target.value)} 
                  value={name} 
                  type="text" 
                  className='form-element w-full px-4 py-3 bg-dark-secondary/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all' 
                  placeholder='Full Name' 
                  required
                />
              )}
            </AnimatePresence>

            <motion.input
              whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
              onChange={(e)=>setEmail(e.target.value)} 
              value={email} 
              type="email" 
              className='form-element w-full px-4 py-3 bg-dark-secondary/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all' 
              placeholder='Email Address' 
              required
            />

            <motion.input
              whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
              onChange={(e)=>setPassword(e.target.value)} 
              value={password} 
              type="password" 
              className='form-element w-full px-4 py-3 bg-dark-secondary/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all' 
              placeholder='Password'
              required
            />

            <div className='w-full flex justify-between text-sm mt-2 form-element'>
              <motion.p 
                className='cursor-pointer text-gray-400 hover:text-neon-cyan transition-colors'
                whileHover={{ x: 5 }}
              >
                Forgot your password?
              </motion.p>
              <motion.p 
                onClick={()=> setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')} 
                className='cursor-pointer text-gray-400 hover:text-neon-magenta transition-colors'
                whileHover={{ x: 5 }}
              >
                {currentState === 'Login' ? 'Create account' : 'Login Here'}
              </motion.p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className='neon-button mt-4 form-element'
              type='submit'
            >
              {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
