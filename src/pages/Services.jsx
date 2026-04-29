import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Sparkles, 
  ShieldCheck, 
  Settings,
  Activity,
  CheckCircle2
} from 'lucide-react';

// Using local assets to ensure they show up
import heroImg from '../assets/hero_bright.png';
import interiorImg from '../assets/about_interior.png';
import exteriorImg from '../assets/about_exterior.png';

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src={heroImg} 
            alt="Services Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl mb-6 font-serif tracking-tight">
              Mastery & <span className="italic text-[#D4AF37]">Care.</span>
            </h1>
            <p className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-gray-300">
              Technical Excellence for Exceptional Machines
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-24 luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center rounded-full">
              <Wrench className="text-[#D4AF37]" size={24} />
            </div>
            <h2 className="text-4xl font-serif text-gray-900 leading-tight">Mechanical Excellence <br />& Maintenance</h2>
            <p className="text-gray-600 font-light leading-relaxed text-lg">
              Our state-of-the-art atelier is staffed by certified master technicians who treat every vehicle with the precision it deserves. From routine maintenance to complex performance tuning.
            </p>
            <ul className="space-y-4">
              {["Diagnostic Precision", "Engine & Transmission", "Suspension Tuning", "Brake Systems"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-500">
                  <CheckCircle2 size={16} className="text-[#D4AF37]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-sm overflow-hidden shadow-2xl h-[500px]"
          >
            <img src={interiorImg} alt="Workshop Interior" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20 md:mb-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-sm overflow-hidden shadow-2xl h-[500px] md:order-1 order-2"
          >
            <img src={exteriorImg} alt="Detailing Center" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 md:order-2 order-1"
          >
            <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center rounded-full">
              <Sparkles className="text-[#D4AF37]" size={24} />
            </div>
            <h2 className="text-4xl font-serif text-gray-900 leading-tight">Aesthetic Perfection <br />& Protection</h2>
            <p className="text-gray-600 font-light leading-relaxed text-lg">
              Preserve the beauty of your investment with our museum-grade detailing services. We specialize in ceramic coatings, paint protection films, and comprehensive aesthetic restorations.
            </p>
            <ul className="space-y-4">
              {["Ceramic Pro Coating", "Self-Healing PPF", "Paint Correction", "Interior Rejuvenation"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-500">
                  <CheckCircle2 size={16} className="text-[#D4AF37]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us - Dark Section */}
      <section className="py-32 bg-[#0F0F0F] text-white">
        <div className="luxury-container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-serif mb-6 italic text-[#D4AF37]">The Laval Standard</h2>
            <p className="text-gray-400 font-light">Experience service that goes beyond the ordinary. We provide a seamless, white-glove experience from start to finish.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: "Certified Experts", desc: "Our technicians hold the highest industry certifications for elite marques." },
              { icon: Settings, title: "OEM Parts", desc: "We use only genuine manufacturer parts to maintain your vehicle's integrity." },
              { icon: Activity, title: "Latest Tech", desc: "State-of-the-art diagnostic and repair equipment for absolute precision." }
            ].map((item, i) => (
              <div key={i} className="text-center p-8 border border-white/10 hover:border-[#D4AF37]/30 transition-colors group">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-white/5 rounded-full text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-serif mb-4">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 text-center bg-white">
        <div className="luxury-container">
          <div className="max-w-2xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight italic">Ready to Give Your Vehicle the Care It Deserves?</h2>
            <p className="text-gray-500 font-light text-lg">Schedule a consultation with our service concierge today.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/contact" 
                className="bg-black text-white px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#D4AF37] transition-all"
              >
                Book Appointment
              </a>
              <a 
                href="tel:+14702054117" 
                className="border border-black text-black px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black hover:text-white transition-all"
              >
                Call Concierge
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
