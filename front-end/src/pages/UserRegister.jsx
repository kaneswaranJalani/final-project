import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

      console.log("Registered:", response.data);
      navigate("/SuccessfulRegister");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.message || "Registration failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-xl p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#67103d]">User Registration</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required
            className="w-full px-4 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Primary Phone</label>
          <input type="text" name="primaryPhone" value={form.primaryPhone} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Secondary Phone</label>
          <input type="text" name="secondaryPhone" value={form.secondaryPhone} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Address</label>
          <textarea name="address" rows="2" value={form.address} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">ID Proof Number</label>
          <input type="text" name="idProof" value={form.idProof} onChange={handleChange}
            className="w-full px-4 py-2 border rounded" />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Rental Preference</label>
          <select name="rentalPreferences" value={form.rentalPreferences} onChange={handleChange}
            className="w-full px-4 py-2 border rounded">
            <option value="">-- Select --</option>
            <option value="Daily commute">Daily commute</option>
            <option value="Leisure rides">Leisure rides</option>
            <option value="Fitness">Fitness</option>
            <option value="Touring/Adventure">Touring/Adventure</option>
          </select>
        </div>

        <button type="submit"
          className="w-full bg-[#67103d] text-white py-3 rounded hover:bg-[#50052c] transition">
          Register
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
