import React from "react";
import { useNavigate, Link } from "react-router-dom";

const PartnerTerms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5ff] to-[#f0f4ff] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#67103d] to-[#9a1b60] p-6 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1">Partner Terms & Conditions</h1>
              <p className="text-sm text-white/90">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="mt-3 sm:mt-0">
              <div className="bg-white/20 p-2 rounded-full">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Terms List */}
        <div className="p-5 sm:p-6 space-y-4">
          {[
            "You must provide accurate and up-to-date business and personal information during registration.",
            "All listed bicycles must be in good working condition, clean, and regularly maintained.",
            "You are responsible for handling customer support related to your listed bicycles.",
            "You agree to share only verified bicycles and not list bicycles you do not own or have permission to rent.",
            "You are responsible for pricing your listings competitively and fairly.",
            "In case of disputes or complaints, you agree to cooperate with the platform to resolve them.",
            "Commissions or service fees may apply as per platform policy.",
            "You agree not to use the platform for fraudulent or illegal activities.",
            "The platform reserves the right to suspend or remove your account for violating any terms."
          ].map((term, index) => (
            <div
              key={index}
              className="flex items-start p-3 rounded-md hover:bg-[#f9f5ff] transition group"
            >
              <div className="flex-shrink-0 mr-3 mt-1">
                <div className="h-7 w-7 rounded-full bg-[#67103d] text-white text-sm font-bold flex items-center justify-center group-hover:bg-[#9a1b60] transition">
                  {index + 1}
                </div>
              </div>
              <p className="text-sm text-gray-700 group-hover:text-gray-900 transition">{term}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="px-5 pb-5 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-md border border-[#67103d] text-[#67103d] font-medium hover:bg-[#67103d] hover:text-white transition flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>

          <Link to="/partnerRegister" className="w-full sm:w-auto">
            <button
              className="w-full px-5 py-2.5 rounded-md bg-gradient-to-r from-[#67103d] to-[#9a1b60] text-white font-medium hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              Continue to Registration
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 text-center text-xs text-gray-500">
          Questions? <a href="mailto:partners@bikerental.com" className="text-[#67103d] hover:underline">Contact our partner team</a>
        </div>
      </div>
    </div>
  );
};

export default PartnerTerms;
