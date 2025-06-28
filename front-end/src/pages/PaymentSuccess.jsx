import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/'); // Redirect to home or cancel page
  };

  const handleFeedback = () => {
    navigate('/feedback'); // Ensure /feedback route exists
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] px-6 py-12 relative">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-10 border border-gray-200 animate-fade-in relative">

        {/* Close / Cancel Button */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#67103d] transition"
          aria-label="Cancel"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Success Icon and Text */}
        <div className="flex flex-col items-center text-center">
          <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
          <h2 className="text-3xl font-extrabold text-[#67103d]">Payment Successful!</h2>
          <p className="mt-3 text-sm text-gray-600">
            🎉 Thank you for your purchase. Your bike booking is now confirmed.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center space-y-3">
          <button
            onClick={handleFeedback}
            className="inline-block px-6 py-2 rounded-full bg-[#67103d] text-white font-semibold shadow hover:bg-[#50052c] transition"
          >
            ✍️ Give Feedback
          </button>
          <button
            onClick={handleCancel}
            className="text-sm text-gray-600 hover:underline hover:text-[#67103d] transition"
          >
            Cancel & Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
