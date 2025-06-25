import React from "react";
import { useNavigate } from "react-router-dom";

const UserTerms = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-[#67103d]">User Terms and Conditions</h1>

      <p className="mb-2">1. You must be at least 16 years old to rent a bicycle.</p>
      <p className="mb-2">2. You agree to return the bicycle at the agreed time and location.</p>
      <p className="mb-2">3. You are responsible for any damage or loss of the bicycle during your rental period.</p>
      <p className="mb-2">4. Helmets and safety gear are recommended for all riders. Ride at your own risk.</p>
      <p className="mb-2">5. Payment must be completed before the rental begins.</p>
      <p className="mb-2">6. Bicycles must not be used for illegal activities or dangerous stunts.</p>
      <p className="mb-2">7. In case of late returns, additional charges may apply.</p>
      <p className="mb-6">8. You agree to follow local traffic laws and ride responsibly at all times.</p>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mt-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:text-[#67103d] hover:border-[#67103d] transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UserTerms;
