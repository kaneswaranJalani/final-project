import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 text-center font-sans">
      <h1 className="text-5xl font-extrabold text-indigo-700 tracking-wide">RIDELOOP</h1>
      <p className="text-gray-600 text-sm mt-2 mb-8 italic">
        Premium bicycle experience made simple.
      </p>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
        {[
          "Smart bike tracking & GPS",
          "Flexible rental plans",
          "24/7 premium support",
          "Partner earning opportunities",
          "Eco-friendly transportation",
          "Premium cycle maintenance"
        ].map((feature, i) => (
          <span
            key={i}
            className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 shadow-sm hover:shadow-md transition"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Role Selection */}
      <div className="mt-12 w-full max-w-2xl px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Join RIDELOOP</h2>
        <p className="text-sm text-gray-500 mb-6">Choose your role to get started</p>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
          {/* User Card */}
          <Link to="/UserRegister" className="flex-1 bg-white border border-gray-100 shadow-md px-6 py-5 rounded-2xl hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer">
            <h3 className="text-indigo-600 font-semibold text-xl mb-2">User</h3>
            <p className="text-sm text-gray-600">
              Rent premium cycles for personal use, commuting, and adventures.
            </p>
          </Link>

          {/* Partner Card */}
          <Link to="/PartnerRegister" className="flex-1 bg-white border border-gray-100 shadow-md px-6 py-5 rounded-2xl hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer">
            <h3 className="text-indigo-600 font-semibold text-xl mb-2">Partner</h3>
            <p className="text-sm text-gray-600">
              List your bicycle, earn money, and grow your rental business.
            </p>
          </Link>
        </div>
      </div>

      {/* Login Option */}
      <div className="mt-10 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 font-medium underline hover:text-indigo-800 transition">
          Login
        </Link>
      </div>

      {/* Cancel Button */}
      <div className="mt-6">
        <button
          type="button"
          className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Register;
