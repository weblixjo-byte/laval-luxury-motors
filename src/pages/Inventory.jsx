import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { client } from '../client';

const Inventory = ({ onInquire }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const brandFromUrl = searchParams.get('brand');
  const searchFromUrl = searchParams.get('search') || '';

  const [brands, setBrands] = useState(['All']);
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectedBrand = brandFromUrl || 'All';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch Brands
        const brandsQuery = `*[_type == "brand"] | order(order asc, name asc) { name }`;
        const brandsData = await client.fetch(brandsQuery);
        if (brandsData) {
          const uniqueBrands = ['All', ...new Set(brandsData.map(b => b.name.trim())), 'Sold'];
          setBrands(uniqueBrands);
        }

        // Fetch Vehicles
        const vehiclesQuery = `*[_type == "vehicle"] | order(year desc) {
          "id": _id,
          name,
          "brand": brand->name,
          model,
          year,
          "image": mainImage {
            asset-> {
              _id,
              url,
              metadata { lqip }
            }
          },
          gallery[] {
            asset-> {
              _id,
              url,
              metadata { lqip }
            }
          },
          specifications,
          description,
          mileage,
          price,
          priceDisplayMode,
          isSold
        }`;
        const vehiclesData = await client.fetch(vehiclesQuery);
        if (vehiclesData) {
          setAllCars(vehiclesData);
        }
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Real-time listener for "insane" updates
    const subscription = client.listen(`*[_type == "vehicle" || _type == "brand"]`).subscribe(() => {
      fetchData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const filteredCars = allCars.filter(car => {
    const isSoldCategory = selectedBrand.toLowerCase() === 'sold';

    // If we are looking at the "Sold" category, show only sold cars
    if (isSoldCategory) {
      if (!car.isSold) return false;
    } else {
      // Otherwise, show only available cars
      if (car.isSold) return false;
    }

    const matchesBrand = selectedBrand === 'All' || isSoldCategory || car.brand?.trim().toLowerCase() === selectedBrand.trim().toLowerCase();
    const matchesSearch = !searchFromUrl || 
      car.name?.toLowerCase().includes(searchFromUrl.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchFromUrl.toLowerCase()) ||
      car.brand?.toLowerCase().includes(searchFromUrl.toLowerCase());
    
    return matchesBrand && matchesSearch;
  });

  const handleBrandChange = (brand) => {
    if (brand === 'All') {
      searchParams.delete('brand');
    } else {
      searchParams.set('brand', brand);
    }
    searchParams.delete('search'); // Clear search when changing brand
    setSearchParams(searchParams);
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-32 min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-luxury-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
              No {selectedBrand !== 'All' ? selectedBrand : ''} {searchFromUrl ? `matching "${searchFromUrl}"` : ''} vehicles currently available.
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


