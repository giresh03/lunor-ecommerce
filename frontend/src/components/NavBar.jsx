import React, { useContext, useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import LunorLogo from './LunorLogo';

const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const profileButtonRef = useRef(null);
    const profileNavRef = useRef(null);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
    
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

    // Handle scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY < 10) {
                setIsScrollingDown(false);
                setLastScrollY(currentScrollY);
                return;
            }
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsScrollingDown(true);
            } else if (currentScrollY < lastScrollY) {
                setIsScrollingDown(false);
            }
            
            setLastScrollY(currentScrollY);
        };

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
        return () => window.removeEventListener('scroll', onScroll);
    }, [lastScrollY]);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    const navItems = [
        { to: '/', label: 'HOME' },
        { to: '/collection', label: 'COLLECTION' },
        { to: '/about', label: 'ABOUT' },
        { to: '/contact', label: 'CONTACT' },
    ];

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{
                y: isScrollingDown ? -120 : 0,
                opacity: 1
            }}
            transition={{
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1]
            }}
            className="fixed top-4 left-0 right-0 z-[100] w-full"
        >
            {/* Max-width container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navbar wrapper */}
                <div className="relative flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 rounded-2xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)',
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
                    }}
                >
                    {/* Logo - Left */}
                    <div className="flex-shrink-0">
                        <LunorLogo size="small" className="whitespace-nowrap" />
                    </div>

                    {/* Desktop Navigation - Center */}
                    <div className="hidden lg:flex flex-1 items-center justify-center">
                        <ul className="flex items-center gap-1">
                            {navItems.map((item) => (
                                <li key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                            `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                                isActive
                                                    ? 'text-white'
                                                    : 'text-white/70 hover:text-white'
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <span className="relative z-10 tracking-wide">
                                                    {item.label}
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
                            ))}
                            
                            {/* Cart Link */}
                            <li>
                                <NavLink
                                    to="/cart"
                                    className={({ isActive }) =>
                                        `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                            isActive
                                                ? 'text-white'
                                                : 'text-white/70 hover:text-white'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span className="relative z-10 tracking-wide flex items-center gap-2">
                                                CART
                                                {getCartCount() > 0 && (
                                                    <span className="w-5 h-5 flex items-center justify-center bg-gradient-to-r from-neon-cyan to-neon-magenta text-white rounded-full text-[9px] font-bold">
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

                            {/* Profile Dropdown */}
                            <li className="profile-nav-container relative" ref={profileNavRef}>
                                <div
                                    onClick={() => {
                                        if (token) {
                                            setShowProfileDropdown(!showProfileDropdown);
                                        } else {
                                            navigate('/login');
                                        }
                                    }}
                                    className="relative px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white cursor-pointer transition-all duration-300"
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
                                </div>
                                {showProfileDropdown && token && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-xl rounded-xl border border-white/30 shadow-2xl z-50"
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
                                            <p
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate('/place-order');
                                                    setShowProfileDropdown(false);
                                                }}
                                                className="cursor-pointer px-4 py-2.5 text-sm text-white hover:text-cyan-400 hover:bg-white/10 transition-colors rounded-lg mx-1 flex items-center gap-2 font-medium"
                                            >
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                Place Order
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Desktop Actions - Right */}
                    <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowSearch(true)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200"
                        >
                            <img
                                src={assets.search_icon}
                                className="w-5 h-5 brightness-0 invert"
                                alt="Search"
                            />
                        </motion.button>

                        <div className="relative profile-menu-container">
                            <motion.button
                                ref={profileButtonRef}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (token) {
                                        setShowProfileMenu(!showProfileMenu);
                                    } else {
                                        navigate('/login');
                                    }
                                }}
                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200 relative"
                            >
                                {assets.profile_icon ? (
                                    <img
                                        src={assets.profile_icon}
                                        className="w-5 h-5 brightness-0 invert"
                                        alt="Profile"
                                    />
                                ) : (
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="white"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                )}
                                {showProfileMenu && token && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-black/90 animate-pulse" />
                                )}
                            </motion.button>
                            {token && showProfileMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-[9998]"
                                        onClick={() => setShowProfileMenu(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full right-0 mt-2 w-48 bg-black/95 backdrop-blur-xl rounded-xl border border-white/30 shadow-2xl z-[9999]"
                                    >
                                        <div className="flex flex-col gap-1 py-2">
                                            <p
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate('/profile');
                                                    setShowProfileMenu(false);
                                                }}
                                                className="cursor-pointer px-4 py-2.5 text-sm text-white hover:text-cyan-400 hover:bg-white/10 transition-colors rounded-lg mx-1 flex items-center gap-2 font-medium"
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
                                            >
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                My Orders
                                            </p>
                                            <p
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate('/place-order');
                                                    setShowProfileMenu(false);
                                                }}
                                                className="cursor-pointer px-4 py-2.5 text-sm text-white hover:text-cyan-400 hover:bg-white/10 transition-colors rounded-lg mx-1 flex items-center gap-2 font-medium"
                                            >
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                Place Order
                                            </p>
                                            <div className="h-px bg-white/20 my-1 mx-2" />
                                            <p
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    logout();
                                                    setShowProfileMenu(false);
                                                }}
                                                className="cursor-pointer px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors rounded-lg mx-1 flex items-center gap-2 font-medium"
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

                        <Link to="/cart" className="relative">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 hover:from-neon-cyan/30 hover:to-neon-magenta/30 border-2 border-neon-cyan/50 hover:border-neon-cyan transition-all duration-200 relative"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {getCartCount() > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-gradient-to-r from-neon-cyan to-neon-magenta text-white rounded-full font-bold text-[9px]"
                                    >
                                        {getCartCount()}
                                    </motion.span>
                                )}
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-3 lg:hidden flex-shrink-0">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowSearch(true)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
                        >
                            <img
                                src={assets.search_icon}
                                className="w-5 h-5 brightness-0 invert"
                                alt="Search"
                            />
                        </motion.button>

                        <Link to="/cart" className="relative">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 border-2 border-neon-cyan/50 transition-all duration-200 relative"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2.5"
                                    className="w-5 h-5"
                                >
                                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-gradient-to-r from-neon-cyan to-neon-magenta text-white rounded-full text-[9px] font-bold">
                                        {getCartCount()}
                                    </span>
                                )}
                            </motion.button>
                        </Link>

                        <motion.button
                            whileHover={{ rotate: 90 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setVisible(true)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
                        >
                            {assets.menu_icon ? (
                                <img
                                    src={assets.menu_icon}
                                    className="w-5 h-5 brightness-0 invert"
                                    alt="Menu"
                                />
                            ) : (
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed top-0 right-0 bottom-0 w-full bg-black/95 backdrop-blur-xl z-50 lg:hidden"
                    >
                        <div className="flex flex-col text-gray-300 p-4 sm:p-6 h-full overflow-y-auto">
                            <div
                                onClick={() => setVisible(false)}
                                className="flex items-center gap-4 p-4 cursor-pointer hover:text-neon-cyan transition-colors min-h-[44px]"
                            >
                                <img src={assets.dropdown_icon} className="h-5 w-5 rotate-180 brightness-0 invert" alt="" />
                                <p className="text-base font-medium">Back</p>
                            </div>
                            
                            {[...navItems, { to: '/cart', label: 'CART' }].map((item) => (
                                <NavLink
                                    key={item.to}
                                    onClick={() => setVisible(false)}
                                    to={item.to}
                                    className="py-4 pl-6 border-b border-white/10 hover:text-neon-cyan transition-colors text-base font-medium min-h-[44px] flex items-center gap-2"
                                >
                                    {item.label}
                                    {item.to === '/cart' && getCartCount() > 0 && (
                                        <span className="w-5 h-5 flex items-center justify-center bg-gradient-to-r from-neon-cyan to-neon-magenta text-white rounded-full text-[9px] font-bold">
                                            {getCartCount()}
                                        </span>
                                    )}
                                </NavLink>
                            ))}

                            {token ? (
                                <>
                                    <div className="py-4 pl-6 border-b border-white/10 text-base font-medium text-white/70">
                                        PROFILE
                                    </div>
                                    <NavLink
                                        onClick={() => setVisible(false)}
                                        to="/profile"
                                        className="py-4 pl-10 border-b border-white/10 hover:text-neon-cyan transition-colors text-base font-medium min-h-[44px] flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile
                                    </NavLink>
                                    <NavLink
                                        onClick={() => setVisible(false)}
                                        to="/orders"
                                        className="py-4 pl-10 border-b border-white/10 hover:text-neon-cyan transition-colors text-base font-medium min-h-[44px] flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        My Orders
                                    </NavLink>
                                    <NavLink
                                        onClick={() => setVisible(false)}
                                        to="/place-order"
                                        className="py-4 pl-10 border-b border-white/10 hover:text-neon-cyan transition-colors text-base font-medium min-h-[44px] flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        Place Order
                                    </NavLink>
                                    <div className="h-px bg-white/20 my-1 mx-2" />
                                    <p
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            logout();
                                            setVisible(false);
                                        }}
                                        className="cursor-pointer px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors rounded-lg mx-1 flex items-center gap-2 font-medium"
                                    >
                                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </p>
                                </>
                            ) : (
                                <NavLink
                                    onClick={() => setVisible(false)}
                                    to="/login"
                                    className="py-4 pl-6 border-b border-white/10 hover:text-neon-cyan transition-colors text-base font-medium min-h-[44px] flex items-center"
                                >
                                    LOGIN
                                </NavLink>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default NavBar;
