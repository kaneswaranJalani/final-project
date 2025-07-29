import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { toast } from 'react-toastify';


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", form);
      setUserInfo(data.user);
      setShowConfirm(true);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    localStorage.setItem("token", userInfo.token);
    login(userInfo);
    toast.success(`Welcome back, ${userInfo.name}!`, {
      autoClose: 3000,
    });
    const role = userInfo.role;
    if (role === "user") {
      navigate("/Item");
    } else if (role === "partner") {
      navigate("/PartnerDashboard");
    } else if (role === "admin") {
      navigate("/AdminDashboard");
    }
  };

  const handleBack = () => {
    setShowConfirm(false);
    setUserInfo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#67103d] to-[#9a1b60] p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm opacity-90 mt-1">Sign in to your account</p>
        </div>

        <div className="p-6 sm:p-8">
          {showConfirm && userInfo ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Confirm Your Login</h2>
              <div className="bg-gray-50 border p-4 rounded-lg text-sm space-y-2">
                <p><strong>Name:</strong> {userInfo.name}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Role:</strong> {userInfo.role}</p>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={handleBack} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm">
                  Back
                </button>
                <button onClick={handleConfirm} className="px-4 py-2 rounded bg-[#67103d] text-white hover:bg-[#50052c] text-sm">
                  Confirm
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-gray-600">
                  <input type="checkbox" className="h-4 w-4 text-[#67103d] border-gray-300 rounded focus:ring-[#67103d]" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#67103d] hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center px-6 py-3 rounded-lg bg-[#67103d] text-white font-medium hover:bg-[#50052c] transition disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiLogIn className="mr-2" />
                    Login
                  </>
                )}
              </button>

              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="text-[#67103d] font-medium hover:underline">
                  Sign up
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
