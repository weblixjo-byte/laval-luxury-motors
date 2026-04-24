/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const serviceCategories = [
    {
      title: "Mechanical Mastery",
      description: "Our certified master technicians specialize in the preservation and performance of high-performance powerplants, from V12 masterpieces to modern hybrid systems.",
      features: ["Precision Tuning", "Engine Overhaul", "Performance Upgrades", "Scheduled Maintenance"],
      image: "/images/service-mechanic.png"
    },
    {
      title: "The Atelier (Detailing)",
      description: "A sanctuary for automotive aesthetics. We provide surgical-level detailing and protection services to ensure your vehicle remains in concours condition.",
      features: ["Paint Protection Film", "Ceramic Coating", "Paint Correction", "Interior Restoration"],
      image: "/images/service-tuning.png"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services-hero.png"
            alt="The Laval Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative h-full luxury-container flex flex-col justify-center items-start text-left text-white">
          <h2 className="text-[10px] uppercase tracking-[0.5em] mb-4 opacity-70">The Atelier</h2>
          <h1 className="text-5xl md:text-8xl mb-8 font-serif leading-tight">Mastery & <br />Preservation.</h1>
          <p className="text-sm md:text-base uppercase tracking-[0.3em] font-bold opacity-80 max-w-2xl">
            Beyond the showroom, we offer world-class maintenance and aesthetic refinement for the worlds most exquisite automobiles.
          </p>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-24 bg-white">
        <div className="luxury-container max-w-4xl text-center">
          <h3 className="text-3xl font-serif mb-8 leading-relaxed">
            "We do not merely service cars; we curate their longevity and enhance their legacy."
          </h3>
          <div className="w-24 h-px bg-luxury-accent mx-auto"></div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="pb-32">
        <div className="luxury-container space-y-32">
          {serviceCategories.map((service, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24`}>
              {/* Image */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 space-y-8">
                <h3 className="text-4xl md:text-5xl font-serif">{service.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-y-4 pt-4">
                  {service.features.map(feature => (
                    <div key={feature} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-luxury-accent rounded-full"></div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-8">
                  <button className="px-10 py-4 border border-black uppercase tracking-widest text-[10px] font-bold hover:bg-black hover:text-white transition-all">
                    Book Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Sourcing CTA */}
      <section className="py-32 bg-luxury-black text-white text-center">
        <div className="luxury-container max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-serif mb-12">Performance Refinement.</h2>
          <p className="text-gray-400 mb-12 serif italic text-lg leading-relaxed">
            From aerodynamic enhancements to bespoke interior tailoring, our atelier specialists can transform your vehicle into a unique expression of your taste.
          </p>
          <button className="text-sm uppercase tracking-[0.4em] font-bold border-b-2 border-white pb-2 hover:opacity-50 transition-all">
            Inquire About Customization
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;
