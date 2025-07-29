import { useState } from 'react';
import {
  FiHome, FiUsers, FiSettings, FiPieChart, FiShoppingCart,
  FiBell, FiSearch, FiMenu, FiUser, FiDollarSign, 
  FiShoppingBag
} from 'react-icons/fi';
import { RiUserStarLine } from 'react-icons/ri'; 
import Users from '../pages/Users';
import Orders from '../pages/Orders';
import Payments from '../pages/Payments';
import Partners from '../pages/Partners';
import Dashboard from '../pages/Dashboard';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { icon: <FiHome />, name: 'Dashboard', key: 'dashboard' },
    { icon: <FiUsers />, name: 'Users', key: 'users' },
    { icon: <FiShoppingCart />, name: 'Orders', key: 'orders' },
    { icon: <FiPieChart />, name: 'Payments', key: 'payment' },
    { icon: <RiUserStarLine />, name: 'Partners', key: 'partners' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'orders':
        return <Orders />;
      case 'payment':
        return <Payments />;
      case 'partners':
        return <Partners />;
      default:
        return <Dashboard />;
    }
  };

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
              {sidebarOpen && <span className="text-sm font-medium">Admin</span>}
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="p-6">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;