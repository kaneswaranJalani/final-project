import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheck, FiX, FiClock, FiUser, FiMail, FiPhone, FiHome, FiBriefcase } from 'react-icons/fi';

const PartnerVerification = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingPartners();
  }, []);

  const fetchPendingPartners = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/auth/partners/pending');
      setPartners(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load pending partners');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (partnerId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/verify-partner/${partnerId}`, { status });
      fetchPendingPartners(); // Refresh the list
    } catch (err) {
      alert('Failed to update partner status');
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Partner Verification</h2>
        <button 
          onClick={fetchPendingPartners}
          className="flex items-center text-sm text-[#67103d] hover:text-[#50052c]"
        >
          <FiClock className="mr-1" size={14} /> Refresh
        </button>
      </div>
      
      {loading ? (
        <div className="p-8 text-center text-gray-500">Loading pending partners...</div>
      ) : error ? (
        <div className="p-8 text-center text-red-500">{error}</div>
      ) : partners.length === 0 ? (
        <div className="p-8 text-center text-gray-500">No pending partner verifications</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partners.map((partner) => (
                <tr key={partner._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#67103d] flex items-center justify-center text-white">
                        <FiUser size={18} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                        <div className="text-sm text-gray-500">{partner.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{partner.phone}</div>
                    <div className="text-sm text-gray-500">{partner.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{partner.businessName}</div>
                    <div className="text-sm text-gray-500">{partner.businessType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {partner.documents && partner.documents.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {partner.documents.map((doc, index) => (
                          <a 
                            key={index} 
                            href={doc.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-[#67103d]"
                          >
                            {doc.type}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">No documents</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleVerification(partner._id, 'approved')}
                        className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-md flex items-center"
                      >
                        <FiCheck className="mr-1" /> Approve
                      </button>
                      <button
                        onClick={() => handleVerification(partner._id, 'rejected')}
                        className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded-md flex items-center"
                      >
                        <FiX className="mr-1" /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PartnerVerification;