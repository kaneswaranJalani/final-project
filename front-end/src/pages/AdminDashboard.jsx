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
      {/* Sidebar */}
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

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-[#67103d] capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg bg-gray-50"
              />
            </div>
            <FiBell className="text-gray-500" />
          </div>
        </header>

        <section className="p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="backdrop-blur-lg bg-white/60 p-6 rounded-xl shadow-lg border">
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

          {/* Users */}
          {activeTab === 'users' && (
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4 text-[#67103d]">User List</h2>
              {loading ? <p>Loading...</p> : error ? <p className="text-red-600">{error}</p> : (
                <ul className="space-y-4">
                  {users.map((user, i) => (
                    <li key={i} className="p-4 border rounded-md flex justify-between items-center bg-white/70">
                      <div>
                        <p className="font-medium text-[#333]">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">Role: {user.role}</p>
                      </div>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="border px-2 py-1 rounded text-sm"
                      >
                        <option value="user">User</option>
                        <option value="partner">Partner</option>
                        <option value="admin">Admin</option>
                      </select>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4 text-[#67103d]">Order List</h2>
              {loading ? <p>Loading...</p> : error ? <p className="text-red-600">{error}</p> : (
                <ul className="space-y-4">
                  {orders.map((order, i) => (
                    <li key={i} className="p-4 border rounded-md flex justify-between items-center bg-white/70">
                      <div>
                        <p className="font-semibold text-[#67103d]">{order.name}</p>
                        <p className="text-sm text-gray-600">Color: {order.color}</p>
                        <p className="text-sm text-gray-600">Price: Rs. {order.price}</p>
                      </div>
                      <select
                        value={order.status || 'Pending'}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="border px-3 py-1 rounded text-sm bg-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Payments */}
          {activeTab === 'payment' && (
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4 text-[#67103d]">Payment List</h2>
              {loading ? <p>Loading...</p> : error ? <p className="text-red-600">{error}</p> : (
                <ul className="space-y-4">
                  {payments.map((payment, i) => (
                    <li key={i} className="p-4 border rounded-md flex justify-between items-center bg-white/70">
                      <div>
                        <p className="font-semibold text-[#67103d]">{payment.bikeName}</p>
                        <p className="text-sm text-gray-600">Amount: Rs. {payment.amount}</p>
                        <p className="text-sm text-gray-600">Color: {payment.color}</p>
                      </div>
                      <select
                        value={payment.status || 'Paid'}
                        onChange={(e) => handlePaymentStatusChange(payment._id, e.target.value)}
                        className="border px-3 py-1 rounded text-sm bg-white"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
