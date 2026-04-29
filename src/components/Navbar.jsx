import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { client } from '../client';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Fetch dynamic brands from Sanity
    const fetchBrands = async () => {
      try {
        const query = `*[_type == "brand"] | order(order asc, name asc) { name }`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setBrands(data.map(b => b.name));
        } else {
          setBrands([]);
        }
      } catch (err) {
        console.error("Fetch brands error:", err);
      }
    };

    fetchBrands();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
    >
      {/* Main Header Row */}
      <div className={`luxury-container flex justify-between items-end bg-inherit transition-all duration-500 ${isScrolled || !isHome ? 'h-12 md:h-auto pt-2 pb-3 md:pb-2' : 'h-16 md:h-auto pt-4 pb-4 md:pb-2'
        }`}>
        <div className="flex items-center space-x-8 mb-1 md:mb-0">
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
          {['Inventory', 'Services', 'Financing', 'About'].map((item) => (
            <Link 
              key={item}
              to={`/${item.toLowerCase()}`} 
              className={`transition-all duration-300 relative group ${
                location.pathname === `/${item.toLowerCase()}` ? 'text-luxury-accent' : 'hover:opacity-70'
              }`}
            >
              {item}
              {location.pathname === `/${item.toLowerCase()}` && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-luxury-accent"></span>
              )}
            </Link>
          ))}
          <Link
            to="/contact"
            className={`px-6 py-2 border transition-all ${
              location.pathname === '/contact'
                ? 'border-luxury-accent bg-luxury-accent text-white'
                : (isScrolled || !isHome ? 'border-black bg-black text-white hover:bg-white hover:text-black' : 'border-white bg-transparent hover:bg-white hover:text-black')
            }`}
          >
            Inquire
          </Link>
        </div>
      </div>

      {/* Brands Row - Optimized for Mobile Scroll */}
      <div className={`border-t transition-all duration-300 ${isScrolled || !isHome
        ? 'bg-white border-gray-100 py-3'
        : 'bg-transparent border-white/10 py-3'
        }`}>
        <div className="luxury-container flex justify-between md:justify-around overflow-x-auto no-scrollbar gap-8 md:gap-0">
          {brands.map(brand => (
            <Link
              key={brand}
              to={`/inventory?brand=${brand}`}
              className={`text-[9px] uppercase tracking-widest transition-colors whitespace-nowrap ${isScrolled || !isHome ? 'text-gray-500 hover:text-black' : 'text-white/80 hover:text-white'
                }`}
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay - Premium Redesign */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 left-0 w-[80%] max-w-sm bg-luxury-black flex flex-col p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-white text-2xl font-serif tracking-[0.2em]">LAVAL</span>
                <button
                  className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col space-y-8">
                {['Inventory', 'Services', 'Financing', 'About', 'Contact'].map((item, idx) => {
                  const path = `/${item.toLowerCase().replace(/ /g, '-')}`;
                  const isActive = location.pathname === path;
                  
                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      <Link
                        to={path}
                        className={`uppercase tracking-[0.2em] font-light transition-colors flex items-center justify-between group ${
                          isActive ? 'text-luxury-accent text-3xl font-normal' : 'text-white text-2xl hover:text-luxury-accent'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center gap-4">
                          {item}
                          {isActive && <div className="w-2 h-2 rounded-full bg-luxury-accent animate-pulse"></div>}
                        </div>
                        <span className={`text-[10px] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>→</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-auto pt-12 border-t border-white/10 space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Showroom</p>
                  <p className="text-sm text-gray-300 font-light italic">1530 Iris Dr SW, Conyers Ga</p>
                </div>
                <div className="flex space-x-6">
                  {['Instagram', 'LinkedIn'].map(social => (
                    <a key={social} href="#" className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

