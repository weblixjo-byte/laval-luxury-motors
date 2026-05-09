import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Diamond, 
  User, 
  Handshake, 
  ShieldCheck 
} from 'lucide-react';

// Using the newly generated high-quality images
import aboutExterior from '../assets/about_exterior.jpeg';

const About = () => {
  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="luxury-container mb-24 md:mb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-luxury-accent"></div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold">About Us</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif text-luxury-black leading-tight">
              About Us
            </h1>
            
            <div className="w-16 h-px bg-gray-200"></div>
            
            <div className="space-y-6 text-gray-500 font-light leading-relaxed text-lg max-w-xl">
              <p>
                At Laval Motors, we are committed to providing quality vehicles, honest service, and a smooth car-buying experience. Our goal is to help every customer find the right vehicle at the right price with confidence and ease.
              </p>
              <p>
                From reliable daily drivers to stylish SUVs and trucks, we carefully select vehicles that deliver value and dependability. At Laval Motors, customer satisfaction always comes first.
              </p>
            </div>
            
            <div className="pt-4">
              <Link 
                to="/inventory" 
                className="inline-block border border-gray-900 px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-luxury-black hover:text-white transition-all duration-300"
              >
                Explore Our Inventory
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <img 
                src={aboutExterior} 
                alt="Laval Showroom Exterior" 
                className="w-full h-[400px] md:h-[600px] object-cover shadow-2xl rounded-sm"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-[#FBFBFB] border-t border-b border-gray-100">
        <div className="luxury-container">
          <div className="text-center mb-20 space-y-4">
            <div className="flex justify-center items-center gap-4">
              <div className="w-8 h-px bg-luxury-accent"></div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold">Our Values</span>
              <div className="w-8 h-px bg-luxury-accent"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { 
                title: 'Excellence', 
                desc: 'We are committed to offering the finest vehicles and service.', 
                Icon: Diamond 
              },
              { 
                title: 'Integrity', 
                desc: 'Honesty and transparency guide every relationship we build.', 
                Icon: User 
              },
              { 
                title: 'Passion', 
                desc: 'We are car enthusiasts dedicated to sharing our passion with you.', 
                Icon: Handshake 
              },
              { 
                title: 'Trust', 
                desc: 'Your satisfaction and confidence drive everything we do.', 
                Icon: ShieldCheck 
              }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center space-y-6 px-4"
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center text-gray-400">
                  <value.Icon size={40} strokeWidth={1} />
                </div>
                <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-luxury-black">
                  {value.title}
                </h4>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default About;
