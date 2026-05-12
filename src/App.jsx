import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';

// Lazy load pages for "Insane Speed"
const Home = lazy(() => import('./pages/Home'));
const Inventory = lazy(() => import('./pages/Inventory'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Financing = lazy(() => import('./pages/Financing'));
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
            <Route path="/services" element={<Services />} />
            <Route path="/studio/*" element={<StudioPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isStudio && <Footer />}

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        car={selectedCar} 
      />
    </div>
  );
}

export default App;
