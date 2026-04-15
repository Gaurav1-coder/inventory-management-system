import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { toast } from "react-hot-toast";
import { formatDate } from "../../utils/format";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    type: "IN",
    quantity: 1,
    supplier: "",
    reason: "Restock"
  });

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
    fetchSuppliers();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/stock-transactions");
      setTransactions(data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Error fetching transactions");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/all");
      setProducts(data?.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const { data } = await axios.get("/api/suppliers");
      setSuppliers(data || []);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Recording transaction...");
    try {
      console.log("Sending Transaction Data:", formData);
      await axios.post("/api/stock-transactions", {
        product: formData.product,
        type: formData.type,
        quantity: Number(formData.quantity),
        supplier: formData.supplier || undefined,
        reason: formData.reason
      });
      toast.success("Transaction recorded successfully");
      setIsModalOpen(false);
      setFormData({
        product: "",
        type: "IN",
        quantity: 1,
        supplier: "",
        reason: "Restock"
      });
      fetchTransactions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error recording transaction");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const stats = {
    total: transactions.length,
    stockIn: transactions.filter(t => t.type === "IN" || t.type === "Stock-in").length,
    stockOut: transactions.filter(t => t.type === "OUT" || t.type === "Stock-out").length,
  };

  const chartData = {
    labels: transactions.slice(0, 10).reverse().map(t => formatDate(t.createdAt)),
    datasets: [
      {
        label: "Stock Movement",
        data: transactions.slice(0, 10).reverse().map(t => (t.type === "IN" || t.type === "Stock-in" ? t.quantity : -t.quantity)),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Stock <span className="text-blue-500">Transactions</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">History of all inventory movements and stock changes</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 active:scale-95"
        >
          <i className="bx bx-transfer text-xl"></i>
          <span>Add Transaction</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:translate-y-[-5px]">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-inner">
            <i className="bx bx-list-ul text-3xl"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-none mb-1">{stats.total}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Transactions</p>
          </div>
        </div>
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:translate-y-[-5px]">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner">
            <i className="bx bx-trending-up text-3xl"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-none mb-1">
              <span className="text-emerald-500">{stats.stockIn} IN</span> / <span className="text-rose-500">{stats.stockOut} OUT</span>
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stock Movement Ratio</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300">
          <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center gap-3 bg-gray-50/30 dark:bg-transparent">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <i className="bx bx-table text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Transaction History</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                <tr>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Product</th>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Type</th>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Quantity</th>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Reason</th>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {transactions.length > 0 ? (
                  transactions.map((t) => (
                    <tr key={t._id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all duration-200 group">
                      <td className="px-6 py-4 font-bold text-gray-700 dark:text-white group-hover:text-blue-500 transition-colors">
                        {t.product?.product || t.product?.name || "Unknown Product"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap ${
                          (t.type === "IN" || t.type === "Stock-in") 
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                            : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                        }`}>
                          {(t.type === "IN" || t.type === "Stock-in") ? "STOCK IN" : "STOCK OUT"}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">
                        {t.quantity} <span className="text-[10px] text-gray-400 ml-0.5">units</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm">
                        {t.reason || <span className="text-gray-400 italic">Not specified</span>}
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs font-medium">
                        {formatDate(t.createdAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <i className="bx bx-transfer text-5xl text-gray-300"></i>
                        <p className="text-gray-500 dark:text-gray-400 italic font-medium">No transactions recorded yet</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] p-6 transition-all duration-300">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-white/10">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <i className="bx bx-line-chart text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Stock Trend</h3>
          </div>
          <div className="h-[300px]">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10 animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <i className="bx bx-transfer text-blue-500"></i>
                Add Stock Transaction
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 transition-colors">
                <i className="bx bx-x text-2xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Product</label>
                  <select 
                    name="product" 
                    value={formData.product} 
                    onChange={handleInputChange} 
                    required 
                    className="admin-input"
                  >
                    <option value="">Select Product</option>
                    {products.map(p => <option key={p._id} value={p._id}>{p.product || p.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Type</label>
                    <select 
                      name="type" 
                      value={formData.type} 
                      onChange={handleInputChange} 
                      className="admin-input"
                    >
                      <option value="IN">Stock In</option>
                      <option value="OUT">Stock Out</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Quantity</label>
                    <input 
                      type="number" 
                      name="quantity" 
                      value={formData.quantity} 
                      onChange={handleInputChange} 
                      min="1" 
                      required 
                      className="admin-input"
                    />
                  </div>
                </div>
                {formData.type === "IN" && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Supplier (Optional)</label>
                    <select 
                      name="supplier" 
                      value={formData.supplier} 
                      onChange={handleInputChange} 
                      className="admin-input"
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Reason / Note</label>
                  <input 
                    name="reason" 
                    value={formData.reason} 
                    onChange={handleInputChange} 
                    placeholder="e.g. Monthly Restock, Damage, Sale"
                    className="admin-input"
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
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockTransactions;

