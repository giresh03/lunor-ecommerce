import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Users = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllUsers = async () => {
    if (!token) return;

    // Check if backendUrl is set
    if (!backendUrl) {
      toast.error('Backend URL is not configured. Please check your environment variables.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${backendUrl}/api/user/all`,
        { headers: { token } }
      );
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      console.error('Backend URL:', backendUrl);
      console.error('Full URL:', `${backendUrl}/api/user/all`);
      
      if (error.response) {
        // Server responded with error status
        toast.error(error.response?.data?.message || `Failed to fetch users: ${error.response.status}`);
      } else if (error.request) {
        // Request made but no response
        toast.error('Cannot connect to backend. Please check if the backend server is running.');
      } else {
        // Error in request setup
        toast.error(error.message || 'Failed to fetch users');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    if(users.length > 0){
      const items = document.querySelectorAll('.user-item');
      items.forEach(item => {
        if(item) {
          item.style.opacity = '1';
          item.style.visibility = 'visible';
        }
      });
      
      gsap.from('.user-item', {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out'
      });
    }
  }, [token]);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-gray-900'
      >
        <div className="mb-8">
          <h3 className='text-3xl font-bold gradient-text mb-2'>Members Management</h3>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>
        <div className='glass rounded-3xl border border-white/50 p-16 text-center shadow-xl'>
          <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600 text-lg'>Loading members...</p>
        </div>
      </motion.div>
    );
  }

  if(users.length === 0){
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-gray-900'
      >
        <div className="mb-8">
          <h3 className='text-3xl font-bold gradient-text mb-2'>Members Management</h3>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>
        <div className='glass rounded-3xl border border-white/50 p-16 text-center shadow-xl'>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p className='text-2xl font-bold text-gray-900 mb-3'>No members yet</p>
          <p className='text-gray-600 text-lg'>Registered members will appear here.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='text-gray-900' 
      style={{ 
        position: 'relative', 
        zIndex: 10, 
        minHeight: '500px',
        opacity: 1,
        visibility: 'visible',
        backgroundColor: 'transparent'
      }}
    >
      <div className="mb-8">
        <h3 className='text-3xl font-bold gradient-text mb-2'>Members Management</h3>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4" />
        <p className="text-sm text-gray-600">
          Total Members: <span className="font-bold text-blue-600">{users.length}</span>
        </p>
      </div>
      
      <div className='space-y-5'>
        {/* Header Row - Desktop Only */}
        <div className='hidden md:grid grid-cols-[0.5fr_2fr_2fr_1fr_0.5fr] items-center py-4 px-6 glass rounded-2xl border border-white/50 text-sm font-bold text-gray-900 shadow-lg'>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Avatar
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Name
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Joined Date
          </div>
          <div className="text-center">ID</div>
        </div>

        {/* Users List */}
        {users.map((user, index) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.3 }}
            className="user-item glass rounded-3xl border border-white/50 p-6 my-4 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_2fr_1fr_0.5fr] gap-4 md:gap-6 items-center">
              {/* Avatar */}
              <div className='flex items-center justify-center md:justify-start'>
                <div className='glass rounded-full overflow-hidden border-2 border-gray-200 w-16 h-16 flex items-center justify-center shadow-lg group-hover:border-blue-500 transition-all'>
                  <div className='w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                    <span className='text-white text-xl font-bold'>
                      {getInitials(user.name)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Name */}
              <div>
                <p className="text-lg font-bold text-gray-900 mb-1">
                  {user.name || 'N/A'}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Member</p>
              </div>
              
              {/* Email */}
              <div>
                <p className="text-base font-semibold text-gray-700 break-all">
                  {user.email || 'N/A'}
                </p>
              </div>
              
              {/* Joined Date */}
              <div className='bg-gray-50 rounded-xl p-3 border border-gray-200'>
                <p className="text-sm font-semibold text-gray-900">
                  {formatDate(user.createdAt)}
                </p>
              </div>
              
              {/* User ID */}
              <div className='hidden md:flex flex-col items-center justify-center'>
                <div className='px-3 py-2 rounded-lg border-2 border-blue-500/50 text-blue-600 text-xs font-bold bg-blue-50'>
                  #{user._id.toString().slice(-6).toUpperCase()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Users;

