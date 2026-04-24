import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center pt-40 pb-24 px-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/contact-bg.png" 
          alt="Luxury Showroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      <div className="luxury-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-7xl mb-6 font-serif">Private <br /><span className="italic text-luxury-accent">Inquiry</span></h1>
            <p className="text-xl text-gray-300 mb-12 max-w-md font-light leading-relaxed">
              Our concierge team is available for private viewings and global procurement inquiries.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-luxury-accent transition-all duration-500">
                  <span className="text-[10px] uppercase font-bold">Loc</span>
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-luxury-accent mb-1 font-bold">Our Atelier</h3>
                  <p className="text-lg font-light">123 Luxury Way, Beverly Hills, CA 90210</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-luxury-accent transition-all duration-500">
                   <span className="text-[10px] uppercase font-bold">Tel</span>
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-luxury-accent mb-1 font-bold">Direct Line</h3>
                  <p className="text-lg font-light">+1 (555) 789-0123</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-luxury-accent transition-all duration-500">
                   <span className="text-[10px] uppercase font-bold">Env</span>
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-luxury-accent mb-1 font-bold">Email</h3>
                  <p className="text-lg font-light">concierge@lavalmotors.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Glassmorphism Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">First Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-luxury-accent outline-none transition-all" 
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-luxury-accent outline-none transition-all" 
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-luxury-accent outline-none transition-all" 
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Message</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 p-4 text-white h-32 focus:border-luxury-accent outline-none transition-all resize-none" 
                  placeholder="How can we assist you?"
                ></textarea>
              </div>

              <button className="w-full bg-white text-black py-5 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-luxury-accent hover:text-white transition-all duration-500">
                Send Inquiry
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
