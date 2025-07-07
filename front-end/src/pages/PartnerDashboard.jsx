import { Link } from 'react-router-dom';
import { useState } from 'react';

const PartnerDashboard = () => {
  const partnerInfo = {
    name: "City Bikes Co.",
    email: "contact@citybikesco.com",
    phone: "+1 (555) 123-4567",
    address: "123 Cycling Ave, Portland, OR 97201",
    joinDate: "2023-05-15",
    totalListings: 24,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1025&q=80"
  };

  const [bicycles, setBicycles] = useState([
    {
      _id: "1",
      type: "Mountain",
      model: "X-200",
      price: 1500,
      stock: 5,
      status: "Available",
      lastUpdate: "2025-07-01"
    },
    {
      _id: "2",
      type: "Road",
      model: "Speedster",
      price: 1800,
      stock: 2,
      status: "Low Stock",
      lastUpdate: "2025-06-25"
    }
  ]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bicycle?")) {
      setBicycles(prev => prev.filter(b => b._id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setBicycles(prev =>
      prev.map(b =>
        b._id === id ? { ...b, status: newStatus, lastUpdate: new Date().toISOString() } : b
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#67103d]">🚴 Partner Dashboard</h1>
        <p className="text-gray-600">Welcome back, {partnerInfo.name}!</p>
      </div>

      {/* Partner Info */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-10 max-w-3xl mx-auto">
        <div className="flex items-center gap-6">
          <img src={partnerInfo.image} alt="Partner" className="w-20 h-20 rounded-xl object-cover" />
          <div>
            <Link
              to="/partner-details"
              state={{ partner: partnerInfo }}
              className="text-2xl font-semibold text-[#67103d] hover:underline"
            >
              {partnerInfo.name}
            </Link>
            <p className="text-gray-600 text-sm">{partnerInfo.email} • {partnerInfo.phone}</p>
            <p className="text-gray-500 text-sm">{partnerInfo.address}</p>
          </div>
        </div>
      </div>

      {/* Bicycle Table */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-[#67103d] mb-4">📋 Bicycle Inventory</h2>

        {bicycles.length === 0 ? (
          <p className="text-gray-500 italic">No bicycles available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#67103d] text-white">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Model</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Last Update</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bicycles.map(bike => (
                  <tr key={bike._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{bike._id}</td>
                    <td className="px-4 py-3">{bike.type}</td>
                    <td className="px-4 py-3">{bike.model}</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">Rs. {bike.price.toFixed(2)}</td>
                    <td className="px-4 py-3">{bike.stock}</td>
                    <td className="px-4 py-3">
                      <select
                        value={bike.status}
                        onChange={(e) => handleStatusChange(bike._id, e.target.value)}
                        className={`px-2 py-1 rounded-md text-xs font-medium border ${
                          bike.status === 'Available' ? 'bg-green-100 text-green-800' :
                          bike.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="Available">Available</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(bike.lastUpdate)}</td>
                    <td className="px-4 py-3 space-x-2">
                      <Link
                        to={`/bicycles/edit/${bike._id}`}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(bike._id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerDashboard;
