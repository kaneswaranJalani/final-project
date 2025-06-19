import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const features = [
    "Smart bike tracking & GPS",
    "Flexible rental plans",
    "24/7 premium support",
    "Partner earning opportunities",
    "Eco-friendly transportation",
    "Premium cycle maintenance",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#e0f2fe] flex flex-col items-center justify-center px-4 text-center font-sans">
      {/* App Title */}
      <h1 className="text-6xl font-extrabold text-[#67103d] tracking-wide drop-shadow-md animate-fade-in-up">
        RIDELOOP
      </h1>
      <p className="text-gray-500 text-base mt-2 mb-10 italic animate-fade-in-up delay-100">
        Premium bicycle experience made simple.
      </p>

      {/* Feature Chips */}
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl animate-fade-in-up delay-200">
        {features.map((feature, index) => (
          <span
            key={index}
            className="bg-white/70 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-700 shadow-sm hover:shadow-lg transition duration-200"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Role Selection */}
      <div className="mt-14 w-full max-w-3xl px-4 animate-fade-in-up delay-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Join RIDELOOP</h2>
        <p className="text-sm text-gray-500 mb-6">Choose your role to get started</p>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          {/* User Card */}
          <Link
            to="/UserRegister"
            className="flex-1 bg-white/80 backdrop-blur border border-gray-100 shadow-xl px-6 py-7 rounded-3xl hover:scale-[1.03] transition-transform duration-300 group"
          >
            <h3 className="text-[#67103d] font-bold text-xl mb-2">🚴‍♂️ User</h3>
            <p className="text-sm text-gray-600 group-hover:text-gray-800">
              Rent premium cycles for personal use, commuting, and adventures.
            </p>
          </Link>

          {/* Partner Card */}
          <Link
            to="/PartnerRegister"
            className="flex-1 bg-white/80 backdrop-blur border border-gray-100 shadow-xl px-6 py-7 rounded-3xl hover:scale-[1.03] transition-transform duration-300 group"
          >
            <h3 className="text-[#67103d] font-bold text-xl mb-2">🤝 Partner</h3>
            <p className="text-sm text-gray-600 group-hover:text-gray-800">
              List your bicycle, earn money, and grow your rental business.
            </p>
          </Link>
        </div>
      </div>

      {/* Login Option */}
      <div className="mt-10 text-sm text-gray-600 animate-fade-in-up delay-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#67103d] font-medium underline hover:text-[#4c092b] transition"
        >
          Login
        </Link>
      </div>

      {/* Cancel Button */}
      <div className="mt-6 animate-fade-in-up delay-600">
        <button
          type="button"
          className="text-sm text-gray-400 hover:text-gray-600 hover:underline transition"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Register;
