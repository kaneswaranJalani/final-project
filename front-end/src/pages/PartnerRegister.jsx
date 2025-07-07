import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Reusable Input Component
const InputField = ({ label, name, value, onChange, type = 'text', required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#67103d] focus:outline-none"
    />
  </div>
);

const PartnerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nic: '',
    address: '',
    password: '',
    businessName: '',
    businessType: '',
    yearsInBusiness: '',
    rentalArea: '',
    additionalDetails: '',
    partnerTier: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!/^\d{10}$/.test(formData.phone)) {
      alert('Enter a valid 10-digit phone number.');
      return;
    }
    if (!/^[0-9]{9}[vVxX]$/.test(formData.nic)) {
      alert('Enter a valid NIC (e.g., 123456789V)');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register/partner', formData);
      alert('✅ Partner registered successfully!');
      navigate('/PartnerProfile', { state: { partnerData: formData } });
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      alert(err.response?.data?.message || '❌ Registration failed.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-[#67103d] transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <h2 className="text-3xl font-bold text-center text-[#67103d]">Partner Registration</h2>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
          <InputField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          <InputField label="NIC" name="nic" value={formData.nic} onChange={handleChange} required />
          <InputField label="Address" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Business Name" name="businessName" value={formData.businessName} onChange={handleChange} required />
          <InputField label="Business Type" name="businessType" value={formData.businessType} onChange={handleChange} required />
          <InputField label="Years in Business" name="yearsInBusiness" type="number" value={formData.yearsInBusiness} onChange={handleChange} />
          <InputField label="Operating Area / City" name="rentalArea" value={formData.rentalArea} onChange={handleChange} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Partner Tier</label>
          <select
            name="partnerTier"
            value={formData.partnerTier}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#67103d] focus:outline-none"
          >
            <option value="">Select Tier</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#67103d] focus:outline-none"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <Link to="/PartnerTerms">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-[#67103d] hover:text-[#67103d] transition-colors"
          >
            Cancel
          </button>
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-[#67103d] text-white rounded-lg hover:bg-[#50052c] transition-colors"
          >
            Register as Partner
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerRegister;
