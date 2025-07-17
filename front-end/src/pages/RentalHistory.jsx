import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  FiUser,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEdit,
  FiFilter,
  FiChevronDown
} from 'react-icons/fi';

// InfoRow component definition
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-2">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-900">{value || 'N/A'}</span>
  </div>
);

const RentalHistory = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [rentals, setRentals] = useState([]);
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sample user data - replace with actual API call
  const [user, setUser] = useState({
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    address: '789 Oak Street, Springfield',
    joinDate: '2022-03-15',
    membership: 'Premium'
  });

  // Sample form data
  const [formData, setFormData] = useState({ ...user });

  // Sample rental data - replace with actual API call
  const sampleRentals = [
    {
      id: 1,
      bikeName: 'Mountain Pro',
      bikeImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
      startDate: '2023-06-10',
      endDate: '2023-06-12',
      duration: '2 days',
      price: 120,
      status: 'completed',
      color: 'Blue'
    },
    {
      id: 2,
      bikeName: 'City Cruiser',
      bikeImage: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde',
      startDate: '2023-07-05',
      endDate: '2023-07-10',
      duration: '5 days',
      price: 250,
      status: 'completed',
      color: 'Red'
    },
    {
      id: 3,
      bikeName: 'Speedster X',
      bikeImage: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8',
      startDate: '2023-08-15',
      endDate: '2023-08-20',
      duration: '5 days',
      price: 300,
      status: 'active',
      color: 'Black'
    },
    {
      id: 4,
      bikeName: 'Vintage Ride',
      bikeImage: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7',
      startDate: '2023-08-22',
      endDate: null,
      duration: 'Cancelled',
      price: 0,
      status: 'cancelled',
      color: 'Green'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setTimeout(() => {
        setRentals(sampleRentals);
        setFilteredRentals(sampleRentals);
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredRentals(rentals);
    } else {
      setFilteredRentals(rentals.filter(rental => rental.status === statusFilter));
    }
  }, [statusFilter, rentals]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800',
      active: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };

    const statusIcons = {
      completed: <FiCheckCircle className="mr-1" />,
      active: <FiClock className="mr-1" />,
      cancelled: <FiXCircle className="mr-1" />,
      pending: <FiClock className="mr-1" />
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {statusIcons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/user/${user.id}`);
        const userData = res.data;
        setUser({
          id: userData._id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          joinDate: userData.joinDate || 'N/A',
          membership: userData.membership || 'Standard'
        });
        setFormData({
          id: userData._id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          joinDate: userData.joinDate || 'N/A',
          membership: userData.membership || 'Standard'
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
  
    fetchUserData();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
            <p className="text-gray-600 mt-1">
              {activeTab === 'profile' ? 'Manage your account' : 'View your rental history'}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="inline-flex rounded-lg bg-white p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'history' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Rental History
              </button>
            </div>
          </div>
        </div>
  
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <FiEdit size={16} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
  
            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">Personal Information</h3>
                  <div className="space-y-2 divide-y divide-gray-100">
                    <InfoRow label="Full Name" value={user.name} />
                    <InfoRow label="Email" value={user.email} />
                    <InfoRow label="Phone" value={user.phone} />
                    <InfoRow label="Address" value={user.address} />
                  </div>
                </div>
  
                {/* Account Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">Account Details</h3>
                  <div className="space-y-2 divide-y divide-gray-100">
                    <InfoRow label="Membership" value={user.membership} />
                    <InfoRow label="Member Since" value={formatDate(user.joinDate)} />
                  </div>
  
                  {/* Rental Statistics */}
                  <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800">Rental Statistics</h4>
                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div className="bg-white p-3 rounded-lg shadow-xs text-center">
                        <p className="text-2xl font-bold text-blue-800">{rentals.length}</p>
                        <p className="text-xs text-gray-500">Total Rentals</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-xs text-center">
                        <p className="text-2xl font-bold text-blue-800">
                          {rentals.filter(r => r.status === 'completed').length}
                        </p>
                        <p className="text-xs text-gray-500">Completed</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-xs text-center">
                        <p className="text-2xl font-bold text-blue-800">
                          {rentals.filter(r => r.status === 'active').length}
                        </p>
                        <p className="text-xs text-gray-500">Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information Form */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">Personal Information</h3>
  
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
  
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
  
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
  
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
  
                  {/* Submit Button */}
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
  
        {/* Rental History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">Rental History</h2>
                  <p className="text-gray-600 mt-1">
                    {filteredRentals.length} {filteredRentals.length === 1 ? 'rental' : 'rentals'} found
                  </p>
                </div>
                <div className="mt-4 md:mt-0 relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <FiFilter size={16} />
                    Filter: {statusFilter === 'all' ? 'All Statuses' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    <FiChevronDown size={16} />
                  </button>
                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setStatusFilter('all');
                            setIsFilterOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            statusFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          All Statuses
                        </button>
                        <button
                          onClick={() => {
                            setStatusFilter('completed');
                            setIsFilterOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            statusFilter === 'completed' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          Completed
                        </button>
                        <button
                          onClick={() => {
                            setStatusFilter('active');
                            setIsFilterOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            statusFilter === 'active' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          Active
                        </button>
                        <button
                          onClick={() => {
                            setStatusFilter('cancelled');
                            setIsFilterOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            statusFilter === 'cancelled' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          Cancelled
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
  
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your rentals...</p>
              </div>
            ) : filteredRentals.length === 0 ? (
              <div className="p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FiUser className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">No rentals found</h3>
                <p className="text-gray-500 mt-1 mb-4">
                  {statusFilter === 'all' 
                    ? "You haven't made any rentals yet." 
                    : `You don't have any ${statusFilter} rentals.`}
                </p>
                <button
                  onClick={() => window.location.href = '/bikes'}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Browse Bicycles
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredRentals.map(rental => (
                  <div key={rental.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 text-2xl">🚴</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {rental.bikeName}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FiClock className="mr-1" />
                              {formatDate(rental.startDate)} - {rental.endDate ? formatDate(rental.endDate) : 'N/A'}
                            </span>
                            <span>Duration: {rental.duration}</span>
                            <span>Color: {rental.color}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col items-end">
                        <div className="mb-2">
                          {getStatusBadge(rental.status)}
                        </div>
                        <div className="text-lg font-semibold text-blue-600">
                          {rental.price > 0 ? formatCurrency(rental.price) : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalHistory;