// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../../utils/format";

const Navbar = ({
  onSidebarToggle,
  onDarkModeToggle,
  isSearchFormVisible,
}) => {
  const [notifications, setNotifications] = useState([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get("/api/notifications");
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`/api/notifications/${id}/read`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="flex items-center gap-6 px-6 py-4 sticky top-0 z-[1000] bg-white/80 dark:bg-black/60 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-all duration-300">
      <i className="bx bx-menu cursor-pointer text-2xl dark:text-white" onClick={onSidebarToggle}></i>
      <form className={`flex-1 max-w-md ${isSearchFormVisible ? "show" : ""}`}>
        <div className="relative group flex-1">
          <i className="bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors z-10 pointer-events-none"></i>
          <input 
            type="search" 
            placeholder="Search..." 
            className="w-full pl-12 pr-4 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all relative z-0"
          />
        </div>
      </form>
      
      <div className="flex items-center gap-4 ml-auto">
        <div className="relative">
          <input
            type="checkbox"
            id="theme-toggle"
            className="hidden"
            onChange={onDarkModeToggle}
          />
          <label 
            htmlFor="theme-toggle" 
            className="block w-12 h-6 bg-gray-200 dark:bg-white/10 rounded-full cursor-pointer relative transition-colors duration-300"
          >
            <span className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-blue-400 rounded-full transition-transform duration-300 transform dark:translate-x-6"></span>
          </label>
        </div>

        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              if (!isNotifOpen) fetchNotifications();
            }}
            className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <i className="bx bx-bell text-2xl dark:text-white"></i>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white dark:border-black animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200">
              <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
                <h3 className="font-bold text-gray-800 dark:text-white">Notifications</h3>
                <button onClick={() => setIsNotifOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                  <i className="bx bx-x text-xl"></i>
                </button>
              </div>
              <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div 
                      key={n._id} 
                      onClick={() => !n.read && markAsRead(n._id)}
                      className={`p-4 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group ${!n.read ? 'bg-blue-50/30 dark:bg-blue-500/5' : ''}`}
                    >
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          n.type === 'alert' ? 'bg-rose-500/10 text-rose-500' : 
                          n.type === 'warning' ? 'bg-amber-500/10 text-amber-500' : 
                          'bg-blue-500/10 text-blue-500'
                        }`}>
                          <i className={`bx ${n.type === 'alert' ? 'bx-error-circle' : n.type === 'warning' ? 'bx-error' : 'bx-info-circle'} text-xl`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`text-sm font-bold ${!n.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                              {n.title}
                            </p>
                            <span className="text-[10px] text-gray-400">{formatDate(n.createdAt)}</span>
                          </div>
                          <p className={`text-xs leading-relaxed ${!n.read ? 'text-gray-700 dark:text-gray-300 font-medium' : 'text-gray-500 dark:text-gray-500'}`}>
                            {n.message || "No message content available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center">
                    <i className="bx bx-bell-off text-4xl text-gray-300 mb-2"></i>
                    <p className="text-gray-500 dark:text-gray-400 text-sm italic">No notifications yet</p>
                  </div>
                )}
              </div>
              <Link 
                to="/admin/notifications" 
                onClick={() => setIsNotifOpen(false)}
                className="block p-3 text-center text-xs font-bold text-blue-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                View All Notifications
              </Link>
            </div>
          )}
        </div>
        
        <Link to="/profile" className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
            <img 
              src="https://robohash.org/default.png" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover border-2 border-white/20"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

