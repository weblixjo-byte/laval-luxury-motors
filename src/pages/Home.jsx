/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../client';
import heroImageFallback from '../assets/hero.png';
import porscheImageFallback from '../assets/porsche.png';
import CarCard from '../components/CarCard';
import PopularMakes from '../components/PopularMakes';

const Home = ({ onInquire }) => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [homeContent, setHomeContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const query = `*[_type == "siteSettings"][0] {
          homeHero {
            title,
            subtitle,
            "image": image.asset->url
          },
          homeHeritage {
            title,
            text,
            "image": image.asset->url
          },
          featuredCollection[]-> {
            "id": _id,
            name,
            year,
            location,
            price,
            "category": category->title,
            "image": mainImage
          }
        }`;
        const data = await client.fetch(query);
        if (data) {
          setHomeContent(data);
          if (data.featuredCollection && data.featuredCollection.length > 0) {
            setFeaturedCars(data.featuredCollection);
          }
        }
      } catch (err) {
        console.error("Sanity fetch error:", err);
      }
    };

    fetchContent();
  }, []);

  const hero = homeContent?.homeHero;
  const heritage = homeContent?.homeHeritage;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={hero?.image || heroImageFallback}
            alt="Luxury Hypercar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>

        <div className="relative h-full luxury-container flex flex-col justify-center items-start text-left text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-8xl mb-8 font-serif leading-tight">
              {hero?.title || 'Luxury Cars'}
            </h1>
            <p className="text-sm md:text-base uppercase tracking-[0.3em] font-bold opacity-100 mb-12">
              {hero?.subtitle || 'EXPLORE 31,000+ LUXURY CARS, SUPERCARS AND EXOTIC CARS FOR SALE WORLDWIDE IN ONE SIMPLE SEARCH'}
            </p>

            <div className="flex space-x-6">
              <Link
                to="/inventory"
                className="px-10 py-4 bg-white text-luxury-black uppercase tracking-widest text-xs font-bold hover:bg-opacity-90 transition-all shadow-xl"
              >
                View Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Makes Section */}
      <PopularMakes />

      {/* Featured Collection */}
      <section className="py-32 bg-white">
        <div className="luxury-container">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">Current Highlights</h2>
              <h3 className="text-4xl md:text-5xl font-serif">The Featured Collection</h3>
            </div>
            <Link to="/inventory" className="text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-60 transition-opacity">
              View All Inventory
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredCars.map((car, idx) => (
              <CarCard key={car.id || idx} car={car} onInquire={onInquire} />
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-32 bg-luxury-grey">
        <div className="luxury-container grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="aspect-[4/5] bg-gray-200 overflow-hidden">
            <img
              src={heritage?.image || porscheImageFallback}
              alt="Laval Heritage"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400">Our Heritage</h2>
            <h3 className="text-4xl md:text-6xl font-serif leading-tight">
              {heritage?.title || 'Defining Luxury Since 2004.'}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed serif italic">
              {heritage?.text || '"We believe that a car is more than a machine; it is a work of art, a statement of intent, and a legacy to be preserved."'}
            </p>
            <div className="pt-8">
              <Link to="/about" className="px-12 py-4 border border-luxury-black uppercase tracking-widest text-xs font-bold hover:bg-luxury-black hover:text-white transition-all">
                The Laval Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Concierge CTA */}
      <section className="py-40 bg-white text-center">
        <div className="luxury-container max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-serif mb-12">Exceptional Service for the Global Elite.</h2>
          <p className="text-xl text-gray-500 mb-12 serif italic">
            Looking for something specific? Our concierge team sources off-market vehicles worldwide.
          </p>
          <Link to="/contact" className="text-sm uppercase tracking-[0.4em] font-bold border-b-2 border-luxury-black pb-2 hover:opacity-50 transition-all">
            Start a Private Inquiry
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
