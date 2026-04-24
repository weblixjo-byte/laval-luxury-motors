import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // Safe item variants that don't start at opacity 0 if possible, 
  // but for Framer Motion to work they usually need to.
  // I will use a shorter duration and ensure they are visible.
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/about-hero.png" 
            alt="Luxury Car Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl mb-6 font-serif"
          >
            Laval Heritage
          </motion.h1>
          <p className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase">
            Defining Automotive Excellence
          </p>
        </div>
      </section>

      {/* Our Legacy Section */}
      <section className="py-24 luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight font-serif">The Pursuit of <br /><span className="italic text-luxury-accent">Perfection</span></h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in the heart of automotive passion, Laval Luxury Motors has spent decades curating a collection that transcends mere transportation. We believe a car is not just a machine, but a masterpiece of engineering and art.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
              Our journey began with a single vision: to provide the world's most discerning collectors with access to vehicles that represent the absolute pinnacle of performance and luxury.
            </p>
            <div className="flex gap-12 pt-4">
              <div>
                <span className="block text-3xl font-serif text-luxury-black">25+</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Years Experience</span>
              </div>
              <div>
                <span className="block text-3xl font-serif text-luxury-black">500+</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Masterpieces Sold</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="/images/about-legacy.png" 
              alt="Luxury Craftsmanship" 
              className="w-full rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute -bottom-6 -left-6 bg-luxury-black text-white p-8 hidden md:block border-l-4 border-luxury-accent">
              <p className="font-serif italic text-xl">"Luxury is in each detail."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values - No Lucide icons, using simple shapes/text */}
      <section className="py-24 bg-luxury-grey">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 font-serif">The Laval Standard</h2>
            <div className="w-20 h-1 bg-luxury-accent mx-auto mb-6"></div>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold">Our Unwavering Commitment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Integrity", desc: "Every vehicle is rigorously inspected and certified to meet our uncompromising standards." },
              { title: "Exclusivity", desc: "We source only the rarest and most sought-after automotive treasures globally." },
              { title: "Performance", desc: "Our collection represents the cutting edge of automotive engineering and power." },
              { title: "Service", desc: "Tailored concierge experiences designed around your unique lifestyle and needs." }
            ].map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-10 text-center group hover:bg-luxury-black transition-all duration-500 border border-gray-100"
              >
                <div className="w-12 h-12 mx-auto mb-6 border border-luxury-accent flex items-center justify-center group-hover:bg-luxury-accent transition-colors">
                  <span className="text-luxury-accent group-hover:text-white font-serif text-xl">{value.title[0]}</span>
                </div>
                <h3 className="text-xl mb-4 group-hover:text-white transition-colors font-serif">{value.title}</h3>
                <p className="text-gray-500 group-hover:text-gray-400 transition-colors text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white text-center">
        <div className="luxury-container">
          <h2 className="text-5xl md:text-6xl mb-8 leading-tight font-serif italic">Your journey into <br />excellence begins here.</h2>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-light">
            Experience the world's most exclusive automotive collection in person.
          </p>
          <a 
            href="/inventory" 
            className="inline-block bg-luxury-black text-white px-12 py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-luxury-accent transition-all duration-500"
          >
            Explore Collection
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
