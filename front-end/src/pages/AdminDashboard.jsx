import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiHome, FiUsers, FiSettings, FiPieChart, FiShoppingCart,
  FiBell, FiSearch, FiMenu, FiUser, FiDollarSign, FiShoppingBag, 
  FiChevronDown, FiTrash2, FiEdit, FiRefreshCw
} from 'react-icons/fi';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { RiUserStarLine } from "react-icons/ri";
Chart.register(...registerables);

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    monthlyGrowth: 12.5 // percentage (static here, can be dynamic)
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'payment') fetchPayments();
  }, [activeTab]);

  // Fetch dashboard aggregate data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [usersRes, ordersRes, paymentsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/auth/all'),
        axios.get('http://localhost:5000/api/bike/all'),
        axios.get('http://localhost:5000/api/payments/all')
      ]);
      
      setUsers(usersRes.data);
      setOrders(ordersRes.data);
      setPayments(paymentsRes.data);
      
      // Calculate total revenue correctly
      const totalRevenue = paymentsRes.data.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
      setStats({
        totalUsers: usersRes.data.length,
        totalOrders: ordersRes.data.length,
        totalRevenue,
        monthlyGrowth: 12.5
      });
      
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch users for users tab
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/auth/all');
      setUsers(res.data);
      setError(null);
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders for orders tab
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

  // Fetch payments for payment tab
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

  // Handle user role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/${userId}`, { role: newRole });
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch {
      alert(" Failed to update role");
    }
  };

  // Handle user delete
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/auth/${userId}`);
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch {
      alert(" Failed to delete user");
    }
  };

  //Fetch partners
  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/partners/pending');
      setPartners(res.data);
      setError(null);
    } catch {
      setError('Failed to load partners');
    } finally {
      setLoading(false);
    }
  };

  //Update partner status
  const updatePartnerStatus = async (partnerId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/partners/${partnerId}/status`, { status });
      setPartners(prev => prev.filter(p => p._id !== partnerId));
    } catch (err) {
      alert("Failed to update partner status");
    }
  };

  // You can add similar handlers for orders and payments if needed

  // Chart data configurations (same as you provided)
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'New Users',
        data: [15, 29, 32, 41, 56, 72, 89],
        backgroundColor: 'rgba(103, 16, 61, 0.8)',
        borderColor: 'rgba(103, 16, 61, 1)',
        borderWidth: 1,
      },
    ],
  };

  const orderStatusData = {
    labels: ['Completed', 'Pending', 'Cancelled'],
    datasets: [
      {
        data: [65, 15, 20],
        backgroundColor: [
          'rgba(103, 16, 61, 0.8)',
          'rgba(255, 193, 7, 0.8)',
          'rgba(220, 53, 69, 0.8)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue (Rs.)',
        data: [12500, 19000, 15000, 21000, 25000, 23000, 28000],
        fill: true,
        backgroundColor: 'rgba(103, 16, 61, 0.2)',
        borderColor: 'rgba(103, 16, 61, 1)',
        tension: 0.4,
      },
    ],
  };

  const menuItems = [
    { icon: <FiHome />, name: 'Dashboard', key: 'dashboard' },
    { icon: <FiUsers />, name: 'Users', key: 'users' },
    { icon: <FiShoppingCart />, name: 'Orders', key: 'orders' },
    { icon: <FiPieChart />, name: 'Payments', key: 'payment' },
    { icon: <RiUserStarLine/>, name: 'Partners', key: 'partners' },
    { icon: <FiSettings />, name: 'Settings', key: 'settings' }
    

  ];

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-[#67103d] text-white`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {sidebarOpen && <h1 className="text-xl font-bold">Admin Portal</h1>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:text-white/80 transition"
          >
            <FiMenu size={20} />
          </button>
        </div>
        <nav className="mt-6">
          {menuItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center w-full p-4 transition ${
                activeTab === item.key 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="ml-3">{item.name}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {activeTab === 'dashboard' ? 'Overview' : activeTab}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#67103d]/50 focus:border-transparent"
              />
            </div>
            <button className="relative text-gray-500 hover:text-gray-700">
              <FiBell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#67103d] flex items-center justify-center text-white">
                <FiUser size={16} />
              </div>
              {sidebarOpen && (
                <>
                  <span className="text-sm font-medium">Admin</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Users</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalUsers}</h3>
                      <p className="text-xs text-green-500 mt-1">↑ {stats.monthlyGrowth}% from last month</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#67103d]/10 text-[#67103d]">
                      <FiUser size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Orders</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalOrders}</h3>
                      <p className="text-xs text-green-500 mt-1">↑ 8.2% from last month</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                      <FiShoppingBag size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Revenue</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">Rs. {stats.totalRevenue}</h3>
                      <p className="text-xs text-green-500 mt-1">↑ 15.3% from last month</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-100 text-green-600">
                      <FiDollarSign size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Active Now</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">42</h3>
                      <p className="text-xs text-green-500 mt-1">↑ 3.2% from yesterday</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                      <FiUsers size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
                  <div className="h-64">
                    <Bar 
                      data={userGrowthData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
                  <div className="h-64">
                    <Pie 
                      data={orderStatusData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
                  <div className="h-80">
                    <Line 
                      data={revenueData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users/Orders/Payments Tables */}
          {['users', 'orders', 'payment'].includes(activeTab) && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 capitalize">
                  {activeTab === 'users' ? 'Users' : activeTab === 'orders' ? 'Orders' : 'Payments'}
                </h2>
                <button 
                  onClick={activeTab === 'users' ? fetchUsers : activeTab === 'orders' ? fetchOrders : fetchPayments}
                  className="flex items-center text-sm text-[#67103d] hover:text-[#50052c]"
                >
                  <FiRefreshCw className="mr-1" size={14} /> Refresh
                </button>
              </div>
              
              {loading ? (
                <div className="p-8 text-center text-gray-500">Loading...</div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">{error}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {activeTab === 'users' && (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </>
                        )}
                        {activeTab === 'orders' && (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </>
                        )}
                        {activeTab === 'payment' && (
                          <>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bike</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(activeTab === 'users' ? users : activeTab === 'orders' ? orders : payments).map((item, i) => (
                        <tr key={item._id || i} className="hover:bg-gray-50">
                          {activeTab === 'users' && (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name || `${item.firstName} ${item.lastName}`}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <select
                                  value={item.role}
                                  onChange={(e) => handleRoleChange(item._id, e.target.value)}
                                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#67103d] focus:border-[#67103d] sm:text-sm rounded-md"
                                >
                                  <option value="user">User</option>
                                  <option value="partner">Partner</option>
                                  <option value="admin">Admin</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button 
                                  onClick={() => handleDeleteUser(item._id)}
                                  className="text-red-600 hover:text-red-900 mr-3"
                                  title="Delete user"
                                >
                                  <FiTrash2 />
                                </button>
                                <button className="text-[#67103d] hover:text-[#50052c]" title="Edit user">
                                  <FiEdit />
                                </button>
                              </td>
                            </>
                          )}
                          {activeTab === 'orders' && (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.bikeName || item.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.color}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {/* You can add order actions here */}
                                <button className="text-[#67103d] hover:text-[#50052c]" title="Edit order">
                                  <FiEdit />
                                </button>
                              </td>
                            </>
                          )}
                          {activeTab === 'payment' && (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.bikeName || item.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.color}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {/* You can add payment actions here */}
                                <button className="text-[#67103d] hover:text-[#50052c]" title="Edit payment">
                                  <FiEdit />
                                </button>
                              </td>
                            </>
                          )}
                          {/* Partner Approval Tab */}
        {activeTab === 'partners' && (
          <section className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Partner Requests</h2>
                <button 
                  onClick={fetchPartners}
                  className="flex items-center text-sm text-[#67103d] hover:text-[#50052c]"
                >
                  <FiRefreshCw className="mr-1" size={14} /> Refresh
                </button>
              </div>
              {loading ? (
                <div className="p-8 text-center text-gray-500">Loading...</div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">{error}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {partners.map((partner) => (
                        <tr key={partner._id}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{partner.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{partner.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{partner.phone}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{partner.businessName}</td>
                          <td className="px-6 py-4 text-sm">
                            <button
                              onClick={() => updatePartnerStatus(partner._id, 'approved')}
                              className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updatePartnerStatus(partner._id, 'rejected')}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                      {partners.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center py-6 text-gray-400">No partner requests found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
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
