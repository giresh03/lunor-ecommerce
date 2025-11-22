import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname.includes('collection') && showSearch){
      setVisible(true);
    }
    else{
      setVisible(false);
    }
  }, [location, showSearch])

  return (
    <AnimatePresence>
      {showSearch && visible && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-b border-white/10 glass backdrop-blur-xl text-center"
        >
          <div className="inline-flex items-center justify-center border border-white/20 px-5 py-2 my-5 mx-3 rounded-full glass hover:border-neon-cyan transition-all">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none bg-transparent text-white placeholder-gray-500 text-sm"
              type="text"
              placeholder="Search..."
            />
            <img className="w-4 brightness-0 invert opacity-70" src={assets.search_icon} alt="" />
          </div>
          <motion.img
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSearch(false)}
            className="inline w-3 cursor-pointer brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
            src={assets.cross_icon}
            alt=""
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
