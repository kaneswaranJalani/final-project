import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUser, FiShoppingBag, FiDollarSign, FiUsers } from 'react-icons/fi';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    monthlyGrowth: 12.5
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [usersRes, ordersRes, paymentsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/auth/all'),
        axios.get('http://localhost:5000/api/bike/all'),
        axios.get('http://localhost:5000/api/payments/all')
      ]);
      
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

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
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

      {/* Analytics Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Dashboard Analytics</h3>
        <div className="text-center py-12 text-gray-400">
          Analytics data will be displayed here
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;