import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect } from 'react';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  useEffect(() => {
    // Use setTimeout to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.order-element');
      if (elements.length > 0) {
        try {
          // Set initial state
          gsap.set('.order-element', { opacity: 0, y: 30 });
          // Animate to visible
          gsap.to('.order-element', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
          });
        } catch (error) {
          // Fallback: ensure elements are visible if GSAP fails
          console.error('GSAP animation error:', error);
          elements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          });
        }
      }
    }, 100);

    // Safety fallback: ensure visibility after animation should complete
    const safetyTimer = setTimeout(() => {
      const elements = document.querySelectorAll('.order-element');
      elements.forEach(el => {
        const computedOpacity = window.getComputedStyle(el).opacity;
        if (parseFloat(computedOpacity) < 0.1) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
    };
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      if(!cartItems || typeof cartItems !== 'object' || Array.isArray(cartItems)){
        toast.error('Cart is empty');
        return;
      }

      Object.keys(cartItems).forEach((itemId) => {
        if(cartItems[itemId] && typeof cartItems[itemId] === 'object'){
          Object.keys(cartItems[itemId]).forEach((size) => {
            if (cartItems[itemId][size] > 0) {
              const itemInfo = structuredClone(products.find(product => product._id === itemId));
              if (itemInfo) {
                itemInfo.size = size;
                itemInfo.quantity = cartItems[itemId][size];
                orderItems.push(itemInfo);
              }
            }
          });
        }
      });
      
      if(orderItems.length === 0){
        toast.error('Cart is empty');
        return;
      }
      
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            toast.success('Order placed successfully!');
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || 'Failed to place order');
    }
  };

  return (
    <div className='min-h-[80vh] border-t border-white/10'>
      <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-8'>
      <motion.div 
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col gap-4 w-full sm:max-w-[480px] order-element'
        style={{ opacity: 1 }}
      >
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3 order-element'>
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
            required 
            onChange={onChangeHandler} 
            name='firstName' 
            value={formData.firstName} 
            className='glass rounded-lg border border-white/20 text-white placeholder-gray-500 py-3 px-4 w-full bg-dark-secondary/50 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all' 
            type="text" 
            placeholder='First name' 
          />
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
            required 
            onChange={onChangeHandler} 
            name='lastName' 
            value={formData.lastName} 
            className='glass rounded-lg border border-white/20 text-white placeholder-gray-500 py-3 px-4 w-full bg-dark-secondary/50 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all' 
            type="text" 
            placeholder='Last name' 
          />
        </div>
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
          required 
          onChange={onChangeHandler} 
          name='email' 
          value={formData.email} 
          className='glass rounded-lg border border-white/20 text-white placeholder-gray-500 py-3 px-4 w-full bg-dark-secondary/50 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all order-element' 
          type="email" 
          placeholder='Email address' 
        />
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
          required 
          onChange={onChangeHandler} 
          name='street' 
          value={formData.street} 
          className='glass rounded-lg border border-white/20 text-white placeholder-gray-500 py-3 px-4 w-full bg-dark-secondary/50 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all order-element' 
          type="text" 
          placeholder='Street' 
        />
        <div className='flex gap-3 order-element'>
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
            required 
            onChange={onChangeHandler} 
            name='city' 
            value={formData.city} 
            className='glass rounded-lg border border-white/20 text-white placeholder-gray-500 py-3 px-4 w-full bg-dark-secondary/50 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all' 
            type="text" 
            placeholder='City' 
          />
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
            required 
            onChange={onChangeHandler} 
            name='state' 
            value={formData.state} 
            className='glass rounded-lg border border-white/20 text-white placeholder-gray-500 py-3 px-4 w-full bg-dark-secondary/50 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all' 
            type="text" 
            placeholder='State' 
          />
        </div>
        <div className='flex gap-3 order-element'>
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
            required 
            onChange={onChangeHandler} 
            name='zipcode' 
            value={formData.zipcode} 
            className='glass rounded-lg border border-white/20 text-white placeholder-gray-500 py-3 px-4 w-full bg-dark-secondary/50 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all' 
            type="number" 
            placeholder='Zipcode' 
          />
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
            required 
            onChange={onChangeHandler} 
            name='country' 
            value={formData.country} 
            className='glass rounded-lg border border-white/20 text-white placeholder-gray-500 py-3 px-4 w-full bg-dark-secondary/50 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all' 
            type="text" 
            placeholder='Country' 
          />
        </div>
        <motion.input
          whileFocus={{ scale: 1.02, borderColor: '#00ffff' }}
          required 
          onChange={onChangeHandler} 
          name='phone' 
          value={formData.phone} 
          className='glass rounded-lg border border-white/20 text-white placeholder-gray-500 py-3 px-4 w-full bg-dark-secondary/50 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all order-element' 
          type="number" 
          placeholder='Phone' 
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='mt-8 order-element'
        style={{ opacity: 1 }}
      >
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12 glass rounded-2xl border border-white/10 p-6'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row mt-6'>
            <motion.div 
              whileHover={{ scale: 1.05, borderColor: '#00ffff' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMethod('stripe')} 
              className={`flex items-center gap-3 glass rounded-lg border-2 p-3 cursor-pointer transition-all ${
                method === 'stripe' ? 'border-neon-cyan glow-cyan' : 'border-white/20 hover:border-white/40'
              }`}
            >
              <div className={`min-w-4 h-4 rounded-full border-2 ${method === 'stripe' ? 'bg-neon-cyan border-neon-cyan' : 'border-white/40'}`}></div>
              <img className='h-5 mx-4 brightness-0 invert opacity-80' src={assets.stripe_logo} alt="Stripe" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, borderColor: '#00ffff' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMethod('razorpay')} 
              className={`flex items-center gap-3 glass rounded-lg border-2 p-3 cursor-pointer transition-all ${
                method === 'razorpay' ? 'border-neon-cyan glow-cyan' : 'border-white/20 hover:border-white/40'
              }`}
            >
              <div className={`min-w-4 h-4 rounded-full border-2 ${method === 'razorpay' ? 'bg-neon-cyan border-neon-cyan' : 'border-white/40'}`}></div>
              <img className='h-5 mx-4 brightness-0 invert opacity-80' src={assets.razorpay_logo} alt="Razorpay" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, borderColor: '#00ffff' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMethod('cod')} 
              className={`flex items-center gap-3 glass rounded-lg border-2 p-3 cursor-pointer transition-all ${
                method === 'cod' ? 'border-neon-cyan glow-cyan' : 'border-white/20 hover:border-white/40'
              }`}
            >
              <div className={`min-w-4 h-4 rounded-full border-2 ${method === 'cod' ? 'bg-neon-cyan border-neon-cyan' : 'border-white/40'}`}></div>
              <p className='text-white text-sm font-semibold mx-4'>CASH ON DELIVERY</p>
            </motion.div>
          </div>
          <div className='w-full text-end mt-8'>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              type='submit' 
              className='neon-button px-12 py-3 text-base'
            >
              PLACE ORDER
            </motion.button>
          </div>
        </div>
      </motion.div>
      </form>
    </div>
  );
};

export default PlaceOrder;
