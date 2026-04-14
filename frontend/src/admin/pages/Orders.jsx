// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast } from "react-hot-toast";
import { formatCurrency, formatDate } from "../../utils/format";

ChartJS.register(ArcElement, Tooltip, Legend);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    user: "",
    description: "",
    product: "",
    quantity: 1,
    price: 0,
    status: "pending"
  });

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/orders");
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
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

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/users/all");
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
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
    const loadingToast = toast.loading("Creating order...");
    try {
      const payload = {
        user: formData.user,
        Description: formData.description,
        Product: {
          product: formData.product,
          quantity: Number(formData.quantity),
          price: Number(formData.price)
        },
        status: formData.status
      };
      await axios.post("/api/orders", payload);
      toast.success("Order created successfully");
      setIsModalOpen(false);
      setFormData({
        user: "",
        description: "",
        product: "",
        quantity: 1,
        price: 0,
        status: "pending"
      });
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating order");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  const chartData = {
    labels: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        data: [
          stats.pending,
          stats.processing,
          stats.shipped,
          stats.delivered,
          stats.cancelled
        ],
        backgroundColor: ["#FFCE56", "#36A2EB", "#4BC0C0", "#2E7D32", "#FF6384"],
      },
    ],
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Order <span className="text-blue-500">Management</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track and manage customer orders and fulfillment status</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 active:scale-95"
        >
          <i className="bx bx-plus text-xl"></i>
          <span>Create Order</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:translate-y-[-5px]">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-inner">
            <i className="bx bx-shopping-bag text-3xl"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-none mb-1">{stats.total}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
          </div>
        </div>
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:translate-y-[-5px]">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shadow-inner">
            <i className="bx bx-time text-3xl"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-none mb-1">{stats.pending}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Fulfillment</p>
          </div>
        </div>
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:translate-y-[-5px]">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner">
            <i className="bx bx-check-circle text-3xl"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white leading-none mb-1">{stats.delivered}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Delivered Orders</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300">
          <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center gap-3 bg-gray-50/30 dark:bg-transparent">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <i className="bx bx-list-ul text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Orders</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                <tr>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Order ID</th>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Customer</th>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Status</th>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Total</th>
                  <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all duration-200 group">
                      <td className="px-6 py-4 font-mono text-sm text-blue-500 font-bold">
                        #{order._id.slice(-5).toUpperCase()}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-700 dark:text-white group-hover:text-blue-500 transition-colors">
                          {order.customer?.name || order.user?.name || "Unknown"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                          order.status === "delivered" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                          order.status === "pending" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                          order.status === "cancelled" ? "bg-rose-500/10 text-rose-500 border-rose-500/20" :
                          "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-800 dark:text-blue-400">
                        {formatCurrency(order.Product?.price * order.Product?.quantity || 0)}
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs font-medium">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <i className="bx bx-shopping-bag text-5xl text-gray-300"></i>
                        <p className="text-gray-500 dark:text-gray-400 italic font-medium">No orders found</p>
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
              <i className="bx bx-pie-chart-alt-2 text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Order Status</h3>
          </div>
          <div className="h-[300px]">
            <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#888', usePointStyle: true, padding: 20 } } } }} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10 animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <i className="bx bx-plus text-blue-500"></i>
                Create New Order
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 transition-colors">
                <i className="bx bx-x text-2xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Customer</label>
                  <select 
                    name="user" 
                    value={formData.user} 
                    onChange={handleInputChange} 
                    required 
                    className="admin-input"
                  >
                    <option value="">Select Customer</option>
                    {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                  </select>
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
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Status</label>
                    <select 
                      name="status" 
                      value={formData.status} 
                      onChange={handleInputChange} 
                      className="admin-input"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Order Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    placeholder="Notes about this order..." 
                    rows="3"
                    className="admin-input resize-none" 
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
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;


