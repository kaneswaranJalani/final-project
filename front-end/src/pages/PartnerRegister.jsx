import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiArrowLeft, FiBriefcase, FiStar, FiUser, FiMail, FiLock, FiPhone,
  FiCreditCard, FiHome, FiClock, FiMapPin, FiFileText
} from "react-icons/fi";

const PartnerRegister = () => {
  const navigate = useNavigate(); // ✅ must be declared inside the component

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    nic: "",
    address: "",
    businessName: "",
    businessType: "",
    yearsInBusiness: "",
    rentalArea: "",
    additionalDetails: "",
    partnerTier: "basic",
  });

  const handleBack = () => navigate(-1); // ✅ Back to previous page

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register/partner", form);
      navigate("/Login", { state: { partnerData: form } });
      alert("Registration successful! Please check your email for verification.");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-[#67103d] hover:underline text-sm font-medium"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Join Our <span className="text-[#67103d]">Partner Network</span>
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Register your business and start growing with us today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left side */}
            <div className="md:w-1/3 bg-[#67103d] p-8 flex flex-col justify-center items-center text-white">
              <div className="text-center">
                <FiBriefcase className="mx-auto h-12 w-12 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Business Partnership</h2>
                <p className="opacity-90">
                  Join our network of trusted partners and access exclusive benefits
                </p>
              </div>
              <div className="mt-8 w-full">
                {["Premium visibility", "Marketing support", "Business tools"].map((item, index) => (
                  <div className="flex items-center mb-4" key={index}>
                    <FiStar className="mr-3 text-yellow-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Form */}
            <div className="md:w-2/3 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2 border-[#67103d]">
                      Personal Information
                    </h3>
                  </div>

                  {[
                    { label: "Full Name", icon: <FiUser />, name: "name", type: "text" },
                    { label: "Email Address", icon: <FiMail />, name: "email", type: "email" },
                    { label: "Password", icon: <FiLock />, name: "password", type: "password" },
                    { label: "Phone Number", icon: <FiPhone />, name: "phone", type: "tel" },
                    { label: "NIC Number", icon: <FiCreditCard />, name: "nic", type: "text" },
                    { label: "Address", icon: <FiHome />, name: "address", type: "text", span: true },
                    { label: "Business Name", icon: <FiBriefcase />, name: "businessName", type: "text", span: true },
                    { label: "Business Type", icon: null, name: "businessType", type: "text" },
                    { label: "Years in Business", icon: <FiClock />, name: "yearsInBusiness", type: "number" },
                    { label: "Rental Area", icon: <FiMapPin />, name: "rentalArea", type: "text" },
                  ].map(({ label, icon, name, type, span }) => (
                    <div className={span ? "sm:col-span-2" : ""} key={name}>
                      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                        {icon && <span className="inline mr-2 text-[#67103d]">{icon}</span>}
                        {label}
                      </label>
                      <input
                        id={name}
                        name={name}
                        type={type}
                        value={form[name]}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#67103d] focus:border-[#67103d]"
                      />
                    </div>
                  ))}

                  {/* Additional Details */}
                  <div className="sm:col-span-2">
                    <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700">
                      <FiFileText className="inline mr-2 text-[#67103d]" /> Additional Details
                    </label>
                    <textarea
                      id="additionalDetails"
                      name="additionalDetails"
                      rows={3}
                      value={form.additionalDetails}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#67103d] focus:border-[#67103d]"
                    />
                  </div>

                  {/* Partner Tier Dropdown */}
                  <div className="sm:col-span-2">
                    <label htmlFor="partnerTier" className="block text-sm font-medium text-gray-700">
                      <FiStar className="inline mr-2 text-[#67103d]" /> Partner Tier
                    </label>
                    <select
                      id="partnerTier"
                      name="partnerTier"
                      value={form.partnerTier}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#67103d] focus:border-[#67103d]"
                    >
                      <option value="basic">Basic</option>
                      <option value="premium">Premium</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#67103d] hover:bg-[#500c2e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#67103d] transition duration-150"
                  >
                    Register as Partner
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegister;
