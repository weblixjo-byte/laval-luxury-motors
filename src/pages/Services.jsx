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
import interiorImg from '../assets/about_interior.jpg';
import exteriorImg from '../assets/about_exterior.jpeg';

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="luxury-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-luxury-accent"></div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold">Professional Care</span>
              <div className="w-8 h-px bg-luxury-accent"></div>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold text-gray-900 tracking-tight">Services</h1>

            <div className="w-16 h-px bg-gray-200 mx-auto"></div>

            <p className="text-xl text-gray-500 font-light leading-relaxed">
              At Laval Motors, we provide quality maintenance and expert care to keep your vehicle in peak condition. Honest service you can depend on.
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
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">Mechanics and <br />Maintenance</h2>
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
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">Perfection <br />& Protection</h2>
            <ul className="space-y-4">
              {[
                "Hand Wash & Wax",
                "Interior Deep Clean",
                "Ceramic Coating",
                "Paint Correction",
                "Scratch Removal",
                "Wheel & Tire Shine",
                "Leather Conditioning",
                "Showroom Finish"
              ].map((item, i) => (
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
            <h2 className="text-4xl font-bold mb-6 text-[#D4AF37]">The Laval Standard</h2>
            <p className="text-gray-400 font-light">Experience service that goes beyond the ordinary.</p>
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
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Ready to Give Your Vehicle the Care It Deserves?</h2>
            <p className="text-gray-500 font-light text-lg">Schedule a consultation with our team today.</p>
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
                Call Our Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
