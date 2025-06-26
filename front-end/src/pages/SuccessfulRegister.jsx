import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const SuccessfulRegister = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/dashboard'); // Replace with your dashboard route
  };

  const handleResendEmail = () => {
    alert(' Confirmation email resent.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-200 animate-fade-in">
        <div className="flex flex-col items-center text-center">
          <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">Registration Successful!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for registering with us. Please verify your email to activate your account.
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={handleGoToDashboard}
            className="w-full bg-[#67103d] hover:bg-[#50052c] text-white text-sm font-semibold py-3 px-4 rounded-lg shadow transition duration-200"
          >
            🚀 Go to Dashboard
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            Didn't receive the email?{' '}
            <button
              onClick={handleResendEmail}
              className="text-[#67103d] hover:underline font-medium transition"
            >
              Resend Confirmation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulRegister;
