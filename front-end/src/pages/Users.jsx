import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash2, FiEdit, FiRefreshCw } from 'react-icons/fi';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/${userId}`, { role: newRole });
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch {
      alert("Failed to update role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/auth/${userId}`);
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch {
      alert("Failed to delete user");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Users</h2>
        <button 
          onClick={fetchUsers}
          className="flex items-center text-sm text-[#67103d] hover:text-[#50052c]"
        >
          <FiRefreshCw className="mr-1" size={14} /> Refresh
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name || `${user.firstName} ${user.lastName}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#67103d] focus:border-[#67103d] sm:text-sm rounded-md"
                  >
                    <option value="user">User</option>
                    <option value="partner">Partner</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-600 hover:text-red-900 mr-3"
                    title="Delete user"
                  >
                    <FiTrash2 />
                  </button>
                  <button className="text-[#67103d] hover:text-[#50052c]" title="Edit user">
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

export default Users;