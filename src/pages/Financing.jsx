/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../client';

const Financing = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const query = `*[_type == "pageFinancing"][0] {
          title,
          subtitle,
          "heroImage": heroImage.asset->url,
          philosophyTitle,
          philosophyText,
          services
        }`;
        const data = await client.fetch(query);
        if (data) setContent(data);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      }
    };
    fetchContent();
  }, []);

  if (!content) return <div className="pt-40 text-center serif italic">Loading...</div>;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={content.heroImage || "/images/financing-hero.png"}
            alt="Luxury Financing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative h-full luxury-container flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl md:text-7xl mb-6 font-serif">{content.title}</h1>
          <p className="text-sm md:text-base uppercase tracking-[0.4em] font-bold opacity-80 max-w-2xl">
            {content.subtitle || 'Bespoke financial solutions for the worlds most discerning collectors.'}
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 luxury-container relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-accent/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto text-center bg-white/40 backdrop-blur-sm p-12 border border-gray-100 rounded-sm shadow-sm">
          <h2 className="text-3xl md:text-5xl mb-10 font-serif leading-tight">
            {content.philosophyTitle || 'Financial Flexibility for the Modern Collector'}
          </h2>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed font-light">
            {content.philosophyText || 'Acquiring a masterpiece requires more than just capital; it requires a partner who understands the unique value of high-end automotive assets.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Interest Rates</h4>
              <p className="text-xl font-serif">Competitive</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Terms</h4>
              <p className="text-xl font-serif">Flexible</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Approval</h4>
              <p className="text-xl font-serif">Expedited</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="luxury-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {(content.services || []).map((service, idx) => (
              <div key={idx} className="bg-white p-12 border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-serif mb-6">{service.title}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-4 text-sm text-gray-600 italic">
                  {(service.features || []).map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <section className="py-32 bg-white text-center">
        <div className="luxury-container max-w-2xl">
          <h2 className="text-4xl font-serif mb-8">Ready to Discuss?</h2>
          <p className="text-gray-500 mb-12">
            Contact our private finance desk for a confidential consultation regarding your next acquisition.
          </p>
          <button className="px-16 py-5 bg-[#151515] text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black transition-all shadow-xl">
            Request Private Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default Financing;
