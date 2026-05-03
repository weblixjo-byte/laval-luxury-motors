import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import { client, urlFor } from '../client';
import CarCard from '../components/CarCard';
import SanityContent from '../components/SanityContent';

import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Banknote, 
  CheckCircle, 
  RefreshCcw, 
  Truck,
  Phone,
  Mail
} from 'lucide-react';

const Home = ({ onInquire }) => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsQuery = `*[_type == "vehicle" && isNewArrival == true][0...4] {
          "id": _id,
          year,
          "brand": brand->name,
          model,
          name,
          "image": mainImage,
          gallery,
          specifications
        }`;
        const settingsQuery = '*[_type == "siteSettings"][0]';
        
        const [cars, siteSettings] = await Promise.all([
          client.fetch(carsQuery),
          client.fetch(settingsQuery)
        ]);

        setFeaturedCars(cars);
        setSettings(siteSettings);
        setLoading(false);
      } catch (err) {
        console.error("Sanity fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center font-serif italic text-2xl">Laval Luxury Motors...</div>;

  return (
    <div className="flex flex-col bg-white font-sans">
      {/* Hero Section */}
      <section className="relative h-[650px] md:h-[850px] flex items-center bg-white">
        <div className="absolute inset-0">
          {settings?.homeHero?.image && (
            <img 
              src={urlFor(settings.homeHero.image).width(1920).url()} 
              alt="Hero Background" 
              className="w-full h-full object-cover"
              fetchpriority="high"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 lg:px-8 w-full pt-20">
          <div className="max-w-xl text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-8xl font-serif font-bold leading-tight mb-6"
            >
              <SanityContent value={settings?.homeHero?.title} />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-3xl font-serif italic mb-6 text-[#D4AF37]"
            >
              <SanityContent value={settings?.homeHero?.subtitle} />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link 
                to="/inventory" 
                className="bg-[#D4AF37] hover:bg-[#B8860B] text-white font-bold py-4 px-10 text-sm uppercase tracking-[0.2em] flex items-center justify-center transition-all duration-300 shadow-xl"
              >
                Browse Inventory
                <span className="ml-3">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Heritage Section (formerly About Us Preview) */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#D4AF37] z-10"></div>
              {settings?.homeHeritage?.image && (
                <img src={urlFor(settings.homeHeritage.image).width(800).url()} alt="Heritage" className="w-full h-[500px] object-cover shadow-2xl relative z-0" />
              )}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#D4AF37] z-10"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 space-y-8"
            >
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-[#D4AF37]">The Laval Heritage</h2>
              <div className="text-4xl md:text-6xl font-serif text-gray-900 leading-tight">
                <SanityContent value={settings?.homeHeritage?.title} />
              </div>
              <div className="text-lg text-gray-500 font-light leading-relaxed">
                <SanityContent value={settings?.homeHeritage?.text} />
              </div>
              <div className="pt-6">
                <Link to="/about" className="inline-flex items-center text-sm font-bold uppercase tracking-[0.3em] group">
                  <span className="border-b-2 border-gray-900 pb-1 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-all">Discover Our Story</span>
                  <ArrowRight size={18} className="ml-4 transition-transform group-hover:translate-x-2 group-hover:text-[#D4AF37]" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 border-b border-gray-100 pb-6 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">New Arrivals</h2>
              <div className="h-1 w-20 bg-[#D4AF37]"></div>
            </div>
            <Link to="/inventory" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center group">
              View All Inventory <span className="ml-2 transition-transform group-hover:translate-x-2">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCars.map((car, idx) => (
              <CarCard key={car.id || idx} car={car} onInquire={onInquire} />
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-32 bg-[#FBFBFB] border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-4">Our Commitment</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-gray-900">Excellence in Every Detail</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-gray-100 bg-white shadow-sm">
            {[
              { title: 'Quality Inspected', desc: 'Every vehicle is carefully inspected for your peace of mind.', Icon: ShieldCheck },
              { title: 'Affordable Prices', desc: 'Great value vehicles with financing options to fit your budget.', Icon: Banknote },
              { title: 'Warranty Options', desc: 'Extended warranty options available for added protection.', Icon: CheckCircle },
              { title: 'Trade-Ins Welcome', desc: 'We make it easy to trade in your current vehicle.', Icon: RefreshCcw },
              { title: 'Nationwide Shipping', desc: 'Ask us about delivery options across Canada.', Icon: Truck }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center p-12 group transition-all duration-500 hover:bg-[#0F0F0F] hover:text-white border-r border-gray-100 last:border-r-0">
                <div className="w-12 h-12 mb-8 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                  <feature.Icon size={40} strokeWidth={1} />
                </div>
                <h4 className="font-bold text-[11px] uppercase tracking-[0.25em] mb-4 text-center">{feature.title}</h4>
                <p className="text-[11px] text-gray-400 group-hover:text-gray-300 text-center leading-relaxed font-light px-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Consultation */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#0F0F0F] text-white">
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-10"
          >
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4AF37]">Private Consultation</h2>
            <h3 className="text-3xl md:text-6xl font-serif italic">Your Personal Concierge Awaits</h3>
            <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed">
              Whether you are looking to acquire a rare masterpiece or require bespoke services for your collection, our team is at your disposal 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-12 pt-8 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400">
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-[#D4AF37]" />
                <span>{settings?.contactInfo?.salesPhone || '+1 (404) 790-8336'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[#D4AF37]" />
                <span>{settings?.contactInfo?.generalEmail || 'Help@lavalmotors.com'}</span>
              </div>
            </div>

            <div className="pt-10">
              <Link 
                to="/contact" 
                className="bg-[#D4AF37] text-white px-10 md:px-16 py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-white hover:text-black transition-all duration-500 shadow-2xl w-full sm:w-auto inline-block"
              >
                Book a Private Meeting
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

