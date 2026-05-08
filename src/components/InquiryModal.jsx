import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '../client';
import Lightbox from './Lightbox';
import ProgressiveImage from './ProgressiveImage';
import { Maximize2 } from 'lucide-react';

// TODO: Replace with the Access Key from web3forms.com
const WEB3FORMS_ACCESS_KEY = "a2d2bd68-b305-4d15-9036-2727a7961799";

const InquiryModal = ({ isOpen, onClose, car }) => {
  const [inquiryType, setInquiryType] = useState('purchase');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Memoize optimized image URLs to avoid extra renders and effect triggers
  const allImages = React.useMemo(() => {
    if (!car) return [];
    
    const mainImg = car.image?.asset 
      ? urlFor(car.image).width(1200).quality(70).url() 
      : car.image;
      
    const galleryImgs = car.gallery?.map(img => 
      img.asset ? urlFor(img).width(1200).quality(70).url() : img
    ) || [];
    
    return [mainImg, ...galleryImgs].filter(Boolean);
  }, [car]);

  // Insane Speed: Prefetch all images when modal opens
  useEffect(() => {
    if (isOpen && car && allImages.length > 0) {
      allImages.forEach(url => {
        const prefetchImg = new Image();
        prefetchImg.src = url;
      });
    }
  }, [isOpen, car, allImages]);

  if (!car) return null;

  // Helper to get srcset for a specific image in the gallery
  const getSrcSet = (index) => {
    const imgAsset = index === 0 ? car.image : car.gallery?.[index - 1];
    if (!imgAsset?.asset) return undefined;
    
    return [
      `${urlFor(imgAsset).width(400).quality(60).url()} 400w`,
      `${urlFor(imgAsset).width(800).quality(70).url()} 800w`,
      `${urlFor(imgAsset).width(1200).quality(70).url()} 1200w`,
      `${urlFor(imgAsset).width(1600).quality(70).url()} 1600w`,
    ].join(', ');
  };

  // Thumbnail-specific optimized URLs
  const thumbnailUrls = [
    car.image?.asset ? urlFor(car.image).width(200).quality(70).url() : car.image,
    ...(car.gallery?.map(img => img.asset ? urlFor(img).width(200).quality(70).url() : img) || [])
  ].filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `New Inquiry: ${car.name} - ${inquiryType === 'financing' ? 'Financing Request' : 'Direct Purchase'}`);
    formData.append("from_name", "Laval Motors Support");
    
    // Add car details to the submission
    formData.append("car_name", car.name);
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
    } catch {
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
            className="bg-white w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row relative rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-6 text-3xl text-gray-400 hover:text-black z-50 bg-white/80 md:bg-transparent rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>

            {/* Car Preview Section - GALLERY REDESIGN */}
            <div className="w-full md:w-[55%] bg-gray-50 p-6 md:p-8 flex flex-col">
              <h3 className="text-2xl font-serif mb-4">{car.name}</h3>
              
              {/* Main Image Display */}
              <div 
                className="relative aspect-video overflow-hidden mb-4 bg-gray-200 rounded-sm shadow-inner group cursor-zoom-in"
                onClick={() => setIsLightboxOpen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <ProgressiveImage 
                      src={allImages[activeImageIndex]} 
                      srcSet={getSrcSet(activeImageIndex)}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder={activeImageIndex === 0 ? car.image?.asset?.metadata?.lqip : car.gallery?.[activeImageIndex - 1]?.asset?.metadata?.lqip}
                      alt={`${car.name} - ${activeImageIndex}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Enlarge Icon Overlay */}
                <div className="absolute top-4 left-4 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Maximize2 size={16} />
                </div>

                {/* Image Counter Overlay */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-sm">
                  {activeImageIndex + 1} / {allImages.length}
                </div>
              </div>

              {/* Thumbnails Gallery */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pt-1">
                {thumbnailUrls.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-14 rounded-sm overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-luxury-accent' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-3 text-[10px] uppercase tracking-widest font-bold text-gray-500">
                <div className="flex justify-between border-b pb-2">
                  <span>Reference ID</span>
                  <span className="text-black">#{car.id?.slice(-6) || 'LLM-24'}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Inquiry Price</span>
                  <span className="text-luxury-accent">Price on Request</span>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-[45%] p-8 md:p-12 bg-white">
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
                    Our team will review the details and contact you shortly.
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

      {/* Fullscreen Lightbox */}
      <Lightbox 
        isOpen={isLightboxOpen} 
        onClose={() => setIsLightboxOpen(false)} 
        images={allImages} 
        initialIndex={activeImageIndex} 
      />
    </AnimatePresence>
  );
};

export default InquiryModal;
