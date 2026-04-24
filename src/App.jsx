import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import About from './pages/About';
import Contact from './pages/Contact';
import Financing from './pages/Financing';
import Services from './pages/Services';
import StudioPage from './pages/StudioPage';
import InquiryModal from './components/InquiryModal';

function App() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const location = useLocation();

  const openInquiry = (car) => {
    setSelectedCar(car);
    setIsInquiryOpen(true);
  };

  const isStudio = location.pathname.startsWith('/studio');

  return (
    <div className="flex flex-col min-h-screen">
      {!isStudio && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onInquire={openInquiry} />} />
          <Route path="/inventory" element={<Inventory onInquire={openInquiry} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/studio/*" element={<StudioPage />} />
        </Routes>
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
