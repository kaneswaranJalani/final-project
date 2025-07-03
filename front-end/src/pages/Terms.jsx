import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserTerms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5ff] to-[#f0f4ff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with decorative element */}
        <div className="bg-gradient-to-r from-[#67103d] to-[#9a1b60] p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Terms & Conditions</h1>
            <div className="hidden sm:block">
              <svg className="h-12 w-12 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <p className="mt-2 text-white opacity-90">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content with animated list */}
        <div className="p-6 sm:p-8">
          <div className="space-y-5">
            {[
              "You must be at least 16 years old to rent a bicycle.",
              "You agree to return the bicycle at the agreed time and location.",
              "You are responsible for any damage or loss of the bicycle during your rental period.",
              "Helmets and safety gear are recommended for all riders. Ride at your own risk.",
              "Payment must be completed before the rental begins.",
              "Bicycles must not be used for illegal activities or dangerous stunts.",
              "In case of late returns, additional charges may apply.",
              "You agree to follow local traffic laws and ride responsibly at all times."
            ].map((term, index) => (
              <div 
                key={index} 
                className="flex items-start group hover:bg-[#f9f5ff] p-3 rounded-lg transition-all duration-200"
              >
                <div className="flex-shrink-0 mt-1 mr-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#67103d] text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                  {term}
                </p>
              </div>
            ))}
          </div>

          {/* Action buttons with hover effects */}
          <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg border border-[#67103d] text-[#67103d] font-medium hover:bg-[#67103d] hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
            <Link to="/UserRegister">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#67103d] to-[#9a1b60] text-white font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Proceed to Registration
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            </Link> 
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
          Need help? <a href="mailto:support@bikerental.com" className="text-[#67103d] hover:underline">Contact our support team</a>
        </div>
      </div>
    </div>
  );
};

export default UserTerms;