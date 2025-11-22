import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const BestSeller = () => {
    const { products } = useContext(ShopContext); 
    const [bestSeller, setBestSeller] = useState([]); 
    
    useEffect(() => { 
        const bestProduct = products.filter((item) => (item.bestseller)); 
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);

    return (
        <div className='my-16'>
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='text-center py-12'
            >
                <Title text1={'BEST'} text2={'SELLERS'}/>
                <motion.p 
                    className='w-3/4 m-auto text-sm md:text-base text-gray-400 mt-4 max-w-2xl'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Our most loved and highly rated pieces. These favorites are flying off the shelves 
                    for a reason - quality, style, and comfort all in one.
                </motion.p>
            </motion.div>
            
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {bestSeller.map((item, index) => (
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

export default BestSeller;
