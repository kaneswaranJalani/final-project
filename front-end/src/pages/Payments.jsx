import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiRefreshCw } from 'react-icons/fi';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/payments/all');
      setPayments(res.data);
      setError(null);
    } catch {
      setError('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Payments</h2>
        <button 
          onClick={fetchPayments}
          className="flex items-center text-sm text-[#67103d] hover:text-[#50052c]"
        >
          <FiRefreshCw className="mr-1" size={14} /> Refresh
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.bikeName || payment.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.color}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs. {payment.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-[#67103d] hover:text-[#50052c]" title="Edit payment">
                    <FiEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;