import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../client';

const Footer = () => {
  const [footerText, setFooterText] = useState('© 2026 LAVAL LUXURY MOTORS');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await client.fetch(`*[_type == "siteSettings"][0]{footerText}`);
        if (data && data.footerText) setFooterText(data.footerText);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-luxury-black text-white pt-24 pb-12">
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl tracking-[0.2em] font-serif mb-6 block">LAVAL</Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              The worlds ultimate luxury car marketplace. Exceptional vehicles for the global connoisseur.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6 text-gray-500">Inventory</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li><Link to="/inventory">New Arrivals</Link></li>
              <li><Link to="/inventory">Hypercars</Link></li>
              <li><Link to="/inventory">Classic Collections</Link></li>
              <li><Link to="/inventory">SUVs & Off-road</Link></li>
              <li><Link to="/services">Atelier Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6 text-gray-500">Company</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Concierge</a></li>
              <li><a href="#">Press</a></li>
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

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-500">
          <div className="flex space-x-8 mb-4 md:mb-0">
            <span>{footerText}</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIN</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
