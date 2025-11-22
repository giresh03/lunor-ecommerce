import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { motion } from 'framer-motion';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className='w-full glass rounded-2xl p-8 border border-white/10'
    >
      <div className='text-2xl mb-6'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className='flex flex-col gap-4 text-base'>
        <div className='flex justify-between items-center py-2 border-b border-white/10'>
          <p className='text-gray-400'>Subtotal</p>
          <p className='text-white font-semibold'>{currency}{subtotal.toFixed(2)}</p>
        </div>
        <div className='flex justify-between items-center py-2 border-b border-white/10'>
          <p className='text-gray-400'>Shipping Fee</p>
          <p className='text-white font-semibold'>{currency}{delivery_fee}.00</p>
        </div>
        <div className='flex justify-between items-center py-3 mt-2'>
          <p className='text-lg font-bold gradient-text'>Total</p>
          <p className='text-2xl font-bold gradient-text'>{currency}{total.toFixed(2)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CartTotal;
