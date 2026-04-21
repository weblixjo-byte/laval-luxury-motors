import React from 'react';
import { motion } from 'framer-motion';
import { urlFor } from '../client';

const CarCard = ({ car, onInquire }) => {
  // Handle both static assets and Sanity image references
  const imageUrl = car.image?.asset ? urlFor(car.image).url() : car.image;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={() => onInquire && onInquire(car)}
    >
      <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-gray-100">
        <img 
          src={imageUrl} 
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
          {car.category}
        </div>
        
        {/* Hover Overlay Button */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white text-[#151515] px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl"
          >
            Inquire Now
          </motion.div>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-serif">{car.name}</h3>
        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
          {car.year} • {car.location}
        </p>
        <div className="flex justify-between items-end pt-2">
          <p className="text-sm font-medium">
            {car.price}
          </p>
          <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Details →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
