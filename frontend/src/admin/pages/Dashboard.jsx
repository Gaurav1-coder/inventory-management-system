import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  BarElement, 
  CategoryScale, 
  Chart as ChartJS, 
  Legend, 
  LinearScale, 
  Title, 
  Tooltip 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { formatCurrency, formatDate } from "../../utils/format";

// Register ChartJS components safely
try {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
} catch (error) {
  console.error("Error registering ChartJS:", error);
}

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    totalStock: 0,
    lowStockCount: 0,
    totalRevenue: 0,
  });
  const [products, setProducts] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("/api/analytics/dashboard-stats");
      
      setStats(data.stats);
      setRecentLogs(data.recentLogs);
      setMonthlySales(data.monthlySales);
      
      // Still fetch products for the stock chart
      const prodRes = await axios.get("/api/product/all");
      setProducts(prodRes.data?.products || []);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to fetch dashboard analytics. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Safe chart data preparation
  const getChartData = () => {
    if (monthlySales && monthlySales.length > 0) {
      return {
        labels: monthlySales.map(s => s.month),
        datasets: [
          {
            label: 'Monthly Revenue',
            data: monthlySales.map(s => s.total),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            borderRadius: 5,
          },
        ],
      };
    }
    
    if (!Array.isArray(products) || products.length === 0) return null;
    
    try {
      const topProducts = products.slice(0, 10);
      return {
        labels: topProducts.map(p => { 
          if (p?.name && typeof p.name === 'string') return p.name;
          if (p?.product) {
            if (typeof p.product === 'object') return p.product?.name || "Unnamed";
            if (typeof p.product === 'string') return p.product;
          }
          return "Unnamed"; 
        }),
        datasets: [
          {
            label: 'Stock Quantity',
            data: topProducts.map(p => Number(p?.quantity) || 0),
            backgroundColor: 'rgba(25, 118, 210, 0.6)',
            borderColor: 'rgba(25, 118, 210, 1)',
            borderWidth: 1,
            borderRadius: 5,
          },
        ],
      };
    } catch (err) {
      console.error("Error creating chart data:", err);
      return null;
    }
  };

  const chartData = getChartData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top 10 Products Stock Levels',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: 'var(--light)', borderRadius: '20px' }}>
        <i className="bx bx-error-circle" style={{ fontSize: '48px', color: 'var(--danger)' }}></i>
        <h2 style={{ marginTop: '20px' }}>Something went wrong</h2>
        <p style={{ color: 'var(--dark-grey)', marginTop: '10px' }}>{typeof error === "string" ? error : error?.message || "An unexpected error occurred"}</p>
        <button 
          onClick={fetchDashboardData} 
          style={{ marginTop: '20px', padding: '10px 20px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container min-h-screen transition-colors duration-300">
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div className="left">
          <h1 className="text-2xl font-bold dark:text-white transition-colors duration-300" style={{ fontSize: '28px', fontWeight: '800' }}>
            Inventory <span className="text-primary dark:text-blue-400">Dashboard</span>
          </h1>
          <p className="dark:text-gray-400" style={{ color: 'var(--dark-grey)', fontSize: '14px', marginTop: '4px' }}>Overview of your business performance</p>
        </div>
        <button 
          onClick={fetchDashboardData} 
          className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400 hover:bg-primary/20 dark:hover:bg-blue-500/20 transition-all duration-300 font-semibold border border-primary/10 dark:border-blue-400/10"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '10px 18px', 
            borderRadius: '12px', 
            cursor: 'pointer',
          }}
        >
          <i className="bx bx-refresh group-hover:rotate-180 transition-transform duration-500" style={{ fontSize: '22px' }}></i>
          <span>Refresh Data</span>
        </button>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <li className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 text-blue-500 flex items-center justify-center shadow-inner">
            <i className="bx bx-package text-3xl"></i>
          </div>
          <span className="info">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-none mb-1">{isLoading ? "..." : String(stats.products)}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
          </span>
        </li>
        <li className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-400/20 text-emerald-500 flex items-center justify-center shadow-inner">
            <i className="bx bx-bar-chart text-3xl"></i>
          </div>
          <span className="info">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-none mb-1">{isLoading ? "..." : String(stats.totalStock)}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Stock</p>
          </span>
        </li>
        <li className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-orange-400/20 text-rose-500 flex items-center justify-center shadow-inner">
            <i className="bx bx-error-circle text-3xl"></i>
          </div>
          <span className="info">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-none mb-1">{isLoading ? "..." : String(stats.lowStockCount)}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Low Stock</p>
          </span>
        </li>
        <li className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30_rgba(0,0,0,0.4)] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-400/20 text-amber-500 flex items-center justify-center shadow-inner">
            <i className="bx bx-dollar text-3xl"></i>
          </div>
          <span className="info">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-none mb-1">{isLoading ? "..." : formatCurrency(stats.totalRevenue)}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
          </span>
        </li>
      </ul>

      <div className="charts-section bg-white dark:bg-white/5 dark:backdrop-blur-md dark:border dark:border-white/10 shadow-xl rounded-2xl transition-all duration-300" style={{ padding: '28px', marginBottom: '32px' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
            <i className="bx bx-trending-up text-primary dark:text-blue-400"></i>
            Monthly Revenue Overview
          </h3>
        </div>
        {isLoading ? (
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-gray-400 italic">Loading chart data...</div>
        ) : chartData ? (
          <div style={{ height: '350px', position: 'relative' }}>
            <Bar data={chartData} options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                legend: {
                  ...chartOptions.plugins.legend,
                  labels: {
                    color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b'
                  }
                }
              },
              scales: {
                x: { grid: { display: false }, ticks: { color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b' } },
                y: { grid: { color: document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }, ticks: { color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b' } }
              }
            }} />
          </div>
        ) : (
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-gray-400">No analytics data available</div>
        )}
      </div>

      <div className="bottom-data" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <div className="orders bg-white dark:bg-white/5 dark:backdrop-blur-md dark:border dark:border-white/10 shadow-xl rounded-2xl transition-all duration-300" style={{ padding: '28px' }}>
          <div className="header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div className="p-2 bg-primary/10 dark:bg-blue-500/20 rounded-lg">
              <i className="bx bx-history" style={{ fontSize: '24px', color: 'var(--primary)' }} className="text-primary dark:text-blue-400"></i>
            </div>
            <h3 className="text-lg font-bold dark:text-white">Recent Activity</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
              <thead>
                <tr className="text-gray-400 dark:text-gray-500 uppercase tracking-wider text-xs font-bold">
                  <th style={{ textAlign: 'left', padding: '12px' }}>User</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Action</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs && Array.isArray(recentLogs) && recentLogs.length > 0 ? (
                  recentLogs.map((log, index) => (
                    <tr key={log?._id || index} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-200 rounded-xl">
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div className="relative">
                            <img src={`https://ui-avatars.com/api/?name=${log?.userId?.name || log?.user?.name || "U"}&background=random&color=fff&bold=true`} alt="" style={{ width: '36px', height: '36px', borderRadius: '12px' }} className="shadow-md" />
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                          </div>
                          <span className="font-semibold dark:text-gray-200" style={{ fontSize: '14px' }}>{String(log?.userId?.name || log?.user?.name || "System")}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                          String(log?.action || "").toLowerCase().includes("add") 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' 
                            : String(log?.action || "").toLowerCase().includes("delete") 
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400' 
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
                        }`}>
                          {String(log?.action || "Unknown")}
                        </span>
                      </td>
                      <td className="text-gray-500 dark:text-gray-400" style={{ padding: '12px', fontSize: '13px', fontWeight: '500' }}>{formatDate(log?.createdAt || log?.date)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" style={{ textAlign: 'center', padding: '40px' }} className="text-gray-400 italic">No recent activity found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
