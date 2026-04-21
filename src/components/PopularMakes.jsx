import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PopularMakes = () => {
  const brands = [
    { name: 'Bugatti', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/bugatti.png' },
    { name: 'Ferrari', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/ferrari.png' },
    { name: 'Lamborghini', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/lamborghini.png' },
    { name: 'Porsche', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/porsche.png' },
    { name: 'Koenigsegg', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/koenigsegg.png' },
    { name: 'McLaren', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/mclaren.png' },
    { name: 'Rolls Royce', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/rolls_royce.png' },
    { name: 'Bentley', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/bentley.png' },
    { name: 'Aston Martin', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/aston_martin.png' },
    { name: 'Maserati', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/maserati.png' },
    { name: 'Mercedes Benz', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/mercedes_benz.png' },
    { name: 'Pagani', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/pagani.png' },
    { name: 'Maybach', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/maybach.png' },
    { name: 'Brabus', logo: 'https://www.car-logos.org/wp-content/uploads/2011/09/brabus.png' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="luxury-container">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-4 font-bold">Discover Excellence</h2>
            <h3 className="text-4xl font-serif">Popular Makes</h3>
          </div>
          <Link 
            to="/inventory" 
            className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center group"
          >
            view all 
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-gray-100 border border-gray-100">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ zIndex: 10 }}
              className="relative group bg-white p-8 flex items-center justify-center aspect-square cursor-pointer overflow-hidden transition-all hover:shadow-2xl"
            >
              {/* Subtle Background Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 select-none">
                <span className="text-4xl font-bold uppercase tracking-tighter transform -rotate-12">
                  {brand.name}
                </span>
              </div>

              {/* Logo Image */}
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="w-full h-auto max-w-[80px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
              />

              {/* Brand Name on Hover (Bottom) */}
              <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                  {brand.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularMakes;
