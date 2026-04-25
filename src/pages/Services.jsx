import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const Services = () => {
  const serviceList = [
    {
      title: "Mechanical Mastery",
      desc: "Comprehensive diagnostic and repair services performed by certified master technicians. From routine fluid changes to complex engine rebuilds.",
      image: "/images/service-mechanic.png",
      items: ["Engine Diagnostics", "Transmission Service", "Suspension Tuning", "Brake System Overhaul"]
    },
    {
      title: "Bespoke Modification",
      desc: "Transform your vehicle into a unique expression of your vision. We specialize in performance tuning, aerodynamic enhancements, and custom interiors.",
      image: "/images/service-tuning.png",
      items: ["Performance Exhausts", "ECU Remapping", "Aero Body Kits", "Interior Customization"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src="/images/services-hero.png" 
            alt="Services Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl mb-6 font-serif"
          >
            Atelier <br /><span className="italic text-luxury-accent">Services</span>
          </motion.h1>
          <p className="text-lg md:text-xl font-light tracking-[0.3em] uppercase">
            Technical Excellence for Extraordinary Machines
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 luxury-container">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-serif mb-8">Uncompromising Care</h2>
          <p className="text-gray-600 leading-relaxed font-light text-lg">
            At Laval, we treat every vehicle as a masterpiece. Our state-of-the-art atelier is equipped with the latest technology to ensure your investment remains in peak condition, whether it's a vintage classic or a modern hypercar.
          </p>
        </div>

        {/* Service Blocks */}
        <div className="space-y-32">
          {serviceList.map((service, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}>
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2"
              >
                <img src={service.image} alt={service.title} className="w-full rounded-sm shadow-2xl" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 space-y-8"
              >
                <h3 className="text-4xl font-serif">{service.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{service.desc}</p>
                <ul className="grid grid-cols-2 gap-4">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-500 uppercase tracking-widest font-bold">
                      <span className="w-1.5 h-1.5 bg-luxury-accent rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <button className="border-b-2 border-luxury-black pb-2 text-[10px] uppercase tracking-[0.4em] font-bold hover:text-luxury-accent hover:border-luxury-accent transition-all">
                    Inquire for Service
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Detailing Section (Simple Banner) */}
      <section className="py-24 bg-luxury-black text-white overflow-hidden relative">
        <div className="luxury-container relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="md:w-2/3">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 italic">Aesthetic Perfection</h2>
            <p className="text-gray-400 font-light text-lg">
              From museum-grade detailing to self-healing paint protection films (PPF) and ceramic coatings. We ensure your vehicle shines brighter and lasts longer.
            </p>
          </div>
          <div className="md:w-1/3 text-center">
            <button className="bg-white text-black px-12 py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-luxury-accent hover:text-white transition-all duration-500">
              Detailing Menu
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-l from-luxury-accent to-transparent"></div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 bg-white text-center">
        <div className="luxury-container">
          <h2 className="text-4xl font-serif mb-8 italic">Ready to elevate your driving experience?</h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto font-light">
            Schedule a visit to our atelier or request a private collection for your vehicle.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-luxury-black text-white px-12 py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-luxury-accent transition-all duration-500"
          >
            Book Appointment
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;

