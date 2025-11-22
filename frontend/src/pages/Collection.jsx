import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { motion } from 'framer-motion';

const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else{
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if(subcategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else{
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const sortProduct = (productsToSort) => {
    let fpCopy = [...productsToSort];
    switch (sortType){
      case 'low-high':
        return fpCopy.sort((a,b)=>(a.price-b.price));
      case 'high-low':
        return fpCopy.sort((a,b)=>(b.price-a.price));
      default:
        return fpCopy;
    }
  };

  useEffect(() => {
    let productsCopy = products.slice();
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if(subcategory.length > 0){
      productsCopy = productsCopy.filter(item => subcategory.includes(item.subCategory));
    }
    const sortedProducts = sortProduct(productsCopy);
    setFilterProducts(sortedProducts);
  }, [category, subcategory, search, showSearch, products, sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 border-t border-white/10'>
      {/*Filter options */}
      <div className='min-w-60'> 
        <motion.p 
          whileHover={{ x: 5, color: '#00ffff' }}
          onClick={()=>setShowFilter(!showFilter)} 
          className='my-2 text-xl flex items-center cursor-pointer gap-2 text-white font-bold'
        >
          FILTERS
          <motion.img 
            animate={{ rotate: showFilter ? 90 : 0 }}
            className={`h-3 sm:hidden brightness-0 invert`} 
            src={assets.dropdown_icon} 
            alt="" 
          />
        </motion.p>
        
        {/* Category Filter */} 
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`glass rounded-xl border border-white/10 p-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}
        > 
          <p className='mb-3 text-sm font-bold gradient-text'>CATEGORIES</p>
          <div className='flex flex-col gap-3 text-sm text-white'>
            <label className='flex gap-3 items-center cursor-pointer hover:text-neon-cyan transition-colors'>
              <input className='w-4 h-4 accent-neon-cyan cursor-pointer' type="checkbox" onChange={toggleCategory} value={'Men'} checked={category.includes('Men')}/>
              <span>Men</span>
            </label>
            <label className='flex gap-3 items-center cursor-pointer hover:text-neon-cyan transition-colors'>
              <input className='w-4 h-4 accent-neon-cyan cursor-pointer' type="checkbox" onChange={toggleCategory} value={'Women'} checked={category.includes('Women')}/>
              <span>Women</span>
            </label>
            <label className='flex gap-3 items-center cursor-pointer hover:text-neon-cyan transition-colors'>
              <input className='w-4 h-4 accent-neon-cyan cursor-pointer' type="checkbox" onChange={toggleCategory} value={'Kids'} checked={category.includes('Kids')}/>
              <span>Kids</span>
            </label>
          </div>
        </motion.div>
        
        {/* Subcategory filters */}
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`glass rounded-xl border border-white/10 p-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}
        > 
          <p className='mb-3 text-sm font-bold gradient-text'>TYPE</p>
          <div className='flex flex-col gap-3 text-sm text-white'>
            <label className='flex gap-3 items-center cursor-pointer hover:text-neon-cyan transition-colors'>
              <input className='w-4 h-4 accent-neon-cyan cursor-pointer' type="checkbox" onChange={toggleSubCategory} value={'Topwear'} checked={subcategory.includes('Topwear')}/>
              <span>Topwear</span>
            </label>
            <label className='flex gap-3 items-center cursor-pointer hover:text-neon-cyan transition-colors'>
              <input className='w-4 h-4 accent-neon-cyan cursor-pointer' type="checkbox" onChange={toggleSubCategory} value={'Bottomwear'} checked={subcategory.includes('Bottomwear')}/>
              <span>Bottomwear</span>
            </label>
            <label className='flex gap-3 items-center cursor-pointer hover:text-neon-cyan transition-colors'>
              <input className='w-4 h-4 accent-neon-cyan cursor-pointer' type="checkbox" onChange={toggleSubCategory} value={'Winterwear'} checked={subcategory.includes('Winterwear')}/>
              <span>Winterwear</span>
            </label>
            <label className='flex gap-3 items-center cursor-pointer hover:text-neon-cyan transition-colors'>
              <input className='w-4 h-4 accent-neon-cyan cursor-pointer' type="checkbox" onChange={toggleSubCategory} value={'Handbags'} checked={subcategory.includes('Handbags')}/>
              <span>Handbags</span>
            </label>
            <label className='flex gap-3 items-center cursor-pointer hover:text-neon-cyan transition-colors'>
              <input className='w-4 h-4 accent-neon-cyan cursor-pointer' type="checkbox" onChange={toggleSubCategory} value={'Shoes'} checked={subcategory.includes('Shoes')}/>
              <span>Shoes</span>
            </label>
            <label className='flex gap-3 items-center cursor-pointer hover:text-neon-cyan transition-colors'>
              <input className='w-4 h-4 accent-neon-cyan cursor-pointer' type="checkbox" onChange={toggleSubCategory} value={'Watches'} checked={subcategory.includes('Watches')}/>
              <span>Watches</span>
            </label>
          </div>
        </motion.div>
      </div>
      
      {/*Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-6'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}></Title>
          {/*Product sort */}
          <select 
            onChange={(e)=>setSortType(e.target.value)} 
            className="glass rounded-lg border-2 border-white/20 text-white text-sm px-4 py-2 bg-dark-secondary/50 focus:border-neon-cyan focus:outline-none transition-all" 
          >
            <option value="relevant" className='bg-dark-secondary text-white'>Sort by: Relevant</option>
            <option value="low-high" className='bg-dark-secondary text-white'>Sort by: Low to High</option>
            <option value="high-low" className='bg-dark-secondary text-white'>Sort by: High to Low</option>
          </select>
        </div>
        
        {/*Map Products */}
        {filterProducts.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8'>
            {filterProducts.map((item, index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.images} sizes={item.sizes} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-20 glass rounded-2xl border border-white/10'>
            <p className='text-xl text-gray-400 mb-4'>No products found</p>
            <p className='text-sm text-gray-500'>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
