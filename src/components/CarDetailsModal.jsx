import React, { useState, useEffect, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { urlFor } from '../client';
import Lightbox from './Lightbox';
import ProgressiveImage from './ProgressiveImage';
import { 
  Maximize2, 
  Clock, 
  Settings2, 
  Fuel, 
  Cpu, 
  Palette, 
  Armchair, 
  ShieldCheck, 
  ChevronRight, 
  PhoneCall, 
  FileText,
  Send,
  X
} from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = "d7f8311f-fb43-4cdd-96ed-afcf8c00bba3";

const CarDetailsModal = ({ isOpen, onClose, car }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'description', 'inquire'
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Inquiry form states
  const [inquiryType, setInquiryType] = useState('purchase');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Reset tab & active image when car changes
  const [prevCarId, setPrevCarId] = useState(null);
  if (car && car.id !== prevCarId) {
    setPrevCarId(car.id);
    setActiveTab('overview');
    setActiveImageIndex(0);
    setSubmitted(false);
    setError(null);
  }

  // Memoize optimized image URLs
  const allImages = useMemo(() => {
    if (!car) return [];
    
    const mainImg = car.image?.asset 
      ? urlFor(car.image).width(1400).quality(85).url() 
      : car.image;
      
    const galleryImgs = car.gallery?.map(img => 
      img.asset ? urlFor(img).width(1400).quality(85).url() : img
    ) || [];
    
    return [mainImg, ...galleryImgs].filter(Boolean);
  }, [car]);

  // Prefetch images when modal opens
  useEffect(() => {
    if (isOpen && car && allImages.length > 0) {
      allImages.forEach(url => {
        const prefetchImg = new Image();
        prefetchImg.src = url;
      });
    }
  }, [isOpen, car, allImages]);

  if (!car) return null;

  // Helper srcset
  const getSrcSet = (index) => {
    const imgAsset = index === 0 ? car.image : car.gallery?.[index - 1];
    if (!imgAsset?.asset) return undefined;
    
    return [
      `${urlFor(imgAsset).width(400).quality(70).url()} 400w`,
      `${urlFor(imgAsset).width(800).quality(80).url()} 800w`,
      `${urlFor(imgAsset).width(1400).quality(85).url()} 1400w`,
    ].join(', ');
  };

  const thumbnailUrls = [
    car.image?.asset ? urlFor(car.image).width(240).quality(75).url() : car.image,
    ...(car.gallery?.map(img => img.asset ? urlFor(img).width(240).quality(75).url() : img) || [])
  ].filter(Boolean);

  const mileage = car.specifications?.mileage || car.mileage;
  const formattedMileage = mileage ? `${mileage.toLocaleString()} mi` : 'N/A';
  const transmission = car.specifications?.transmission || car.transmission || 'Automatic';
  const fuelType = car.specifications?.fuelType || 'Gasoline';
  const engine = car.specifications?.engine || 'V6 Turbo';
  const exteriorColor = car.specifications?.exteriorColor || 'Standard';
  const interiorColor = car.specifications?.interiorColor || 'Premium Leather';

  const handleApplyFinancing = () => {
    onClose();
    navigate(`/apply-financing?vehicle=${car.id || ''}`);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `New Inquiry: ${car.year || ''} ${car.brand || ''} ${car.model || car.name} - ${inquiryType.toUpperCase()}`);
    formData.append("from_name", "Laval Motors Support");
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
          setActiveTab('overview');
        }, 4000);
      } else {
        setError("Something went wrong. Please try again or call us directly.");
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
          className="fixed inset-0 z-[999] flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-6xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col relative rounded-sm my-auto border border-gray-100 font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-black z-50 bg-white/90 rounded-full w-9 h-9 flex items-center justify-center border border-gray-200 shadow-sm transition-all hover:scale-110"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header Title Section */}
            <div className="p-6 md:px-10 md:pt-8 md:pb-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-accent font-extrabold">
                    {car.brand || 'Laval Motors'}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    Ref #{car.id?.slice(-6) || 'LLM-24'}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-luxury-black font-normal">
                  {car.year} {car.brand ? `${car.brand} ` : ''}{car.model || car.name}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-left md:text-right">
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Asking Price</div>
                  <div className="text-xl md:text-2xl font-black text-luxury-black tracking-wider">
                    {car.priceDisplayMode === 'fixed' && car.price 
                      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(car.price)
                      : car.priceDisplayMode === 'call'
                        ? 'Call for Price'
                        : 'Price on Request'}
                  </div>
                </div>

                <span className={`text-[10px] font-extrabold uppercase tracking-[0.2em] px-4 py-2 rounded-sm border ${
                  car.isSold 
                    ? 'bg-red-50 text-red-600 border-red-200' 
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {car.isSold ? 'Sold' : 'Available'}
                </span>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-grow">
              
              {/* Left Column: Image Viewer & Gallery Strip (7 cols) */}
              <div className="lg:col-span-7 p-6 md:p-8 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-between">
                <div>
                  {/* Main High-Res Image Display */}
                  <div 
                    className="relative aspect-[16/10] overflow-hidden mb-4 bg-gray-200 rounded-sm shadow-sm group cursor-zoom-in border border-gray-200/60"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full"
                      >
                        <ProgressiveImage 
                          src={allImages[activeImageIndex]} 
                          srcSet={getSrcSet(activeImageIndex)}
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          placeholder={activeImageIndex === 0 ? car.image?.asset?.metadata?.lqip : car.gallery?.[activeImageIndex - 1]?.asset?.metadata?.lqip}
                          alt={`${car.name} - Image ${activeImageIndex + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Enlarge Icon Overlay */}
                    <div className="absolute top-4 left-4 bg-black/60 text-white p-2.5 rounded-full opacity-90 group-hover:opacity-100 transition-opacity backdrop-blur-md shadow-md">
                      <Maximize2 size={16} />
                    </div>

                    {/* Image Counter Overlay */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-[10px] font-bold tracking-widest px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-md">
                      {activeImageIndex + 1} / {allImages.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {thumbnailUrls.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                      {thumbnailUrls.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`flex-shrink-0 w-20 h-14 rounded-sm overflow-hidden border-2 transition-all ${
                            activeImageIndex === idx ? 'border-luxury-accent scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Left Footer Action Banner */}
                <div className="mt-8 pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className="text-luxury-accent" />
                    <div>
                      <h4 className="text-xs font-bold text-luxury-black uppercase tracking-wider">Inspected & Verified</h4>
                      <p className="text-[11px] text-gray-500 font-light">Every vehicle passes rigorous mechanical standard tests.</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="text-xs uppercase tracking-widest text-luxury-black font-bold border-b border-luxury-accent pb-0.5 hover:text-luxury-accent transition-colors flex items-center gap-1"
                  >
                    View Fullscreen <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right Column: Spec Grid, Description & Inquiry Form (5 cols) */}
              <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-white">
                <div>
                  {/* Navigation Tabs */}
                  <div className="flex border-b border-gray-100 mb-6">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`pb-3 text-xs uppercase tracking-widest font-bold border-b-2 transition-all mr-6 flex items-center gap-2 ${
                        activeTab === 'overview' 
                          ? 'border-luxury-accent text-luxury-black' 
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Settings2 size={14} /> Overview & Specs
                    </button>
                    <button
                      onClick={() => setActiveTab('description')}
                      className={`pb-3 text-xs uppercase tracking-widest font-bold border-b-2 transition-all mr-6 flex items-center gap-2 ${
                        activeTab === 'description' 
                          ? 'border-luxury-accent text-luxury-black' 
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <FileText size={14} /> Description
                    </button>
                    <button
                      onClick={() => setActiveTab('inquire')}
                      className={`pb-3 text-xs uppercase tracking-widest font-bold border-b-2 transition-all flex items-center gap-2 ${
                        activeTab === 'inquire' 
                          ? 'border-luxury-accent text-luxury-black' 
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Send size={14} /> Inquire
                    </button>
                  </div>

                  {/* TAB 1: Overview & Specs */}
                  {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-gray-400">Technical Specifications</h3>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50/80 p-3.5 rounded-sm border border-gray-100 flex items-start gap-3">
                          <Clock size={18} className="text-luxury-accent mt-0.5" />
                          <div>
                            <div className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Mileage</div>
                            <div className="text-xs font-bold text-gray-800">{formattedMileage}</div>
                          </div>
                        </div>

                        <div className="bg-gray-50/80 p-3.5 rounded-sm border border-gray-100 flex items-start gap-3">
                          <Settings2 size={18} className="text-luxury-accent mt-0.5" />
                          <div>
                            <div className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Transmission</div>
                            <div className="text-xs font-bold text-gray-800">{transmission}</div>
                          </div>
                        </div>

                        <div className="bg-gray-50/80 p-3.5 rounded-sm border border-gray-100 flex items-start gap-3">
                          <Cpu size={18} className="text-luxury-accent mt-0.5" />
                          <div>
                            <div className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Engine</div>
                            <div className="text-xs font-bold text-gray-800">{engine}</div>
                          </div>
                        </div>

                        <div className="bg-gray-50/80 p-3.5 rounded-sm border border-gray-100 flex items-start gap-3">
                          <Fuel size={18} className="text-luxury-accent mt-0.5" />
                          <div>
                            <div className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Fuel Type</div>
                            <div className="text-xs font-bold text-gray-800">{fuelType}</div>
                          </div>
                        </div>

                        <div className="bg-gray-50/80 p-3.5 rounded-sm border border-gray-100 flex items-start gap-3">
                          <Palette size={18} className="text-luxury-accent mt-0.5" />
                          <div>
                            <div className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Exterior Color</div>
                            <div className="text-xs font-bold text-gray-800">{exteriorColor}</div>
                          </div>
                        </div>

                        <div className="bg-gray-50/80 p-3.5 rounded-sm border border-gray-100 flex items-start gap-3">
                          <Armchair size={18} className="text-luxury-accent mt-0.5" />
                          <div>
                            <div className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Interior Color</div>
                            <div className="text-xs font-bold text-gray-800">{interiorColor}</div>
                          </div>
                        </div>
                      </div>

                      {/* Brief Description Snippet */}
                      {car.description && (
                        <div className="pt-3">
                          <div className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Vehicle Summary</div>
                          <p className="text-xs text-gray-600 leading-relaxed font-light line-clamp-3">
                            {car.description}
                          </p>
                          <button 
                            onClick={() => setActiveTab('description')} 
                            className="text-[10px] uppercase tracking-widest text-luxury-accent font-bold mt-1 hover:underline block"
                          >
                            Read Full Description →
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 2: Description */}
                  {activeTab === 'description' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-gray-400">Detailed Vehicle Description</h3>
                      
                      <div className="bg-gray-50 p-5 rounded-sm border border-gray-100 max-h-[300px] overflow-y-auto">
                        {car.description ? (
                          <p className="text-xs md:text-sm text-gray-700 font-light leading-relaxed whitespace-pre-line">
                            {car.description}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-400 italic">
                            No detailed description provided for this vehicle. Contact our sales department for full vehicle history and specification details.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: Inquire Form */}
                  {activeTab === 'inquire' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      {submitted ? (
                        <div className="py-8 text-center bg-emerald-50 border border-emerald-100 rounded-sm">
                          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl mb-3 mx-auto">✓</div>
                          <h4 className="text-base font-serif text-emerald-900 mb-1">Inquiry Submitted</h4>
                          <p className="text-xs text-emerald-700 font-light">Thank you. Our team will review your inquiry and contact you shortly.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleInquirySubmit} className="space-y-4">
                          <div className="flex bg-gray-100 p-1 rounded-sm">
                            <button
                              type="button"
                              onClick={() => setInquiryType('purchase')}
                              className={`flex-1 py-1.5 text-[9px] uppercase tracking-widest font-bold transition-all ${
                                inquiryType === 'purchase' ? 'bg-white shadow-sm text-black' : 'text-gray-400'
                              }`}
                            >
                              Direct Purchase
                            </button>
                            <button
                              type="button"
                              onClick={() => setInquiryType('financing')}
                              className={`flex-1 py-1.5 text-[9px] uppercase tracking-widest font-bold transition-all ${
                                inquiryType === 'financing' ? 'bg-white shadow-sm text-black' : 'text-gray-400'
                              }`}
                            >
                              Financing Query
                            </button>
                          </div>

                          <input name="name" required type="text" placeholder="FULL NAME *" className="w-full border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-xs font-light" />
                          <input name="phone" required type="tel" placeholder="PHONE NUMBER *" className="w-full border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-xs font-light" />
                          <input name="email" required type="email" placeholder="EMAIL ADDRESS *" className="w-full border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-xs font-light" />
                          <textarea name="message" placeholder="ADDITIONAL QUESTIONS OR APPOINTMENT TIME..." className="w-full border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-xs font-light resize-none" rows="2"></textarea>

                          {error && <p className="text-xs text-red-500 italic">{error}</p>}

                          <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-luxury-black text-white py-3.5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-luxury-accent transition-all duration-300 disabled:opacity-50"
                          >
                            {isSubmitting ? 'Sending Request...' : 'Submit Inquiry'}
                          </button>
                        </form>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Bottom Main Action Buttons */}
                <div className="pt-6 border-t border-gray-100 space-y-3 mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleApplyFinancing}
                      className="w-full py-3.5 bg-luxury-black text-white hover:bg-luxury-accent transition-colors text-[9px] uppercase tracking-[0.25em] font-bold rounded-sm shadow-md flex items-center justify-center gap-2"
                    >
                      Apply For Financing
                    </button>

                    <button
                      onClick={() => setActiveTab('inquire')}
                      className="w-full py-3.5 bg-white border border-gray-300 hover:border-luxury-black text-luxury-black transition-colors text-[9px] uppercase tracking-[0.25em] font-bold rounded-sm flex items-center justify-center gap-2"
                    >
                      <Send size={12} /> Direct Inquiry
                    </button>
                  </div>

                  <a 
                    href="tel:+14047908336" 
                    className="w-full py-2.5 text-center text-gray-500 hover:text-luxury-black text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <PhoneCall size={12} className="text-luxury-accent" /> Call Sales Desk: +1 (404) 790-8336
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Lightbox for Fullscreen Image Inspection */}
      <Lightbox 
        isOpen={isLightboxOpen} 
        onClose={() => setIsLightboxOpen(false)} 
        images={allImages} 
        initialIndex={activeImageIndex} 
      />
    </AnimatePresence>
  );
};

export default CarDetailsModal;
