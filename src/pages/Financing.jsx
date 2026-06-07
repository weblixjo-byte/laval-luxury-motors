import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  ShieldCheck, 
  TrendingUp, 
  Clock,
  Briefcase,
  Globe
} from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = "d7f8311f-fb43-4cdd-96ed-afcf8c00bba3";

const Financing = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New Financing Inquiry");
    formData.append("from_name", "Laval Motors Financing");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        e.target.reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="luxury-container mb-24 md:mb-32">
        <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden rounded-sm shadow-2xl">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80" 
              alt="Bespoke Financing" 
              className="w-full h-full object-cover"
              fetchpriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
          </div>
          
          <div className="relative z-10 text-center text-white px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-[10px] uppercase tracking-[0.6em] font-bold text-luxury-accent">Financing</h2>
              <h1 className="text-5xl md:text-8xl font-serif leading-tight">
                Bespoke <span className="italic">Financing</span>
              </h1>
              <div className="w-24 h-px bg-luxury-accent mx-auto"></div>
              <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto text-gray-200">
                Get the car you want with flexible options that work for you. Simple, fast, and transparent.
              </p>
              <div className="pt-6">
                <Link
                  to="/apply-financing"
                  className="bg-luxury-accent text-white hover:bg-white hover:text-luxury-black px-8 py-4 uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-300 shadow-lg inline-block hover:scale-105"
                >
                  Apply For Financing
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy & Advantage */}
      <section className="py-24 luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-sm uppercase tracking-[0.4em] text-luxury-accent font-bold">The Laval Advantage</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-luxury-black leading-tight">
              Flexible Financing for Everyday Drivers
            </h3>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              At Laval Motors, we make vehicle financing simple, transparent, and tailored to your budget. Whether you're purchasing your first car, upgrading your current vehicle, or rebuilding credit, our team works with trusted lenders to help you drive away with confidence.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-3">
                <div className="text-luxury-accent"><Clock size={24} strokeWidth={1.5} /></div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold">Rapid Approval.</h4>
                <p className="text-xs text-gray-400 font-light">Fast financing decisions available the same day.</p>
              </div>
              <div className="space-y-3">
                <div className="text-luxury-accent"><TrendingUp size={24} strokeWidth={1.5} /></div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold">Flexible Options.</h4>
                <p className="text-xs text-gray-400 font-light">Financing solutions for all credit situations.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80" 
              alt="Consultation" 
              className="w-full h-[500px] object-cover shadow-2xl rounded-sm"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>

      {/* Application Section */}
      <section className="py-32 luxury-container">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <h2 className="text-sm uppercase tracking-[0.4em] text-luxury-accent font-bold">Private Inquiry</h2>
            <h3 className="text-4xl md:text-5xl font-serif leading-tight">Start Your Private Consultation</h3>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              Our specialists will provide a tailored proposal within 24 hours. Your information is handled with the highest level of professional discretion.
            </p>
            
            <div className="space-y-6 pt-6">
              {[
                'Flexible payment structures',
                'Asset-backed lending options',
                'Equity release from current collections',
                'Tax-optimized acquisitions'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-light text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-luxury-accent"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-12 md:p-16 rounded-sm border border-gray-100 shadow-sm">
            {submitted ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-6 mx-auto">✓</div>
                <h4 className="text-xl font-serif mb-2">Inquiry Sent</h4>
                <p className="text-gray-500 text-sm italic">Thank you for your interest. Our financing specialist will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Estimated Loan Amount</label>
                  <select 
                    name="loan_amount"
                    className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light appearance-none cursor-pointer"
                  >
                    <option value="1000-10000">$1,000 - $10,000</option>
                    <option value="10000-20000">$10,000 - $20,000</option>
                    <option value="Over-20000">Over $20,000</option>
                  </select>
                </div>
                
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="FULL NAME" 
                  className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400" 
                />
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400" 
                />
                
                <textarea 
                  name="details"
                  required
                  placeholder="ADDITIONAL DETAILS" 
                  className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400 h-24 resize-none"
                ></textarea>
                
                {error && <p className="text-xs text-red-500 italic">{error}</p>}

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-luxury-black text-white py-5 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-luxury-accent transition-all duration-500 shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Request Proposal'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-light">
          * Estimated rates subject to credit approval and asset valuation. See dealer for terms and conditions.
        </p>
      </section>

    </div>
  );
};

export default Financing;


