import React, { useState } from 'react';

const Feedback = () => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission here
    console.log({ rating, comment });
    // Reset form after submission
    setRating('');
    setComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          {/* Back button */}
          <button className="mb-6 text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            back
          </button>

          {/* Feedback header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Feed back</h1>
            <p className="text-gray-600">How was your experience using this app</p>
          </div>

          <div className="border-t border-gray-200 pt-6"></div>

          {/* Feedback form */}
          <form onSubmit={handleSubmit}>
            {/* Rating selection */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-4">
                Rate your experience
              </label>
              <div className="flex flex-wrap gap-3">
                {['excellent', 'good', 'average', 'poor', 'terrible'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRating(option)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      rating === option
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment field */}
            <div className="mb-8">
              <label htmlFor="comment" className="block text-gray-700 text-sm font-medium mb-2">
                Add the comment...
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your feedback helps us improve..."
              ></textarea>
            </div>

            {/* Submit button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!rating}
                className={`px-6 py-2 rounded-md text-white font-medium ${
                  rating ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;