import React from "react";
import { useNavigate, Link } from "react-router-dom";

const UserTerms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5ff] to-[#f0f4ff] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#67103d] to-[#9a1b60] p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Terms & Conditions</h1>
            <svg className="hidden sm:block h-10 w-10 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p className="text-sm text-white opacity-90 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Terms List */}
        <div className="p-6">
          <div className="space-y-3">
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
              <div key={index} className="flex items-start group hover:bg-[#f9f5ff] p-2 rounded-md transition">
                <div className="flex-shrink-0 mt-1 mr-3">
                  <div className="flex items-center justify-center h-7 w-7 rounded-full bg-[#67103d] text-white text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <p className="text-gray-700 text-sm group-hover:text-gray-900 transition">{term}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-md border border-[#67103d] text-[#67103d] font-medium hover:bg-[#67103d] hover:text-white transition transform hover:scale-105 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>

            <Link to="/UserRegister" className="w-full sm:w-auto">
              <button
                className="w-full px-5 py-2.5 rounded-md bg-gradient-to-r from-[#67103d] to-[#9a1b60] text-white font-medium hover:opacity-90 transition transform hover:scale-105 flex items-center justify-center"
              >
                accept and continue
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 text-center text-xs text-gray-500">
          Need help?{" "}
          <a href="mailto:support@bikerental.com" className="text-[#67103d] hover:underline">
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserTerms;
