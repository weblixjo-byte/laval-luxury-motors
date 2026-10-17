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
      <div 
        className="fixed inset-0 min-h-screen w-full bg-black text-white flex flex-col justify-center items-center p-6 z-[999999] select-none"
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" />
        <div className="max-w-2xl w-full border border-white/20 bg-black p-8 rounded-lg shadow-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-white">Application Runtime Error</span>
          </div>
          
          <h1 className="text-xl md:text-2xl font-bold mb-3 text-white">
            500 • Internal Execution Exception
          </h1>
          
          <p className="text-sm text-white/90 leading-relaxed mb-6">
            حدث خطأ برمجي غير متوقع أثناء معالجة عناصر النظام وتهيئة واجهة المستخدم (Runtime Hydration Failure). تعذر إكمال تحميل الشجرة البرمجية وتوقف استدعاء البيانات تلقائياً.
          </p>

          <div className="bg-white/5 border border-white/10 rounded p-4 font-mono text-xs text-white/80 space-y-1.5 overflow-x-auto">
            <div className="text-white font-semibold">Uncaught TypeError: Failed to execute 'evaluateTree' on HostContext</div>
            <div>&nbsp;&nbsp;at initializeRootContext (runtime-core.esm.js:1408:22)</div>
            <div>&nbsp;&nbsp;at renderWithHooks (react-dom.production.min.js:1634:19)</div>
            <div>&nbsp;&nbsp;at mountIndeterminateComponent (react-dom.production.min.js:2007:13)</div>
            <div>&nbsp;&nbsp;at beginWork (react-dom.production.min.js:2160:16)</div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-white/60">
            <span>Code: ERR_SYS_HYDRATION_ABORT</span>
            <span>Process ID: 0x88FA92</span>
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
