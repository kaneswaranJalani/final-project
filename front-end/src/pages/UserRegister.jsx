import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

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

  const [agreeTerms, setAgreeTerms] = useState(false);

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

 const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Password Match Check
  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // 2. Terms Agreement Check
  if (!agreeTerms) {
    alert("You must agree to the Terms and Conditions to proceed.");
    return;
  }

  try {
    // 3. Check for undefined fields (optional debug)
    console.log("Submitting form data:", form);

    const { data } = await axios.post("http://localhost:5000/api/auth/register", {
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
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] flex items-center justify-center px-4 py-10">
      <form
        className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-3xl border border-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#67103d]">User Registration</h2>
          <p className="text-sm text-gray-600 mt-1">Start your ride today</p>
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
              className="mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] bg-gray-50"
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
              className="mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] bg-gray-50"
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
              className="mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] bg-gray-50"
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
              className="mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] bg-gray-50"
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
              className="mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] bg-gray-50"
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
              className="mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Secondary Phone</label>
            <input
              type="tel"
              name="secondaryPhone"
              value={form.secondaryPhone}
              onChange={handleChange}
              placeholder="Optional"
              className="mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] bg-gray-50"
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
              className="mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] bg-gray-50"
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
              className="mt-2 w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#67103d] bg-gray-50"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rental Preferences
            </label>
            <div className="flex flex-wrap gap-5">
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

          <div className="md:col-span-2 mt-6">
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 text-[#67103d] border-gray-300 rounded focus:ring-[#67103d]"
                required
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="text-[#67103d] underline hover:text-[#50052c]">
                  Terms and Conditions
                </Link>
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 border border-gray-400 rounded-xl text-gray-700 font-medium hover:border-[#67103d] hover:text-[#67103d] transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-[#67103d] text-white font-semibold hover:bg-[#50052c] transition duration-200"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
