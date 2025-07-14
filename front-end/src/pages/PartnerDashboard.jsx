import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare } from 'react-bootstrap-icons'; // Use `react-icons` if preferred

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2 text-gray-700">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

const PartnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [bicycles, setBicycles] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const partnerId = JSON.parse(localStorage.getItem('user'))?.id;

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    brand: '',
    model: '',
    hourlyRate: '',
    dailyRate: '',
    description: '',
    location: '',
  });

  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, City, Country',
    partnerTier: 'Gold',
    additionalDetails: 'Experienced partner for 3+ years'
  });

  const fetchBicycles = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bicycles/partner/${partnerId}`);
      setBicycles(res.data);
    } catch (err) {
      console.error('Error fetching bicycles:', err);
    }
  };

  useEffect(() => {
    fetchBicycles();
  }, [partnerId]);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBike = {
        ...formData,
        status: 'available',
        partnerId
      };
      await axios.post('http://localhost:5000/api/bicycles/', newBike);
      await fetchBicycles();
      setFormData({
        name: '',
        type: '',
        brand: '',
        model: '',
        hourlyRate: '',
        dailyRate: '',
        description: '',
        location: '',
      });
      setActiveTab('manage-bicycles');
      alert('Bicycle added successfully!');
    } catch (err) {
      console.error('Error adding bicycle:', err);
      alert('Failed to add bicycle.');
    }
  };

  const deleteBicycle = async (id) => {
    if (window.confirm('Are you sure you want to delete this bicycle?')) {
      try {
        await axios.delete(`http://localhost:5000/api/bicycles/${id}`);
        await fetchBicycles();
      } catch (err) {
        console.error('Failed to delete bicycle:', err);
      }
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
    alert('Profile updated!');
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'rented': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <h1 className="text-4xl font-bold text-[#67103d] mb-6">🚲 Partner Dashboard</h1>

      <div className="flex space-x-3 mb-8">
        {['profile', 'add-bicycle', 'manage-bicycles'].map(tab => (
          <button
            key={tab}
            onClick={() => {
              setIsEditingProfile(false);
              handleTabChange(tab);
            }}
            className={`px-5 py-2 rounded-full shadow font-medium transition-all ${
              activeTab === tab
                ? 'bg-[#67103d] text-white'
                : 'bg-white border border-[#67103d] text-[#67103d] hover:bg-[#67103d] hover:text-white'
            }`}
          >
            {tab.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10">
          {!isEditingProfile ? (
            <>
              {/* Partner Info Card */}
              <div className="space-y-6">
                <h3 className="text-3xl font-semibold text-[#67103d] border-b-2 border-[#67103d] pb-2">
                  Partner Details
                </h3>
                <InfoRow label="Full Name" value={profileData.name} />
                <InfoRow label="Email" value={profileData.email} />
                <InfoRow label="Phone" value={profileData.phone} />
                <InfoRow label="Address" value={profileData.address} />
                <InfoRow label="Partner Tier" value={profileData.partnerTier} />
                <InfoRow label="Additional Details" value={profileData.additionalDetails} />

                <button
                  onClick={() => setIsEditingProfile(true)}
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
            </>
          ) : (
            <form onSubmit={handleProfileSubmit} className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-semibold text-[#67103d] mb-4">✏️ Edit Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={profileData.name} onChange={handleProfileInputChange} className="border p-2 rounded" placeholder="Name" required />
                <input name="email" value={profileData.email} onChange={handleProfileInputChange} className="border p-2 rounded" placeholder="Email" required />
                <input name="phone" value={profileData.phone} onChange={handleProfileInputChange} className="border p-2 rounded" placeholder="Phone" required />
                <input name="address" value={profileData.address} onChange={handleProfileInputChange} className="border p-2 rounded" placeholder="Address" required />
                <input name="partnerTier" value={profileData.partnerTier} onChange={handleProfileInputChange} className="border p-2 rounded" placeholder="Tier" />
                <input name="additionalDetails" value={profileData.additionalDetails} onChange={handleProfileInputChange} className="border p-2 rounded" placeholder="More Info" />
              </div>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save Changes
              </button>
            </form>
          )}
        </div>
      )}

      {/* Add Bicycle Tab */}
      {activeTab === 'add-bicycle' && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
          <h2 className="text-2xl font-semibold text-[#67103d] mb-4">➕ Add New Bicycle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['name', 'type', 'brand', 'model', 'hourlyRate', 'dailyRate', 'location'].map(field => (
              <input
                key={field}
                type={field.includes('Rate') ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder={field}
                required
              />
            ))}
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            placeholder="Description"
          ></textarea>
          <button type="submit" className="bg-[#67103d] text-white px-4 py-2 rounded hover:bg-[#560d33]">Add Bicycle</button>
        </form>
      )}

      {/* Manage Bicycles Tab */}
      {activeTab === 'manage-bicycles' && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-[#67103d] mb-4">🛠️ Manage Bicycles</h2>
          {bicycles.length === 0 ? (
            <p className="text-gray-600">No bicycles found.</p>
          ) : (
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100 text-[#67103d]">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Hourly Rate</th>
                  <th className="p-2 text-left">Daily Rate</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bicycles.map(bike => (
                  <tr key={bike._id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{bike.name}</td>
                    <td className="p-2">{bike.type}</td>
                    <td className="p-2">${bike.hourlyRate}</td>
                    <td className="p-2">${bike.dailyRate}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(bike.status)}`}>
                        {bike.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button onClick={() => deleteBicycle(bike._id)} className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default PartnerDashboard;
