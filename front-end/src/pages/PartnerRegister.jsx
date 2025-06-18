import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const rentalOptions = [
    'Daily commute',
    'Leisure rides',
    'Fitness',
    'Touring/Adventure'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      let updatedPreferences = [...formData.rentalPreferences];
      if (checked) {
        updatedPreferences.push(value);
      } else {
        updatedPreferences = updatedPreferences.filter(item => item !== value);
      }
      setFormData({ ...formData, rentalPreferences: updatedPreferences });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can send this data to backend here
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Partner Registration</h1>
      <p className="text-gray-600 mb-8">Create the account to start renting bicycle today</p>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name fields */}
            <inputField label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <inputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            {/* Email */}
            <inputField type="email" label="Email" name="email" value={formData.email} onChange={handleChange} required fullWidth />
            {/* Passwords */}
            <inputField type="password" label="Password" name="password" value={formData.password} onChange={handleChange} required />
            <inputField type="password" label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            {/* Phones */}
            <inputField type="tel" label="Primary Phone Number" name="primaryPhone" value={formData.primaryPhone} onChange={handleChange} required />
            <inputField type="tel" label="Secondary Phone Number" name="secondaryPhone" value={formData.secondaryPhone} onChange={handleChange} />
            {/* Address */}
            <inputField label="Business Address" name="businessAddress" value={formData.businessAddress} onChange={handleChange} required fullWidth />
          </div>
        </div>

        {/* Business Details */}
        <div className="mb-8 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tax-ID Business Registration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <inputField label="Available Vehicles" name="availableVehicles" value={formData.availableVehicles} onChange={handleChange} />
            <inputField type="number" label="Number Available" name="numberAvailable" value={formData.numberAvailable} onChange={handleChange} />
            <inputField label="Vehicle Type" name="vehicleType" value={formData.vehicleType} onChange={handleChange} fullWidth />
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2" htmlFor="additionalDetails">Additional Details</label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Service Area */}
        <div className="mb-8 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Service Area Coverage</h2>
          <label className="block text-gray-700 mb-2">Teams in bicycle rental business</label>
          <input
            type="text"
            name="serviceArea"
            value={formData.serviceArea}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Rental Preferences */}
        <div className="mb-8 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Rental Preferences</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {rentalOptions.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={option.replace(/\s+/g, '-').toLowerCase()}
                  name="rentalPreferences"
                  value={option}
                  checked={formData.rentalPreferences.includes(option)}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={option.replace(/\s+/g, '-').toLowerCase()} className="ml-2 text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="px-4 py-2 border text-gray-600 rounded-md hover:text-black"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

// Optional: You can refactor input fields into a reusable component later

export default PartnerRegister;
