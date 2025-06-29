import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // clean modern back icon

const Feedback = () => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, comment });
    setRating('');
    setComment('');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 sm:p-10">
        {/* Icon-only Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-[#67103d] hover:text-[#4c092b] transition mb-6 focus:outline-none"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-[#67103d] mb-2">We value your feedback</h1>
          <p className="text-gray-600 text-sm">Help us improve your Rideloop experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Rating Buttons */}
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-3">
              How would you rate your experience?
            </label>
            <div className="flex flex-wrap gap-3">
              {['Excellent', 'Good', 'Average', 'Poor', 'Terrible'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRating(option.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 border ${
                    rating === option.toLowerCase()
                      ? 'bg-[#67103d] text-white border-[#67103d]'
                      : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Comment Box */}
          <div>
            <label htmlFor="comment" className="block text-gray-800 text-sm font-medium mb-2">
              Share your thoughts (optional)
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Your feedback helps us improve..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d] bg-gray-50 text-sm"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!rating}
              className={`px-6 py-2 rounded-xl text-white font-semibold transition-all duration-300 ${
                rating
                  ? 'bg-[#67103d] hover:bg-[#4c092b]'
                  : 'bg-gray-300 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-[#67103d] focus:ring-offset-2`}
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
