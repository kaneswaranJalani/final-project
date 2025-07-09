import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiLock, FiHome, FiCreditCard, FiCalendar, FiArrowRight, FiArrowLeft } from "react-icons/fi";

const UserRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    primaryPhone: "",
    secondaryPhone: "",
    address: "",
    idProof: "",
    rentalPreferences: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register/user", {
        name: form.name,
        email: form.email,
        password: form.password,
        primaryPhone: form.primaryPhone,
        secondaryPhone: form.secondaryPhone,
        address: form.address,
        idProof: form.idProof,
        rentalPreferences: form.rentalPreferences,
      });

      navigate("/SuccessfulRegister");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.message || "Registration failed"));
    } finally {
      setIsLoading(false);
    }
  };

  const nextPage = () => {
    // Validate first page fields before proceeding
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill in all required fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setCurrentPage(2);
  };

  const prevPage = () => {
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#67103d] mb-2">Join Our Community</h1>
          <p className="text-lg text-gray-600">Create your account to start your cycling journey</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress indicator */}
          <div className="flex h-2 bg-gray-100">
            <div 
              className={`h-full ${currentPage === 1 ? 'w-1/2 bg-[#67103d]' : 'w-full bg-[#67103d]'} transition-all duration-300 ease-in-out`}
            ></div>
          </div>

          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Page 1: Basic Information */}
              {currentPage === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300 ease-in-out">
                  {/* Name */}
                  <div className="space-y-2 col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="col-span-2 pt-4">
                    <button
                      type="button"
                      onClick={nextPage}
                      className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-[#67103d] hover:bg-[#50052c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#67103d] transition-colors duration-200"
                    >
                      Continue <FiArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Page 2: Additional Information */}
              {currentPage === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300 ease-in-out">
                  {/* Primary Phone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Primary Phone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="primaryPhone"
                        value={form.primaryPhone}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                        placeholder="+94 123 456 789"
                      />
                    </div>
                  </div>

                  {/* Secondary Phone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Secondary Phone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="secondaryPhone"
                        value={form.secondaryPhone}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                        placeholder="+94 987 654 321"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2 col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                        <FiHome className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        name="address"
                        rows="3"
                        value={form.address}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                        placeholder="123 Main St, Colombo"
                      />
                    </div>
                  </div>

                  {/* ID Proof */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">ID Proof Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="idProof"
                        value={form.idProof}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                        placeholder="NIC/Passport number"
                      />
                    </div>
                  </div>

                  {/* Rental Preference */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Rental Preference</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        name="rentalPreferences"
                        value={form.rentalPreferences}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition appearance-none bg-white"
                      >
                        <option value="">-- Select your rental preference --</option>
                        <option value="Daily commute">Daily commute</option>
                        <option value="Leisure rides">Leisure rides</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Touring/Adventure">Touring/Adventure</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-2 pt-4 flex space-x-4">
                    <button
                      type="button"
                      onClick={prevPage}
                      className="w-1/2 flex justify-center items-center px-6 py-4 border border-gray-300 rounded-xl shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#67103d] transition-colors duration-200"
                    >
                      <FiArrowLeft className="mr-2 h-5 w-5" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-1/2 flex justify-center items-center px-6 py-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-[#67103d] hover:bg-[#50052c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#67103d] transition-colors duration-200"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Account
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-[#67103d] hover:text-[#50052c]">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;