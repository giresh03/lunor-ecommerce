import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect } from 'react';

const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategoy] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    // Ensure elements are immediately visible
    const elements = document.querySelectorAll('.add-element');
    elements.forEach(el => {
      if(el) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      }
    });
    
    gsap.from('.add-element', {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.out'
    });
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, {headers: {token}});
      if(response.data.success){
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setSizes([]);
        setBestseller(false);
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch (error){
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  }

  return (
    <motion.form 
      onSubmit={onSubmitHandler} 
      className='flex flex-col w-full items-start gap-7 glass rounded-3xl p-10 border border-white/50 backdrop-blur-xl text-gray-900 shadow-xl'
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ 
        minHeight: '600px', 
        position: 'relative', 
        zIndex: 10,
        opacity: 1,
        visibility: 'visible',
        backgroundColor: '#ffffff',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="w-full mb-2">
        <h2 className='text-3xl font-bold gradient-text add-element mb-2' style={{ opacity: 1, visibility: 'visible' }}>
          Add New Product
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        <p className="text-sm text-gray-600 mt-2">Fill in the product details below</p>
      </div>
      
      {/* Image Upload Section */}
      <div className='grid grid-cols-2 gap-4 w-full add-element'>
        {[1, 2, 3, 4].map((num) => {
          const image = num === 1 ? image1 : num === 2 ? image2 : num === 3 ? image3 : image4;
          const setImage = num === 1 ? setImage1 : num === 2 ? setImage2 : num === 3 ? setImage3 : setImage4;
          
          return (
            <motion.label
              key={num}
              htmlFor={`image${num}`}
              className='relative cursor-pointer glass rounded-xl p-4 border-2 border-gray-200 overflow-hidden group hover:border-blue-500 transition-all shadow-md hover:shadow-xl'
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                className='w-full h-36 object-cover rounded-lg shadow-sm' 
                src={!image ? assets.upload_area : URL.createObjectURL(image)} 
                alt={`Upload ${num}`} 
              />
              <input 
                onChange={(e)=> setImage(e.target.files[0])} 
                type="file" 
                id={`image${num}`} 
                className='hidden'
                accept="image/*"
              />
              <div className='absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-lg'>
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <p className='text-white text-sm font-semibold'>Click to Upload</p>
                </div>
              </div>
            </motion.label>
          );
        })}
      </div>

      {/* Product Details */}
      <div className='w-full add-element'>
        <label className='block mb-3 text-gray-900 font-bold text-base'>
          Product Name <span className="text-red-500">*</span>
        </label>
        <motion.input 
          whileFocus={{ scale: 1.01, borderColor: '#0066ff' }}
          onChange={(e)=> setName(e.target.value)} 
          value={name} 
          className='w-full max-w-[500px] px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm' 
          type="text" 
          placeholder='Enter product name' 
          required
        />
      </div>

      <div className='w-full add-element'>
        <label className='block mb-3 text-gray-900 font-bold text-base'>
          Product Description <span className="text-red-500">*</span>
        </label>
        <motion.textarea 
          whileFocus={{ scale: 1.01, borderColor: '#0066ff' }}
          onChange={(e)=> setDescription(e.target.value)} 
          value={description} 
          className='w-full max-w-[500px] px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all resize-none shadow-sm' 
          rows="4"
          placeholder='Write a detailed description of the product...' 
          required
        />
      </div>

      {/* Category and Price */}
      <div className='flex flex-col sm:flex-row gap-5 w-full add-element'>
        <div className='flex-1'>
          <label className='block mb-3 text-gray-900 font-bold text-base'>
            Product Category <span className="text-red-500">*</span>
          </label>
          <select 
            onChange={(e)=> setCategory(e.target.value)} 
            value={category} 
            className='w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm cursor-pointer'
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='flex-1'>
          <label className='block mb-3 text-gray-900 font-bold text-base'>
            Sub Category (Type) <span className="text-red-500">*</span>
          </label>
          <select 
            onChange={(e)=> setSubCategoy(e.target.value)} 
            value={subCategory} 
            className='w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm cursor-pointer'
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Handbags">Handbags</option>
            <option value="Shoes">Shoes</option>
            <option value="Watches">Watches</option>
          </select>
        </div>

        <div className='sm:w-48'>
          <label className='block mb-3 text-gray-900 font-bold text-base'>
            Price (₹) <span className="text-red-500">*</span>
          </label>
          <motion.input 
            whileFocus={{ scale: 1.01, borderColor: '#0066ff' }}
            onChange={(e)=> setPrice(e.target.value)} 
            value={price} 
            className='w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm' 
            type="number" 
            placeholder="0.00" 
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div className='w-full add-element'>
        <label className='block mb-3 text-gray-900 font-bold text-base'>
          Product Sizes <span className="text-red-500">*</span>
        </label>
        <div className='flex gap-3 flex-wrap'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <motion.button
              key={size}
              type="button"
              onClick={()=>setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 cursor-pointer rounded-xl font-bold text-sm transition-all shadow-md ${
                sizes.includes(size) 
                  ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50 border-2 border-transparent' 
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg'
              }`}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className='flex gap-3 items-center add-element p-4 rounded-xl bg-gray-50 border border-gray-200'>
        <motion.input 
          onChange={() => setBestseller(prev => !prev)} 
          checked={bestseller} 
          type="checkbox" 
          id='bestseller'
          className='w-5 h-5 accent-blue-500 cursor-pointer rounded'
          whileTap={{ scale: 0.9 }}
        />
        <label className='cursor-pointer text-gray-900 font-semibold hover:text-blue-600 transition-colors flex items-center gap-2' htmlFor="bestseller">
          <span>Add to bestseller</span>
          <span className="text-xs text-gray-500">(Featured products)</span>
        </label>
      </div>

      <motion.button
        whileHover={{ 
          scale: 1.02, 
          boxShadow: '0 0 40px rgba(0, 102, 255, 0.5)' 
        }}
        whileTap={{ scale: 0.98 }}
        className='neon-button w-full sm:w-auto px-10 py-4 mt-4 add-element text-base font-semibold relative overflow-hidden group' 
        type='submit'
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Product
        </span>
      </motion.button>
    </motion.form>
  );
};

export default Add;
