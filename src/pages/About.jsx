import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80"
            alt="Laval Heritage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-9xl font-serif mb-8"
          >
            Laval <span className="italic text-luxury-accent">Heritage</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-sm md:text-base uppercase tracking-[0.6em] font-light"
          >
            Established 2004 — Curators of Rare Automotive Art
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-24 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-sm uppercase tracking-[0.4em] text-luxury-accent font-bold">The Philosophy</h2>
            <h3 className="text-4xl md:text-6xl font-serif leading-tight text-luxury-black">
              Beyond the Machine, <br />We Sell <span className="italic">Emotion.</span>
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed font-light serif italic">
              "A car is more than transportation. It is a masterpiece of engineering, a fragment of history, and a legacy to be cherished for generations."
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="aspect-[4/5] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80" 
              alt="Detailing" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
            />
          </motion.div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-24 bg-luxury-black text-white">
        <div className="luxury-container grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Years of Excellence', value: '20+' },
            { label: 'Exotic Vehicles Sold', value: '1,200+' },
            { label: 'Global Partnerships', value: '45' },
            { label: 'Client Satisfaction', value: '100%' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className="text-4xl md:text-6xl font-serif text-luxury-accent mb-4">{stat.value}</h4>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-gray-50">
        <div className="luxury-container max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm uppercase tracking-[0.4em] text-gray-400 mb-6">Our Story</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-luxury-black">Two Decades of Automotive Curation</h3>
          </div>
          
          <div className="space-y-12 text-lg text-gray-600 leading-relaxed font-light">
            <p>
              Laval Luxury Motors was founded in 2004 with a singular mission: to redefine the acquisition experience for the world's most discerning collectors. What began as a private boutique has evolved into a global benchmark for rare and exotic automobiles.
            </p>
            <p>
              Our team consists of industry veterans, market analysts, and master technicians who live and breathe high-performance machines. Every vehicle in our collection undergoes a rigorous authentication and preparation process, ensuring that it meets our uncompromising standards of excellence.
            </p>
            <p className="italic serif text-2xl text-luxury-black pt-8">
              "We don't just find cars; we find the stories that deserve to be told."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;


