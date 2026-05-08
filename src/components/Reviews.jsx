import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Star, Send, CheckCircle2, User, Calendar } from 'lucide-react';
import { client } from '../client';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const query = `*[_type == "review" && isApproved == true] | order(date desc)`;
        const data = await client.fetch(query);
        const processedData = data.map(r => ({
          ...r,
          date: r.date || new Date().toISOString()
        }));
        setReviews(processedData);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission to Sanity or a backend
    // In a real scenario, you'd call a serverless function or Sanity mutation API with a write token
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Add to local list for immediate feedback (simulated)
      const newReview = {
        _id: 'temp-' + Date.now(),
        name: formData.name,
        rating: formData.rating,
        comment: formData.comment,
        date: new Date().toISOString(),
      };
      
      setReviews([newReview, ...reviews]);

      // Reset form after a while
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
        setFormData({ name: '', rating: 5, comment: '' });
      }, 3000);
    }, 1500);
  };

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={interactive ? 24 : 16}
            className={`${
              star <= rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={() => interactive && setFormData({ ...formData, rating: star })}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-4">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">What Our Clients Say</h3>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-[#0F0F0F] text-white font-bold py-4 px-10 text-[10px] uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-all duration-300 shadow-xl"
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {/* Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-20 overflow-hidden"
            >
              <div className="bg-[#FBFBFB] p-8 md:p-12 border border-gray-100 rounded-sm shadow-sm max-w-3xl mx-auto">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <CheckCircle2 size={60} className="text-[#D4AF37] mb-6" />
                    <h4 className="text-2xl font-serif mb-2">Thank You!</h4>
                    <p className="text-gray-500">Your review has been submitted and is pending approval.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Your Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Enter your full name"
                          className="w-full bg-white border border-gray-200 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors font-light text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Rating</label>
                        <div className="h-[54px] flex items-center px-2">
                          {renderStars(formData.rating, true)}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Your Experience</label>
                      <textarea 
                        required
                        rows="4"
                        value={formData.comment}
                        onChange={(e) => setFormData({...formData, comment: e.target.value})}
                        placeholder="Share your thoughts about Laval Motors..."
                        className="w-full bg-white border border-gray-200 px-6 py-4 outline-none focus:border-[#D4AF37] transition-colors font-light text-sm resize-none"
                      ></textarea>
                    </div>
                    <div className="flex justify-center pt-4">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#D4AF37] text-white font-bold py-4 px-16 text-[10px] uppercase tracking-[0.3em] hover:bg-[#B8860B] transition-all duration-300 flex items-center space-x-4 shadow-lg disabled:opacity-50"
                      >
                        {isSubmitting ? 'Sending...' : 'Submit Review'}
                        {!isSubmitting && <Send size={14} />}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={review._id || idx}
                  className="bg-white p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[#D4AF37] group-hover:bg-[#0F0F0F] transition-colors duration-500">
                        <User size={20} />
                      </div>
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-600 font-light italic leading-relaxed mb-8 text-sm md:text-base">
                      "{review.comment}"
                    </p>
                  </div>
                  <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                    <span className="font-bold text-[11px] uppercase tracking-widest text-gray-900">{review.name}</span>
                    <span className="text-[10px] text-gray-400 flex items-center">
                      <Calendar size={12} className="mr-2" />
                      {new Date(review.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-light italic">Be the first to share your experience with us.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default Reviews;
