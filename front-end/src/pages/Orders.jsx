import { useState, useEffect } from 'react';
import { FiEdit, FiRefreshCw, FiMail, FiChevronDown, FiEye } from 'react-icons/fi';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const orderStatusOptions = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];

  const dummyOrders = [
    {
      _id: 'abc123',
      bikeId: 'bike001',
      bikeName: 'Hero Sprint Pro',
      color: 'Red',
      price: 1200,
      status: 'Pending',
      customerName: 'Rahul Sharma',
      startTime: '2023-06-15T10:00:00',
      endTime: '2023-06-17T18:00:00',
      userIdProof: 'https://example.com/id-proof/rahul.jpg',
      userPhoto: 'https://example.com/photos/rahul.jpg'
    },
    {
      _id: 'def456',
      bikeId: 'bike002',
      bikeName: 'Yamaha MT15',
      color: 'Black',
      price: 1800,
      status: 'Confirmed',
      customerName: 'Priya Patel',
      startTime: '2023-06-18T09:00:00',
      endTime: '2023-06-20T17:00:00',
      userIdProof: 'https://example.com/id-proof/priya.jpg',
      userPhoto: 'https://example.com/photos/priya.jpg'
    },
    {
      _id: 'ghi789',
      bikeId: 'bike003',
      bikeName: 'TVS Apache',
      color: 'Blue',
      price: 1500,
      status: 'Completed',
      customerName: 'Amit Singh',
      startTime: '2023-06-10T11:00:00',
      endTime: '2023-06-12T19:00:00',
      userIdProof: 'https://example.com/id-proof/amit.jpg',
      userPhoto: 'https://example.com/photos/amit.jpg'
    },
    {
      _id: 'jkl012',
      bikeId: 'bike004',
      bikeName: 'Royal Enfield',
      color: 'Black',
      price: 2500,
      status: 'Cancelled',
      customerName: 'Neha Gupta',
      startTime: '2023-06-05T09:00:00',
      endTime: '2023-06-07T17:00:00',
      userIdProof: 'https://example.com/id-proof/neha.jpg',
      userPhoto: 'https://example.com/photos/neha.jpg'
    }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    setTimeout(() => {
      setOrders(dummyOrders);
      setLoading(false);
    }, 500);
  };

  const handleOrderStatusChange = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => (o._id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const sendOrderEmail = (order) => {
    alert(`Simulated: Email sent to customer ${order.customerName} for order ${order._id}`);
  };

  const formatDateTime = (dateTimeString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleString('en-US', options);
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter(order => 
    activeTab === 'pending' 
      ? ['Pending', 'Confirmed'].includes(order.status)
      : order.status === 'Completed'
  );

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-b-2 border-[#67103d] text-[#67103d]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Pending Rentals
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'completed'
                ? 'border-b-2 border-[#67103d] text-[#67103d]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Completed Rentals
          </button>
        </div>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order._id.substring(0, 6).toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.bikeId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.bikeName} ({order.color})
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDateTime(order.startTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDateTime(order.endTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs. {order.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {activeTab === 'pending' ? (
                    <div className="relative">
                      <select
                        value={order.status}
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
                  ) : (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  <button 
                    onClick={() => sendOrderEmail(order)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Send status email"
                  >
                    <FiMail />
                  </button>
                  <button 
                    onClick={() => openModal(order)}
                    className="text-green-600 hover:text-green-800"
                    title="View documents"
                  >
                    <FiEye />
                  </button>
                  <button 
                    className="text-[#67103d] hover:text-[#50052c]" 
                    title="Edit order"
                  >
                    <FiEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing documents */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Documents for Order #{selectedOrder._id.substring(0, 6).toUpperCase()}
                </h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Customer: {selectedOrder.customerName}</h4>
                  <p className="text-sm text-gray-500">Bike: {selectedOrder.bikeName} ({selectedOrder.bikeId})</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">ID Proof</h4>
                    <img 
                      src={selectedOrder.userIdProof} 
                      alt="ID Proof" 
                      className="w-full h-auto rounded border border-gray-200"
                    />
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Customer Photo</h4>
                    <img 
                      src={selectedOrder.userPhoto} 
                      alt="Customer" 
                      className="w-full h-auto rounded border border-gray-200"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-[#67103d] text-white rounded hover:bg-[#50052c] transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;