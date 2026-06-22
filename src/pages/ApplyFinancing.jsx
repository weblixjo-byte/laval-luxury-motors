import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '../client';
import { 
  User, MapPin, Briefcase, Car, Shield, 
  ChevronRight, ChevronLeft, AlertCircle, Printer
} from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = "d7f8311f-fb43-4cdd-96ed-afcf8c00bba3";

const STEPS = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Address History', icon: MapPin },
  { id: 3, title: 'Employment', icon: Briefcase },
  { id: 4, title: 'Vehicle Interest', icon: Car },
  { id: 5, title: 'Consent & Submit', icon: Shield }
];

// Fixed field order for Base64 serialization
// Map form keys to short abbreviations to minimize URL length
const KEY_MAP = {
  firstName: 'a',
  middleInitial: 'b',
  lastName: 'c',
  dob: 'd',
  ssn: 'e',
  email: 'f',
  phone: 'g',
  maritalStatus: 'h',
  streetAddress: 'i',
  aptUnit: 'j',
  city: 'k',
  state: 'l',
  zipCode: 'm',
  residenceType: 'n',
  monthlyPayment: 'o',
  yearsAtAddress: 'p',
  monthsAtAddress: 'q',
  prevStreetAddress: 'r',
  prevAptUnit: 's',
  prevCity: 't',
  prevState: 'u',
  prevZipCode: 'v',
  prevYearsAtAddress: 'w',
  prevMonthsAtAddress: 'x',
  employmentStatus: 'y',
  employerName: 'z',
  jobTitle: 'A',
  workPhone: 'B',
  monthlyIncome: 'C',
  yearsAtJob: 'D',
  monthsAtJob: 'E',
  prevEmployerName: 'F',
  prevJobTitle: 'G',
  prevMonthlyIncome: 'H',
  prevYearsAtJob: 'I',
  prevMonthsAtJob: 'J',
  vehicleSelection: 'K',
  vehicleName: 'L',
  loanAmount: 'M',
  downPayment: 'N',
  tradeInYear: 'O',
  tradeInMake: 'P',
  tradeInModel: 'Q',
  tradeInMileage: 'R',
  signature: 'S'
};

// Base64 helper methods supporting Unicode and compression via key mapping
const serializeData = (data, vehicleName) => {
  const obj = {};
  Object.keys(KEY_MAP).forEach(key => {
    let val = key === 'vehicleName' ? (vehicleName || '') : (data[key] || '');
    if (val !== undefined && val !== null && val !== '') {
      obj[KEY_MAP[key]] = val;
    }
  });
  const jsonStr = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(jsonStr);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const deserializeData = (base64Str) => {
  try {
    const binary = atob(base64Str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoded = new TextDecoder().decode(bytes);
    const obj = JSON.parse(decoded);
    const data = {};
    
    // Create reverse lookup map
    const revMap = {};
    Object.entries(KEY_MAP).forEach(([k, v]) => {
      revMap[v] = k;
    });
    
    Object.keys(KEY_MAP).forEach(key => {
      const shortKey = KEY_MAP[key];
      data[key] = obj[shortKey] !== undefined ? obj[shortKey] : '';
    });
    return data;
  } catch (err) {
    console.error("Error decoding credit application parameters:", err);
    return null;
  }
};

// Print summary using explicit inline styling and A4 table structures
const PrintSummary = ({ data }) => {
  const formatSSN = (ssn) => {
    if (!ssn) return '';
    const clean = ssn.replace(/\D/g, '');
    if (clean.length === 9) {
      return `${clean.slice(0, 3)}-${clean.slice(3, 5)}-${clean.slice(5)}`;
    }
    return ssn;
  };

  useEffect(() => {
    // Automatically trigger printing dialog after rendering
    const timer = setTimeout(() => {
      window.print();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const yearsAtAddress = parseInt(data.yearsAtAddress || 0, 10);
  const monthsAtAddress = parseInt(data.monthsAtAddress || 0, 10);
  const isAddressShort = (yearsAtAddress * 12 + monthsAtAddress) < 24;

  const yearsAtJob = parseInt(data.yearsAtJob || 0, 10);
  const monthsAtJob = parseInt(data.monthsAtJob || 0, 10);
  const isEmploymentShort = (yearsAtJob * 12 + monthsAtJob) < 24;

  // Reusable inline style objects for strict A4 table rendering
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #000',
    marginTop: '4px',
    marginBottom: '10px'
  };

  const headerBlockStyle = {
    backgroundColor: '#e5e7eb',
    border: '1px solid #000',
    padding: '4px 8px',
    fontWeight: 'bold',
    fontSize: '9.5px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontFamily: 'Helvetica, Arial, sans-serif'
  };

  const labelStyle = {
    border: '1px solid #000',
    padding: '5px 8px',
    fontWeight: 'bold',
    fontSize: '8.5px',
    textTransform: 'uppercase',
    color: '#374151',
    backgroundColor: '#f9fafb',
    width: '20%',
    fontFamily: 'Helvetica, Arial, sans-serif'
  };

  const valueStyle = {
    border: '1px solid #000',
    padding: '5px 8px',
    fontSize: '10px',
    fontWeight: '500',
    color: '#000',
    width: '30%',
    fontFamily: 'Helvetica, Arial, sans-serif'
  };

  // Explicit spanned cells style to prevent overriding standard column widths
  const valueSpanStyle = {
    border: '1px solid #000',
    padding: '5px 8px',
    fontSize: '10px',
    fontWeight: '500',
    color: '#000',
    fontFamily: 'Helvetica, Arial, sans-serif'
  };

  return (
    <div style={{ padding: '15px', backgroundColor: '#fff', minHeight: '100vh', color: '#000' }} className="print-container">
      {/* CSS rules targeting printing specifically, hiding website wrapper navigation and footer */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body, html, #root, main, .print-container {
            background-color: #fff !important;
            color: #000 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          nav, footer, .no-print {
            display: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 1.0cm 1.2cm;
          }
        }
      `}} />

      {/* Printing Toolbar (Hidden during print) */}
      <div className="no-print" style={{
        maxWidth: '750px',
        margin: '0 auto 20px auto',
        backgroundColor: '#f3f4f6',
        border: '1px solid #e5e7eb',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '2px',
        fontFamily: 'sans-serif'
      }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#1f2937' }}>Laval Motors Credit App Print Desk</h4>
          <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#6b7280' }}>Formatted specifically for 1-page A4 printouts. Click button if print dialog closed.</p>
        </div>
        <button 
          onClick={() => window.print()}
          style={{
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            fontSize: '11px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Printer size={12} /> Print Page
        </button>
      </div>

      {/* Credit Application Sheet */}
      <div style={{ maxWidth: '750px', margin: '0 auto', padding: '0', backgroundColor: '#fff' }}>
        
        {/* Document Title Header */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: 'top', padding: 0 }}>
                <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', fontFamily: 'Georgia, serif', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Laval Luxury Motors
                </h1>
                <p style={{ margin: '2px 0 0 0', fontSize: '8.5px', textTransform: 'uppercase', letterSpacing: '1px', color: '#4b5563', fontWeight: '500' }}>
                  Bespoke Finance Department | Confidential Credit Assessment
                </p>
              </td>
              <td style={{ textAlign: 'right', verticalAlign: 'top', padding: 0 }}>
                <span style={{ fontSize: '8px', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: '#000', color: '#fff', padding: '3px 6px', letterSpacing: '1px' }}>
                  Underwriter Copy
                </span>
                <p style={{ margin: '6px 0 0 0', fontSize: '8.5px', fontFamily: 'monospace', color: '#4b5563' }}>
                  APP-REF: #{data.lastName?.slice(0, 3).toUpperCase() || 'LLM'}-{new Date().getFullYear()}
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 1: Personal */}
        <div style={headerBlockStyle}>1. Applicant Identification</div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelStyle}>Full Name</td>
              <td style={valueSpanStyle} colSpan="3">{data.firstName} {data.middleInitial ? data.middleInitial + '. ' : ''}{data.lastName}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Social Security No.</td>
              <td style={{ ...valueStyle, fontWeight: 'bold', fontFamily: 'monospace' }}>{formatSSN(data.ssn)}</td>
              <td style={labelStyle}>Date of Birth</td>
              <td style={valueStyle}>{data.dob}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Primary Phone</td>
              <td style={valueStyle}>{data.phone}</td>
              <td style={labelStyle}>Email Address</td>
              <td style={valueStyle}>{data.email}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Marital Status</td>
              <td style={valueSpanStyle} colSpan="3">{data.maritalStatus}</td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 2: Housing */}
        <div style={headerBlockStyle}>2. Residential History</div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelStyle}>Current Address</td>
              <td style={valueSpanStyle} colSpan="3">
                {data.streetAddress}{data.aptUnit ? ' Apt ' + data.aptUnit : ''}, {data.city}, {data.state} {data.zipCode}
              </td>
            </tr>
            <tr>
              <td style={labelStyle}>Housing Status</td>
              <td style={valueStyle}>{data.residenceType}</td>
              <td style={labelStyle}>Housing Payment</td>
              <td style={valueStyle}>${data.monthlyPayment} / month</td>
            </tr>
            <tr>
              <td style={labelStyle}>Duration of Residency</td>
              <td style={valueSpanStyle} colSpan="3">{data.yearsAtAddress} Years, {data.monthsAtAddress || 0} Months</td>
            </tr>
            {isAddressShort && (
              <tr>
                <td style={labelStyle}>Previous Address</td>
                <td style={{ ...valueSpanStyle, fontSize: '9px', color: '#374151' }} colSpan="3">
                  {data.prevStreetAddress}{data.prevAptUnit ? ' Apt ' + data.prevAptUnit : ''}, {data.prevCity}, {data.prevState} {data.prevZipCode} (Duration: {data.prevYearsAtAddress} Years, {data.prevMonthsAtAddress || 0} Months)
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* SECTION 3: Employment */}
        <div style={headerBlockStyle}>3. Employment & Income Profile</div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelStyle}>Current Employer</td>
              <td style={valueStyle}>{data.employerName}</td>
              <td style={labelStyle}>Job Title / Occupation</td>
              <td style={valueStyle}>{data.jobTitle}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Status</td>
              <td style={valueStyle}>{data.employmentStatus}</td>
              <td style={labelStyle}>Employer Work Phone</td>
              <td style={valueStyle}>{data.workPhone || 'N/A'}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Gross Monthly Income</td>
              <td style={{ ...valueStyle, fontWeight: 'bold' }}>
                ${data.monthlyIncome ? parseFloat(data.monthlyIncome).toLocaleString() : '0'}
              </td>
              <td style={labelStyle}>Time at Employer</td>
              <td style={valueStyle}>{data.yearsAtJob} Years, {data.monthsAtJob || 0} Months</td>
            </tr>
            {isEmploymentShort && (
              <tr>
                <td style={labelStyle}>Previous Employer</td>
                <td style={{ ...valueSpanStyle, fontSize: '9px', color: '#374151' }} colSpan="3">
                  {data.prevEmployerName} - {data.prevJobTitle} (Income: ${data.prevMonthlyIncome ? parseFloat(data.prevMonthlyIncome).toLocaleString() : '0'}/mo, Duration: {data.prevYearsAtJob} Years, {data.prevMonthsAtJob || 0} Months)
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* SECTION 4: Vehicle & Financing */}
        <div style={headerBlockStyle}>4. Transaction details</div>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelStyle}>Vehicle of Interest</td>
              <td style={{ ...valueSpanStyle, fontWeight: 'bold' }} colSpan="3">{data.vehicleName || 'General Pre-Approval'}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Est. Loan Amount</td>
              <td style={valueStyle}>${data.loanAmount ? parseFloat(data.loanAmount).toLocaleString() : '0'}</td>
              <td style={labelStyle}>Down Payment</td>
              <td style={valueStyle}>${data.downPayment ? parseFloat(data.downPayment).toLocaleString() : '0'}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Trade-In Details</td>
              <td style={valueSpanStyle} colSpan="3">
                {data.tradeInYear ? `${data.tradeInYear} ${data.tradeInMake} ${data.tradeInModel} (Mileage: ${data.tradeInMileage ? parseFloat(data.tradeInMileage).toLocaleString() : 'N/A'})` : 'None'}
              </td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 5: Legal & Authorization */}
        <div style={headerBlockStyle}>5. Certifications & Disclosures</div>
        <div style={{
          border: '1px solid #000',
          borderTop: 'none',
          padding: '8px 10px',
          fontSize: '8px',
          color: '#4b5563',
          lineHeight: '1.3',
          textAlign: 'justify',
          marginBottom: '10px',
          fontFamily: 'Helvetica, Arial, sans-serif'
        }}>
          By signing below, the applicant authorizes Laval Luxury Motors and its designated underwriting lending partners to obtain credit bureau reports and verify all information provided on this credit application. The applicant certifies that all entries are correct, complete, and truthful. This inquiry is processed as a soft credit inquiry initially and will not affect the applicant's official credit score.
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000' }}>
          <tbody>
            <tr>
              <td style={{ width: '60%', borderRight: '1px solid #000', padding: '10px', verticalAlign: 'top' }}>
                <span style={{ fontSize: '7.5px', textTransform: 'uppercase', fontWeight: 'bold', color: '#6b7280', fontFamily: 'sans-serif' }}>
                  Applicant Digital Signature
                </span>
                <div style={{
                  fontSize: '14px',
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  color: '#000',
                  marginTop: '12px',
                  borderBottom: '1px solid #d1d5db',
                  paddingBottom: '3px'
                }}>
                  {data.signature}
                </div>
              </td>
              <td style={{ width: '40%', padding: '10px', verticalAlign: 'top' }}>
                <span style={{ fontSize: '7.5px', textTransform: 'uppercase', fontWeight: 'bold', color: '#6b7280', fontFamily: 'sans-serif' }}>
                  Signature Date
                </span>
                <div style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#000',
                  marginTop: '15px',
                  borderBottom: '1px solid #d1d5db',
                  paddingBottom: '3px'
                }}>
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Footer */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '7.5px', trackingLetter: '1px', textTransform: 'uppercase', color: '#9ca3af', fontFamily: 'sans-serif' }}>
          * CONFIDENTIAL DOCUMENT FOR LENDER ASSESSMENT ONLY *
        </div>

      </div>
    </div>
  );
};

const ApplyFinancing = () => {
  const [isPrintMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return !!params.get('d');
  });
  const [printData] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get('d');
    return d ? deserializeData(d) : null;
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [vehicles, setVehicles] = useState([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    middleInitial: '',
    lastName: '',
    dob: '',
    ssn: '',
    email: '',
    phone: '',
    maritalStatus: '',

    streetAddress: '',
    aptUnit: '',
    city: '',
    state: '',
    zipCode: '',
    residenceType: '',
    monthlyPayment: '',
    yearsAtAddress: '',
    monthsAtAddress: '',
    
    prevStreetAddress: '',
    prevAptUnit: '',
    prevCity: '',
    prevState: '',
    prevZipCode: '',
    prevYearsAtAddress: '',
    prevMonthsAtAddress: '',

    employmentStatus: '',
    employerName: '',
    jobTitle: '',
    workPhone: '',
    monthlyIncome: '',
    yearsAtJob: '',
    monthsAtJob: '',
    
    prevEmployerName: '',
    prevJobTitle: '',
    prevMonthlyIncome: '',
    prevYearsAtJob: '',
    prevMonthsAtJob: '',

    vehicleSelection: 'general',
    loanAmount: '',
    downPayment: '',
    tradeInYear: '',
    tradeInMake: '',
    tradeInModel: '',
    tradeInMileage: '',

    creditConsent: false,
    signature: ''
  });



  // Fetch active inventory for vehicle selection dropdown
  useEffect(() => {
    if (isPrintMode) return;
    const fetchVehicles = async () => {
      try {
        setIsLoadingVehicles(true);
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
        console.error("Error fetching vehicles for credit application:", err);
      } finally {
        setIsLoadingVehicles(false);
      }
    };
    fetchVehicles();
  }, [isPrintMode]);

  if (isPrintMode && printData) {
    return <PrintSummary data={printData} />;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isAddressHistoryShort = () => {
    const years = parseInt(formData.yearsAtAddress || 0, 10);
    const months = parseInt(formData.monthsAtAddress || 0, 10);
    return (years * 12 + months) < 24;
  };

  const isEmploymentHistoryShort = () => {
    const years = parseInt(formData.yearsAtJob || 0, 10);
    const months = parseInt(formData.monthsAtJob || 0, 10);
    return (years * 12 + months) < 24;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.dob && formData.ssn && formData.email && formData.phone && formData.maritalStatus;
      case 2:
        if (!formData.streetAddress || !formData.city || !formData.state || !formData.zipCode || !formData.residenceType || !formData.monthlyPayment || formData.yearsAtAddress === '') {
          return false;
        }
        if (isAddressHistoryShort()) {
          return formData.prevStreetAddress && formData.prevCity && formData.prevZipCode && formData.prevYearsAtAddress !== '';
        }
        return true;
      case 3:
        if (!formData.employmentStatus || !formData.employerName || !formData.jobTitle || !formData.monthlyIncome || formData.yearsAtJob === '') {
          return false;
        }
        if (isEmploymentHistoryShort()) {
          return formData.prevEmployerName && formData.prevJobTitle && formData.prevMonthlyIncome && formData.prevYearsAtJob !== '';
        }
        return true;
      case 4:
        return formData.loanAmount && formData.downPayment;
      case 5:
        return formData.creditConsent && formData.signature;
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(5)) {
      setSubmitError("Please fill out all required fields and sign the application.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Resolve vehicle name
    let vehicleName = "General Pre-Approval (No specific vehicle)";
    if (formData.vehicleSelection && formData.vehicleSelection !== 'general') {
      const selectedCar = vehicles.find(v => v.id === formData.vehicleSelection);
      if (selectedCar) {
        vehicleName = `${selectedCar.year} ${selectedCar.brand} ${selectedCar.model}`;
      }
    }

    // Generate secure printable link using Base64 data compression
    const compressedCode = serializeData(formData, vehicleName);
    const printUrl = `${window.location.origin}/apply-financing?d=${compressedCode}`;

    // Format data for Web3Forms email body
    const submissionBody = new FormData();
    submissionBody.append("access_key", WEB3FORMS_ACCESS_KEY);
    submissionBody.append("subject", `LAVAL CREDIT APP: ${formData.firstName} ${formData.lastName}`);
    submissionBody.append("from_name", "Laval Motors Credit Desk");
    submissionBody.append("Print Link (Click to Print on 1 Page)", printUrl);

    const fieldsToSubmit = {
      "Full Name": `${formData.firstName} ${formData.middleInitial ? formData.middleInitial + ' ' : ''}${formData.lastName}`,
      "Date of Birth": formData.dob,
      "Social Security Number": formData.ssn,
      "Email Address": formData.email,
      "Phone Number": formData.phone,
      "Marital Status": formData.maritalStatus,
      "Current Address": `${formData.streetAddress} ${formData.aptUnit ? 'Apt ' + formData.aptUnit : ''}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
      "Residence Type": formData.residenceType,
      "Monthly Housing Payment": `$${formData.monthlyPayment}`,
      "Time at Address": `${formData.yearsAtAddress} Years, ${formData.monthsAtAddress || 0} Months`,
      "Previous Address": isAddressHistoryShort() 
        ? `${formData.prevStreetAddress} ${formData.prevAptUnit ? 'Apt ' + formData.prevAptUnit : ''}, ${formData.prevCity}, ${formData.prevState} ${formData.prevZipCode} (Time: ${formData.prevYearsAtAddress} Y, ${formData.prevMonthsAtAddress || 0} M)` 
        : 'N/A (> 2 Years)',
      "Employment Status": formData.employmentStatus,
      "Employer Name": formData.employerName,
      "Job Title / Position": formData.jobTitle,
      "Gross Monthly Income": `$${formData.monthlyIncome}`,
      "Time at Job": `${formData.yearsAtJob} Years, ${formData.monthsAtJob || 0} Months`,
      "Previous Employer": isEmploymentHistoryShort() 
        ? `${formData.prevEmployerName} - ${formData.prevJobTitle} (Income: $${formData.prevMonthlyIncome}, Time: ${formData.prevYearsAtJob} Y, ${formData.prevMonthsAtJob || 0} M)`
        : 'N/A (> 2 Years)',
      "Selected Vehicle": vehicleName,
      "Estimated Loan Amount": `$${formData.loanAmount}`,
      "Down Payment Amount": `$${formData.downPayment}`,
      "Trade-in Details": formData.tradeInYear ? `${formData.tradeInYear} ${formData.tradeInMake} ${formData.tradeInModel} (Mileage: ${formData.tradeInMileage || 'N/A'})` : 'None',
      "Credit Authorization Consent": formData.creditConsent ? "AUTHORIZED" : "DECLINED",
      "Digital Signature": formData.signature,
      "Submission Date": new Date().toLocaleString()
    };

    Object.entries(fieldsToSubmit).forEach(([key, val]) => {
      submissionBody.append(key, val);
    });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionBody
      });
      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        setSubmitError("Failed to submit application. Please check your details and try again.");
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Network error. Please verify your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-24 font-sans text-luxury-black">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.6em] text-luxury-accent font-bold">Laval Luxury Motors</span>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-luxury-black">
            Bespoke Credit Application
          </h1>
          <div className="w-16 h-px bg-luxury-accent mx-auto my-4"></div>
          <p className="text-sm font-light text-gray-500 max-w-lg mx-auto">
            Apply securely in minutes. Our premium finance desk coordinates with top tier lending institutions.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-sm border border-gray-100 shadow-xl overflow-hidden">
          
          {/* Progress Header */}
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-6 md:px-8">
            <div className="flex justify-between items-center relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-luxury-accent -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              ></div>
              
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isCompleted = step.id < currentStep;
                const isActive = step.id === currentStep;

                return (
                  <div key={step.id} className="relative z-10 flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
                        isCompleted 
                          ? 'bg-luxury-accent border-luxury-accent text-white' 
                          : isActive 
                            ? 'bg-luxury-black border-luxury-black text-white scale-110 shadow-lg' 
                            : 'bg-white border-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <span 
                      className={`text-[9px] uppercase tracking-wider font-bold mt-2 hidden md:block ${
                        isActive ? 'text-luxury-black font-extrabold' : 'text-gray-400 font-light'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="px-6 py-10 md:px-12 md:py-12">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 space-y-6 max-w-md mx-auto"
              >
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
                  ✓
                </div>
                <h2 className="text-3xl font-serif text-luxury-black">Application Submitted</h2>
                <p className="text-gray-500 text-sm leading-relaxed font-light italic">
                  Thank you for choosing Laval Luxury Motors. Your detailed financing application has been successfully submitted to our private underwriting department. 
                </p>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  A representative will review your credit history and contact you shortly at your provided phone number and email.
                </p>
                <div className="pt-6">
                  <a 
                    href="/inventory" 
                    className="inline-block bg-luxury-black text-white hover:bg-luxury-accent px-8 py-3 uppercase tracking-widest text-[10px] font-bold transition-all duration-300 rounded-sm"
                  >
                    Return To Inventory
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: Personal Info */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <h3 className="text-lg font-serif text-luxury-black border-b pb-3 flex items-center gap-2">
                        <span className="text-luxury-accent">01.</span> Personal Identification
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-5">
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">First Name *</label>
                          <input 
                            type="text" 
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">M.I.</label>
                          <input 
                            type="text" 
                            name="middleInitial"
                            maxLength={1}
                            value={formData.middleInitial}
                            onChange={handleInputChange}
                            placeholder="D" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 text-center outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                        <div className="md:col-span-5">
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Last Name *</label>
                          <input 
                            type="text" 
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Doe" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Date of Birth *</label>
                          <input 
                            type="date" 
                            name="dob"
                            required
                            value={formData.dob}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light text-gray-700"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Social Security Number *</label>
                          <input 
                            type="password" 
                            name="ssn"
                            required
                            pattern="^\d{3}-\d{2}-\d{4}$|^\d{9}$"
                            value={formData.ssn}
                            onChange={handleInputChange}
                            placeholder="XXX-XX-XXXX (or 9 digits)" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Email Address *</label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john.doe@example.com" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Phone Number *</label>
                          <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="(555) 555-5555" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Marital Status *</label>
                        <select 
                          name="maritalStatus"
                          required
                          value={formData.maritalStatus}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light text-gray-700 cursor-pointer"
                        >
                          <option value="">Select Option</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Separated">Separated</option>
                          <option value="Divorced">Divorced</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Address History */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <h3 className="text-lg font-serif text-luxury-black border-b pb-3 flex items-center gap-2">
                        <span className="text-luxury-accent">02.</span> Housing & Residence Details
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-9">
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Street Address *</label>
                          <input 
                            type="text" 
                            name="streetAddress"
                            required
                            value={formData.streetAddress}
                            onChange={handleInputChange}
                            placeholder="123 Luxury Ave" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Apt / Unit</label>
                          <input 
                            type="text" 
                            name="aptUnit"
                            value={formData.aptUnit}
                            onChange={handleInputChange}
                            placeholder="Suite 4B" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">City *</label>
                          <input 
                            type="text" 
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Beverly Hills" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">State *</label>
                          <input 
                            type="text" 
                            name="state"
                            required
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="CA" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Zip Code *</label>
                          <input 
                            type="text" 
                            name="zipCode"
                            required
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            placeholder="90210" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Residential Status *</label>
                          <select 
                            name="residenceType"
                            required
                            value={formData.residenceType}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light text-gray-700 cursor-pointer"
                          >
                            <option value="">Select Status</option>
                            <option value="Own (Mortgage)">Own with Mortgage</option>
                            <option value="Own (No Mortgage)">Own Outright</option>
                            <option value="Rent">Rent</option>
                            <option value="Live with Parents">Live with Family</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Monthly Payment ($) *</label>
                          <input 
                            type="number" 
                            name="monthlyPayment"
                            required
                            value={formData.monthlyPayment}
                            onChange={handleInputChange}
                            placeholder="1500" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Time at Address *</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input 
                              type="number" 
                              name="yearsAtAddress"
                              required
                              value={formData.yearsAtAddress}
                              onChange={handleInputChange}
                              placeholder="Yrs" 
                              className="w-full bg-transparent border-b border-gray-200 py-2.5 text-center outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                            />
                            <input 
                              type="number" 
                              name="monthsAtAddress"
                              value={formData.monthsAtAddress}
                              onChange={handleInputChange}
                              placeholder="Mths" 
                              className="w-full bg-transparent border-b border-gray-200 py-2.5 text-center outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Conditional Previous Address (If current address is < 2 years) */}
                      {isAddressHistoryShort() && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-6 border-t border-dashed border-gray-200 space-y-6"
                        >
                          <div className="bg-amber-50/50 p-4 border border-amber-200/40 rounded-sm flex items-start gap-3">
                            <AlertCircle size={16} className="text-amber-600 mt-0.5" />
                            <p className="text-xs text-amber-800 font-light leading-relaxed">
                              Because you have lived at your current address for less than 2 years, please provide your previous address details to complete your application.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-9">
                              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Prev. Street Address *</label>
                              <input 
                                type="text" 
                                name="prevStreetAddress"
                                required={isAddressHistoryShort()}
                                value={formData.prevStreetAddress}
                                onChange={handleInputChange}
                                placeholder="456 Classic Rd" 
                                className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                              />
                            </div>
                            <div className="md:col-span-3">
                              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Apt / Unit</label>
                              <input 
                                type="text" 
                                name="prevAptUnit"
                                value={formData.prevAptUnit}
                                onChange={handleInputChange}
                                placeholder="Unit 2" 
                                className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Prev. City *</label>
                              <input 
                                type="text" 
                                name="prevCity"
                                required={isAddressHistoryShort()}
                                value={formData.prevCity}
                                onChange={handleInputChange}
                                placeholder="Palo Alto" 
                                className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Prev. State *</label>
                              <input 
                                type="text" 
                                name="prevState"
                                required={isAddressHistoryShort()}
                                value={formData.prevState}
                                onChange={handleInputChange}
                                placeholder="CA" 
                                className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Prev. Zip Code *</label>
                              <input 
                                type="text" 
                                name="prevZipCode"
                                required={isAddressHistoryShort()}
                                value={formData.prevZipCode}
                                onChange={handleInputChange}
                                placeholder="94301" 
                                className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Time at Previous Address *</label>
                            <div className="grid grid-cols-2 gap-2 max-w-[240px]">
                              <input 
                                type="number" 
                                name="prevYearsAtAddress"
                                required={isAddressHistoryShort()}
                                value={formData.prevYearsAtAddress}
                                onChange={handleInputChange}
                                placeholder="Years" 
                                className="w-full bg-transparent border-b border-gray-200 py-2.5 text-center outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                              />
                              <input 
                                type="number" 
                                name="prevMonthsAtAddress"
                                value={formData.prevMonthsAtAddress}
                                onChange={handleInputChange}
                                placeholder="Months" 
                                className="w-full bg-transparent border-b border-gray-200 py-2.5 text-center outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 3: Employment Details */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <h3 className="text-lg font-serif text-luxury-black border-b pb-3 flex items-center gap-2">
                        <span className="text-luxury-accent">03.</span> Employment & Monthly Income
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Employment Status *</label>
                          <select 
                            name="employmentStatus"
                            required
                            value={formData.employmentStatus}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light text-gray-700 cursor-pointer"
                          >
                            <option value="">Select Employment</option>
                            <option value="Full-Time">Employed (Full-Time)</option>
                            <option value="Part-Time">Employed (Part-Time)</option>
                            <option value="Self-Employed">Self-Employed</option>
                            <option value="Retired">Retired</option>
                            <option value="Military">Military</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Employer / Business Name *</label>
                          <input 
                            type="text" 
                            name="employerName"
                            required
                            value={formData.employerName}
                            onChange={handleInputChange}
                            placeholder="Google LLC" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Job Title / Occupation *</label>
                          <input 
                            type="text" 
                            name="jobTitle"
                            required
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            placeholder="Senior Staff Software Engineer" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Employer Work Phone</label>
                          <input 
                            type="tel" 
                            name="workPhone"
                            value={formData.workPhone}
                            onChange={handleInputChange}
                            placeholder="(555) 555-5555" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Gross Monthly Income *</label>
                          <input 
                            type="number" 
                            name="monthlyIncome"
                            required
                            value={formData.monthlyIncome}
                            onChange={handleInputChange}
                            placeholder="Monthly Income (Before Taxes)" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Time at Current Job *</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input 
                              type="number" 
                              name="yearsAtJob"
                              required
                              value={formData.yearsAtJob}
                              onChange={handleInputChange}
                              placeholder="Yrs" 
                              className="w-full bg-transparent border-b border-gray-200 py-2.5 text-center outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                            />
                            <input 
                              type="number" 
                              name="monthsAtJob"
                              value={formData.monthsAtJob}
                              onChange={handleInputChange}
                              placeholder="Mths" 
                              className="w-full bg-transparent border-b border-gray-200 py-2.5 text-center outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Conditional Previous Employment (If current job is < 2 years) */}
                      {isEmploymentHistoryShort() && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-6 border-t border-dashed border-gray-200 space-y-6"
                        >
                          <div className="bg-amber-50/50 p-4 border border-amber-200/40 rounded-sm flex items-start gap-3">
                            <AlertCircle size={16} className="text-amber-600 mt-0.5" />
                            <p className="text-xs text-amber-800 font-light leading-relaxed">
                              Because you have been with your current employer for less than 2 years, please provide your previous employment history to proceed.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Prev. Employer Name *</label>
                              <input 
                                type="text" 
                                name="prevEmployerName"
                                required={isEmploymentHistoryShort()}
                                value={formData.prevEmployerName}
                                onChange={handleInputChange}
                                placeholder="Previous Company Inc" 
                                className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Prev. Job Title *</label>
                              <input 
                                type="text" 
                                name="prevJobTitle"
                                required={isEmploymentHistoryShort()}
                                value={formData.prevJobTitle}
                                onChange={handleInputChange}
                                placeholder="Systems Engineer" 
                                className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Prev. Gross Monthly Income *</label>
                              <input 
                                type="number" 
                                name="prevMonthlyIncome"
                                required={isEmploymentHistoryShort()}
                                value={formData.prevMonthlyIncome}
                                onChange={handleInputChange}
                                placeholder="8000" 
                                className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Prev. Job Duration *</label>
                              <div className="grid grid-cols-2 gap-2 max-w-[240px]">
                                <input 
                                  type="number" 
                                  name="prevYearsAtJob"
                                  required={isEmploymentHistoryShort()}
                                  value={formData.prevYearsAtJob}
                                  onChange={handleInputChange}
                                  placeholder="Yrs" 
                                  className="w-full bg-transparent border-b border-gray-200 py-2.5 text-center outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                                />
                                <input 
                                  type="number" 
                                  name="prevMonthsAtJob"
                                  value={formData.prevMonthsAtJob}
                                  onChange={handleInputChange}
                                  placeholder="Mths" 
                                  className="w-full bg-transparent border-b border-gray-200 py-2.5 text-center outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 4: Vehicle & Loan Selection */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <h3 className="text-lg font-serif text-luxury-black border-b pb-3 flex items-center gap-2">
                        <span className="text-luxury-accent">04.</span> Vehicle & Financing Configuration
                      </h3>

                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Select Vehicle of Interest</label>
                        {isLoadingVehicles ? (
                          <div className="py-2.5 text-sm font-light text-gray-400">Loading vehicles from showroom...</div>
                        ) : (
                          <select 
                            name="vehicleSelection"
                            value={formData.vehicleSelection}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light text-gray-700 cursor-pointer"
                          >
                            <option value="general">General Pre-Approval (No specific vehicle)</option>
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
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Requested Loan Amount ($) *</label>
                          <input 
                            type="number" 
                            name="loanAmount"
                            required
                            value={formData.loanAmount}
                            onChange={handleInputChange}
                            placeholder="Estimated Purchase Price" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Down Payment ($) *</label>
                          <input 
                            type="number" 
                            name="downPayment"
                            required
                            value={formData.downPayment}
                            onChange={handleInputChange}
                            placeholder="Cash Down / Equity" 
                            className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                          />
                        </div>
                      </div>

                      {/* Trade-in Section */}
                      <div className="pt-6 border-t border-dashed border-gray-200 space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-luxury-accent font-bold">Trade-In Vehicle Details (Optional)</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Trade-in Year</label>
                            <input 
                              type="number" 
                              name="tradeInYear"
                              value={formData.tradeInYear}
                              onChange={handleInputChange}
                              placeholder="2018" 
                              className="w-full bg-transparent border-b border-gray-200 py-2.5 text-center outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Trade-in Make</label>
                            <input 
                              type="text" 
                              name="tradeInMake"
                              value={formData.tradeInMake}
                              onChange={handleInputChange}
                              placeholder="BMW" 
                              className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Trade-in Model</label>
                            <input 
                              type="text" 
                              name="tradeInModel"
                              value={formData.tradeInModel}
                              onChange={handleInputChange}
                              placeholder="M4 Coupe" 
                              className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Trade-in Mileage</label>
                            <input 
                              type="number" 
                              name="tradeInMileage"
                              value={formData.tradeInMileage}
                              onChange={handleInputChange}
                              placeholder="45000" 
                              className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-light"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: Authorization & Consent */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step-5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <h3 className="text-lg font-serif text-luxury-black border-b pb-3 flex items-center gap-2">
                        <span className="text-luxury-accent">05.</span> Authorization & Submission
                      </h3>

                      <div className="bg-gray-50 border border-gray-100 p-6 space-y-4 rounded-sm text-xs text-gray-500 font-light leading-relaxed">
                        <h4 className="text-[10px] uppercase tracking-widest text-luxury-black font-extrabold">Terms, Conditions & Credit Authorization</h4>
                        <p>
                          By checking the box below, I authorize Laval Luxury Motors and its lending partners to conduct a credit check and soft credit pull to evaluate this pre-approval request. I certify that all details entered in this credit application are true, correct, and complete to the best of my knowledge.
                        </p>
                        <p>
                          I understand that a soft credit inquiry will be recorded, which does not impact my official credit score. If I proceed to complete a formal vehicle loan contract, a hard credit pull may be initiated by the assigned underwriting financial institution.
                        </p>
                      </div>

                      <div className="flex items-start gap-4">
                        <input 
                          type="checkbox" 
                          id="creditConsent"
                          name="creditConsent"
                          required
                          checked={formData.creditConsent}
                          onChange={handleInputChange}
                          className="mt-1 accent-luxury-accent cursor-pointer"
                        />
                        <label htmlFor="creditConsent" className="text-xs text-gray-600 font-light cursor-pointer select-none">
                          I agree to the Terms & Conditions and authorize a soft credit check as described above. *
                        </label>
                      </div>

                      <div className="max-w-md">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Digital Signature (Type Full Name) *</label>
                        <input 
                          type="text" 
                          name="signature"
                          required
                          value={formData.signature}
                          onChange={handleInputChange}
                          placeholder="John David Doe" 
                          className="w-full bg-transparent border-b border-gray-200 py-2.5 outline-none focus:border-luxury-accent transition-colors text-sm font-serif italic text-luxury-black"
                        />
                      </div>

                      {submitError && (
                        <div className="bg-red-50 border border-red-200/50 p-4 rounded-sm text-red-600 text-xs italic flex items-center gap-2">
                          <AlertCircle size={14} />
                          {submitError}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Buttons */}
                <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                  {currentStep > 1 ? (
                    <button 
                      type="button" 
                      onClick={handlePrevStep}
                      className="flex items-center gap-2 border border-gray-200 hover:border-luxury-black text-gray-600 hover:text-luxury-black px-6 py-3.5 uppercase tracking-widest text-[9px] font-bold transition-all duration-300 rounded-sm"
                    >
                      <ChevronLeft size={12} /> Back
                    </button>
                  ) : (
                    <div></div> // Empty spacing element
                  )}

                  {currentStep < 5 ? (
                    <button 
                      type="button" 
                      onClick={handleNextStep}
                      disabled={!validateStep(currentStep)}
                      className="flex items-center gap-2 bg-luxury-black text-white hover:bg-luxury-accent disabled:opacity-30 disabled:pointer-events-none px-6 py-3.5 uppercase tracking-widest text-[9px] font-bold transition-all duration-300 rounded-sm shadow-md"
                    >
                      Next Step <ChevronRight size={12} />
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      disabled={isSubmitting || !validateStep(5)}
                      className="bg-luxury-black text-white hover:bg-luxury-accent disabled:opacity-50 px-10 py-4 uppercase tracking-widest text-[10px] font-bold transition-all duration-500 rounded-sm shadow-xl"
                    >
                      {isSubmitting ? 'Submitting App...' : 'Submit Application'}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest mt-12 font-light">
          * Secure 256-bit encrypted submission. Data is treated with strict professional discretion.
        </p>
      </div>
    </div>
  );
};

export default ApplyFinancing;
