// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/activity-logs");
      if (Array.isArray(data)) {
        setLogs(data);
      } else {
        setLogs([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching activity logs");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Activity <span className="text-blue-500">Log</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track all system actions and user movements</p>
        </div>
        <button 
          onClick={fetchLogs}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 active:scale-95"
        >
          <i className="bx bx-refresh text-xl"></i>
          <span>Refresh Logs</span>
        </button>
      </div>

      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300">
        <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center gap-3 bg-gray-50/30 dark:bg-transparent">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <i className="bx bx-history text-2xl"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Activities</h3>
          <span className="ml-auto px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold uppercase tracking-wider">
            {logs.length} Total Logs
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">User</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Action</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Details</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium italic">Loading logs...</p>
                    </div>
                  </td>
                </tr>
              ) : logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs font-bold ring-1 ring-blue-500/20">
                          {log.userId?.name ? log.userId.name.charAt(0).toUpperCase() : "S"}
                        </div>
                        <p className="font-semibold text-gray-700 dark:text-white">{log.userId?.name || "System"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                        log.action?.includes("DELETE") ? "bg-rose-500/10 text-rose-500" :
                        log.action?.includes("UPDATE") ? "bg-amber-500/10 text-amber-500" :
                        "bg-emerald-500/10 text-emerald-500"
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm max-w-md truncate">
                      {log.description}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
                      {log.createdAt ? new Date(log.createdAt).toLocaleString() : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <i className="bx bx-history text-5xl text-gray-300"></i>
                      <p className="text-gray-500 dark:text-gray-400 italic">No activity logs found</p>
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

export default ActivityLog;

