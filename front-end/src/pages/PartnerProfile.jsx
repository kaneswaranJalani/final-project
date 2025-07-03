import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import {
  PencilSquare,
  PlusCircle,
  Trash,
  ArrowRepeat,
  CheckCircleFill,
} from "react-bootstrap-icons";

const PartnerProfile = () => {
  const location = useLocation();
  const data = location.state?.partnerData;

  const [partner, setPartner] = useState(data || {});
  const [bicycles, setBicycles] = useState([]);
  const [showAddBicycle, setShowAddBicycle] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Add Bicycle
  const handleAddBicycle = (e) => {
    e.preventDefault();
    const form = e.target;
    const newBicycle = {
      id: Date.now(),
      type: form.type.value.trim(),
      model: form.model.value.trim(),
      price: parseFloat(form.price.value),
      stock: parseInt(form.stock.value) || 0,
      status: "Available",
      lastUpdate: new Date().toLocaleDateString(),
    };
    setBicycles((prev) => [...prev, newBicycle]);
    setShowAddBicycle(false);
    form.reset();
  };

  // Delete Bicycle
  const handleDeleteBicycle = (id) => {
    if (window.confirm("Are you sure you want to delete this bicycle?")) {
      setBicycles((prev) => prev.filter((bike) => bike.id !== id));
    }
  };

  // Update Bicycle (mark as updated)
  const handleUpdateBicycle = (id) => {
    const updated = bicycles.map((bike) =>
      bike.id === id
        ? { ...bike, status: "Updated", lastUpdate: new Date().toLocaleDateString() }
        : bike
    );
    setBicycles(updated);
  };

  // Edit Partner Profile
  const handleEditProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    setPartner({
      ...partner,
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      address: form.address.value.trim(),
      partnerTier: form.partnerTier.value,
      additionalDetails: form.additionalDetails.value.trim(),
    });
    setShowEdit(false);
  };

  // Submit all data to backend
  const handleSubmitAll = async () => {
    try {
      const payload = { partner, bicycles };
      await axios.post("http://localhost:5000/api/partner/submit", payload);
      alert("Partner and bicycle data submitted successfully!");
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-xl">
      <h2 className="text-5xl font-extrabold text-[#67103d] mb-10 text-center tracking-wide">
        🚴 Partner Profile
      </h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 mb-8 border-b-2 border-gray-300">
        <button
          className={`pb-3 font-semibold text-lg transition-colors ${
            activeTab === "profile"
              ? "border-b-4 border-[#67103d] text-[#67103d]"
              : "text-gray-500 hover:text-[#67103d]"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Info
        </button>
        <button
          className={`pb-3 font-semibold text-lg transition-colors ${
            activeTab === "bicycles"
              ? "border-b-4 border-[#67103d] text-[#67103d]"
              : "text-gray-500 hover:text-[#67103d]"
          }`}
          onClick={() => setActiveTab("bicycles")}
        >
          Bicycle Inventory
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Partner Info Card */}
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-[#67103d] border-b-2 border-[#67103d] pb-2">
              Partner Details
            </h3>

            <InfoRow label="Full Name" value={partner.name || "-"} />
            <InfoRow label="Email" value={partner.email || "-"} />
            <InfoRow label="Phone" value={partner.phone || "-"} />
            <InfoRow label="Address" value={partner.address || "-"} />
            <InfoRow label="Partner Tier" value={partner.partnerTier || "-"} />
            <InfoRow
              label="Additional Details"
              value={partner.additionalDetails || "-"}
            />

            <button
              onClick={() => setShowEdit(true)}
              className="mt-6 flex items-center gap-3 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition"
            >
              <PencilSquare size={22} />
              Edit Profile
            </button>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
              alt="Partner Profile"
              className="rounded-2xl shadow-lg object-cover w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Bicycles Tab */}
      {activeTab === "bicycles" && (
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-semibold text-[#67103d]">📦 Bicycle Inventory</h3>
            <button
              onClick={() => setShowAddBicycle(true)}
              className="flex items-center gap-2 px-5 py-3 bg-[#67103d] text-white font-semibold rounded-lg shadow hover:bg-[#50052c] transition"
            >
              <PlusCircle size={24} />
              Add Bicycle
            </button>
          </div>

          {bicycles.length > 0 ? (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-[#67103d] text-white text-left">
                  <tr>
                    <th className="px-5 py-3 border border-gray-300">ID</th>
                    <th className="px-5 py-3 border border-gray-300">Type</th>
                    <th className="px-5 py-3 border border-gray-300">Model</th>
                    <th className="px-5 py-3 border border-gray-300">Price ($)</th>
                    <th className="px-5 py-3 border border-gray-300">Stock</th>
                    <th className="px-5 py-3 border border-gray-300">Status</th>
                    <th className="px-5 py-3 border border-gray-300">Last Update</th>
                    <th className="px-5 py-3 border border-gray-300 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bicycles.map((bike) => (
                    <tr
                      key={bike.id}
                      className="hover:bg-gray-50 border border-gray-300"
                    >
                      <td className="px-5 py-3 border border-gray-300 font-mono text-sm">
                        {bike.id}
                      </td>
                      <td className="px-5 py-3 border border-gray-300 capitalize">
                        {bike.type}
                      </td>
                      <td className="px-5 py-3 border border-gray-300 capitalize">
                        {bike.model}
                      </td>
                      <td className="px-5 py-3 border border-gray-300 text-green-700 font-semibold">
                        {bike.price.toFixed(2)}
                      </td>
                      <td className="px-5 py-3 border border-gray-300">{bike.stock}</td>
                      <td className="px-5 py-3 border border-gray-300 flex items-center gap-2">
                        {bike.status === "Available" ? (
                          <CheckCircleFill className="text-green-600" />
                        ) : (
                          <ArrowRepeat className="text-blue-600" />
                        )}
                        {bike.status}
                      </td>
                      <td className="px-5 py-3 border border-gray-300">
                        {bike.lastUpdate}
                      </td>
                      <td className="px-5 py-3 border border-gray-300 text-center flex justify-center gap-4">
                        <button
                          onClick={() => handleUpdateBicycle(bike.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Mark Updated"
                        >
                          <ArrowRepeat size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteBicycle(bike.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Bicycle"
                        >
                          <Trash size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="italic text-gray-500">No bicycles added yet.</p>
          )}

          {/* Submit All */}
          <div className="mt-8 flex justify-end">
            <Link to="/PartnerWelcome">
              <button
                onClick={handleSubmitAll}
                className="px-7 py-3 bg-[#67103d] text-white font-semibold rounded-lg shadow hover:bg-[#50052c] transition"
              >
                Submit All
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEdit && (
        <Modal onClose={() => setShowEdit(false)}>
          <form onSubmit={handleEditProfile} className="space-y-5">
            <h2 className="text-2xl font-bold text-[#67103d] text-center mb-4">
              ✏️ Edit Profile
            </h2>
            <InputField label="Full Name" name="name" defaultValue={partner.name} required />
            <InputField
              label="Email"
              name="email"
              type="email"
              defaultValue={partner.email}
              required
            />
            <InputField label="Phone" name="phone" defaultValue={partner.phone} required />
            <InputField label="Address" name="address" defaultValue={partner.address} required />
            <TextareaField
              label="Additional Details"
              name="additionalDetails"
              defaultValue={partner.additionalDetails}
            />
            <SelectField
              label="Partner Tier"
              name="partnerTier"
              defaultValue={partner.partnerTier}
              options={["Basic", "Standard", "Premium"]}
            />
            <ModalActions onClose={() => setShowEdit(false)} submitLabel="Save" />
          </form>
        </Modal>
      )}

      {/* Add Bicycle Modal */}
      {showAddBicycle && (
        <Modal onClose={() => setShowAddBicycle(false)}>
          <form onSubmit={handleAddBicycle} className="space-y-5">
            <h2 className="text-2xl font-bold text-[#67103d] text-center mb-4">
              🚲 Add Bicycle
            </h2>
            <InputField label="Type" name="type" required />
            <InputField label="Model" name="model" required />
            <InputField label="Price ($)" name="price" type="number" required min="0" step="0.01" />
            <InputField label="Stock" name="stock" type="number" min="0" />
            <ModalActions onClose={() => setShowAddBicycle(false)} submitLabel="Add" />
          </form>
        </Modal>
      )}
    </div>
  );
};

// Info Row for profile display
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-200 py-2">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

// Input Field component
const InputField = ({ label, name, defaultValue, type = "text", required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      defaultValue={defaultValue}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#67103d] focus:outline-none"
    />
  </div>
);

// Textarea Field component
const TextareaField = ({ label, name, defaultValue }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      name={name}
      defaultValue={defaultValue}
      rows={4}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#67103d] focus:outline-none"
    />
  </div>
);

// Select Field component
const SelectField = ({ label, name, defaultValue, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      defaultValue={defaultValue}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#67103d] focus:outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

// Modal Wrapper
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
        aria-label="Close modal"
      >
        &times;
      </button>
      {children}
    </div>
  </div>
);

// Modal action buttons
const ModalActions = ({ onClose, submitLabel }) => (
  <div className="flex justify-end gap-4 mt-6">
    <button
      type="button"
      onClick={onClose}
      className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-6 py-2 bg-[#67103d] text-white rounded-lg font-semibold hover:bg-[#50052c]"
    >
      {submitLabel}
    </button>
  </div>
);

export default PartnerProfile;
