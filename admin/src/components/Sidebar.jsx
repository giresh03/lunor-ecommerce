import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect } from 'react';

const Sidebar = () => {
  const location = useLocation();

  useEffect(() => {
    // Ensure sidebar items are visible immediately
    const items = document.querySelectorAll('.sidebar-item');
    items.forEach(item => {
      if(item) {
        item.style.opacity = '1';
        item.style.visibility = 'visible';
        item.style.transform = 'translateX(0)';
      }
    });
    
    gsap.from('.sidebar-item', {
      x: 0,
      opacity: 1,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.out'
    });
  }, []);

  const menuItems = [
    { path: '/add', icon: assets.add_icon, label: 'Add Items', alt: 'Add Items', type: 'image' },
    { path: '/list', icon: assets.order_icon, label: 'List Items', alt: 'List Items', type: 'image' },
    { path: '/order', icon: assets.order_icon, label: 'Orders', alt: 'Orders', type: 'image' },
    { path: '/users', icon: null, label: 'Members', alt: 'Members', type: 'svg' },
  ];

  return (
    <motion.div 
      initial={{ x: 0, opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='w-[20%] min-h-[calc(100vh-120px)] glass border-r-2 rounded-2xl mr-2 backdrop-blur-xl'
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        boxShadow: '4px 0 30px rgba(0, 102, 255, 0.15)'
      }}
    >
      <div className='flex flex-col gap-2 pt-6 px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 px-4"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Menu</h2>
          <div className="h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent" />
        </motion.div>

        <AnimatePresence>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path || (item.path === '/add' && location.pathname === '/');
            
            return (
              <NavLink 
                key={item.path}
                to={item.path}
                className={({ isActive: navActive }) => 
                  `flex items-center gap-4 px-5 py-4 rounded-xl sidebar-item transition-all duration-300 font-semibold text-sm relative overflow-hidden group ${
                    (navActive || (item.path === '/add' && location.pathname === '/'))
                      ? 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 border-2 border-transparent shadow-lg shadow-blue-500/50 scale-105' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border hover:border-blue-200/50 hover:shadow-md'
                  }`
                }
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-xl"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                )}
                
                {item.type === 'svg' ? (
                  <motion.svg
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className='w-5 h-5 relative z-10'
                    fill="none"
                    stroke={isActive ? 'currentColor' : 'currentColor'}
                    viewBox="0 0 24 24"
                    style={{ filter: isActive ? 'brightness(0) invert(1)' : 'none' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </motion.svg>
                ) : (
                  <motion.img 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className='w-5 h-5 relative z-10' 
                    src={item.icon} 
                    alt={item.alt}
                    style={{ filter: isActive ? 'brightness(0) invert(1)' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                  />
                )}
                <p className='relative z-10 font-bold'>{item.label}</p>
              </NavLink>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Sidebar;
