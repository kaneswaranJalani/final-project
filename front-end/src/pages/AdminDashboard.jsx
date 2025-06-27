import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiHome, FiUsers, FiSettings, FiPieChart, FiShoppingCart,
  FiBell, FiSearch, FiMenu,
  FiUser, FiDollarSign, FiTrendingUp, FiShoppingBag
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user');
      setUsers(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load orders');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleUpdate = (id) => {
    alert(`Update functionality for user ${id} is not implemented yet.`);
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (err) {
      setError('Failed to delete order');
    }
  };

  const handleUpdateOrder = (id) => {
    alert(`Update functionality for order ${id} is not implemented yet.`);
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/user/${userId}`, { role: newRole });
      setUsers(users.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      alert("Failed to update role");
    }
  };

  const stats = [
    { title: 'Total Users', value: users.length.toString(), change: '+12%', trend: 'up', icon: <FiUser size={24} /> },
    { title: 'Total Orders', value: orders.length.toString(), change: '+5%', trend: 'up', icon: <FiShoppingBag size={24} /> },
    { title: 'Revenue', value: '$34,245', change: '-2%', trend: 'down', icon: <FiDollarSign size={24} /> }
    // { title: 'Conversion', value: '3.6%', change: '+1.2%', trend: 'up', icon: <FiTrendingUp size={24} /> }
  ];

  const menuItems = [
    { icon: <FiHome />, name: 'Dashboard', key: 'dashboard' },
    { icon: <FiUsers />, name: 'Users', key: 'users' },
    { icon: <FiShoppingCart />, name: 'Orders', key: 'orders' },
    { icon: <FiPieChart />, name: 'Analytics', key: 'analytics' },
    { icon: <FiSettings />, name: 'Settings', key: 'settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">AdminPanel</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}><FiMenu /></button>
        </div>
        <nav className="mt-8">
          {menuItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center w-full p-4 ${activeTab === item.key ? 'bg-indigo-100' : 'hover:bg-indigo-100'}`}
            >
              <span>{item.icon}</span>
              {sidebarOpen && <span className="ml-3">{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow p-4 flex justify-between">
          <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-2 text-gray-400" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border rounded-lg" />
            </div>
            <FiBell className="text-gray-600" />
          </div>
        </header>

        <main className="p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow">
                  <div className="flex items-center space-x-3">
                    <div className="text-indigo-600">{stat.icon}</div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</span>
                </div>
              ))}
            </div>
          )}

          {/* Users */}
          {activeTab === 'users' && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">User List</h2>
              {error ? <p className="text-red-600">{error}</p> : (
                <ul>
                  {users.map((user, i) => (
                    <li key={i} className="mb-2 p-4 border rounded flex justify-between items-center">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-400">Role: {user.role}</p>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="border px-2 py-1 rounded text-sm"
                        >
                          <option value="user">User</option>
                          <option value="partner">Partner</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button
                          onClick={() => handleUpdate(user._id)}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Order List</h2>
              {error ? <p className="text-red-600">{error}</p> : (
                <ul>
                  {orders.map((order, i) => (
                    <li key={i} className="mb-2 p-4 border rounded flex justify-between items-center">
                      <div>
                        <p className="font-medium">#{order._id}</p>
                        <p className="text-sm text-gray-500">{order.customerName} - ${order.amount}</p>
                        <p className="text-sm text-gray-500">Status: {order.status}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateOrder(order._id)}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
