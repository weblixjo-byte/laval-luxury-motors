import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const brands = [
    'Bugatti', 'Pagani', 'Koenigsegg', 'Ferrari', 'Lamborghini', 'Mercedes', 'Rolls-Royce', 'McLaren', 'Brabus', 'Porsche', 'Aston Martin'
  ];

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
    >
      {/* Main Header Row - Dynamically shrinks on scroll */}
      <div className={`luxury-container flex justify-between items-center bg-inherit transition-all duration-500 ${isScrolled || !isHome ? 'pt-4 pb-2' : 'pt-8 pb-2'
        }`}>
        <div className="flex items-center space-x-8">
          <button
            className={`flex flex-col space-y-1.5 focus:outline-none ${isScrolled || !isHome ? 'text-black' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="block w-6 h-0.5 bg-current"></span>
            <span className="block w-6 h-0.5 bg-current"></span>
            <span className="block w-4 h-0.5 bg-current"></span>
          </button>

          <Link
            to="/"
            className={`text-2xl tracking-[0.25em] font-serif font-bold transition-colors duration-300 ${isScrolled || !isHome ? 'text-luxury-black' : 'text-white'
              }`}
          >
            LAVAL
          </Link>
        </div>

        {/* Search Bar - Center */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-12">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search Cars"
              className={`w-full px-12 py-3 rounded-full text-sm transition-all border ${isScrolled || !isHome
                ? 'bg-gray-100 border-gray-200 focus:bg-white text-black'
                : 'bg-white/10 border-white/20 focus:bg-white/20 text-white placeholder-white/70'
                } outline-none focus:ring-1 focus:ring-luxury-accent/50`}
            />
            <svg
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isScrolled || !isHome ? 'text-gray-400' : 'text-white/70'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Right Actions */}
        <div className={`hidden md:flex items-center space-x-8 text-[10px] uppercase tracking-[0.2em] font-bold ${isScrolled || !isHome ? 'text-luxury-black' : 'text-white'
          }`}>
          <Link to="/sell" className="hover:opacity-70 transition-opacity">Sell With Us</Link>
          <Link
            to="/contact"
            className={`px-6 py-2 border transition-all ${isScrolled || !isHome
              ? 'border-black bg-black text-white hover:bg-white hover:text-black'
              : 'border-white bg-transparent hover:bg-white hover:text-black'
              }`}
          >
            Inquire
          </Link>
        </div>

        {/* Mobile Toggle Icons (kept simple for now) */}
        <div className="md:hidden">
          {/* Mobile search icon could go here */}
        </div>
      </div>

      {/* Brands Row - Keeps consistent height */}
      <div className={`hidden md:block border-t transition-all duration-300 ${isScrolled || !isHome
        ? 'bg-white border-gray-100 py-3'
        : 'bg-transparent border-white/10 py-3'
        }`}>
        <div className="luxury-container flex justify-between">
          {brands.map(brand => (
            <Link
              key={brand}
              to={`/inventory?brand=${brand}`}
              className={`text-[9px] uppercase tracking-widest transition-colors ${isScrolled || !isHome ? 'text-gray-500 hover:text-black' : 'text-white/80 hover:text-white'
                }`}
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-luxury-black z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-white text-xl font-serif tracking-widest">LAVAL</span>
              <button
                className="text-white text-3xl"
                onClick={() => setIsMenuOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="flex flex-col space-y-8">
              {['Inventory', 'About', 'Contact', 'Sell With Us'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                  className="text-white text-2xl uppercase tracking-[0.2em] font-light hover:text-luxury-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
