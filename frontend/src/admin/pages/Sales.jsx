import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { toast } from "react-hot-toast";
import { formatCurrency, formatDate } from "../../utils/format";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    product: "",
    quantity: 1,
    price: 0,
    paymentMethod: "cash",
    paymentStatus: "paid",
    status: "completed"
  });

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const fetchSales = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/sales");
      setSales(data || []);
    } catch (error) {
      console.error("Error fetching sales:", error);
      toast.error("Error fetching sales");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "product") {
      const selectedProduct = products.find(p => p._id === value);
      setFormData({
        ...formData,
        [name]: value,
        price: selectedProduct ? selectedProduct.price : 0
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Recording sale...");
    try {
      const payload = {
        customerName: formData.customerName,
        products: {
          product: formData.product,
          quantity: Number(formData.quantity),
          price: Number(formData.price)
        },
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentStatus,
        status: formData.status
      };
      await axios.post("/api/sales", payload);
      toast.success("Sale recorded successfully");
      setIsModalOpen(false);
      setFormData({
        customerName: "",
        product: "",
        quantity: 1,
        price: 0,
        paymentMethod: "cash",
        paymentStatus: "paid",
        status: "completed"
      });
      fetchSales();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error recording sale");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const stats = {
    totalRevenue: sales.reduce((acc, s) => acc + (s.totalAmount || 0), 0),
    salesCount: sales.length,
  };

  const chartData = {
    labels: sales.slice(0, 5).map(s => s.products?.product?.product || s.products?.product?.name || "Unknown"),
    datasets: [
      {
        label: "Quantity Sold",
        data: sales.slice(0, 5).map(s => s.products?.quantity || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Recent Product Sales Performance" },
    },
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Sales <span className="text-blue-500">Analytics</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor your revenue and product sales performance</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 active:scale-95"
        >
          <i className="bx bx-plus text-xl"></i>
          <span>Add Sale</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:translate-y-[-5px]">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner">
            <i className="bx bx-dollar text-3xl"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-none mb-1">{formatCurrency(stats.totalRevenue)}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
          </div>
        </div>
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:translate-y-[-5px]">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-inner">
            <i className="bx bx-cart text-3xl"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-none mb-1">{stats.salesCount}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales Count</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300">
          <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center gap-3 bg-gray-50/30 dark:bg-transparent">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <i className="bx bx-table text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Sales</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                <tr>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Product</th>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Quantity</th>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Total Price</th>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {sales.length > 0 ? (
                  sales.map((sale) => (
                    <tr key={sale._id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all duration-200 group">
                      <td className="px-6 py-4 font-bold text-gray-700 dark:text-white group-hover:text-blue-500 transition-colors">
                        {sale.products?.product?.product || sale.products?.product?.name || "Unknown Product"}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-white font-medium">
                        {sale.products?.quantity} <span className="text-[10px] text-gray-400 ml-0.5">units</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-800 dark:text-blue-400">
                        {formatCurrency(sale.totalAmount)}
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs font-medium">
                        {formatDate(sale.createdAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <i className="bx bx-bar-chart-alt-2 text-5xl text-gray-300"></i>
                        <p className="text-gray-500 dark:text-gray-400 italic font-medium">No sales recorded yet</p>
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
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Performance</h3>
          </div>
          <div className="h-[300px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10 animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <i className="bx bx-plus text-blue-500"></i>
                Record New Sale
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 transition-colors">
                <i className="bx bx-x text-2xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Customer Name</label>
                  <input 
                    name="customerName" 
                    value={formData.customerName} 
                    onChange={handleInputChange} 
                    placeholder="e.g. John Doe"
                    required 
                    className="admin-input"
                  />
                </div>
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
                    {products.map(p => <option key={p._id} value={p._id}>{p.product}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Payment Method</label>
                    <select 
                      name="paymentMethod" 
                      value={formData.paymentMethod} 
                      onChange={handleInputChange} 
                      className="admin-input"
                    >
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                      <option value="online">Online</option>
                    </select>
                  </div>
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
                  Record Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;

