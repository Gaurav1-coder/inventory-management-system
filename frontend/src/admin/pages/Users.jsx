import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/users/all");
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Users data is not an array:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || error.message || "Error fetching users");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/users/${id}`);
        toast.success("User deleted");
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Error deleting user");
      }
    }
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            User <span className="text-blue-500">Management</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your team members and their account permissions</p>
        </div>
        <button 
          onClick={fetchUsers}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 active:scale-95"
        >
          <i className="bx bx-refresh text-xl"></i>
          <span>Refresh List</span>
        </button>
      </div>

      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300">
        <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center gap-3 bg-gray-50/30 dark:bg-transparent">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <i className="bx bx-group text-2xl"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">All Users</h3>
          <span className="ml-auto px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold uppercase tracking-wider">
            {users.length} Total
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">User</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Email</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase text-center">Role</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase text-center">Joined At</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium italic">Loading users...</p>
                    </div>
                  </td>
                </tr>
              ) : Array.isArray(users) && users.length > 0 ? (
                users.map((u) => (
                  <tr key={u?._id || Math.random()} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white dark:ring-white/10 overflow-hidden">
                          <img 
                            src={u?.ProfilePic || "https://robohash.org/default.png"} 
                            alt={u?.name || "User"} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => { e.target.src = "https://robohash.org/default.png" }}
                          />
                        </div>
                        <p className="font-semibold text-gray-700 dark:text-white group-hover:text-blue-500 transition-colors duration-200">
                          {u?.name || "Unnamed User"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {u?.email || <span className="text-gray-400 italic">Not provided</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        u?.role === "admin" 
                          ? "bg-purple-500/10 text-purple-500 border-purple-500/20" 
                          : u?.role === "manager"
                          ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                          : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      }`}>
                        {u?.role || "staff"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 text-xs font-medium">
                      {u?.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Unknown"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => handleDelete(u?._id)} 
                          className="p-2.5 text-red-500 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-red-500/20 active:scale-95"
                          title="Delete User"
                        >
                          <i className="bx bx-trash text-xl"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <i className="bx bx-search-alt text-4xl text-gray-300"></i>
                      <p className="text-gray-500 dark:text-gray-400 italic">No users found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
