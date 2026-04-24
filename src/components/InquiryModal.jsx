/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// TODO: Replace with the Access Key from web3forms.com
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";

const InquiryModal = ({ isOpen, onClose, car }) => {
  const [inquiryType, setInquiryType] = useState('purchase');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  if (!car) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `New Inquiry: ${car.name} - ${inquiryType === 'financing' ? 'Financing Request' : 'Direct Purchase'}`);
    formData.append("from_name", "Laval Luxury Motors Concierge");
    
    // Add car details to the submission
    formData.append("car_name", car.name);
    formData.append("car_price", car.price);
    formData.append("car_id", car.id);
    formData.append("interest_type", inquiryType);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 5000);
      } else {
        setError("Something went wrong. Please try again or contact us directly.");
      }
    } catch (_err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-6 text-3xl text-gray-400 hover:text-black z-10"
            >
              ×
            </button>

            {/* Car Preview Section */}
            <div className="w-full md:w-1/2 bg-gray-50 p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-serif mb-4">{car.name}</h3>
              <div className="aspect-video overflow-hidden mb-6 bg-gray-200 rounded-sm">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3 text-[10px] uppercase tracking-widest font-bold text-gray-500">
                <div className="flex justify-between border-b pb-2">
                  <span>Reference ID</span>
                  <span className="text-black">#{car.id}0024</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>List Price</span>
                  <span className="text-luxury-accent">Price on Request</span>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-6"
                  >
                    ✓
                  </motion.div>
                  <h3 className="text-2xl font-serif mb-2">Request Submitted</h3>
                  <p className="text-gray-500 text-sm italic">
                    Your inquiry for the {car.name} has been sent successfully. 
                    Our concierge team will review the details and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Inquiry Type</label>
                    <div className="flex bg-gray-100 p-1 rounded-sm">
                      <button
                        type="button"
                        onClick={() => setInquiryType('purchase')}
                        className={`flex-1 py-2 text-[9px] uppercase tracking-widest font-bold transition-all ${
                          inquiryType === 'purchase' ? 'bg-white shadow-sm text-black' : 'text-gray-400'
                        }`}
                      >
                        Purchase
                      </button>
                      <button
                        type="button"
                        onClick={() => setInquiryType('financing')}
                        className={`flex-1 py-2 text-[9px] uppercase tracking-widest font-bold transition-all ${
                          inquiryType === 'financing' ? 'bg-white shadow-sm text-black' : 'text-gray-400'
                        }`}
                      >
                        Financing
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <input name="name" required type="text" placeholder="Full Name" className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors text-sm" />
                    <input name="phone" required type="tel" placeholder="Phone Number" className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors text-sm" />
                    <input name="email" required type="email" placeholder="Email Address" className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors text-sm" />
                    <textarea name="message" placeholder="Message" className="w-full border-b border-gray-200 py-3 outline-none focus:border-black transition-colors text-sm resize-none" rows="2"></textarea>
                  </div>

                  {error && <p className="text-xs text-red-500 italic mt-2">{error}</p>}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[#151515] text-white py-4 uppercase tracking-[0.3em] text-[10px] font-bold transition-all ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black'
                    }`}
                  >
                    {isSubmitting ? 'Sending Request...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InquiryModal;
