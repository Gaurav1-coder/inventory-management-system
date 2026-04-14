// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React, { useEffect, useState } from "react";
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
      const results = await Promise.allSettled([
        axios.get("/api/product/all"),
        axios.get("/api/sales"),
        axios.get("/api/activity-logs"),
      ]);
      
      console.log("Dashboard API Results:", results);
      
      const productsResponse = results[0].status === 'fulfilled' ? results[0].value.data : null;
      let productsData = [];
      if (productsResponse) {
        if (Array.isArray(productsResponse)) {
          productsData = productsResponse;
        } else if (Array.isArray(productsResponse.products)) {
          productsData = productsResponse.products;
        }
      }
      
      const salesData = results[1].status === 'fulfilled' && Array.isArray(results[1].value.data) ? results[1].value.data : [];
      const logsData = results[2].status === 'fulfilled' && Array.isArray(results[2].value.data) ? results[2].value.data : [];

      const totalStock = productsData.reduce((acc, p) => acc + (Number(p?.quantity) || 0), 0);
      const lowStockCount = productsData.filter(p => (Number(p?.quantity) || 0) < 5).length;
      const totalRevenue = salesData.reduce((acc, s) => acc + (Number(s?.totalPrice) || 0), 0);

      setStats({
        products: productsData.length,
        totalStock,
        lowStockCount,
        totalRevenue
      });

      setProducts(productsData);
      setRecentLogs(logsData.slice(0, 5));
    } catch (err) {
      console.error("Error processing dashboard data:", err);
      setError("Failed to process dashboard data. Please check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Safe chart data preparation
  const getChartData = () => {
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
        <p style={{ color: 'var(--dark-grey)', marginTop: '10px' }}>{error}</p>
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
    <div className="dashboard-container">
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div className="left">
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark)' }}>Inventory Dashboard</h1>
          <p style={{ color: 'var(--dark-grey)', fontSize: '14px' }}>Overview of your business performance</p>
        </div>
        <button 
          onClick={fetchDashboardData} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '10px 16px', 
            borderRadius: '10px', 
            background: 'var(--light-primary)', 
            color: 'var(--primary)', 
            border: 'none', 
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          <i className="bx bx-refresh" style={{ fontSize: '20px' }}></i>
          Refresh Data
        </button>
      </div>

      <ul className="insights" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <li style={{ background: 'var(--light)', padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'var(--light-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="bx bx-package" style={{ color: 'var(--primary)', fontSize: '32px' }}></i>
          </div>
          <span className="info">
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark)' }}>{isLoading ? "..." : String(stats.products)}</h3>
            <p style={{ color: 'var(--dark-grey)', fontSize: '14px' }}>Total Products</p>
          </span>
        </li>
        <li style={{ background: 'var(--light)', padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'var(--light-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="bx bx-bar-chart" style={{ color: 'var(--success)', fontSize: '32px' }}></i>
          </div>
          <span className="info">
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark)' }}>{isLoading ? "..." : String(stats.totalStock)}</h3>
            <p style={{ color: 'var(--dark-grey)', fontSize: '14px' }}>Total Stock</p>
          </span>
        </li>
        <li style={{ background: 'var(--light)', padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'var(--light-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="bx bx-error-circle" style={{ color: 'var(--danger)', fontSize: '32px' }}></i>
          </div>
          <span className="info">
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark)' }}>{isLoading ? "..." : String(stats.lowStockCount)}</h3>
            <p style={{ color: 'var(--dark-grey)', fontSize: '14px' }}>Low Stock Items</p>
          </span>
        </li>
        <li style={{ background: 'var(--light)', padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'var(--light-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="bx bx-dollar" style={{ color: 'var(--warning)', fontSize: '32px' }}></i>
          </div>
          <span className="info">
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--dark)' }}>{isLoading ? "..." : `$${(Number(stats.totalRevenue) || 0).toLocaleString()}`}</h3>
            <p style={{ color: 'var(--dark-grey)', fontSize: '14px' }}>Total Revenue</p>
          </span>
        </li>
      </ul>

      <div className="charts-section" style={{ background: 'var(--light)', padding: '24px', borderRadius: '20px', marginBottom: '32px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        {isLoading ? (
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dark-grey)' }}>Loading chart...</div>
        ) : chartData ? (
          <div style={{ height: '350px', position: 'relative' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dark-grey)' }}>No data available for chart</div>
        )}
      </div>

      <div className="bottom-data" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <div className="orders" style={{ background: 'var(--light)', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div className="header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <i className="bx bx-history" style={{ fontSize: '24px', color: 'var(--primary)' }}></i>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Recent Activity</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--grey)' }}>
                  <th style={{ textAlign: 'left', padding: '12px', color: 'var(--dark-grey)', fontWeight: '600' }}>User</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: 'var(--dark-grey)', fontWeight: '600' }}>Action</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: 'var(--dark-grey)', fontWeight: '600' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs && Array.isArray(recentLogs) && recentLogs.length > 0 ? (
                  recentLogs.map((log, index) => (
                    <tr key={log?._id || index} style={{ borderBottom: '1px solid var(--grey)' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img src={`https://ui-avatars.com/api/?name=${log?.user?.name || "U"}&background=random`} alt="" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                          <span style={{ fontSize: '14px' }}>{String(log?.user?.name || "System")}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ 
                          padding: '4px 8px', 
                          borderRadius: '6px', 
                          fontSize: '12px',
                          background: String(log?.action || "").includes("Added") ? 'var(--light-success)' : String(log?.action || "").includes("Deleted") ? 'var(--light-danger)' : 'var(--light-primary)',
                          color: String(log?.action || "").includes("Added") ? 'var(--success)' : String(log?.action || "").includes("Deleted") ? 'var(--danger)' : 'var(--primary)'
                        }}>
                          {String(log?.action || "Unknown")}
                        </span>
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px', color: 'var(--dark-grey)' }}>{log?.date ? new Date(log.date).toLocaleDateString() : "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: 'var(--dark-grey)' }}>No recent activity</td></tr>
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

