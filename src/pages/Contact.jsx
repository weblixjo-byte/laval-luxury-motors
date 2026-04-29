import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

// TODO: Replace with the Access Key from web3forms.com
const WEB3FORMS_ACCESS_KEY = "a2d2bd68-b305-4d15-9036-2727a7961799";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `New Private Inquiry from Contact Page`);
    formData.append("from_name", "Laval Motors Website");

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
    <div className="min-h-screen bg-white pt-32 pb-32">
      <div className="luxury-container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase tracking-[0.5em] text-luxury-accent font-bold mb-6"
            >
              Concierge Service
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-serif text-luxury-black mb-8"
            >
              Contact <span className="italic">Us</span>
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="w-24 h-px bg-luxury-accent mx-auto mb-8"
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-16"
            >
              <div>
                <h3 className="text-xl font-serif mb-8 text-luxury-black">Global HQ & Showroom</h3>
                <div className="space-y-4 text-gray-500 font-light leading-relaxed">
                  <p className="text-lg">1530 Iris Dr SW</p>
                  <p className="text-lg">Conyers Ga 30092</p>
                  <div className="pt-4">
                    <a href="#" className="text-xs uppercase tracking-widest border-b border-luxury-accent pb-1 text-luxury-black font-bold">Get Directions</a>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-xl font-serif text-luxury-black">Connect With Us</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">General Inquiries</span>
                    <span className="text-lg text-luxury-black">Help@lavalmotors.com</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Direct Inquiry</span>
                    <span className="text-lg text-luxury-black">Mike@lavalmotors.com</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Sales Desk</span>
                    <span className="text-lg text-luxury-black">+1 (404) 790-8336</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Service Atelier</span>
                    <span className="text-lg text-luxury-black">+1 (229) 237-4046</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-sm text-gray-400 italic serif">
                  Our specialists are available for private consultations by appointment only.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-50 p-12 md:p-16 rounded-sm border border-gray-100 shadow-sm"
            >
              <h3 className="text-2xl font-serif mb-12 text-luxury-black">Send a Private Inquiry</h3>
              {submitted ? (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-6 mx-auto">✓</div>
                  <h4 className="text-xl font-serif mb-2">Message Sent</h4>
                  <p className="text-gray-500 text-sm italic">Thank you for reaching out. Our concierge will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="relative">
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400 uppercase tracking-widest" 
                      placeholder="FULL NAME"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400 uppercase tracking-widest" 
                      placeholder="EMAIL ADDRESS"
                    />
                  </div>
                  <div className="relative">
                    <select 
                      name="interest"
                      className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-luxury-accent transition-colors text-[10px] uppercase tracking-widest font-bold text-gray-400 appearance-none"
                    >
                      <option value="General">Select Interest</option>
                      <option value="Purchase">Vehicle Purchase</option>
                      <option value="Sell">Sell Your Vehicle</option>
                      <option value="Service">Atelier Service</option>
                      <option value="Press">Press Inquiry</option>
                    </select>
                  </div>
                  <div className="relative">
                    <textarea 
                      name="message"
                      required
                      rows="4" 
                      className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400 resize-none uppercase tracking-widest" 
                      placeholder="HOW CAN WE ASSIST YOU?"
                    ></textarea>
                  </div>
                  
                  {error && <p className="text-xs text-red-500 italic">{error}</p>}

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-luxury-black text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-luxury-accent transition-all duration-500 shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;


