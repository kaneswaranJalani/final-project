import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, ClockHistory, CheckCircle, XCircle } from 'react-bootstrap-icons';

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-3 px-4 hover:bg-[#f9f5f7] rounded-lg transition-colors">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-gray-800 font-semibold">{value || '-'}</span>
  </div>
);

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [rentals, setRentals] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    primaryPhone: '',
    address: '',
    idNumber: '',
    membership: 'Standard'
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/user/${userId}`);
        setProfileData({
          name: res.data.name,
          email: res.data.email,
          primaryPhone: res.data.primaryPhone,
          address: res.data.address,
          idNumber: res.data.idNumber,
          membership: res.data.membership || 'Standard'
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetchUser();
  }, [userId]);

  const fetchRentals = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/rentals/user/${userId}`);
      setRentals(res.data);
    } catch (err) {
      console.error('Error fetching rentals:', err);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, [userId]);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, profileData);
      setIsEditingProfile(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    }
  };

  const getRentalStatusBadge = (status) => {
    const statusMap = {
      active: { color: 'bg-blue-100 text-blue-800', icon: <ClockHistory className="mr-1" size={12} /> },
      completed: { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="mr-1" size={12} /> },
      cancelled: { color: 'bg-red-100 text-red-800', icon: <XCircle className="mr-1" size={12} /> },
    };
    
    const statusInfo = statusMap[status] || { color: 'bg-gray-100 text-gray-800', icon: null };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#67103d]">User Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your profile and rental history</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="inline-flex rounded-lg bg-white p-1 shadow-sm border border-gray-200">
              {['profile', 'rental-history'].map(tab => (
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
                    <h2 className="text-2xl font-semibold text-[#67103d]">User Profile</h2>
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
                      <InfoRow label="Primary Phone" value={profileData.primaryPhone} />
                      <InfoRow label="Address" value={profileData.address} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#67103d]">Account Information</h3>
                    <div className="space-y-2 divide-y divide-gray-100">
                      <InfoRow label="ID Number" value={profileData.idNumber} />
                      <InfoRow label="Membership" value={profileData.membership} />
                    </div>
                    
                    <div className="mt-8 bg-[#f9f0f5] p-4 rounded-lg">
                      <h4 className="font-medium text-[#67103d]">Rental Stats</h4>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div className="bg-white p-3 rounded-lg shadow-xs text-center">
                          <p className="text-2xl font-bold text-[#67103d]">
                            {rentals.filter(r => r.status === 'completed').length}
                          </p>
                          <p className="text-xs text-gray-500">Completed Rentals</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-xs text-center">
                          <p className="text-2xl font-bold text-[#67103d]">
                            {rentals.filter(r => r.status === 'active').length}
                          </p>
                          <p className="text-xs text-gray-500">Active Rentals</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-xs text-center">
                          <p className="text-2xl font-bold text-[#67103d]">4.5</p>
                          <p className="text-xs text-gray-500">User Rating</p>
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
                      {['name', 'email', 'primaryPhone', 'address'].map(field => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field === 'primaryPhone' ? 'Primary Phone Number' : 
                             field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          <input
                            name={field}
                            value={profileData[field]}
                            onChange={handleProfileInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d]"
                            required
                            type={field === 'email' ? 'email' : 'text'}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#67103d]">Account Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                        <input
                          name="idNumber"
                          value={profileData.idNumber}
                          onChange={handleProfileInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Membership</label>
                        <select
                          name="membership"
                          value={profileData.membership}
                          onChange={handleProfileInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#67103d] focus:border-[#67103d]"
                        >
                          <option value="Standard">Standard</option>
                          <option value="Premium">Premium</option>
                          <option value="Gold">Gold</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Rental History Tab */}
        {activeTab === 'rental-history' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-[#67103d]">Your Rental History</h2>
              <p className="text-gray-500 mt-1">View your past and current bicycle rentals</p>
            </div>
            
            <div className="overflow-x-auto">
              {rentals.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="mx-auto w-24 h-24 bg-[#f9f0f5] rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-[#67103d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">No rentals yet</h3>
                  <p className="text-gray-500 mt-1">When you rent bicycles, they will appear here</p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#f9f0f5]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#67103d] uppercase tracking-wider">Rental ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#67103d] uppercase tracking-wider">Bicycle</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#67103d] uppercase tracking-wider">Dates</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#67103d] uppercase tracking-wider">Total</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#67103d] uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rentals.map(rental => (
                      <tr key={rental._id} className="hover:bg-[#f9f5f7] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{rental._id.slice(-6).toUpperCase()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-[#f9f0f5] rounded-lg flex items-center justify-center">
                              <span className="text-[#67103d]">🚴</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{rental.bicycleId?.name}</div>
                              <div className="text-sm text-gray-500">{rental.bicycleId?.brand} {rental.bicycleId?.model}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {rental.rentalType === 'hourly' ? `${rental.duration} hours` : `${rental.duration} days`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${rental.totalAmount?.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getRentalStatusBadge(rental.status)}
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

export default UserDashboard;