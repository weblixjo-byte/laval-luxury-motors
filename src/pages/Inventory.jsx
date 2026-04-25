import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import { client } from '../client';
import ferrariImage from '../assets/ferrari.png';
import porscheImage from '../assets/porsche.png';
import heroImage from '../assets/hero.png';

const Inventory = ({ onInquire }) => {
  const staticFallbackCars = [
    {
      id: 1,
      name: 'Ferrari Daytona SP3',
      year: '2023',
      location: 'Maranello, Italy',
      price: '$2,250,000',
      category: 'Hypercar',
      image: ferrariImage
    },
    {
      id: 2,
      name: 'Porsche 911 Singer',
      year: '1992',
      location: 'California, USA',
      price: '$1,100,000',
      category: 'Classic',
      image: porscheImage
    },
    {
      id: 3,
      name: 'Bugatti Mistral',
      year: '2024',
      location: 'Molsheim, France',
      price: 'Price on Request',
      category: 'Hypercar',
      image: heroImage
    }
  ];

  const [brandFilter, setBrandFilter] = useState('All');
  const [allCars, setAllCars] = useState(staticFallbackCars);
  const [brands, setBrands] = useState([
    'All', 'Bugatti', 'Ferrari', 'Lamborghini', 'Porsche', 'Koenigsegg', 
    'McLaren', 'Rolls Royce', 'Aston Martin', 'Bentley', 'Maserati', 
    'Mercedes Benz', 'Pagani', 'Maybach', 'Brabus'
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch brands from Sanity
        const brandQuery = `*[_type == "brand"] { name }`;
        const brandData = await client.fetch(brandQuery);
        if (brandData && brandData.length > 0) {
          // If the user has added brands to Sanity, use them instead of the default list
          setBrands(['All', ...brandData.map(b => b.name)]);
        }

        // Fetch vehicles

        const query = `*[_type == "vehicle"] | order(year desc) {
          "id": _id,
          name,
          year,
          location,
          price,
          "brand": brand->name,
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

  const filteredCars = allCars.filter(car => {
    const matchBrand = brandFilter === 'All' || car.brand === brandFilter;
    return matchBrand;
  });

  return (
    <div className="pt-32 pb-32">
      <div className="luxury-container">
        <header className="mb-16">
          <h1 className="text-5xl font-serif mb-6">The Inventory</h1>
          <p className="text-gray-500 serif italic">A carefully curated selection of the worlds finest automobiles.</p>
        </header>

        {/* Filters */}
        <div className="space-y-8 border-b border-gray-100 pb-12 mb-12">
          {/* Brand Filters */}
          <div className="flex flex-wrap gap-8">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold w-full mb-2">Filter by Brand</span>
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => setBrandFilter(brand)}
                className={`text-xs uppercase tracking-widest pb-2 transition-all ${
                  brandFilter === brand 
                    ? 'border-b-2 border-luxury-black font-bold' 
                    : 'text-gray-400 hover:text-luxury-black'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {filteredCars.map((car, idx) => (
            <CarCard key={car.id || idx} car={car} onInquire={onInquire} />
          ))}
        </div>



        {filteredCars.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-gray-400 serif italic">No vehicles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
