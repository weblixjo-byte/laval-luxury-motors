/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="luxury-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-4 font-bold">Concierge Service</h2>
            <h1 className="text-5xl md:text-7xl font-serif mb-8">Contact Us</h1>
            <p className="text-gray-500 serif italic text-lg">
              Our specialists are at your disposal for any inquiry regarding our collection or services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 bg-gray-50 p-12 rounded-sm border border-gray-100 shadow-sm">
            {/* Contact Form */}
            <div className="space-y-8">
              <h3 className="text-xl font-serif">Send an Inquiry</h3>
              <form className="space-y-6">
                <div>
                  <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition-colors text-sm" />
                </div>
                <div>
                  <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition-colors text-sm" />
                </div>
                <div>
                  <textarea placeholder="Message" rows="4" className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition-colors text-sm resize-none"></textarea>
                </div>
                <button className="px-12 py-4 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-all">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-serif mb-6">Showroom Location</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  123 Luxury Boulevard<br />
                  Geneva, Switzerland<br />
                  1201
                </p>
              </div>
              <div>
                <h3 className="text-xl font-serif mb-6">Connect</h3>
                <div className="space-y-4 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Email</span>
                    <span className="text-black">concierge@lavalmotors.com</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Phone</span>
                    <span className="text-black">+41 22 123 4567</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
