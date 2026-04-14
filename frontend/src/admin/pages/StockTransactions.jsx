// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dummyTransactions = [
    {
      _id: "1",
      product: { name: "Mechanical Keyboard" },
      quantity: 5,
      type: "IN",
      reason: "Stock Added",
      createdAt: "2026-04-10T10:00:00.000Z"
    },
    {
      _id: "2",
      product: { name: "Wireless Mouse" },
      quantity: 2,
      type: "OUT",
      reason: "Sale",
      createdAt: "2026-04-11T12:00:00.000Z"
    }
  ];

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/stock-transactions");
      setTransactions(data && data.length > 0 ? data : dummyTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions(dummyTransactions);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    total: transactions.length,
    stockIn: transactions.filter(t => t.type === "IN").length,
    stockOut: transactions.filter(t => t.type === "OUT").length,
  };

  const chartData = {
    labels: transactions.slice(0, 10).map(t => new Date(t.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Stock Movement",
        data: transactions.slice(0, 10).map(t => (t.type === "IN" ? t.quantity : -t.quantity)),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fill: false,
      },
    ],
  };

  return (
    <div className="transactions-page">
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div className="left">
          <h1 style={{ fontSize: '24px', fontWeight: '700' }}>Stock Transactions</h1>
          <p style={{ color: 'var(--dark-grey)', fontSize: '14px' }}>History of all inventory movements</p>
        </div>
        <button className="report" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
          <i className="bx bx-transfer" style={{ fontSize: '20px' }}></i>
          <span>+ Add Transaction</span>
        </button>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: 'var(--light)', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--light-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="bx bx-list-ul" style={{ color: 'var(--primary)', fontSize: '24px' }}></i>
          </div>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: '700' }}>{stats.total}</h3>
            <p style={{ color: 'var(--dark-grey)', fontSize: '13px' }}>Total Transactions</p>
          </div>
        </div>
        <div style={{ background: 'var(--light)', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--light-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="bx bx-trending-up" style={{ color: 'var(--success)', fontSize: '24px' }}></i>
          </div>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: '700' }}>{stats.stockIn} IN / {stats.stockOut} OUT</h3>
            <p style={{ color: 'var(--dark-grey)', fontSize: '13px' }}>Stock In vs Out</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 450px', gap: '24px', alignItems: 'start' }}>
        <div className="table-container" style={{ background: 'var(--light)', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--grey)' }}>
                <th style={{ textAlign: 'left', padding: '15px', color: 'var(--dark-grey)' }}>Product</th>
                <th style={{ textAlign: 'left', padding: '15px', color: 'var(--dark-grey)' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '15px', color: 'var(--dark-grey)' }}>Quantity</th>
                <th style={{ textAlign: 'left', padding: '15px', color: 'var(--dark-grey)' }}>Reason</th>
                <th style={{ textAlign: 'left', padding: '15px', color: 'var(--dark-grey)' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((t) => (
                  <tr key={t._id} style={{ borderBottom: '1px solid var(--grey)' }}>
                    <td style={{ padding: '15px', fontWeight: '600' }}>{t.product?.name || "Unknown Product"}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: '6px', 
                        fontSize: '11px',
                        fontWeight: '700',
                        background: t.type === "IN" ? "var(--light-success)" : "var(--light-danger)",
                        color: t.type === "IN" ? "var(--success)" : "var(--danger)"
                      }}>
                        {t.type}
                      </span>
                    </td>
                    <td style={{ padding: '15px', fontWeight: '700' }}>{t.quantity}</td>
                    <td style={{ padding: '15px', fontSize: '14px' }}>{t.reason}</td>
                    <td style={{ padding: '15px', color: 'var(--dark-grey)', fontSize: '13px' }}>
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '60px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '48px' }}>🔄</span>
                      <h3 style={{ fontSize: '20px', fontWeight: '700' }}>No Transactions Yet</h3>
                      <p style={{ color: 'var(--dark-grey)' }}>Inventory changes will appear here</p>
                      <button className="report">+ Add Transaction</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="chart-container" style={{ background: 'var(--light)', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Daily Stock Movement</h3>
          <div style={{ height: '300px' }}>
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTransactions;

