import React from 'react';
import { urlFor } from '../client';
import { Heart, Clock, Settings2 } from 'lucide-react';
import ProgressiveImage from './ProgressiveImage';

const CarCard = ({ car, onInquire }) => {
  // Optimized Sanity image with responsive width and quality
  const imageUrl = car.image?.asset 
    ? urlFor(car.image).width(800).quality(85).url() 
    : car.image;
    
  const placeholderUrl = car.image?.asset?.metadata?.lqip;

  // Formatting helpers
  const mileage = car.specifications?.mileage || car.mileage;
  const formattedMileage = mileage ? `${mileage.toLocaleString()} km` : 'N/A';
  const bodyType = car.bodyType || 'Sedan';
  const transmission = car.specifications?.transmission || car.transmission || 'Automatic';

  return (
    <div 
      className="bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-shadow font-sans"
      onClick={() => onInquire && onInquire(car)}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <ProgressiveImage 
          src={imageUrl} 
          placeholder={placeholderUrl}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Heart Icon */}
        <button className="absolute top-3 right-3 text-white drop-shadow-md hover:text-red-500 transition-colors z-10">
          <Heart size={20} className="stroke-2" />
        </button>
      </div>

      {/* Details Container */}
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        {/* Title & Body Type */}
        <div className="mb-4 text-left">
          <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight">
            {car.year} {car.brand ? `${car.brand} ` : ''}{car.model || car.name}
          </h3>
          <p className="text-[10px] md:text-xs text-gray-500 mt-1 uppercase tracking-widest">{bodyType}</p>
        </div>

        {/* Specs Row */}
        <div className="flex items-center space-x-4 text-[10px] md:text-xs text-gray-600 mb-6 font-medium">
          <div className="flex items-center space-x-2">
            <Clock size={14} className="text-gray-400" />
            <span>{formattedMileage}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Settings2 size={14} className="text-gray-400" />
            <span>{transmission}</span>
          </div>
        </div>

        {/* Price Row */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-[10px] md:text-xs font-black text-luxury-black tracking-[0.2em] uppercase">Price on Request</span>
          <div className="w-2 h-2 rounded-full bg-luxury-accent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
