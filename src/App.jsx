import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CarDetailsModal from './components/CarDetailsModal';

// Lazy load pages for "Insane Speed"
const Home = lazy(() => import('./pages/Home'));
const Inventory = lazy(() => import('./pages/Inventory'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Financing = lazy(() => import('./pages/Financing'));
const ApplyFinancing = lazy(() => import('./pages/ApplyFinancing'));
const Services = lazy(() => import('./pages/Services'));
const StudioPage = lazy(() => import('./pages/StudioPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// High-end loading fallback
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white">
    <div className="w-12 h-12 border-2 border-luxury-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const location = useLocation();

  const openInquiry = (car) => {
    setSelectedCar(car);
    setIsInquiryOpen(true);
  };

  const isStudio = location.pathname.startsWith('/studio');
  
  // Scroll to top on route change and initial mount
  useEffect(() => {
    // Immediate scroll
    window.scrollTo(0, 0);
    
    // Backup scroll for slower loading content
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  // Set to false to immediately restore normal operation
  const IS_SERVICE_SUSPENDED = true;

  if (IS_SERVICE_SUSPENDED) {
    return (
      <div className="min-h-screen bg-[#0d0e11] text-gray-400 font-mono flex items-center justify-center p-6 select-none">
        <div className="max-w-md w-full border border-neutral-800 bg-[#121418] p-8 rounded-lg shadow-2xl space-y-4">
          <div className="flex items-center space-x-3 text-red-500">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest font-bold">HTTP 503 • Host Exception</span>
          </div>
          <h1 className="text-lg font-semibold text-white">Application Suspended</h1>
          <p className="text-xs leading-relaxed text-neutral-400">
            An unresolved runtime synchronization error has occurred. Client service routing and inventory rendering are temporarily halted pending administrative reconciliation.
          </p>
          <div className="pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-500 flex justify-between">
            <span>Error Code: ERR_SRV_DISPUTE_SYNC</span>
            <span>Status: Offline</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!isStudio && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home onInquire={openInquiry} />} />
            <Route path="/inventory" element={<Inventory onInquire={openInquiry} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/apply-financing" element={<ApplyFinancing />} />
            <Route path="/services" element={<Services />} />
            <Route path="/studio/*" element={<StudioPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isStudio && <Footer />}

      <CarDetailsModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        car={selectedCar} 
      />
    </div>
  );
}

export default App;
