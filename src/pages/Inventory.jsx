import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import { client } from '../client';
import ferrariImage from '../assets/ferrari.png';
import porscheImage from '../assets/porsche.png';
import heroImage from '../assets/hero.png';

const Inventory = ({ onInquire }) => {
  const [filter, setFilter] = useState('All');
  const [allCars, setAllCars] = useState([]);

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
    },
    {
      id: 4,
      name: 'Lamborghini Revuelto',
      year: '2025',
      location: 'SantAgata, Italy',
      price: '$890,000',
      category: 'Supercar',
      image: ferrariImage
    },
    {
      id: 5,
      name: 'Aston Martin Valour',
      year: '2024',
      location: 'Gaydon, UK',
      price: '$1,500,000',
      category: 'Supercar',
      image: porscheImage
    },
    {
      id: 6,
      name: 'Rolls-Royce Spectre',
      year: '2024',
      location: 'Goodwood, UK',
      price: '$420,000',
      category: 'Luxury',
      image: heroImage
    }
  ];

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const query = `*[_type == "vehicle"] | order(year desc) {
          "id": _id,
          name,
          year,
          location,
          price,
          category,
          "image": mainImage
        }`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setAllCars(data);
        } else {
          setAllCars(staticFallbackCars);
        }
      } catch (err) {
        console.error("Sanity fetch error:", err);
        setAllCars(staticFallbackCars);
      }
    };

    fetchAllCars();
  }, []);

  const categories = ['All', 'Hypercar', 'Supercar', 'Classic', 'Luxury'];
  
  const filteredCars = filter === 'All' 
    ? allCars 
    : allCars.filter(car => car.category === filter);

  return (
    <div className="pt-32 pb-32">
      <div className="luxury-container">
        <header className="mb-16">
          <h1 className="text-5xl font-serif mb-6">The Inventory</h1>
          <p className="text-gray-500 serif italic">A carefully curated selection of the worlds finest automobiles.</p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-8 border-b border-gray-100 pb-8 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs uppercase tracking-widest pb-2 transition-all ${
                filter === cat 
                  ? 'border-b-2 border-luxury-black font-bold' 
                  : 'text-gray-400 hover:text-luxury-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} onInquire={onInquire} />
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
