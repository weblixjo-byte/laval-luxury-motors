import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, User, Mail, Phone, Briefcase, CreditCard, ChevronDown } from 'lucide-react';
import { client } from '../client';

const WEB3FORMS_ACCESS_KEY = "d7f8311f-fb43-4cdd-96ed-afcf8c00bba3";

const FinanceModal = ({ isOpen, onClose }) => {
  const [vehicles, setVehicles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Fetch active inventory for vehicle selection dropdown
  useEffect(() => {
    if (isOpen) {
      const fetchVehicles = async () => {
        try {
          const query = `*[_type == "vehicle" && isSold != true] | order(year desc) {
            "id": _id,
            name,
            "brand": brand->name,
            model,
            year,
            price,
            priceDisplayMode
          }`;
          const data = await client.fetch(query);
          if (data) {
            setVehicles(data);
          }
        } catch (err) {
          console.error("Error fetching vehicles for finance dropdown:", err);
        }
      };
      fetchVehicles();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `New Financing Application - ${formData.get("name")}`);
    formData.append("from_name", "Laval Motors Finance Dept");

    // Format selected vehicle name if not general
    const vehicleId = formData.get("vehicle_selection");
    if (vehicleId && vehicleId !== "general") {
      const selectedCar = vehicles.find(v => v.id === vehicleId);
      if (selectedCar) {
        formData.append("interested_vehicle", `${selectedCar.year} ${selectedCar.brand} ${selectedCar.model}`);
      }
    } else {
      formData.append("interested_vehicle", "General Financing Inquiry");
    }

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
      setError("Network error. Please check your internet connection.");
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
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white w-full max-w-3xl my-8 overflow-hidden shadow-2xl relative rounded-sm border border-gray-100 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] text-luxury-accent font-bold">Laval Luxury Motors</span>
                <h3 className="text-xl md:text-2xl font-serif text-luxury-black mt-1">Financing Application</h3>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-black transition-colors rounded-full p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-grow overflow-y-auto px-8 py-8 md:px-12">
              {submitted ? (
                <div className="py-16 text-center flex flex-col items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-inner"
                  >
                    ✓
                  </motion.div>
                  <h4 className="text-2xl font-serif text-luxury-black mb-3">Application Received</h4>
                  <p className="text-gray-500 text-sm italic max-w-md mx-auto leading-relaxed">
                    Thank you. Your financial proposal request has been sent to our underwriting desk. A specialist will contact you in the next 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Step 1: Personal Details */}
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-[0.2em] text-luxury-accent font-bold border-b pb-2">1. Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <User className="absolute left-0 top-3 text-gray-400" size={16} />
                        <input 
                          type="text" 
                          name="name"
                          required 
                          placeholder="FULL NAME" 
                          className="w-full bg-transparent border-b border-gray-200 pl-8 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400" 
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-0 top-3 text-gray-400" size={16} />
                        <input 
                          type="email" 
                          name="email"
                          required 
                          placeholder="EMAIL ADDRESS" 
                          className="w-full bg-transparent border-b border-gray-200 pl-8 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400" 
                        />
                      </div>
                      <div className="relative md:col-span-2">
                        <Phone className="absolute left-0 top-3 text-gray-400" size={16} />
                        <input 
                          type="tel" 
                          name="phone"
                          required 
                          placeholder="PHONE NUMBER" 
                          className="w-full bg-transparent border-b border-gray-200 pl-8 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Financial Details */}
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-[0.2em] text-luxury-accent font-bold border-b pb-2">2. Financial & Credit Profile</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <Briefcase className="absolute left-0 top-3 text-gray-400" size={16} />
                        <select 
                          name="employment_status"
                          required
                          className="w-full bg-transparent border-b border-gray-200 pl-8 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light text-gray-700 cursor-pointer appearance-none"
                        >
                          <option value="" disabled selected>EMPLOYMENT STATUS</option>
                          <option value="Employed">Employed (Full-Time / Part-Time)</option>
                          <option value="Self-Employed">Self-Employed</option>
                          <option value="Retired">Retired</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-0 top-4 text-gray-400 pointer-events-none" size={14} />
                      </div>

                      <div className="relative">
                        <DollarSign className="absolute left-0 top-3 text-gray-400" size={16} />
                        <input 
                          type="number" 
                          name="monthly_income"
                          required 
                          placeholder="ESTIMATED MONTHLY INCOME ($)" 
                          className="w-full bg-transparent border-b border-gray-200 pl-8 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400" 
                        />
                      </div>

                      <div className="relative">
                        <CreditCard className="absolute left-0 top-3 text-gray-400" size={16} />
                        <select 
                          name="credit_score"
                          required
                          className="w-full bg-transparent border-b border-gray-200 pl-8 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light text-gray-700 cursor-pointer appearance-none"
                        >
                          <option value="" disabled selected>ESTIMATED CREDIT SCORE</option>
                          <option value="Excellent (720+)">Excellent (720+)</option>
                          <option value="Good (680-719)">Good (680-719)</option>
                          <option value="Fair (620-679)">Fair (620-679)</option>
                          <option value="Rebuilding (<620)">Rebuilding (Under 620)</option>
                        </select>
                        <ChevronDown className="absolute right-0 top-4 text-gray-400 pointer-events-none" size={14} />
                      </div>

                      <div className="relative">
                        <DollarSign className="absolute left-0 top-3 text-gray-400" size={16} />
                        <input 
                          type="number" 
                          name="down_payment"
                          required 
                          placeholder="DOWN PAYMENT AMOUNT ($)" 
                          className="w-full bg-transparent border-b border-gray-200 pl-8 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Vehicle Interest */}
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-[0.2em] text-luxury-accent font-bold border-b pb-2">3. Vehicle of Interest</h4>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="relative">
                        <select 
                          name="vehicle_selection"
                          className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light text-gray-700 cursor-pointer appearance-none"
                        >
                          <option value="general">GENERAL APPROVAL (NO SPECIFIC VEHICLE)</option>
                          {vehicles.map(vehicle => (
                            <option key={vehicle.id} value={vehicle.id}>
                              {vehicle.year} {vehicle.brand} {vehicle.model} - {
                                vehicle.priceDisplayMode === 'fixed' && vehicle.price 
                                  ? new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                      maximumFractionDigits: 0,
                                    }).format(vehicle.price)
                                  : 'Price on Request'
                              }
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-0 top-4 text-gray-400 pointer-events-none" size={14} />
                      </div>

                      <textarea 
                        name="details"
                        placeholder="ADDITIONAL DETAILS OR CUSTOM REQUIREMENTS" 
                        className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-luxury-accent transition-colors text-sm font-light placeholder:text-gray-400 h-20 resize-none"
                      ></textarea>
                    </div>
                  </div>

                  {error && <p className="text-xs text-red-500 italic">{error}</p>}

                  {/* Action Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-luxury-black text-white py-5 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-luxury-accent transition-all duration-500 shadow-xl disabled:opacity-50 mt-4"
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Financing Application'}
                  </button>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-[9px] text-gray-400 uppercase tracking-widest text-center flex-shrink-0">
              * Submission authorizes soft credit pull with no impact to credit score.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FinanceModal;
