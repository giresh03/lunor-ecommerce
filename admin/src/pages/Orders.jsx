import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchAllOrders();
    if(orders.length > 0){
      // Ensure items are visible immediately
      const items = document.querySelectorAll('.admin-order-item');
      items.forEach(item => {
        if(item) {
          item.style.opacity = '1';
          item.style.visibility = 'visible';
        }
      });
      
      gsap.from('.admin-order-item', {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out'
      });
    }
  }, [token]);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('Order status updated successfully!');
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-300';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Out for delivery': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Packing': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if(orders.length === 0){
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-gray-900'
      >
        <div className="mb-8">
          <h3 className='text-3xl font-bold gradient-text mb-2'>Order Management</h3>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>
        <div className='glass rounded-3xl border border-white/50 p-16 text-center shadow-xl'>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className='text-2xl font-bold text-gray-900 mb-3'>No orders yet</p>
          <p className='text-gray-600 text-lg'>Orders will appear here when customers place them.</p>
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
        <h3 className='text-3xl font-bold gradient-text mb-2'>Order Management</h3>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4" />
        <p className="text-sm text-gray-600">
          Total Orders: <span className="font-bold text-blue-600">{orders.length}</span>
        </p>
      </div>
      
      <div className='space-y-5'>
        {orders.map((order, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.3 }}
            className="admin-order-item glass rounded-3xl border border-white/50 p-8 my-4 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-start">
              {/* Order Icon */}
              <div className='glass rounded-2xl overflow-hidden border-2 border-gray-200 w-20 h-20 flex items-center justify-center shadow-lg group-hover:border-blue-500 transition-all'>
                <img className="w-12 h-12" src={assets.parcel_icon} alt="Parcel Icon" />
              </div>
              
              {/* Order Items & Address */}
              <div>
                <div className='mb-4'>
                  <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Items</h4>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-2">
                      <span className='text-gray-900 font-semibold'>
                        {item.name} × {item.quantity}
                      </span>
                      {idx === order.items.length - 1 && (
                        <span className='px-2 py-1 rounded-lg border-2 border-blue-500/50 text-blue-600 text-xs font-bold bg-blue-50'>
                          {item.size}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Delivery Address</h4>
                  <p className="text-base font-bold text-gray-900 mb-1">
                    {order.address.firstName + ' ' + order.address.lastName}
                  </p>
                  <div className='text-gray-700 text-sm leading-relaxed space-y-1'>
                    <p>{order.address.street + ','}</p>
                    <p>
                      {order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + order.address.zipcode}
                    </p>
                    <p className="font-semibold">📞 {order.address.phone}</p>
                  </div>
                </div>
              </div>
              
              {/* Order Details */}
              <div className='bg-gray-50 rounded-2xl p-4 border border-gray-200'>
                <h4 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Details</h4>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-gray-900">
                    Items: <span className="text-blue-600">{order.items.length}</span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Method:</span> {order.paymentMethod}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Payment:</span> {order.payment}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Date:</span> {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {/* Order Amount */}
              <div className='flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200/50'>
                <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Total Amount</p>
                <p className="text-2xl font-bold gradient-text">
                  {currency}{order.amount}
                </p>
              </div>
              
              {/* Status Selector */}
              <div className='flex flex-col gap-3'>
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Update Status</label>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-900 font-semibold bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm cursor-pointer hover:border-blue-400"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <div className={`px-4 py-3 rounded-xl border-2 font-bold text-center text-sm ${getStatusColor(order.status)} shadow-md`}>
                  {order.status}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Orders;
