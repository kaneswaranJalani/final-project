import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen bg-[#f5f6fa] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800">RIDELOOP</h1>
      <p className="text-gray-500 text-sm mt-1 mb-6">
        premium bicycle experience
      </p>

      <div className="flex flex-wrap justify-center gap-4 max-w-xl">
        <span className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-600">
          Smart bike tracking & GPS
        </span>
        <span className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-600">
          Flexiable rental plans
        </span>
        <span className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-600">
          24/7 premium support
        </span>
        <span className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-600">
          Partner earning opportunities
        </span>
        <span className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-600">
          Eco-friendly transportation
        </span>
        <span className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-600">
          Premium cycle maintenance
        </span>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-medium text-gray-700">Join RIDELOOP</h2>
        <p className="text-sm text-gray-500">Choose your role to get started</p>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="bg-white shadow-md px-6 py-4 rounded-xl cursor-pointer hover:shadow-xl transition">
            <h3 className="text-blue-600 font-semibold text-lg"><Link to="/UserRegister">User</Link> </h3>
            <p className="text-sm text-gray-600 mt-1">
              Rent premium cycle for personal use, commuting, and adventures.
            </p>
          </div>

          <div className="bg-white shadow-md px-6 py-4 rounded-xl cursor-pointer hover:shadow-xl transition">
            <h3 className="text-blue-600 font-semibold text-lg"><Link to="/PartnerRegister">Partner</Link></h3>
            <p className="text-sm text-gray-600 mt-1">
              List your bicycle, earn money, and grow your rental business.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </div>

      <button className="mt-4 text-sm text-gray-500 hover:underline">
        Cancel
      </button>
    </div>
  );
};

export default Register;
