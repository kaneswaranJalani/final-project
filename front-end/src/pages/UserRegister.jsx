import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    primaryPhone: "",
    secondaryPhone: "",
    address: "",
    idProof: "",
    rentalPreferences: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updated = checked
      ? [...form.rentalPreferences, value]
      : form.rentalPreferences.filter((item) => item !== value);
    setForm({ ...form, rentalPreferences: updated });
  };

  const nextStep = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/register", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        primaryPhone: form.primaryPhone,
        secondaryPhone: form.secondaryPhone,
        address: form.address,
        idProof: form.idProof,
        rentalPreferences: form.rentalPreferences,
      });

      console.log("User Registered:", data);
      navigate("/SuccessfulRegister");
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message || error);
      alert("Registration failed: " + (error.response?.data?.message || error.message || "Try again."));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#67103d] to-[#9a1b60] p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Create Account</h1>
              <p className="text-sm opacity-90 mt-1">
                {step === 1 ? "Personal Information" : "Contact Details"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-white/20 rounded-full h-1.5">
                <div 
                  className="bg-white h-1.5 rounded-full transition-all duration-300" 
                  style={{ width: `${step === 1 ? 50 : 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">Step {step} of 2</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {step === 1 ? (
            /* STEP 1: Personal Information */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 rounded-lg bg-[#67103d] text-white font-medium hover:bg-[#50052c] transition flex items-center"
                >
                  Continue
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: Contact & Preferences */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">Primary Phone</label>
                  <input
                    type="tel"
                    name="primaryPhone"
                    value={form.primaryPhone}
                    onChange={handleChange}
                    placeholder="+94 77XXXXXXX"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">Secondary Phone</label>
                  <input
                    type="tel"
                    name="secondaryPhone"
                    value={form.secondaryPhone}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="123 Main St, Colombo, Sri Lanka"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-sm font-medium text-gray-600">ID Proof Number</label>
                  <input
                    type="text"
                    name="idProof"
                    value={form.idProof}
                    onChange={handleChange}
                    placeholder="NIC / Passport / License No."
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-transparent transition"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-sm font-medium text-gray-600">Rental Preferences</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                    {["Daily commute", "Leisure rides", "Fitness", "Touring/Adventure"].map((pref, i) => (
                      <label key={i} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                        <input
                          type="checkbox"
                          value={pref}
                          checked={form.rentalPreferences.includes(pref)}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-[#67103d] border-gray-300 rounded focus:ring-[#67103d]"
                        />
                        <span className="text-sm">{pref}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#67103d] text-white font-medium hover:bg-[#50052c] transition flex items-center"
                >
                  Complete Registration
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegister;