import React from "react";
import { useNavigate } from "react-router-dom";

const PartnerTerms = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-[#67103d]">Partner Terms and Conditions</h1>

      <p className="mb-2">1. You must provide accurate and up-to-date business and personal information during registration.</p>
      <p className="mb-2">2. All listed bicycles must be in good working condition, clean, and regularly maintained.</p>
      <p className="mb-2">3. You are responsible for handling customer support related to your listed bicycles.</p>
      <p className="mb-2">4. You agree to share only verified bicycles and not list bicycles you do not own or have permission to rent.</p>
      <p className="mb-2">5. You are responsible for pricing your listings competitively and fairly.</p>
      <p className="mb-2">6. In case of disputes or complaints, you agree to cooperate with the platform to resolve them.</p>
      <p className="mb-2">7. Commissions or service fees may apply as per platform policy.</p>
      <p className="mb-2">8. You agree not to use the platform for fraudulent or illegal activities.</p>
      <p className="mb-6">9. The platform reserves the right to suspend or remove your account for violating any terms.</p>

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

export default PartnerTerms;
