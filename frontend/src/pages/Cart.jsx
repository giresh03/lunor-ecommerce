import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0 && cartItems && typeof cartItems === 'object' && !Array.isArray(cartItems)) {
      const tempData = [];
      for (const items in cartItems) {
        if (cartItems[items] && typeof cartItems[items] === 'object') {
          for (const item in cartItems[items]) {
            if (cartItems[items][item] > 0) {
              tempData.push({
                _id: items,
                size: item,
                quantity: cartItems[items][item]
              });
            }
          }
        }
      }
      setCartData(tempData);

      // Animate cart items
      if (tempData.length > 0) {
        gsap.from('.cart-item', {
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out'
        });
      }
    }
  }, [cartItems, products]);

  if (cartData.length === 0) {
    return (
      <div className='border-t border-white/10'>
        <div className='text-2xl mb-8'>
          <Title text1={'YOUR'} text2={'CART'} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex flex-col items-center justify-center min-h-[50vh] glass rounded-2xl p-12 border border-white/10'
        >
          <motion.img
            src={assets.cart_icon}
            className='w-24 h-24 mb-6 brightness-0 invert opacity-50'
            alt="Empty cart"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className='text-xl text-gray-400 mb-4'>Your cart is empty</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/collection')}
            className='neon-button'
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='border-t border-white/10'>
      <div className='text-2xl mb-8'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      
      <AnimatePresence>
        <div className='space-y-4'>
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;

            return (
              <motion.div
                key={`${item._id}-${item.size}-${index}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className='cart-item py-6 glass rounded-2xl border border-white/10 px-6 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
              >
                <div className='flex items-start gap-6'>
                  <div className='glass rounded-xl overflow-hidden border border-white/10'>
                    <img 
                      src={productData.images[0]} 
                      className='w-16 sm:w-20 h-16 sm:h-20 object-cover' 
                      alt={productData.name} 
                    />
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm sm:text-lg font-semibold text-white mb-2'>{productData.name}</p>
                    <div className='flex items-center gap-5'>
                      <p className='gradient-text font-bold'>{currency}{productData.price}</p>
                      <p className='px-3 py-1 rounded-lg border border-neon-cyan/50 text-neon-cyan text-sm font-medium bg-neon-cyan/10'>{item.size}</p>
                    </div>
                  </div>
                </div>
                
                <motion.input
                  whileFocus={{ scale: 1.05, borderColor: '#00ffff' }}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || value === '0') {
                      updateQuantity(item._id, item.size, 0);
                    } else {
                      updateQuantity(item._id, item.size, Number(value));
                    }
                  }}
                  className='max-w-20 px-3 py-2 rounded-lg bg-dark-secondary/50 border border-white/20 text-white text-center focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all'
                  type="number"
                  min='1'
                  defaultValue={item.quantity}
                />
                
                <motion.img
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  className='w-5 h-5 cursor-pointer brightness-0 invert opacity-70 hover:opacity-100 hover:invert-[1] sepia-[1] saturate-[5] hue-rotate-[300deg] transition-all ml-auto'
                  alt="Remove"
                />
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end mt-6'>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/place-order')}
              className='neon-button px-12 py-4 text-base'
            >
              PROCEED TO CHECKOUT
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
