import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const sectionRef = React.useRef(null);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  useEffect(() => {
    if (sectionRef.current && latestProducts.length > 0) {
      gsap.from(sectionRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });
    }
  }, [latestProducts]);

  return (
    <div className='my-16' ref={sectionRef}>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='text-center py-12'
      >
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <motion.p 
          className='w-3/4 m-auto text-sm md:text-base text-gray-400 mt-4 max-w-2xl'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Discover our premium selection of fashion-forward pieces. Each item is carefully 
          curated to bring you the latest trends in style and comfort.
        </motion.p>
      </motion.div>
      
      {/* Products Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {latestProducts.map((item, index) => (
          <ProductItem 
            key={item._id || index} 
            id={item._id} 
            image={item.images} 
            name={item.name} 
            price={item.price}
            sizes={item.sizes}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
