import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-[120px] md:text-[180px] font-serif leading-none text-gray-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none">
            404
          </h1>
          <h2 className="text-sm uppercase tracking-[0.6em] text-luxury-accent font-bold">Page Not Found</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-luxury-black">Lost Your Way?</h3>
          <div className="w-24 h-px bg-luxury-accent mx-auto mt-8"></div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg text-gray-500 font-light max-w-md mx-auto leading-relaxed"
        >
          The page you are looking for doesn't exist or has been moved. Let us help you find your way back to the showroom.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
        >
          <Link
            to="/"
            className="w-full sm:w-auto bg-luxury-black text-white px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-accent transition-all duration-500 shadow-xl"
          >
            Return Home
          </Link>
          <Link
            to="/inventory"
            className="w-full sm:w-auto border border-luxury-black text-luxury-black px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-black hover:text-white transition-all duration-500"
          >
            View Inventory
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
