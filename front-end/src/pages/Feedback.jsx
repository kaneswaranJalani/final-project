import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MessageSquare, Send } from 'lucide-react';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log({ rating, comment });
      navigate('/', { state: { rating } });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f5f7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with accent color */}
        <div className="bg-[#67103d] p-6 text-white">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-white/20 transition"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Your Feedback</h1>
              <p className="text-[#d9b8c8] text-sm">We'd love to hear your thoughts</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Visual Rating */}
            <div className="text-center">
              <label className="block text-gray-700 font-medium mb-6">
                How satisfied were you with your experience?
              </label>
              
              <div className="flex justify-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-9 h-9 ${
                        (hoverRating || rating) >= star
                          ? 'fill-[#67103d] text-[#67103d]'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 px-2">
                <span>Not satisfied</span>
                <span>Very satisfied</span>
              </div>
            </div>

            {/* Comment Box with Floating Label */}
            <div className="relative mt-10">
              <div className="absolute -top-3 left-4 bg-white px-2 text-[#67103d] font-medium flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>Comments</span>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What made your experience good or bad?"
                rows="4"
                className="w-full px-4 py-3 border-2 border-[#e8d8e1] rounded-lg focus:outline-none focus:border-[#67103d] focus:ring-2 focus:ring-[#f0e4eb] bg-white text-sm placeholder-gray-400 transition-all"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-1 rounded">
                {comment.length}/200
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={rating === 0 || isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  rating > 0
                    ? 'bg-[#67103d] hover:bg-[#4c092b] shadow-md hover:shadow-lg'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#67103d] to-[#8a1a5a]"></div>
      </div>
    </div>
  );
};

export default Feedback;