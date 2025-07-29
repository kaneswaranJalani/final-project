import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiRefreshCw, FiMail, FiChevronDown } from 'react-icons/fi';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const orderStatusOptions = ['Pending', 'Confirmed', 'Cancelled'];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/bike/all');
      setOrders(res.data);
      setError(null);
    } catch {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/bike/${orderId}`, { status: newStatus });
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch {
      alert("Failed to update order status");
    }
  };

  const sendOrderEmail = (order) => {
    alert(`Email would be sent to customer about order status update.`);
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Orders</h2>
        <button 
          onClick={fetchOrders}
          className="flex items-center text-sm text-[#67103d] hover:text-[#50052c]"
        >
          <FiRefreshCw className="mr-1" size={14} /> Refresh
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order._id.substring(0, 6).toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.bikeName || order.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.color}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs. {order.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="relative">
                    <select
                      value={order.status || 'Pending'}
                      onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-[#67103d] focus:border-[#67103d]"
                    >
                      {orderStatusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FiChevronDown className="fill-current h-4 w-4" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => sendOrderEmail(order)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                    title="Send status email"
                  >
                    <FiMail />
                  </button>
                  <button className="text-[#67103d] hover:text-[#50052c]" title="Edit order">
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

export default Orders;