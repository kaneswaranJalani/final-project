import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#e0f2fe] flex flex-col items-center justify-center px-4 text-center font-sans">
      {/* Role Selection Box */}
      <div className="mt-10 w-full max-w-3xl px-6 py-10 bg-white border border-gray-200 rounded-3xl shadow-lg animate-fade-in-up delay-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Join RIDELOOP</h2>
        <p className="text-sm text-gray-500 mb-6">Choose your role to get started</p>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          {/* User Card */}
          <Link
            to="/UserRegister"
            className="flex-1 bg-white/80 backdrop-blur border border-gray-100 shadow-md px-6 py-7 rounded-2xl hover:scale-[1.03] transition-transform duration-300 group"
          >
            <h3 className="text-[#67103d] font-bold text-xl mb-2">🚴‍♂️ User</h3>
            <p className="text-sm text-gray-600 group-hover:text-gray-800">
              Rent premium cycles for personal use, commuting, and adventures.
            </p>
          </Link>

          {/* Partner Card */}
          <Link
            to="/PartnerRegister"
            className="flex-1 bg-white/80 backdrop-blur border border-gray-100 shadow-md px-6 py-7 rounded-2xl hover:scale-[1.03] transition-transform duration-300 group"
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
