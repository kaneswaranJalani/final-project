import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeftCircle, FiShoppingCart } from 'react-icons/fi';

const SelectItem = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto m-30 p-10 bg-white shadow-2xl rounded-2xl border border-gray-200 transition-transform hover:scale-[1.01]">
      {/* Header */}
      <div className="flex justify-between mb-6 border-b pb-4">
        <h2 className="text-lg font-semibold text-gray-700">Details</h2>
        <h2 className="text-lg font-semibold text-gray-700">Review</h2>
      </div>

      {/* Product Info */}
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Mountain Bicycle</h1>
        <p className="text-xl text-rose-600 font-semibold mt-2">$499.99</p>
      </div>

      {/* Description */}
      <div className="mb-6 text-gray-600 leading-relaxed text-sm sm:text-base">
        <p>
          This mountain bike is built for thrill-seekers and off-road adventurers. Engineered with a lightweight aluminum frame, superior suspension, and aggressive tires—conquer any trail with confidence and control.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
        <Link to="/Payment" className="flex-1">
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#67103d] to-[#8b1c4d] text-white font-semibold rounded-lg shadow hover:shadow-lg hover:opacity-90 transition-all">
            <FiShoppingCart size={20} />
            Buy Now
          </button>
        </Link>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto px-4 py-3 flex items-center justify-center gap-2 rounded-lg border border-gray-300 text-gray-700 hover:text-[#67103d] hover:border-[#67103d] transition"
        >
          <FiArrowLeftCircle size={20} />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SelectItem;
