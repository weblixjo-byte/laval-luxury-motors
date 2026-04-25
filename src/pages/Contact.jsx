import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const Contact = () => {
  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="luxury-container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase tracking-[0.5em] text-luxury-accent font-bold mb-6"
            >
              Concierge Service
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-serif text-luxury-black mb-8"
            >
              Contact <span className="italic">Us</span>
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="w-24 h-px bg-luxury-accent mx-auto mb-8"
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-16"
            >
              <div>
                <h3 className="text-xl font-serif mb-8 text-luxury-black">Global HQ & Showroom</h3>
                <div className="space-y-4 text-gray-500 font-light leading-relaxed">
                  <p className="text-lg">123 Luxury Boulevard</p>
                  <p className="text-lg">Geneva, Switzerland, 1201</p>
                  <div className="pt-4">
                    <a href="#" className="text-xs uppercase tracking-widest border-b border-luxury-accent pb-1 text-luxury-black font-bold">Get Directions</a>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-xl font-serif text-luxury-black">Connect With Us</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">General Inquiries</span>
                    <span className="text-lg text-luxury-black">concierge@lavalmotors.com</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Sales Desk</span>
                    <span className="text-lg text-luxury-black">+41 22 123 4567</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Service Atelier</span>
                    <span className="text-lg text-luxury-black">+41 22 123 4568</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-sm text-gray-400 italic serif">
                  Our specialists are available for private consultations by appointment only.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-50 p-12 md:p-16 rounded-sm border border-gray-100 shadow-sm"
            >
              <h3 className="text-2xl font-serif mb-12 text-luxury-black">Send a Private Inquiry</h3>
              <form className="space-y-10">
                <div className="relative">
                  <input 
                    type="text" 
                    id="name"
                    className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400" 
                    placeholder="FULL NAME"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400" 
                    placeholder="EMAIL ADDRESS"
                  />
                </div>
                <div className="relative">
                  <select 
                    className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-luxury-accent transition-colors text-[10px] uppercase tracking-widest font-bold text-gray-400 appearance-none"
                  >
                    <option>Select Interest</option>
                    <option>Vehicle Purchase</option>
                    <option>Sell Your Vehicle</option>
                    <option>Atelier Service</option>
                    <option>Press Inquiry</option>
                  </select>
                </div>
                <div className="relative">
                  <textarea 
                    rows="4" 
                    className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400 resize-none" 
                    placeholder="HOW CAN WE ASSIST YOU?"
                  ></textarea>
                </div>
                
                <button className="w-full py-5 bg-luxury-black text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-luxury-accent transition-all duration-500 shadow-xl">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Image/Map Section */}
      <section className="mt-32 h-[50vh] w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
        <img 
          src="https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&q=80" 
          alt="Laval Showroom" 
          className="w-full h-full object-cover"
        />
      </section>
    </div>
  );
};

export default Contact;


