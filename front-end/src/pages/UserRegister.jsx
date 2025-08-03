import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiPhone, FiMail, FiLock, FiHome, FiUser, FiCreditCard } from "react-icons/fi";
import { toast } from "react-toastify";

const UserRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    primaryPhone: "",
    secondaryPhone: "",
    address: "",
    idProof: "",
    rentalPreferences: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleNext = () => {
    if (form.name && form.email && form.password) {
      setCurrentPage(2);
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handleBack = () => setCurrentPage(1);

  const handleSendOTP = async () => {
    if (!form.primaryPhone) {
      return toast.error("Please enter your mobile number");
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/otp/send-otp", {
        phone: form.primaryPhone,
      });
      toast.success(res.data.message);
      setOtpStep(true);
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) return toast.error("Please enter the OTP");
    
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/otp/verify-otp", {
        phone: form.primaryPhone,
        otp,
      });
  
      if (res.data.success) {
        toast.success("OTP Verified Successfully!");
        setOtpVerified(true);
        setOtpStep(false);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!otpVerified) {
      return toast.error("Please verify your phone number first");
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register/user", form);
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header with maroon theme */}
          <div className="bg-[#67103d] p-6 text-white text-center">
            <h2 className="text-2xl font-bold">Create Your Account</h2>
            <p className="text-[#d4a4bc] mt-1">
              {currentPage === 1 ? "Basic Information" : "Contact Details"}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center pt-4 pb-2">
            <div className="flex space-x-2">
              {[1, 2].map((page) => (
                <div
                  key={page}
                  className={`w-3 h-3 rounded-full ${currentPage >= page ? "bg-[#67103d]" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>

          {/* Form content */}
          <div className="p-6">
            {currentPage === 1 && (
              <div className="space-y-4">
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d] outline-none transition"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d] outline-none transition"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d] outline-none transition"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-[#67103d] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#4a0c2c] transition-all shadow-md hover:shadow-lg"
                >
                  Continue
                </button>
              </div>
            )}

            {currentPage === 2 && (
              <div className="space-y-4">
                <div className="relative">
                  <FiPhone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="primaryPhone"
                    placeholder="Primary Phone Number"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d] outline-none transition"
                    value={form.primaryPhone}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <FiPhone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="secondaryPhone"
                    placeholder="Secondary Phone (Optional)"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d] outline-none transition"
                    value={form.secondaryPhone}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <FiHome className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Full Address"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d] outline-none transition"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <FiCreditCard className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="idProof"
                    placeholder="Government ID Number"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d] outline-none transition"
                    value={form.idProof}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <FiHome className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="rentalPreferences"
                    placeholder="Rental Preferences (e.g., 2BHK, Near Metro)"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d] outline-none transition"
                    value={form.rentalPreferences}
                    onChange={handleChange}
                  />
                </div>

                {/* OTP Section at the end */}
                {!otpVerified && (
                  <div className="space-y-3 mt-4">
                    {!otpSent ? (
                      <button
                        onClick={handleSendOTP}
                        disabled={!form.primaryPhone || isLoading}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-all shadow-md ${
                          !form.primaryPhone || isLoading
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-[#67103d] text-white hover:bg-[#4a0c2c] hover:shadow-lg"
                        }`}
                      >
                        {isLoading ? "Sending..." : "Send Verification Code"}
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-[#f8e8f0] p-3 rounded-lg border border-[#e0c0d0]">
                          <p className="text-sm text-[#67103d]">
                            <FiCheckCircle className="inline mr-1" />
                            Verification code sent to {form.primaryPhone}
                          </p>
                        </div>

                        <div className="relative">
                          <FiCreditCard className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Enter 6-digit code"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d] outline-none transition"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength="6"
                          />
                        </div>

                        <button
                          onClick={handleVerifyOTP}
                          disabled={isLoading || !otp}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-all shadow-md ${
                            isLoading || !otp
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-[#67103d] text-white hover:bg-[#4a0c2c] hover:shadow-lg"
                          }`}
                        >
                          {isLoading ? "Verifying..." : "Verify Code"}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {otpVerified && (
                  <div className="bg-[#f0f7eb] p-3 rounded-lg border border-[#d4edda] text-[#155724] text-sm mb-4">
                    <FiCheckCircle className="inline mr-1" />
                    Phone number verified successfully
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <button
                    onClick={handleBack}
                    className="flex items-center text-[#67103d] hover:text-[#4a0c2c] transition"
                  >
                    <FiArrowLeft className="mr-1" />
                    Back
                  </button>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || !otpVerified}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      isLoading || !otpVerified
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#67103d] text-white hover:bg-[#4a0c2c] shadow-md hover:shadow-lg"
                    }`}
                  >
                    {isLoading ? "Registering..." : "Complete Registration"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <button 
            onClick={() => navigate("/login")} 
            className="text-[#67103d] hover:text-[#4a0c2c] font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;