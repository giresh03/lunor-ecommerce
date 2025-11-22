import React, { useContext, useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import LunorLogo from './LunorLogo';

const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    const profileButtonRef = useRef(null);
    const profileNavRef = useRef(null);
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);
    
    useEffect(() => {
        // Ensure navbar elements are visible
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item) {
                item.style.opacity = '1';
                item.style.visibility = 'visible';
            }
        });
        
        // Animate navbar on mount (but ensure visibility)
        gsap.from('.nav-item', {
            y: -20,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }, []);

    // Close profile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showProfileMenu && !event.target.closest('.profile-menu-container')) {
                setShowProfileMenu(false);
            }
            if (showProfileDropdown && !event.target.closest('.profile-nav-container')) {
                setShowProfileDropdown(false);
            }
        };

        if (showProfileMenu || showProfileDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [showProfileMenu, showProfileDropdown]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show navbar at the top of the page
            if (currentScrollY < 10) {
                setIsScrollingDown(false);
                setLastScrollY(currentScrollY);
                return;
            }
            
            // Determine scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide navbar
                setIsScrollingDown(true);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up - show navbar
                setIsScrollingDown(false);
            }
            
            setLastScrollY(currentScrollY);
        };

        // Throttle scroll events for better performance
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [lastScrollY]);

    const logout = () => {
      navigate('/login')
      localStorage.removeItem('token')
      setToken('')
      setCartItems({})
    }
    
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ 
        y: isScrollingDown ? -120 : 0, 
        opacity: 1 
      }}
      transition={{ 
        duration: 0.3, 
        ease: [0.23, 1, 0.32, 1]
      }}
      className="fixed top-3 sm:top-4 md:top-6 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[92%] max-w-[1400px] z-[100] flex items-center justify-between py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 lg:px-6"
        style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
        opacity: 1,
        visibility: 'visible',
        overflow: 'visible',
        maxWidth: '100%'
      }}
    >
      {/* Logo - Left aligned */}
      <div className="nav-item flex-shrink-0 z-10" style={{ opacity: 1, visibility: 'visible' }}>
        <LunorLogo size="small" className="whitespace-nowrap" />
      </div>

      {/* Navigation Links - Centered */}
      <div className="hidden md:flex items-center gap-0.5 text-sm flex-1 justify-center min-w-0 px-4" style={{ opacity: 1, visibility: 'visible', overflow: 'visible', flexShrink: 1 }}>
        <ul className="flex items-center gap-0.5 text-sm flex-shrink-0 whitespace-nowrap" style={{ opacity: 1, visibility: 'visible', listStyle: 'none', padding: 0, margin: 0 }}>
        <li className="nav-item" style={{ opacity: 1, visibility: 'visible' }}>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `relative px-3 py-2 rounded-lg transition-all duration-300 font-medium text-xs ${
                isActive 
                  ? 'text-white bg-white/10' 
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative z-10 tracking-wide">HOME</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-lg border border-white/20"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </>
            )}
          </NavLink>
        </li>
        <li className="nav-item" style={{ opacity: 1, visibility: 'visible' }}>
          <NavLink 
            to="/collection" 
            className={({ isActive }) => 
              `relative px-3 py-2 rounded-lg transition-all duration-300 font-medium text-xs ${
                isActive 
                  ? 'text-white bg-white/10' 
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative z-10 tracking-wide">COLLECTION</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-lg border border-white/20"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </>
            )}
          </NavLink>
        </li>
        <li className="nav-item" style={{ opacity: 1, visibility: 'visible' }}>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `relative px-3 py-2 rounded-lg transition-all duration-300 font-medium text-xs ${
                isActive 
                  ? 'text-white bg-white/10' 
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative z-10 tracking-wide">ABOUT</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-lg border border-white/20"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </>
            )}
          </NavLink>
        </li>
        <li className="nav-item" style={{ opacity: 1, visibility: 'visible' }}>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `relative px-3 py-2 rounded-lg transition-all duration-300 font-medium text-xs ${
                isActive 
                  ? 'text-white bg-white/10' 
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative z-10 tracking-wide">CONTACT</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-lg border border-white/20"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </>
            )}
          </NavLink>
        </li>
        <li className="nav-item" style={{ opacity: 1, visibility: 'visible' }}>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => 
              `relative px-3 py-2 rounded-lg transition-all duration-300 font-medium text-xs ${
                isActive 
                  ? 'text-white bg-white/10' 
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative z-10 tracking-wide flex items-center gap-2 justify-center">
                  CART
                  {getCartCount() > 0 && (
                    <span className="w-5 h-5 flex items-center justify-center bg-gradient-to-r from-neon-cyan to-neon-magenta text-white rounded-full text-[9px] font-bold leading-none" style={{ lineHeight: '20px', paddingTop: '1px' }}>
                      {getCartCount()}
                    </span>
                  )}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-lg border border-white/20"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </>
            )}
          </NavLink>
        </li>
        <li className="nav-item profile-nav-container relative" style={{ opacity: 1, visibility: 'visible' }} ref={profileNavRef}>
          <div
            className="relative px-3 py-2 rounded-lg transition-all duration-300 font-medium text-xs text-white/80 hover:text-white cursor-pointer"
            onClick={() => {
              if (token) {
                setShowProfileDropdown(!showProfileDropdown);
              } else {
                navigate('/login');
              }
            }}
            onMouseEnter={() => {
              if (token) {
                setShowProfileDropdown(true);
              }
            }}
            onMouseLeave={() => {
              // Don't close on mouse leave, let click outside handle it
            }}
          >
            <span className="relative z-10 tracking-wide flex items-center gap-1">
              PROFILE
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            {showProfileDropdown && token && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-xl rounded-xl border border-white/30 shadow-2xl z-50"
                style={{ 
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(0, 0, 0, 0.98)'
                }}
                onMouseEnter={() => setShowProfileDropdown(true)}
                onMouseLeave={() => setShowProfileDropdown(false)}
              >
                <div className="flex flex-col gap-1 py-2">
                  <p 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/profile');
                      setShowProfileDropdown(false);
                    }} 
                    className="cursor-pointer px-4 py-2.5 text-sm text-white hover:text-cyan-400 hover:bg-white/10 transition-colors rounded-lg mx-1 flex items-center gap-2 font-medium"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </p>
                  <p 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/orders');
                      setShowProfileDropdown(false);
                    }} 
                    className="cursor-pointer px-4 py-2.5 text-sm text-white hover:text-cyan-400 hover:bg-white/10 transition-colors rounded-lg mx-1 flex items-center gap-2 font-medium"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    My Orders
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </li>
        </ul>
      </div>
      
      {/* Icons - Right aligned */}
      <div className="hidden md:flex items-center gap-1.5 nav-item flex-shrink-0 z-10" style={{ opacity: 1, visibility: 'visible', display: 'flex !important', alignItems: 'center', flexShrink: 0, position: 'relative', zIndex: 100, width: 'auto', minWidth: 'auto' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSearch(true)} 
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200 touch-manipulation"
          style={{ 
            opacity: 1, 
            visibility: 'visible', 
            minWidth: '32px', 
            minHeight: '32px',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <img 
          src={assets.search_icon} 
            className="w-4 h-4 sm:w-5 sm:h-5 brightness-0 invert" 
          alt="Search" 
            style={{ opacity: 1, filter: 'brightness(0) invert(1)', display: 'block' }}
          />
        </motion.button>

        <div 
          className="relative profile-menu-container" 
          style={{ 
            position: 'relative', 
            zIndex: 1000,
            overflow: 'visible',
            display: 'block',
            visibility: 'visible',
            opacity: 1
          }}
        >
          <motion.button
            ref={profileButtonRef}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              if (token) {
                if (profileButtonRef.current) {
                  const rect = profileButtonRef.current.getBoundingClientRect();
                  setMenuPosition({
                    top: rect.bottom + window.scrollY + 12,
                    right: window.innerWidth - rect.right
                  });
                }
                setShowProfileMenu(!showProfileMenu);
              } else {
                navigate('/login');
              }
            }} 
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200 touch-manipulation relative"
            style={{ 
              opacity: 1, 
              visibility: 'visible', 
              minWidth: '32px', 
              minHeight: '32px',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              WebkitTapHighlightColor: 'transparent',
              position: 'relative',
              zIndex: 1001,
              overflow: 'visible',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            {assets.profile_icon ? (
              <img 
            src={assets.profile_icon} 
                className="w-4 h-4 sm:w-5 sm:h-5 brightness-0 invert" 
            alt="Profile" 
                style={{ opacity: 1, filter: 'brightness(0) invert(1)', display: 'block', width: '20px', height: '20px', pointerEvents: 'none' }}
              />
            ) : (
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5" 
                fill="none" 
                stroke="white" 
                viewBox="0 0 24 24"
                style={{ opacity: 1, display: 'block', width: '20px', height: '20px', pointerEvents: 'none' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
            {showProfileMenu && token && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-black/90 animate-pulse" style={{ zIndex: 1002 }}></div>
            )}
          </motion.button>
          {token && showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-[9998]" 
                onClick={() => setShowProfileMenu(false)}
                style={{ backgroundColor: 'transparent' }}
              />
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{ 
                  position: 'fixed',
                  top: `${menuPosition.top}px`,
                  right: `${menuPosition.right}px`,
                  zIndex: 9999,
                  opacity: 1,
                  visibility: 'visible',
                  display: 'block',
                  pointerEvents: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div 
                  className="flex flex-col gap-1 w-48 py-2 bg-black backdrop-blur-xl rounded-xl border border-white/30 shadow-2xl" 
                  style={{ 
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(0, 0, 0, 0.98)'
                  }}
                >
                  <p 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/profile');
                      setShowProfileMenu(false);
                    }} 
                    className="cursor-pointer px-4 py-2.5 text-sm text-white hover:text-cyan-400 hover:bg-white/10 transition-colors rounded-lg mx-1 flex items-center gap-2 font-medium"
                    style={{ opacity: 1, visibility: 'visible' }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </p>
                  <p 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/orders');
                      setShowProfileMenu(false);
                    }} 
                    className="cursor-pointer px-4 py-2.5 text-sm text-white hover:text-cyan-400 hover:bg-white/10 transition-colors rounded-lg mx-1 flex items-center gap-2 font-medium"
                    style={{ opacity: 1, visibility: 'visible' }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    My Orders
                  </p>
                  <div className="h-px bg-white/20 my-1 mx-2" />
                  <p 
                    onClick={(e) => {
                      e.stopPropagation();
                      logout();
                      setShowProfileMenu(false);
                    }} 
                    className="cursor-pointer px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors rounded-lg mx-1 flex items-center gap-2 font-medium"
                    style={{ opacity: 1, visibility: 'visible' }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </p>
                </div>
              </motion.div>
            </>
            )}
        </div>

        <Link 
          to="/cart" 
          className="relative flex items-center justify-center touch-manipulation"
          style={{ 
            opacity: 1, 
            visibility: 'visible', 
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 hover:from-neon-cyan/30 hover:to-neon-magenta/30 border-2 border-neon-cyan/50 hover:border-neon-cyan transition-all duration-200 relative cursor-pointer touch-manipulation"
            style={{ 
              opacity: 1, 
              visibility: 'visible',
              minWidth: '32px',
              minHeight: '32px',
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              margin: 0,
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            {/* Cart Icon - SVG for reliability */}
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="black" 
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:w-[18px] sm:h-[18px]"
              style={{ 
                opacity: 1,
                display: 'block',
                flexShrink: 0,
                pointerEvents: 'none',
                margin: 'auto'
              }}
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {/* Cart Count Badge - Always show if count > 0 */}
            {getCartCount() > 0 && (
              <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 flex items-center justify-center bg-gradient-to-r from-neon-cyan to-neon-magenta text-white rounded-full font-bold shadow-lg pointer-events-none"
                style={{ 
                  width: '16px',
                  height: '16px',
                  minWidth: '16px',
                  minHeight: '16px',
                  zIndex: 20,
                  fontSize: '8px',
                  lineHeight: '16px',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
          >
            {getCartCount()}
              </motion.span>
            )}
          </motion.button>
        </Link>
      </div>

      {/* Mobile Icons - Visible only on mobile */}
      <div className="flex items-center gap-2 md:hidden nav-item flex-shrink-0" style={{ opacity: 1, visibility: 'visible' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSearch(true)} 
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200 touch-manipulation"
          style={{ 
            opacity: 1, 
            visibility: 'visible', 
            minWidth: '32px', 
            minHeight: '32px',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <img 
            src={assets.search_icon} 
            className="w-4 h-4 brightness-0 invert" 
            alt="Search" 
            style={{ opacity: 1, filter: 'brightness(0) invert(1)', display: 'block' }}
          />
        </motion.button>

        <Link 
          to="/cart" 
          className="relative flex items-center justify-center touch-manipulation"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 border-2 border-neon-cyan/50 transition-all duration-200 relative cursor-pointer touch-manipulation"
            style={{ 
              opacity: 1, 
              visibility: 'visible',
              minWidth: '32px',
              minHeight: '32px',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2.5"
              className="w-4 h-4"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-gradient-to-r from-neon-cyan to-neon-magenta text-white rounded-full text-[8px] font-bold">
                {getCartCount()}
              </span>
            )}
          </motion.button>
        </Link>

        <motion.button
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>setVisible(true)} 
          className='w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200 touch-manipulation'
          style={{ 
            opacity: 1, 
            visibility: 'visible', 
            minWidth: '32px', 
            minHeight: '32px',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {assets.menu_icon ? (
            <img 
              src={assets.menu_icon} 
              className='w-5 h-5 brightness-0 invert' 
              alt="Menu"
              style={{ opacity: 1, filter: 'brightness(0) invert(1)', display: 'block' }}
            />
          ) : (
            <svg 
              className='w-5 h-5 text-white' 
              fill='none' 
              stroke='currentColor' 
              viewBox='0 0 24 24'
              style={{ display: 'block' }}
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          )}
        </motion.button>
      </div>
      
      <AnimatePresence>
        {visible && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 bottom-0 w-full bg-black/95 backdrop-blur-xl z-50 sm:hidden"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="flex flex-col text-gray-300 p-4 sm:p-6">
              <div 
                onClick={() => setVisible(false)} 
                className="flex items-center gap-4 p-4 cursor-pointer hover:text-neon-cyan transition-colors touch-manipulation min-h-[44px]"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <img src={assets.dropdown_icon} className="h-5 w-5 rotate-180 brightness-0 invert" alt="" />
                <p className="text-base font-medium">Back</p>
              </div>
              <NavLink 
                onClick={()=>setVisible(false)} 
                className='py-4 pl-6 border-b border-white/10 hover:text-neon-cyan transition-colors text-base font-medium touch-manipulation min-h-[44px] flex items-center' 
                to="/"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                HOME
              </NavLink>
              <NavLink 
                onClick={()=>setVisible(false)} 
                className='py-4 pl-6 border-b border-white/10 hover:text-neon-cyan transition-colors text-base font-medium touch-manipulation min-h-[44px] flex items-center' 
                to="/collection"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                COLLECTION
              </NavLink>
              <NavLink 
                onClick={()=>setVisible(false)} 
                className='py-4 pl-6 border-b border-white/10 hover:text-neon-cyan transition-colors text-base font-medium touch-manipulation min-h-[44px] flex items-center' 
                to="/about"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                ABOUT
              </NavLink>
              <NavLink 
                onClick={()=>setVisible(false)} 
                className='py-4 pl-6 border-b border-white/10 hover:text-neon-cyan transition-colors text-base font-medium touch-manipulation min-h-[44px] flex items-center' 
                to="/contact"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                CONTACT
              </NavLink>
              <NavLink 
                onClick={()=>setVisible(false)} 
                className='py-4 pl-6 border-b border-white/10 hover:text-neon-cyan transition-colors text-base font-medium touch-manipulation min-h-[44px] flex items-center gap-2' 
                to="/cart"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                CART
                {getCartCount() > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center bg-gradient-to-r from-neon-cyan to-neon-magenta text-white rounded-full text-[9px] font-bold">
                    {getCartCount()}
                  </span>
                )}
              </NavLink>
              {token ? (
                <>
                  <div className='py-4 pl-6 border-b border-white/10 text-base font-medium text-white/70'>
                    PROFILE
                  </div>
                  <NavLink 
                    onClick={()=>setVisible(false)} 
                    className='py-4 pl-10 border-b border-white/10 hover:text-neon-cyan transition-colors text-base font-medium touch-manipulation min-h-[44px] flex items-center gap-2' 
                    to="/profile"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </NavLink>
                  <NavLink 
                    onClick={()=>setVisible(false)} 
                    className='py-4 pl-10 border-b border-white/10 hover:text-neon-cyan transition-colors text-base font-medium touch-manipulation min-h-[44px] flex items-center gap-2' 
                    to="/orders"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    My Orders
                  </NavLink>
                  <div 
                    onClick={() => {
                      setVisible(false);
                      logout();
                    }}
                    className='py-4 pl-6 border-b border-white/10 hover:text-red-400 transition-colors text-base font-medium touch-manipulation min-h-[44px] flex items-center cursor-pointer'
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    LOGOUT
                  </div>
                </>
              ) : (
                <NavLink 
                  onClick={()=>setVisible(false)} 
                  className='py-4 pl-6 border-b border-white/10 hover:text-neon-cyan transition-colors text-base font-medium touch-manipulation min-h-[44px] flex items-center' 
                  to="/login"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  LOGIN
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NavBar;
