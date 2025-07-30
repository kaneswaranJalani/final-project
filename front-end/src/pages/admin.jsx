// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   FiHome, FiUsers, FiSettings, FiPieChart, FiShoppingCart,
//   FiBell, FiSearch, FiMenu, FiUser, FiDollarSign, FiShoppingBag, 
//   FiChevronDown, FiTrash2, FiEdit, FiRefreshCw
// } from 'react-icons/fi';
// import { Bar, Pie, Line } from 'react-chartjs-2';
// import { Chart, registerables } from 'chart.js';
// import { RiUserStarLine } from "react-icons/ri";
// Chart.register(...registerables);

// const AdminDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [users, setUsers] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [partners, setPartners] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalOrders: 0,
//     totalRevenue: 0,
//     monthlyGrowth: 12.5
//   });

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   useEffect(() => {
//     if (activeTab === 'users') fetchUsers();
//     if (activeTab === 'orders') fetchOrders();
//     if (activeTab === 'payment') fetchPayments();
//     if (activeTab === 'partners') fetchPartners();
//   }, [activeTab]);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     try {
//       const [usersRes, ordersRes, paymentsRes] = await Promise.all([
//         axios.get('http://localhost:5000/api/auth/all'),
//         axios.get('http://localhost:5000/api/bike/all'),
//         axios.get('http://localhost:5000/api/payments/all')
//       ]);

//       setUsers(usersRes.data);
//       setOrders(ordersRes.data);
//       setPayments(paymentsRes.data);

//       const totalRevenue = paymentsRes.data.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
//       setStats({
//         totalUsers: usersRes.data.length,
//         totalOrders: ordersRes.data.length,
//         totalRevenue,
//         monthlyGrowth: 12.5
//       });

//       setError(null);
//     } catch (err) {
//       setError('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:5000/api/auth/all');
//       setUsers(res.data);
//       setError(null);
//     } catch {
//       setError('Failed to load users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:5000/api/bike/all');
//       setOrders(res.data);
//       setError(null);
//     } catch {
//       setError('Failed to load orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPayments = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:5000/api/payments/all');
//       setPayments(res.data);
//       setError(null);
//     } catch {
//       setError('Failed to load payments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPartners = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:5000/api/partners/pending');
//       setPartners(res.data);
//       setError(null);
//     } catch {
//       setError('Failed to load partners');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRoleChange = async (userId, newRole) => {
//     try {
//       await axios.put(`http://localhost:5000/api/auth/${userId}`, { role: newRole });
//       setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
//     } catch {
//       alert(" Failed to update role");
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/auth/${userId}`);
//       setUsers(prev => prev.filter(u => u._id !== userId));
//     } catch {
//       alert(" Failed to delete user");
//     }
//   };

//   const updatePartnerStatus = async (partnerId, status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/partners/${partnerId}/status`, { status });
//       setPartners(prev => prev.filter(p => p._id !== partnerId));
//     } catch (err) {
//       alert("Failed to update partner status");
//     }
//   };

//   const menuItems = [
//     { icon: <FiHome />, name: 'Dashboard', key: 'dashboard' },
//     { icon: <FiUsers />, name: 'Users', key: 'users' },
//     { icon: <FiShoppingCart />, name: 'Orders', key: 'orders' },
//     { icon: <FiPieChart />, name: 'Payments', key: 'payment' },
//     { icon: <RiUserStarLine />, name: 'Partners', key: 'partners' },
//     { icon: <FiSettings />, name: 'Settings', key: 'settings' }
//   ];

//   return (
//     <div className="flex h-screen font-sans bg-gray-50">
//       {/* Sidebar */}
//       <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-[#67103d] text-white`}>
//         <div className="p-4 flex items-center justify-between border-b border-white/10">
//           {sidebarOpen && <h1 className="text-xl font-bold">Admin Portal</h1>}
//           <button 
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="text-white hover:text-white/80 transition"
//           >
//             <FiMenu size={20} />
//           </button>
//         </div>
//         <nav className="mt-6">
//           {menuItems.map(item => (
//             <button
//               key={item.key}
//               onClick={() => setActiveTab(item.key)}
//               className={`flex items-center w-full p-4 transition ${
//                 activeTab === item.key 
//                   ? 'bg-white/10 text-white' 
//                   : 'text-white/80 hover:bg-white/5 hover:text-white'
//               }`}
//             >
//               <span className="text-lg">{item.icon}</span>
//               {sidebarOpen && <span className="ml-3">{item.name}</span>}
//             </button>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-auto bg-gray-50">
//         {/* Header */}
//         <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
//           <h2 className="text-xl font-semibold text-gray-800 capitalize">
//             {activeTab === 'dashboard' ? 'Overview' : activeTab}
//           </h2>
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input 
//                 type="text" 
//                 placeholder="Search..." 
//                 className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#67103d]/50 focus:border-transparent"
//               />
//             </div>
//             <button className="relative text-gray-500 hover:text-gray-700">
//               <FiBell size={20} />
//               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 rounded-full bg-[#67103d] flex items-center justify-center text-white">
//                 <FiUser size={16} />
//               </div>
//               {sidebarOpen && (
//                 <>
//                   <span className="text-sm font-medium">Admin</span>
//                 </>
//               )}
//             </div>
//           </div>
//         </header>

//         {/* Partner Approval Tab */}
//         {activeTab === 'partners' && (
//           <section className="p-6">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//               <div className="p-5 border-b border-gray-100 flex justify-between items-center">
//                 <h2 className="text-lg font-semibold text-gray-800">Partner Requests</h2>
//                 <button 
//                   onClick={fetchPartners}
//                   className="flex items-center text-sm text-[#67103d] hover:text-[#50052c]"
//                 >
//                   <FiRefreshCw className="mr-1" size={14} /> Refresh
//                 </button>
//               </div>
//               {loading ? (
//                 <div className="p-8 text-center text-gray-500">Loading...</div>
//               ) : error ? (
//                 <div className="p-8 text-center text-red-500">{error}</div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {partners.map((partner) => (
//                         <tr key={partner._id}>
//                           <td className="px-6 py-4 text-sm font-medium text-gray-900">{partner.name}</td>
//                           <td className="px-6 py-4 text-sm text-gray-500">{partner.email}</td>
//                           <td className="px-6 py-4 text-sm text-gray-500">{partner.phone}</td>
//                           <td className="px-6 py-4 text-sm text-gray-500">{partner.businessName}</td>
//                           <td className="px-6 py-4 text-sm">
//                             <button
//                               onClick={() => updatePartnerStatus(partner._id, 'approved')}
//                               className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
//                             >
//                               Approve
//                             </button>
//                             <button
//                               onClick={() => updatePartnerStatus(partner._id, 'rejected')}
//                               className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                             >
//                               Reject
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {partners.length === 0 && (
//                         <tr>
//                           <td colSpan="5" className="text-center py-6 text-gray-400">No partner requests found.</td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;
