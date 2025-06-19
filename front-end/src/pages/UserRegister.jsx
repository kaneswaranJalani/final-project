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
    const updated = checked
      ? [...form.rentalPreferences, value]
      : form.rentalPreferences.filter((item) => item !== value);
    setForm({ ...form, rentalPreferences: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password match validation (optional)
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Normally you’d send the form to the backend here
    console.log("User Registered:", form);

    // Navigate to success page
    navigate("/SuccessfulRegister");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] flex items-center justify-center px-4">
      <form
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-3xl border border-gray-100"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#67103d]">User Registration</h2>
          <p className="text-sm text-gray-500 mt-1">Start your ride today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="John"
              required
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67103d]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67103d]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              required
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67103d]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67103d]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67103d]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Phone</label>
            <input
              type="tel"
              name="primaryPhone"
              value={form.primaryPhone}
              onChange={handleChange}
              placeholder="+94 77XXXXXXX"
              required
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67103d]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Secondary Phone</label>
            <input
              type="tel"
              name="secondaryPhone"
              value={form.secondaryPhone}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67103d]"
              placeholder="Optional"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              placeholder="123 Main St, Colombo, Sri Lanka"
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67103d]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">ID Proof Number</label>
            <input
              type="text"
              name="idProof"
              value={form.idProof}
              onChange={handleChange}
              placeholder="NIC / Passport / License No."
              required
              className="mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67103d]"
            />
          </div>

          {/* Preferences */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rental Preferences
            </label>
            <div className="flex flex-wrap gap-4">
              {["Daily commute", "Leisure rides", "Fitness", "Touring/Adventure"].map((pref, i) => (
                <label key={i} className="flex items-center space-x-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    value={pref}
                    checked={form.rentalPreferences.includes(pref)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-[#67103d] border-gray-300 rounded focus:ring-[#67103d]"
                  />
                  <span>{pref}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:border-[#67103d] hover:text-[#67103d] transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-[#67103d] text-white hover:bg-[#50052c] transition font-semibold"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
