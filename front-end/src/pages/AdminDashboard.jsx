import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiHome, FiUsers, FiSettings, FiPieChart, FiShoppingCart,
  FiBell, FiSearch, FiMenu, FiUser, FiDollarSign, FiShoppingBag
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'payment') fetchPayments();
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/user');
      setUsers(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/bike/all');
      setOrders(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/payments/all');
      setPayments(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/user/${userId}`, { role: newRole });
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      alert("❌ Failed to update role");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/bike/status/${orderId}`, { status: newStatus });
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert("❌ Failed to update order status");
    }
  };

  const handlePaymentStatusChange = async (paymentId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/payments/status/${paymentId}`, { status: newStatus });
      setPayments(prev => prev.map(p => p._id === paymentId ? { ...p, status: newStatus } : p));
    } catch (err) {
      alert("❌ Failed to update payment status");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${userId}`);
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      alert("❌ Failed to delete user");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bike/${orderId}`);
      setOrders(prev => prev.filter(o => o._id !== orderId));
    } catch (err) {
      alert("❌ Failed to delete order");
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/payments/${paymentId}`);
      setPayments(prev => prev.filter(p => p._id !== paymentId));
    } catch (err) {
      alert("❌ Failed to delete payment");
    }
  };

  const totalRevenue = payments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

  const stats = [
    { title: 'Total Users', value: users.length.toString(), icon: <FiUser size={24} /> },
    { title: 'Total Orders', value: orders.length.toString(), icon: <FiShoppingBag size={24} /> },
    { title: 'Revenue', value: `Rs. ${totalRevenue}`, icon: <FiDollarSign size={24} /> }
  ];

  const menuItems = [
    { icon: <FiHome />, name: 'Dashboard', key: 'dashboard' },
    { icon: <FiUsers />, name: 'Users', key: 'users' },
    { icon: <FiShoppingCart />, name: 'Orders', key: 'orders' },
    { icon: <FiPieChart />, name: 'Payment', key: 'payment' },
    { icon: <FiSettings />, name: 'Settings', key: 'settings' }
  ];

  return (
    <div className="flex h-screen font-sans bg-gradient-to-br from-slate-100 to-white">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-white shadow-md`}>
        <div className="p-4 flex items-center justify-between border-b">
          {sidebarOpen && <h1 className="text-2xl font-bold text-[#67103d]">Admin</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}><FiMenu /></button>
        </div>
        <nav className="mt-8">
          {menuItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center w-full p-4 text-gray-700 hover:bg-[#f3f0f4] transition ${
                activeTab === item.key ? 'bg-[#e5e1e7] font-semibold' : ''
              }`}
            >
              <span>{item.icon}</span>
              {sidebarOpen && <span className="ml-3">{item.name}</span>}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-[#67103d] capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border rounded-lg bg-gray-50" />
            </div>
            <FiBell className="text-gray-500" />
          </div>
        </header>

        <section className="p-6">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow border">
                  <div className="flex items-center gap-3">
                    <div className="text-[#67103d]">{stat.icon}</div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {['users', 'orders', 'payment'].includes(activeTab) && (
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4 text-[#67103d]">{activeTab === 'users' ? 'User List' : activeTab === 'orders' ? 'Order List' : 'Payment List'}</h2>
              {loading ? <p>Loading...</p> : error ? <p className="text-red-600">{error}</p> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border">
                    <thead className="bg-[#f3f0f4] text-gray-700">
                      <tr>
                        {activeTab === 'users' && (<><th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Role</th><th className="p-2">Actions</th></>)}
                        {activeTab === 'orders' && (<><th className="p-2">Name</th><th className="p-2">Color</th><th className="p-2">Price</th><th className="p-2">Status</th><th className="p-2">Actions</th></>)}
                        {activeTab === 'payment' && (<><th className="p-2">Bike</th><th className="p-2">Color</th><th className="p-2">Amount</th><th className="p-2">Status</th><th className="p-2">Actions</th></>)}
                      </tr>
                    </thead>
                    <tbody>
                      {(activeTab === 'users' ? users : activeTab === 'orders' ? orders : payments).map((item, i) => (
                        <tr key={i} className="border-t hover:bg-gray-50">
                          {activeTab === 'users' && (
                            <>
                              <td className="p-2">{item.name}</td>
                              <td className="p-2">{item.email}</td>
                              <td className="p-2">
                                <select
                                  value={item.role}
                                  onChange={(e) => handleRoleChange(item._id, e.target.value)}
                                  className="border px-2 py-1 rounded text-sm"
                                >
                                  <option value="user">User</option>
                                  <option value="partner">Partner</option>
                                  <option value="admin">Admin</option>
                                </select>
                              </td>
                              <td className="p-2">
                                <button onClick={() => handleDeleteUser(item._id)} className="text-red-600 text-sm px-3 py-1 border border-red-300 rounded hover:bg-red-50">🗑️</button>
                              </td>
                            </>
                          )}
                          {activeTab === 'orders' && (
                            <>
                              <td className="p-2 font-medium text-[#67103d]">{item.name}</td>
                              <td className="p-2">{item.color}</td>
                              <td className="p-2">Rs. {item.price}</td>
                              <td className="p-2">
                                <select
                                  value={item.status || 'Pending'}
                                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                                  className="border px-2 py-1 rounded text-sm bg-white"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="p-2">
                                <button onClick={() => handleDeleteOrder(item._id)} className="text-red-600 text-sm px-3 py-1 border border-red-300 rounded hover:bg-red-50">🗑️</button>
                              </td>
                            </>
                          )}
                          {activeTab === 'payment' && (
                            <>
                              <td className="p-2 font-medium text-[#67103d]">{item.bikeName}</td>
                              <td className="p-2">{item.color}</td>
                              <td className="p-2">Rs. {item.amount}</td>
                              <td className="p-2">
                                <select
                                  value={item.status || 'Paid'}
                                  onChange={(e) => handlePaymentStatusChange(item._id, e.target.value)}
                                  className="border px-2 py-1 rounded text-sm bg-white"
                                >
                                  <option value="Paid">Paid</option>
                                  <option value="Failed">Failed</option>
                                  <option value="Refunded">Refunded</option>
                                </select>
                              </td>
                              <td className="p-2">
                                <button onClick={() => handleDeletePayment(item._id)} className="text-red-600 text-sm px-3 py-1 border border-red-300 rounded hover:bg-red-50">🗑️</button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
