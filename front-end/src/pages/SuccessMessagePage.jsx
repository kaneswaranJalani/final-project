import { useState } from 'react';
import { FiCheckCircle, FiX, FiMessageSquare, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SuccessMessagePage = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitFeedback = (e) => {
    e.preventDefault();

    // Simulate sending feedback to backend (can integrate axios here)
    console.log("Feedback submitted:", { rating, comment });

    setFeedbackSubmitted(true);
    setTimeout(() => {
      setShowFeedback(false);
      setFeedbackSubmitted(false);
      setRating(0);
      setComment('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="bg-[#67103d] p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Payment Success</h1>
            <button
              onClick={() => window.history.back()}
              className="text-white hover:text-gray-200 transition"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 text-center">
          {!showFeedback ? (
            <>
              <div className="flex justify-center mb-6">
                <FiCheckCircle className="text-[#67103d]" size={80} />
              </div>
              <h2 className="text-xl font-semibold mb-3">Your Payment is Successful!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your payment. Your bicycle rental is confirmed, and a receipt has been sent to your email.
              </p>

              <div className="flex flex-col space-y-3">
                <Link to="/Receipt">
                  <button className="bg-[#67103d] hover:bg-[#4d0c2d] text-white py-3 px-6 rounded-lg font-medium transition">
                    View Payment Receipt
                  </button>
                </Link>
                <button
                  onClick={() => setShowFeedback(true)}
                  className="flex items-center justify-center space-x-2 text-[#67103d] hover:text-[#4d0c2d] py-3 px-6 rounded-lg font-medium transition"
                >
                  <FiMessageSquare />
                  <span>Give Feedback</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-left">
              <button
                onClick={() => setShowFeedback(false)}
                className="flex items-center text-gray-500 hover:text-gray-700 mb-4 transition"
              >
                <FiArrowLeft className="mr-2" />
                Back
              </button>

              {!feedbackSubmitted ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Share Your Experience</h2>
                  <p className="text-gray-600 mb-6">
                    We'd love to hear how we're doing. Your feedback helps us improve our service.
                  </p>

                  <form onSubmit={handleSubmitFeedback}>
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">How would you rate your experience?</label>
                      <div className="flex justify-center space-x-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`text-2xl focus:outline-none ${
                              rating >= star ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                            aria-label={`Rate ${star} star`}
                          >
                            ⭐️
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="feedback" className="block text-gray-700 mb-2">
                        Additional comments
                      </label>
                      <textarea
                        id="feedback"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67103d]"
                        placeholder="What did you like or how can we improve?"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#67103d] hover:bg-[#4d0c2d] text-white py-3 px-6 rounded-lg font-medium transition"
                    >
                      Submit Feedback
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <FiCheckCircle className="text-[#67103d] mx-auto mb-4" size={48} />
                  <h2 className="text-xl font-semibold mb-2">Thank You!</h2>
                  <p className="text-gray-600">Your feedback has been submitted successfully.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Need help? <a href="#" className="text-[#67103d] hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessagePage;
