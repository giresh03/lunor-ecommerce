import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import axios from 'axios';

const Profile = () => {
  const { backendUrl, token, navigate } = useContext(ShopContext);
  const [userData, setUserData] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // Animate elements on mount
    gsap.from('.profile-element', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // Fetch user data
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${backendUrl}/api/user/getUserData`,
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch order count
    const fetchOrderCount = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/order/userOrders`,
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          setOrderCount(response.data.orders.length);
        }
      } catch (error) {
        console.error('Error fetching order count:', error);
      }
    };

    fetchUserData();
    fetchOrderCount();
  }, [token, navigate, backendUrl]);

  if (!token) {
    return null;
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-400'>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='text-center text-2xl pt-8 border-t border-white/10 profile-element'
      >
        <Title text1={'MY'} text2={'PROFILE'} />
      </motion.div>

      <div className='my-10 flex flex-col lg:flex-row gap-8 profile-element'>
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='w-full lg:w-1/3 glass rounded-2xl border border-white/10 p-8'
        >
          <div className='flex flex-col items-center text-center'>
            {/* Profile Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='w-32 h-32 rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta p-1 mb-6'
            >
              <div className='w-full h-full rounded-full bg-dark-secondary flex items-center justify-center'>
                <span className='text-4xl font-bold gradient-text'>
                  {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            </motion.div>

            <h2 className='text-2xl font-bold text-white mb-2'>
              {userData?.name || 'User'}
            </h2>
            <p className='text-gray-400 mb-6'>
              {userData?.email || 'user@example.com'}
            </p>

            {/* Quick Stats */}
            <div className='w-full grid grid-cols-2 gap-4 mt-6'>
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className='glass rounded-xl border border-white/10 p-4 cursor-pointer'
                onClick={() => navigate('/orders')}
              >
                <p className='text-2xl font-bold gradient-text mb-1'>{orderCount}</p>
                <p className='text-sm text-gray-400'>Total Orders</p>
              </motion.div>
              <div className='glass rounded-xl border border-white/10 p-4'>
                <p className='text-2xl font-bold gradient-text mb-1'>0</p>
                <p className='text-sm text-gray-400'>Wishlist</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='flex-1 glass rounded-2xl border border-white/10 p-8 profile-element'
        >
          <h3 className='text-xl font-bold gradient-text mb-6'>Account Information</h3>
          
          <div className='space-y-6'>
            <div>
              <label className='text-sm text-gray-400 mb-2 block'>Full Name</label>
              <div className='glass rounded-lg border border-white/10 p-4 text-white'>
                {userData?.name || 'Not available'}
              </div>
            </div>

            <div>
              <label className='text-sm text-gray-400 mb-2 block'>Email Address</label>
              <div className='glass rounded-lg border border-white/10 p-4 text-white'>
                {userData?.email || 'Not available'}
              </div>
            </div>

            <div>
              <label className='text-sm text-gray-400 mb-2 block'>Member Since</label>
              <div className='glass rounded-lg border border-white/10 p-4 text-white'>
                {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Not available'}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='mt-8 flex flex-col sm:flex-row gap-4'>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/orders')}
              className='neon-button flex-1'
            >
              View My Orders
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-6 py-3 rounded-lg border-2 border-white/20 hover:border-neon-cyan text-white transition-colors flex-1'
            >
              Edit Profile
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='glass rounded-2xl border border-white/10 p-8 mb-20 profile-element'
      >
        <h3 className='text-xl font-bold gradient-text mb-6'>Recent Activity</h3>
        <div className='text-center py-12 text-gray-400'>
          <p>No recent activity to display</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/collection')}
            className='neon-button mt-4'
          >
            Start Shopping
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;

