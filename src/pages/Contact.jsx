import React from 'react';

const Contact = () => {
  return (
    <div className="pt-32 luxury-container min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl mb-8">Contact Us</h1>
          <p className="text-xl text-gray-600 mb-12 serif italic">
            Schedule a private viewing or inquire about our concierge services.
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Our Atelier</h3>
              <p>123 Luxury Way, Beverly Hills, CA 90210</p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Global Inquiries</h3>
              <p>+1 (555) 789-0123</p>
              <p>concierge@lavalmotors.com</p>
            </div>
          </div>
        </div>
        <div className="bg-luxury-grey p-12">
          <form className="space-y-6">
            <div>
              <label className="block text-sm uppercase tracking-widest mb-2">Full Name</label>
              <input type="text" className="w-full bg-white border-none p-4 rounded-none outline-none" placeholder="Johnathan Doe" />
            </div>
            <div>
              <label className="block text-sm uppercase tracking-widest mb-2">Email</label>
              <input type="email" className="w-full bg-white border-none p-4 rounded-none outline-none" placeholder="j.doe@example.com" />
            </div>
            <div>
              <label className="block text-sm uppercase tracking-widest mb-2">Message</label>
              <textarea className="w-full bg-white border-none p-4 rounded-none outline-none h-32" placeholder="How can we assist you?"></textarea>
            </div>
            <button className="bg-luxury-black text-white w-full py-4 uppercase tracking-widest hover:opacity-90 transition-opacity">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
