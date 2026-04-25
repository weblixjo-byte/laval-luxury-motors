import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const Financing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src="/images/financing-hero.png" 
            alt="Financing Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl mb-6 font-serif"
          >
            Bespoke <br /><span className="italic text-luxury-accent">Financing</span>
          </motion.h1>
          <p className="text-lg md:text-xl font-light tracking-[0.2em] uppercase">
            Tailored Capital Solutions for Extraordinary Assets
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 luxury-container relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-accent/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto text-center bg-white/40 backdrop-blur-sm p-12 border border-gray-100 rounded-sm shadow-sm">
          <h2 className="text-3xl md:text-5xl mb-10 font-serif leading-tight">Financial Flexibility <br />for the Modern Collector</h2>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed font-light">
            Acquiring a masterpiece requires more than just capital; it requires a partner who understands the unique value of high-end automotive assets. At Laval, we offer private financing structures designed to align with your personal wealth strategy.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-luxury-accent/10 flex items-center justify-center text-luxury-accent font-serif text-xl">1</div>
              <h3 className="text-lg font-serif">Competitive Rates</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Securing the most favorable terms through our network of elite global banking partners.</p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 bg-luxury-accent/10 flex items-center justify-center text-luxury-accent font-serif text-xl">2</div>
              <h3 className="text-lg font-serif">Confidential Process</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Discretion is our hallmark. Every inquiry is handled with the utmost privacy and professional care.</p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 bg-luxury-accent/10 flex items-center justify-center text-luxury-accent font-serif text-xl">3</div>
              <h3 className="text-lg font-serif">Rapid Approval</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Our streamlined valuation and credit process ensures you never miss a rare acquisition opportunity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-24 bg-luxury-grey">
        <div className="luxury-container">
          <div className="bg-white p-8 md:p-16 shadow-2xl max-w-5xl mx-auto border-t-4 border-luxury-accent">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-serif mb-6">Financing Application</h2>
                <p className="text-gray-600 mb-8 font-light">
                  Complete this brief form to start a private consultation with our financing specialists. We will provide a tailored proposal within 24 hours.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-luxury-accent"></span>
                    Flexible payment structures
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-luxury-accent"></span>
                    Asset-backed lending options
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-luxury-accent"></span>
                    Equity release from current collections
                  </div>
                </div>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Estimated Loan Amount</label>
                  <select className="w-full bg-gray-50 border border-gray-100 p-4 outline-none focus:border-luxury-accent transition-all appearance-none text-sm">
                    <option>$100,000 - $500,000</option>
                    <option>$500,000 - $1,000,000</option>
                    <option>$1,000,000 - $5,000,000</option>
                    <option>$5,000,000+</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-luxury-accent" />
                  <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-luxury-accent" />
                </div>
                <textarea placeholder="Tell us about the vehicle you wish to finance" className="w-full bg-gray-50 border border-gray-100 p-4 text-sm h-32 outline-none focus:border-luxury-accent resize-none"></textarea>
                <button className="w-full bg-luxury-black text-white py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-luxury-accent transition-all duration-500">
                  Request Proposal
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Financing;

