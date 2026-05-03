import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';
import { 
  Diamond, 
  User, 
  Handshake, 
  ShieldCheck 
} from 'lucide-react';
import { client, urlFor } from '../client';
import SanityContent from '../components/SanityContent';

const About = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = '*[_type == "pageAbout"][0]';
    client.fetch(query).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="min-h-screen bg-white pt-32 text-center font-serif italic">Loading Excellence...</div>;
  if (!data) return null;

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
              <SanityContent value={data.hero?.title} />
            </h1>
            
            <div className="w-16 h-px bg-gray-200"></div>
            
            <div className="space-y-6 text-gray-500 font-light leading-relaxed text-lg max-w-xl">
              <SanityContent value={data.hero?.subtitle} />
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
              {data.hero?.image && (
                <img 
                  src={urlFor(data.hero.image).width(800).url()} 
                  alt="Laval Showroom Exterior" 
                  className="w-full h-[400px] md:h-[600px] object-cover shadow-2xl rounded-sm"
                  loading="lazy"
                />
              )}
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
            {data.values?.map((value, idx) => {
              const Icons = [Diamond, User, Handshake, ShieldCheck];
              const Icon = Icons[idx % Icons.length];
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center space-y-6 px-4"
                >
                  <div className="w-16 h-16 mx-auto flex items-center justify-center text-gray-400">
                    <Icon size={40} strokeWidth={1} />
                  </div>
                  <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-luxury-black">
                    <SanityContent value={value.title} />
                  </h4>
                  <div className="text-sm text-gray-500 font-light leading-relaxed">
                    <SanityContent value={value.description} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 luxury-container">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            {data.story?.image && (
              <img 
                src={urlFor(data.story.image).width(800).url()} 
                alt="Laval Showroom Interior" 
                className="w-full h-[400px] md:h-[500px] object-cover shadow-2xl rounded-sm"
                loading="lazy"
              />
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-luxury-accent"></div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold">Our Story</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-serif text-luxury-black leading-tight">
              <SanityContent value={data.story?.title} />
            </h3>
            
            <div className="space-y-6 text-gray-500 font-light leading-relaxed text-lg">
              <SanityContent value={data.story?.text} />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;




