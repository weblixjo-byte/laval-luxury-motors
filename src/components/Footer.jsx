import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-luxury-black text-white pt-24 pb-12">
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl tracking-[0.2em] font-serif mb-6 block">LAVAL</Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The worlds ultimate luxury car marketplace. Exceptional vehicles for the global connoisseur.
            </p>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              <p>1530 Iris Dr SW</p>
              <p>Conyers Ga 30092</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6 text-gray-500">Inventory</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li><Link to="/inventory">New Arrivals</Link></li>
              <li><Link to="/inventory">Luxury Sedans</Link></li>
              <li><Link to="/inventory">SUVs & Off-road</Link></li>
              <li><Link to="/inventory">Family Collections</Link></li>
              <li><Link to="/services">Atelier Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6 text-gray-500">Company</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/financing">Financing</Link></li>
              <li><Link to="/contact">Concierge</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6 text-gray-500">Newsletter</h4>
            <p className="text-xs text-gray-400 mb-4 italic">Sign up for exclusive automotive news.</p>
            <form className="flex border-b border-gray-700 pb-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none text-xs w-full focus:outline-none uppercase tracking-widest"
              />
              <button type="submit" className="text-xs tracking-widest">→</button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-gray-500 gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
            <span>© 2026 LAVAL LUXURY MOTORS.</span>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          <div className="flex space-x-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIN</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

