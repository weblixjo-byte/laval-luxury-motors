import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const Lightbox = ({ isOpen, onClose, images, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset index when lightbox opens or initialIndex changes
  const [prevOpen, setPrevOpen] = useState(isOpen);
  const [prevInitial, setPrevInitial] = useState(initialIndex);

  if (isOpen !== prevOpen || initialIndex !== prevInitial) {
    setPrevOpen(isOpen);
    setPrevInitial(initialIndex);
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'Escape') onClose();
  }, [handleNext, handlePrev, onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
        onClick={onClose}
      >
        {/* Controls */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[1010]">
          <div className="text-white/60 text-xs tracking-widest font-bold uppercase">
            {currentIndex + 1} / {images.length}
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-2 bg-white/10 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:left-8 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[1010] hidden md:block"
        >
          <ChevronLeft size={40} strokeWidth={1} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-4 md:right-8 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[1010] hidden md:block"
        >
          <ChevronRight size={40} strokeWidth={1} />
        </button>

        {/* Main Image Container */}
        <div 
          className="relative w-full h-full max-w-6xl max-h-[80vh] flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={images[currentIndex]}
              className="max-w-full max-h-full object-contain shadow-2xl select-none"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100) handlePrev();
                else if (info.offset.x < -100) handleNext();
              }}
            />
          </AnimatePresence>
        </div>

        {/* Thumbnails Strip */}
        <div 
          className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto no-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-16 h-12 md:w-20 md:h-14 flex-shrink-0 border-2 transition-all ${
                currentIndex === idx ? 'border-luxury-accent' : 'border-transparent opacity-40 hover:opacity-100'
              }`}
            >
              <img src={img} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
