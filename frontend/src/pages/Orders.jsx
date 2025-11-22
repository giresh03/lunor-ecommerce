import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Orders = () => {
  const {backendUrl, token, currency} = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try{
      if(!token){
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/userOrders', {}, {headers: {token}});
      if(response.data.success){
        let allOrderItems = [];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrderItems.push(item);
          });
        });
        setOrderData(allOrderItems.reverse());
      }
    }
    catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
    if(orderData.length > 0){
      gsap.from('.order-item', {
        opacity: 0,
        x: -50,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }
  }, [token]);

  if(orderData.length === 0){
    return (
      <div className='border-t border-white/10'>
        <div className='text-2xl mb-8'>
          <Title text1={'MY'} text2={'ORDERS'}/>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='glass rounded-2xl border border-white/10 p-12 text-center'
        >
          <p className='text-xl text-white mb-4'>No orders yet</p>
          <p className='text-gray-300'>Start shopping to see your orders here!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='border-t border-white/10'>
      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div className='space-y-4'>
        {orderData.slice(0,4).map((item, index)=>(
          <motion.div 
            key={index} 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className='order-item py-6 glass rounded-2xl border border-white/10 px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
          >
            <div className='flex items-start gap-6 text-sm'>
              <div className='glass rounded-xl overflow-hidden border border-white/10'>
                <img className='w-16 sm:w-20 h-16 sm:w-20 object-cover' src={item.images[0]} alt={item.name} />
              </div>
              <div>
                <p className='sm:text-lg font-bold text-white mb-2'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-white'>
                  <p className='gradient-text font-semibold'>{currency}{item.price}</p>
                  <p className='text-gray-300'>Quantity: {item.quantity}</p>
                  <p className='px-2 py-1 rounded border border-neon-cyan/50 text-neon-cyan text-sm'>Size: {item.size}</p>
                </div>
                <p className='mt-2 text-white'>Date: <span className='text-gray-300'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-1 text-white'>Payment: <span className='text-gray-300'>{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className='min-w-3 h-3 rounded-full bg-green-500 glow-cyan'
                />
                <p className='text-sm md:text-base font-semibold text-white'>{item.status}</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadOrderData} 
                className='neon-button px-6 py-2 text-sm'
              >
                Track Order
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
