import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from 'react-toastify';


const SuccessfulRegister = () => {
  const navigate = useNavigate();

  const handleResendEmail = () => {
    alert('📧 Confirmation email resent.');
    toast.success('Confirmation email resent successfully!');
  };

  const handleClose = () => {
    navigate('/Item'); // Change to '/intro' or '/landing' if needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] px-6 py-12 relative">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-10 border border-gray-200 animate-fade-in relative">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#67103d] transition"
          aria-label="Close"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
          <h2 className="text-3xl font-extrabold text-[#67103d]">Registration Successful!</h2>
          <p className="mt-3 text-sm text-gray-600">
            Thank you for registering with us. <br />
            Please verify your email to activate your account.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Didn't receive the email?
          </p>
          <button
            onClick={handleResendEmail}
            className="inline-block text-[#67103d] font-semibold hover:underline transition hover:text-[#50052c]"
          >
            Resend Confirmation Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulRegister;
