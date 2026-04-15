import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "", type: "info", userId: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/users/all");
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/notifications");
      if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching notifications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "userId") {
      const selectedUser = users.find(u => u._id === value);
      if (selectedUser) {
        // Correctly set BOTH the userId (for backend) and name (for UI display)
        setFormData(prev => ({ ...prev, userId: value, name: selectedUser.name }));
      } else {
        setFormData(prev => ({ ...prev, userId: "", name: "All Users" }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 🚨 FINAL LOUD DEBUG LOGS 🚨
    console.log("--- FRONTEND: PREPARING FINAL PAYLOAD ---");
    console.log("RAW FORM DATA:", formData);

    const payload = {
      name: formData.name.trim() || "System Notification",
      message: formData.message.trim(),
      type: formData.type,
      userId: formData.userId || null 
    };
    
    console.log("--- FRONTEND: PAYLOAD TO BE SENT ---", payload);

    if (!payload.message) return toast.error("Message content is required");

    try {
      const response = await axios.post("/api/notifications", payload);
      console.log("--- FRONTEND: SERVER RESPONSE ---", response.data);

      toast.success("Notification sent successfully");
      setIsModalOpen(false);
      setFormData({ name: "", message: "", type: "info", userId: "" });
      fetchNotifications();
    } catch (error) {
      console.error("--- FRONTEND: AXIOS ERROR ---", error);
      toast.error(error.response?.data?.message || "Error sending notification");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`/api/notifications/${id}`);
        toast.success("Notification deleted");
        fetchNotifications();
      } catch (error) {
        toast.error("Error deleting notification");
      }
    }
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            System <span className="text-blue-500">Notifications</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Broadcast alerts and information to your system users</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 active:scale-95"
        >
          <i className="bx bx-bell text-xl"></i>
          <span>Create Notification</span>
        </button>
      </div>

      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300">
        <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center gap-3 bg-gray-50/30 dark:bg-transparent">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <i className="bx bx-list-ul text-2xl"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Notifications</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Type</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Target</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Message</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Date</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium italic">Loading notifications...</p>
                    </div>
                  </td>
                </tr>
              ) : Array.isArray(notifications) && notifications.length > 0 ? (
                notifications.map((n) => (
                  <tr key={n._id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all duration-200 group">
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                        n.type === 'alert' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                        n.type === 'warning' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                        'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}>
                        {n.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-700 dark:text-white">
                      {n.user ? (
                        <div className="flex flex-col">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-blue-500 uppercase font-bold">Private: {n.user.name || n.user}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-emerald-500 uppercase font-bold">Broadcast</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm max-w-md">
                      {n.message || <span className="text-gray-400 italic font-normal">No message provided</span>}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs font-medium">
                      {new Date(n.createdAt || n.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => handleDelete(n._id)} 
                          className="p-2.5 text-red-500 hover:text-white hover:bg-red-500 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-sm active:scale-95"
                          title="Delete Notification"
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
                      <i className="bx bx-bell-off text-5xl text-gray-300"></i>
                      <p className="text-gray-500 dark:text-gray-400 italic font-medium">No notifications found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10 animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <i className="bx bx-bell text-blue-500"></i>
                Create Notification
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 transition-colors">
                <i className="bx bx-x text-2xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Target Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. All Staff, Admin Team" 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Target User (Optional)</label>
                  <select 
                    name="userId" 
                    value={formData.userId} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  >
                    <option value="">All Users (Broadcast)</option>
                    {users.map(u => (
                      <option key={u._id} value={u._id}>{u.name} ({u.role})</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Type</label>
                  <select 
                    name="type" 
                    value={formData.type} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="alert">Alert</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Message</label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Type your message here..." 
                    rows="4"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none" 
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-white/10">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 px-6 py-2.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] px-6 py-2.5 bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-600 transition-all active:scale-95"
                >
                  Send Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
