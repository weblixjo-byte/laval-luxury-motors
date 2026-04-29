import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { client } from '../client';

const Inventory = ({ onInquire }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const brandFromUrl = searchParams.get('brand');

  const brands = [
    'All',
    'Honda',
    'Mazda',
    'Audi',
    'Hyundai',
    'Mercedes',
    'BMW',
    'Toyota'
  ];

  const staticFallbackCars = [
    {
      id: 'fb1',
      year: 2021,
      brand: 'Honda',
      name: 'Honda Civic Si',
      model: 'Civic Si',
      mileage: 48250,
      transmission: 'Manual',
      price: 26995,
      weeklyPayment: '$146/wk',
      image: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&q=80'
    },
    {
      id: 'fb2',
      year: 2020,
      brand: 'Mazda',
      name: 'Mazda3 GT',
      model: 'Mazda3 GT',
      mileage: 36800,
      transmission: 'Automatic',
      image: 'https://images.unsplash.com/photo-1517524008436-bbdb53c57d59?auto=format&fit=crop&q=80'
    },
    {
      id: 'fb3',
      year: 2019,
      brand: 'Audi',
      name: 'Audi A4 Progressiv',
      model: 'A4 Progressiv',
      mileage: 62100,
      transmission: 'Automatic',
      image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80'
    },
    {
      id: 'fb4',
      year: 2022,
      brand: 'Hyundai',
      name: 'Hyundai Elantra Preferred',
      model: 'Elantra Preferred',
      mileage: 29400,
      transmission: 'Automatic',
      image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80'
    }
  ];

  const [allCars, setAllCars] = useState(staticFallbackCars);
  const selectedBrand = brandFromUrl || 'All';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "vehicle"] | order(year desc) {
          "id": _id,
          name,
          "brand": brand->name,
          year,
          mileage,
          transmission,
          bodyType,
          price,
          weeklyPayment,
          "image": mainImage
        }`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setAllCars(data);
        }
      } catch (err) {
        console.error("Sanity fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const filteredCars = selectedBrand === 'All' 
    ? allCars 
    : allCars.filter(car => car.brand?.toLowerCase() === selectedBrand.toLowerCase());

  const handleBrandChange = (brand) => {
    if (brand === 'All') {
      searchParams.delete('brand');
    } else {
      searchParams.set('brand', brand);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="pt-32 pb-32 min-h-screen bg-white">
      <div className="luxury-container">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-luxury-accent"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold">Curated Collection</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-luxury-black mb-8 italic">The Inventory</h1>
        </motion.header>

        {/* Categories Bar */}
        <div className="mb-16 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
          <div className="flex gap-8 md:gap-12 border-b border-gray-100 min-w-max">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => handleBrandChange(brand)}
                className={`pb-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 relative ${
                  selectedBrand.toLowerCase() === brand.toLowerCase() ? 'text-luxury-black' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {brand}
                {selectedBrand.toLowerCase() === brand.toLowerCase() && (
                  <motion.div 
                    layoutId="activeBrand"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <CarCard car={car} onInquire={onInquire} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCars.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <p className="text-xl text-gray-400 font-serif italic">
              No {selectedBrand !== 'All' ? selectedBrand : ''} vehicles currently available.
            </p>
            <button 
              onClick={() => handleBrandChange('All')}
              className="mt-8 text-[10px] uppercase tracking-widest border-b border-luxury-accent pb-1"
            >
              View Full Collection
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Inventory;


