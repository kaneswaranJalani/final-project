import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const InputField = ({ label, type = "text", name, value, onChange, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#67103d] transition"
    />
  </div>
);

const PartnerRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    primaryPhone: '',
    secondaryPhone: '',
    businessAddress: '',
    taxId: '',
    availableVehicles: '',
    numberAvailable: '',
    vehicleType: '',
    additionalDetails: '',
    serviceArea: '',
    rentalPreferences: []
  });

  const [agreePartnerTerms, setAgreePartnerTerms] = useState(false);

  const rentalOptions = [
    'Daily commute',
    'Leisure rides',
    'Fitness',
    'Touring/Adventure'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'rentalPreferences') {
      const updatedPreferences = checked
        ? [...formData.rentalPreferences, value]
        : formData.rentalPreferences.filter(item => item !== value);
      setFormData({ ...formData, rentalPreferences: updatedPreferences });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreePartnerTerms) {
      alert("You must agree to the Terms and Conditions to proceed.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/partner/register", formData);
      alert("Partner registered successfully!");
      navigate("/SuccessfulRegister");
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Registration failed!";
      alert(errorMsg);
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-extrabold text-[#67103d] mb-2">Partner Registration</h1>
      <p className="text-gray-600 mb-8">Register to rent out your bicycles and manage bookings easily.</p>

      <form onSubmit={handleSubmit}>
        {/* Section: Personal Information */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">👤 Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="First Name" name="name" value={formData.name} onChange={handleChange} required />
            <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <InputField type="email" label="Email" name="email" value={formData.email} onChange={handleChange} required />
            <InputField type="password" label="Password" name="password" value={formData.password} onChange={handleChange} required />
            <InputField type="password" label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            <InputField type="tel" label="Primary Phone" name="primaryPhone" value={formData.primaryPhone} onChange={handleChange} required />
            <InputField type="tel" label="Secondary Phone" name="secondaryPhone" value={formData.secondaryPhone} onChange={handleChange} />
            <InputField label="Business Address" name="businessAddress" value={formData.businessAddress} onChange={handleChange} required />
          </div>
        </div>

        {/* Section: Business Details */}
        <div className="mb-10 border-t pt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🏢 Business Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Available Vehicles" name="availableVehicles" value={formData.availableVehicles} onChange={handleChange} />
            <InputField type="number" label="Number Available" name="numberAvailable" value={formData.numberAvailable} onChange={handleChange} />
            <InputField label="Vehicle Type" name="vehicleType" value={formData.vehicleType} onChange={handleChange} />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
              <textarea
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#67103d] transition"
                placeholder="Share any extra details about your business or vehicles"
              />
            </div>
          </div>
        </div>

        {/* Section: Service Area */}
        <div className="mb-10 border-t pt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📍 Service Area</h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Area</label>
          <input
            type="text"
            name="serviceArea"
            value={formData.serviceArea}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#67103d] transition"
            placeholder="City, town, or region"
          />
        </div>

        {/* Section: Rental Preferences */}
        <div className="mb-10 border-t pt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🚲 Rental Preferences</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rentalOptions.map((option) => (
              <label key={option} className="flex items-center space-x-3 text-gray-700">
                <input
                  type="checkbox"
                  name="rentalPreferences"
                  value={option}
                  checked={formData.rentalPreferences.includes(option)}
                  onChange={handleChange}
                  className="h-5 w-5 text-[#67103d] border-gray-300 rounded focus:ring-[#67103d]"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Section: Terms */}
        <div className="mb-8">
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={agreePartnerTerms}
              onChange={(e) => setAgreePartnerTerms(e.target.checked)}
              className="h-4 w-4 text-[#67103d] border-gray-300 rounded focus:ring-[#67103d]"
              required
            />
            <span>
              I agree to the{" "}
              <Link to="/PartnerTerms" className="text-[#67103d] underline hover:text-[#50052c]">
                Terms and Conditions
              </Link>
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 border border-gray-400 text-gray-700 rounded-lg hover:text-[#67103d] hover:border-[#67103d] transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#67103d] text-white font-semibold rounded-lg shadow-md hover:bg-[#50052c] focus:outline-none focus:ring-2 focus:ring-[#67103d] focus:ring-offset-2 transition"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerRegister;
