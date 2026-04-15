import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  
  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;
  const role = userInfo?.role || "staff";
  const isAdmin = role === "admin";
  
  // Filters & Pagination
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState({
    product: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [page, categoryFilter, sort]); // Fetch on filter/sort change

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (page !== 1) setPage(1);
      else fetchProducts();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const { data } = await axios.get("/api/product/all", {
        params: {
          page,
          search,
          category: categoryFilter,
          sort,
          limit: 8
        }
      });
      setProducts(data?.products || []);
      setTotalPages(data?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "Error fetching products");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const fetchCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const { data } = await axios.get("/api/categories");
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size too large (max 5MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(isEditMode ? "Updating product..." : "Adding product...");
    try {
      if (isEditMode) {
        await axios.patch(`/api/product/${currentProductId}`, formData);
        toast.success("Product updated successfully");
      } else {
        await axios.post("/api/product/create", formData);
        toast.success("Product added successfully");
      }
      toast.dismiss(loadingToast);
      closeModal();
      fetchProducts();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || "Error saving product");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      product: product.product,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category?._id || product.category,
      image: product.image,
    });
    setImagePreview(product.image);
    setCurrentProductId(product._id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`/api/product/${id}`);
        toast.success("Product deleted");
        fetchProducts();
      } catch (error) {
        toast.error("Error deleting product");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentProductId(null);
    setFormData({ product: "", description: "", price: "", quantity: "", category: "", image: "" });
    setImagePreview(null);
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Product <span className="text-blue-500">Management</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your inventory items and stock levels</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 active:scale-95"
          >
            <i className="bx bx-plus text-xl"></i>
            <span>Add Product</span>
          </button>
        )}
      </div>

      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-2xl p-6 mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[280px] relative group">
          <i className="bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors z-10 pointer-events-none"></i>
          <input 
            type="text" 
            placeholder="Search products by name..." 
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-transparent border border-gray-200 dark:border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="admin-input min-w-[160px]"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.category}</option>)}
          </select>
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className="admin-input min-w-[160px]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="quantity-low">Stock: Low to High</option>
            <option value="quantity-high">Stock: High to Low</option>
          </select>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Product</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Category</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Price</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase">Stock</th>
                <th className="px-6 py-4 text-gray-400 font-medium text-sm tracking-wide uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {isLoadingProducts ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium italic">Loading products...</p>
                    </div>
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/10 overflow-hidden shadow-sm ring-1 ring-gray-200 dark:ring-white/10">
                          <img 
                            src={p.image?.url || (typeof p.image === 'string' ? p.image : "https://placehold.co/100x100?text=No+Image")} 
                            alt={p.product} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Error" }}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 dark:text-white group-hover:text-blue-500 transition-colors duration-200">{p.product}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-[200px]">{p.description || "No description"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-500/10">
                        {p.category?.category || (typeof p.category === 'string' ? p.category : "No Category")}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-700 dark:text-blue-400">
                      ${p.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${p.quantity > 5 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500 animate-pulse'}`}></div>
                        <span className={`font-semibold ${p.quantity > 5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                          {p.quantity} <span className="text-[10px] text-gray-400 ml-0.5">units</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isAdmin ? (
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(p)} 
                            className="p-2 text-blue-500 hover:text-white hover:bg-blue-500 rounded-lg transition-all duration-200 transform hover:scale-110 shadow-sm active:scale-95"
                            title="Edit Product"
                          >
                            <i className="bx bx-edit-alt text-lg"></i>
                          </button>
                          <button 
                            onClick={() => handleDelete(p._id)} 
                            className="p-2 text-rose-500 hover:text-white hover:bg-rose-500 rounded-lg transition-all duration-200 transform hover:scale-110 shadow-sm active:scale-95"
                            title="Delete Product"
                          >
                            <i className="bx bx-trash text-lg"></i>
                          </button>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400 text-xs italic">View Only</div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <i className="bx bx-package text-5xl text-gray-300"></i>
                      <p className="text-gray-500 dark:text-gray-400 italic font-medium">No products found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="p-6 border-t border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/30 dark:bg-transparent">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-white/10 transition-all font-semibold text-sm"
              >
                Previous
              </button>
              <button 
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all font-semibold text-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10 animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <i className={`bx ${isEditMode ? 'bx-edit-alt' : 'bx-plus'} text-blue-500`}></i>
                {isEditMode ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 transition-colors">
                <i className="bx bx-x text-2xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Product Name</label>
                  <input 
                    name="product" 
                    value={formData.product} 
                    onChange={handleInputChange} 
                    className="admin-input" 
                    placeholder="e.g. Wireless Mouse" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Category</label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    className="admin-input" 
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.category}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Price ($)</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    className="admin-input" 
                    placeholder="0.00" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Stock Quantity</label>
                  <input 
                    type="number" 
                    name="quantity" 
                    value={formData.quantity} 
                    onChange={handleInputChange} 
                    className="admin-input" 
                    placeholder="0" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows="3"
                  className="admin-input resize-none" 
                  placeholder="Describe the product..."
                />
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Product Image</label>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <i className="bx bx-image-add text-3xl text-gray-400"></i>
                    )}
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/10">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="px-6 py-2.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-8 py-2.5 bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-600 transition-all active:scale-95"
                >
                  {isEditMode ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
