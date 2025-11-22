import axios from 'axios';
import React from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const List = () => {
  const [list, setList] = useState([]);
  
  const fetchList = async()=>{
    try{
      const response = await axios.get(backendUrl + '/api/product/list');
      if(response.data.success){
        setList(response.data.products);
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch (error){
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
    if(list.length > 0){
      // Ensure items are visible immediately
      const items = document.querySelectorAll('.product-list-item');
      items.forEach(item => {
        if(item) {
          item.style.opacity = '1';
          item.style.visibility = 'visible';
        }
      });
      
      gsap.from('.product-list-item', {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out'
      });
    }
  }, [list.length]);

  const removeProduct = async (id) => {
    if(!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found');
        return;
      }
  
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );
  
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if(list.length === 0){
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-gray-900'
      >
        <div className="mb-6">
          <h2 className='text-3xl font-bold gradient-text mb-2'>All Products List</h2>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>
        <div className='glass rounded-3xl border border-white/50 p-16 text-center shadow-xl'>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className='text-2xl font-bold text-gray-900 mb-3'>No products yet</p>
          <p className='text-gray-600 text-lg'>Add products to see them listed here.</p>
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
        <h2 className='text-3xl font-bold gradient-text mb-2'>All Products List</h2>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4" />
        <p className="text-sm text-gray-600">
          Total Products: <span className="font-bold text-blue-600">{list.length}</span>
        </p>
      </div>
      
      <div className='flex flex-col gap-4'>
        {/*List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-5 px-6 glass rounded-2xl border border-white/50 text-sm font-bold text-gray-900 shadow-lg'>
          <b className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Image
          </b>
          <b className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Name
          </b>
          <b className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Category
          </b>
          <b className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Price
          </b>
          <b className='text-center flex items-center justify-center gap-2'>
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Action
          </b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0, duration: 0.3 }}
            className='product-list-item grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-5 py-5 px-6 glass rounded-2xl border border-white/50 text-sm hover:border-blue-500/50 hover:shadow-xl transition-all group'
          >
            <div className='glass rounded-xl overflow-hidden border-2 border-gray-200 w-20 h-20 flex items-center justify-center shadow-md group-hover:border-blue-500 transition-all'>
              <img 
                className='w-full h-full object-cover' 
                src={item.images?.[0] || 'default-image-url'} 
                alt={item.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                }}
              />
            </div>
            <div>
              <p className='text-gray-900 font-bold text-base mb-1'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.subCategory}</p>
            </div>
            <div>
              <p className='text-gray-700 font-semibold hidden md:block'>{item.category}</p>
            </div>
            <div>
              <p className='text-gray-900 font-bold gradient-text text-lg hidden md:block'>
                {currency}{item.price}
              </p>
            </div>
            <div className='flex justify-center'>
              <motion.button
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={()=> removeProduct(item._id)} 
                className='px-4 py-2 rounded-xl cursor-pointer text-lg font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2'
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hidden sm:inline">Delete</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default List;
