import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiRefreshCw } from 'react-icons/fi';

const Partners = () => {
  const [partnersAll, setPartnersAll] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch partners on mount
  useEffect(() => {
    fetchPartnersAll();
  }, []);

  // Fetch all partners
  const fetchPartnersAll = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/admin/partners/all');
      setPartnersAll(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch all partners.");
    } finally {
      setLoading(false);
    }
  };

  // Approve/Reject partner
  const updatePartnerStatus = async (partnerId, status) => {
    try {
      const confirm = window.confirm(`Are you sure you want to ${status} this partner?`);
      if (!confirm) return;

      await axios.put(`http://localhost:5000/api/admin/partners/verify/${partnerId}`, { status });
      fetchPartnersAll(); // Refresh list
      alert(`Partner ${status} successfully and notified via email.`);
    } catch (err) {
      console.error("Partner status update error:", err);
      alert("Failed to update partner status");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800">Partners Management</h2>
        <button
          onClick={fetchPartnersAll}
          className="flex items-center gap-2 text-sm font-medium text-[#67103d] hover:text-[#50052c]"
        >
          <FiRefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Approved Partners */}
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-green-700 mb-3">Approved Partners</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#f0fdf4] text-green-700 text-xs uppercase">
              <tr>
                {['Name', 'Email', 'Phone', 'NIC', 'Business', 'Type', 'Area', 'Tier', 'Years', 'Details'].map((heading, i) => (
                  <th key={i} className="px-4 py-3 text-left font-medium">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {partnersAll.filter(p => p.status === 'approved').map((partner) => (
                <tr key={partner._id} className="hover:bg-gray-50 text-sm">
                  <td className="px-4 py-2 font-semibold text-gray-900">{partner.name}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.email}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.phone}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.nic}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.businessName}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.businessType}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.rentalArea}</td>
                  <td className="px-4 py-2 text-gray-600 capitalize">{partner.partnerTier}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.yearsInBusiness}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.additionalDetails}</td>
                </tr>
              ))}
              {partnersAll.filter(p => p.status === 'approved').length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center py-6 text-gray-400">No approved partners found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="px-6 py-4 border-t border-gray-100">
        <h3 className="text-lg font-semibold text-yellow-700 mb-3">Pending Partner Requests</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#fffbea] text-yellow-700 text-xs uppercase">
              <tr>
                {['Name', 'Email', 'Phone', 'NIC', 'Business', 'Type', 'Area', 'Tier', 'Years', 'Details', 'Action'].map((heading, i) => (
                  <th key={i} className="px-4 py-3 text-left font-medium">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {partnersAll.filter(p => p.status === 'pending').map((partner) => (
                <tr key={partner._id} className="hover:bg-gray-50 text-sm">
                  <td className="px-4 py-2 font-semibold text-gray-900">{partner.name}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.email}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.phone}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.nic}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.businessName}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.businessType}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.rentalArea}</td>
                  <td className="px-4 py-2 text-gray-600 capitalize">{partner.partnerTier}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.yearsInBusiness}</td>
                  <td className="px-4 py-2 text-gray-600">{partner.additionalDetails}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <button
                      onClick={() => updatePartnerStatus(partner._id, 'approved')}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updatePartnerStatus(partner._id, 'rejected')}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {partnersAll.filter(p => p.status === 'pending').length === 0 && (
                <tr>
                  <td colSpan="11" className="text-center py-6 text-gray-400">No pending requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Partners;
