import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.images[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
    if (productData) {
      gsap.from('.product-element', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="border-t-2 border-white/10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Section */}
      <div className="flex flex-col lg:flex-row gap-12 product-element">
        {/* Left Section: Images */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col sm:flex-row gap-3"
        >
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[20%] w-full gap-2">
            {productData.images.map((item, index) => (
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-24 h-24 object-cover cursor-pointer border-2 rounded-lg transition-all ${
                  image === item 
                    ? 'border-neon-cyan glow-cyan' 
                    : 'border-white/20 hover:border-white/40'
                }`}
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="w-full sm:w-[80%] glass rounded-2xl overflow-hidden border border-white/10">
            <motion.img 
              src={image} 
              className="w-full h-auto object-cover" 
              alt="Main Product"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Right Section: Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 product-element"
        >
          <h1 className="font-bold text-3xl mt-2 gradient-text">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-3">
            {[...Array(4)].map((_, i) => (
              <motion.img
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                src={assets.star_icon} 
                className="w-4 brightness-0 invert" 
                alt="Star" 
              />
            ))}
            <img src={assets.star_dull_icon} className="w-4 brightness-0 invert opacity-50" alt="Dull Star" />
            <p className="pl-2 text-gray-400 text-sm">122 reviews</p>
          </div>
          <p className="mt-5 text-4xl font-bold gradient-text">
            {currency}{productData.price}
          </p>
          <p className="mt-5 text-gray-400 leading-relaxed">{productData.description}</p>
          
          <div className="flex flex-col gap-4 my-8 product-element">
            <p className="text-gray-300 font-semibold">Select Size</p>
            <div className="flex gap-3 flex-wrap">
              {productData.sizes.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSize(item)}
                  className={`py-2 px-6 rounded-lg font-semibold border-2 transition-all ${
                    item === size 
                      ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta text-dark-primary border-transparent glow-cyan' 
                      : 'bg-dark-secondary text-gray-300 border-white/20 hover:border-neon-cyan'
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(productData._id, size)} 
            className="neon-button w-full sm:w-auto px-12 py-4 text-base product-element"
            style={{ 
              opacity: 1, 
              visibility: 'visible',
              position: 'relative',
              zIndex: 10
            }}
          >
            ADD TO CART
          </motion.button>
          
          <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent my-8" />
          
          <div className="text-sm text-gray-400 mt-5 flex flex-col gap-2 product-element">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
              <p>100% Original product.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-magenta"></div>
              <p>Cash on delivery available.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
              <p>Easy return & exchange within 7 days.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Description and Reviews */}
      <div className="mt-20 product-element">
        <div className="flex glass rounded-t-2xl border-b border-white/10 overflow-hidden">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="px-8 py-4 text-sm font-semibold bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 text-neon-cyan border-r border-white/10"
          >
            Description
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="px-8 py-4 text-sm font-semibold text-gray-400 hover:text-neon-cyan transition-colors"
          >
            Reviews (122)
          </motion.button>
        </div>
        <div className="flex flex-col gap-4 glass rounded-b-2xl border border-white/10 border-t-0 p-8 text-sm text-gray-400 leading-relaxed">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
