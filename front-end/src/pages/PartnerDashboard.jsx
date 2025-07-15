import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, PlusCircle, Trash } from 'react-bootstrap-icons';

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-3 px-4 hover:bg-[#f9f5f7] rounded-lg transition-colors">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-gray-800 font-semibold">{value || '-'}</span>
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
  

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/partners/${partnerId}`);
        setProfileData({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address,
          partnerTier: res.data.partnerTier,
          additionalDetails: res.data.additionalDetails
        });
      } catch (err) {
        console.error('Error fetching partner data:', err);
      }
    };
    fetchPartner();
  }, [partnerId]);
  

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

  const getStatusBadge = (status) => {
    const statusMap = {
      available: { color: 'bg-[#e6f7ed] text-[#067647]', text: 'Available' },
      rented: { color: 'bg-[#fff8e6] text-[#b78103]', text: 'Rented' },
      maintenance: { color: 'bg-[#feecef] text-[#cf1322]', text: 'Maintenance' },
    };
    
    const statusInfo = statusMap[status] || { color: 'bg-gray-100 text-gray-800', text: status };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#67103d]">Partner Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your profile and bicycles</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="inline-flex rounded-lg bg-white p-1 shadow-sm border border-gray-200">
              {['profile', 'add-bicycle', 'manage-bicycles'].map(tab => (
                <button
                  key={tab}
                  onClick={() => {
                    setIsEditingProfile(false);
                    handleTabChange(tab);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab
                      ? 'bg-[#67103d] text-white shadow'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {!isEditingProfile ? (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-[#67103d]">Partner Profile</h2>
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#67103d] text-white rounded-lg hover:bg-[#4e0c2e] transition"
                    >
                      <PencilSquare size={16} />
                      Edit Profile
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#67103d]">Personal Information</h3>
                    <div className="space-y-2 divide-y divide-gray-100">
                      <InfoRow label="Full Name" value={profileData.name} />
                      <InfoRow label="Email" value={profileData.email} />
                      <InfoRow label="Phone" value={profileData.phone} />
                      <InfoRow label="Address" value={profileData.address} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#67103d]">Partner Information</h3>
                    <div className="space-y-2 divide-y divide-gray-100">
                      <InfoRow label="Partner Tier" value={profileData.partnerTier} />
                      <InfoRow label="Experience" value={profileData.additionalDetails} />
                    </div>
                    
                    <div className="mt-8 bg-[#f9f0f5] p-4 rounded-lg">
                      <h4 className="font-medium text-[#67103d]">Partner Status</h4>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div className="bg-white p-3 rounded-lg shadow-xs text-center">
                          <p className="text-2xl font-bold text-[#67103d]">{bicycles.length}</p>
                          <p className="text-xs text-gray-500">Bicycles</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-xs text-center">
                          <p className="text-2xl font-bold text-[#67103d]">24</p>
                          <p className="text-xs text-gray-500">Rentals</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-xs text-center">
                          <p className="text-2xl font-bold text-[#67103d]">4.8</p>
                          <p className="text-xs text-gray-500">Rating</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <form onSubmit={handleProfileSubmit} className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-[#67103d]">Edit Profile</h2>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#67103d] text-white rounded-lg hover:bg-[#4e0c2e]"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#67103d]">Personal Information</h3>
                    <div className="space-y-4">
                      {['name', 'email', 'phone', 'address'].map(field => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                          </label>
                          <input
                            name={field}
                            value={profileData[field]}
                            onChange={handleProfileInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d]"
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#67103d]">Partner Information</h3>
                    <div className="space-y-4">
                      {['partnerTier', 'additionalDetails'].map(field => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field === 'partnerTier' ? 'Partner Tier' : 'Additional Details'}
                          </label>
                          <input
                            name={field}
                            value={profileData[field]}
                            onChange={handleProfileInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Add Bicycle Tab */}
        {activeTab === 'add-bicycle' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-[#67103d]">Add New Bicycle</h2>
              <p className="text-gray-500 mt-1">Fill in the details of your bicycle</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['name', 'type', 'brand', 'model', 'hourlyRate', 'dailyRate', 'location'].map(field => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field === 'hourlyRate' ? 'Hourly Rate ($)' : 
                       field === 'dailyRate' ? 'Daily Rate ($)' : 
                       field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field.includes('Rate') ? 'number' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d]"
                      placeholder={field === 'hourlyRate' ? '10' : field === 'dailyRate' ? '50' : ''}
                      required
                    />
                  </div>
                ))}
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d]"
                    rows={4}
                    placeholder="Describe your bicycle (features, condition, etc.)"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-[#67103d] text-white rounded-lg hover:bg-[#4e0c2e] transition"
                >
                  <PlusCircle size={18} />
                  Add Bicycle
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Manage Bicycles Tab */}
        {activeTab === 'manage-bicycles' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-[#67103d]">Your Bicycles</h2>
              <p className="text-gray-500 mt-1">Manage your bicycle listings</p>
            </div>
            
            <div className="overflow-x-auto">
              {bicycles.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="mx-auto w-24 h-24 bg-[#f9f0f5] rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-[#67103d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">No bicycles listed yet</h3>
                  <p className="text-gray-500 mt-1 mb-4">Add your first bicycle to start renting</p>
                  <button
                    onClick={() => setActiveTab('add-bicycle')}
                    className="px-4 py-2 bg-[#67103d] text-white rounded-lg hover:bg-[#4e0c2e]"
                  >
                    Add Bicycle
                  </button>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#f9f0f5]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#67103d] uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#67103d] uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#67103d] uppercase tracking-wider">Rates</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#67103d] uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#67103d] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bicycles.map(bike => (
                      <tr key={bike._id} className="hover:bg-[#f9f5f7] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-[#f9f0f5] rounded-lg flex items-center justify-center">
                              <span className="text-[#67103d]">🚴</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{bike.name}</div>
                              <div className="text-sm text-gray-500">{bike.brand} {bike.model}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">{bike.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${bike.hourlyRate}/hr</div>
                          <div className="text-sm text-gray-500">${bike.dailyRate}/day</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(bike.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => deleteBicycle(bike._id)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          >
                            <Trash size={14} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerDashboard;