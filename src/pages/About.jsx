/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../client';

const About = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const query = `*[_type == "pageAbout"][0] {
          title,
          subtitle,
          "heroImage": heroImage.asset->url,
          historyTitle,
          historyText,
          philosophyTitle,
          philosophyText,
          "craftsmanshipImage": craftsmanshipImage.asset->url
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={content.heroImage || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80"}
            alt="Laval Heritage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative text-center text-white px-4">
          <h1 className="text-6xl md:text-8xl font-serif mb-6">{content.title}</h1>
          <p className="text-sm md:text-base uppercase tracking-[0.5em] font-light">
            {content.subtitle || 'A legacy of automotive excellence'}
          </p>
        </div>
      </section>

      {/* History & Philosophy */}
      <section className="py-24 luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif">{content.historyTitle || 'Our History'}</h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              {content.historyText || 'Founded on the principle that a car is more than just transportation, Laval Luxury Motors has grown from a private collection into one of the worlds most respected curators of rare automotive art.'}
            </p>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif">{content.philosophyTitle || 'Our Philosophy'}</h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light italic serif">
              {content.philosophyText || '"We do not sell cars; we facilitate the acquisition of heritage. Every vehicle in our showroom has been selected for its unique story, engineering purity, and investment potential."'}
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-24 bg-gray-50">
        <div className="luxury-container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-serif mb-8">Unrivaled Expertise</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Our team consists of industry veterans, master technicians, and market analysts who live and breathe high-performance automobiles. This depth of knowledge ensures that every vehicle we represent is authenticated and maintained to the highest global standards.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-serif text-luxury-accent">20+</h4>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Years of Heritage</p>
              </div>
              <div>
                <h4 className="text-2xl font-serif text-luxury-accent">500+</h4>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Exotic Cars Sourced</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 aspect-square overflow-hidden shadow-2xl">
            <img 
              src={content.craftsmanshipImage || "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80"} 
              alt="Craftsmanship" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
