import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();
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
    let updatedPreferences = [...form.rentalPreferences];
    if (checked) {
      updatedPreferences.push(value);
    } else {
      updatedPreferences = updatedPreferences.filter((pref) => pref !== value);
    }
    setForm({ ...form, rentalPreferences: updatedPreferences });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered:", form);
    // Here you can call your backend API
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center p-4">
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          User Registration
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Create the account to start renting bicycle today
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="First Name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Last name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Last Name"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Password"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Primary phone number</label>
            <input
              type="tel"
              name="primaryPhone"
              value={form.primaryPhone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Primary Phone"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Secondary phone number</label>
            <input
              type="tel"
              name="secondaryPhone"
              value={form.secondaryPhone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Secondary Phone"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Address"
              rows="3"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">ID Proof Number</label>
            <input
              type="text"
              name="idProof"
              value={form.idProof}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="ID Proof Number"
              required
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <label className="block mb-1 text-sm font-medium">Rental Preferences</label>
            <div className="flex flex-wrap gap-4">
              {["Daily commute", "Leisure rides", "Fitness", "Touring/Adventure"].map(
                (preference, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={preference}
                      checked={form.rentalPreferences.includes(preference)}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{preference}</span>
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <button
            type="button"
            className="px-4 py-2 rounded-md border text-gray-600 hover:text-black"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
