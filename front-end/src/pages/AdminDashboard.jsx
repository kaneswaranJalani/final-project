import { useState } from 'react';
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiPieChart,
  FiShoppingCart,
  FiCalendar,
  FiMail,
  FiBell,
  FiSearch,
  FiMenu
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { title: 'Total Users', value: '2,453', change: '+12%', trend: 'up' },
    { title: 'Total Orders', value: '1,234', change: '+5%', trend: 'up' },
    { title: 'Revenue', value: '$34,245', change: '-2%', trend: 'down' },
    { title: 'Conversion', value: '3.6%', change: '+1.2%', trend: 'up' }
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', date: '12 May 2023', amount: '$125.00', status: 'Completed' },
    { id: '#ORD-002', customer: 'Jane Smith', date: '13 May 2023', amount: '$89.50', status: 'Processing' },
    { id: '#ORD-003', customer: 'Robert Johnson', date: '14 May 2023', amount: '$156.75', status: 'Completed' },
    { id: '#ORD-004', customer: 'Emily Davis', date: '15 May 2023', amount: '$234.00', status: 'Pending' },
    { id: '#ORD-005', customer: 'Michael Wilson', date: '16 May 2023', amount: '$67.30', status: 'Completed' }
  ];

  const topProducts = [
    { name: 'Premium Headphones', sales: 342, revenue: '$12,345' },
    { name: 'Wireless Earbuds', sales: 278, revenue: '$9,876' },
    { name: 'Smart Watch', sales: 198, revenue: '$7,654' },
    { name: 'Bluetooth Speaker', sales: 156, revenue: '$5,432' }
  ];

  const activities = [
    { user: 'John Doe', action: 'added a new product', time: '2 mins ago' },
    { user: 'Jane Smith', action: 'updated order #ORD-003', time: '15 mins ago' },
    { user: 'Robert Johnson', action: 'completed payment of $125.00', time: '1 hour ago' },
    { user: 'Emily Davis', action: 'created a new ticket', time: '3 hours ago' }
  ];

  const menuItems = [
    { icon: <FiHome />, name: 'Dashboard', key: 'dashboard' },
    { icon: <FiUsers />, name: 'Users', key: 'users' },
    { icon: <FiShoppingCart />, name: 'Products', key: 'products' },
    { icon: <FiPieChart />, name: 'Analytics', key: 'analytics' },
    { icon: <FiCalendar />, name: 'Calendar', key: 'calendar' },
    { icon: <FiMail />, name: 'Messages', key: 'messages' },
    { icon: <FiSettings />, name: 'Settings', key: 'settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white text-black transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">AdminPanel</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-indigo-700">
            <FiMenu size={20} />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center w-full p-4 transition-colors ${
                activeTab === item.key ? 'bg-indigo-100' : 'hover:bg-indigo-100'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="ml-3">{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab}</h2>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <FiBell size={20} className="text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                JD
              </div>
              {sidebarOpen && <span className="font-medium">John Doe</span>}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <>
              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-sm">{stat.title}</p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <div className="mt-4 h-1 bg-gray-100 rounded-full">
                      <div
                        className={`h-full rounded-full ${
                          stat.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Orders + Products */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold">Recent Orders</h3>
                    <button className="text-indigo-600 text-sm hover:text-indigo-800 font-medium">
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm divide-y divide-gray-200">
                      <thead>
                        <tr>
                          {['Order ID', 'Customer', 'Date', 'Amount', 'Status'].map((heading) => (
                            <th
                              key={heading}
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {heading}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-4 py-3 font-medium">{order.id}</td>
                            <td className="px-4 py-3">{order.customer}</td>
                            <td className="px-4 py-3">{order.date}</td>
                            <td className="px-4 py-3">{order.amount}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                  order.status === 'Completed'
                                    ? 'bg-green-100 text-green-800'
                                    : order.status === 'Processing'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Top Products</h3>
                  {topProducts.map((product, i) => (
                    <div key={i} className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center mr-4">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.sales} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{product.revenue}</p>
                        <p className="text-xs text-green-500">+12%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Log */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                {activities.map((activity, idx) => (
                  <div key={idx} className="flex items-start mb-4">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold mr-3">
                      {activity.user.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">
                        {activity.user}{' '}
                        <span className="font-normal text-gray-600">{activity.action}</span>
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Users Management</h2>
              <p>Users content goes here...</p>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Products Management</h2>
              <p>Products content goes here...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
