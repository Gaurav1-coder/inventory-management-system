import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ category: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);

  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;
  const role = userInfo?.role || "staff";
  const isAdmin = role === "admin";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/categories");
      const data = response.data;
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error("Unexpected categories data format:", data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error(error.response?.data?.message || "Error fetching categories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Adding category...");
    try {
      await axios.post("/api/categories", formData);
      toast.success("Category added successfully");
      toast.dismiss(loadingToast);
      setIsModalOpen(false);
      setFormData({ category: "", description: "" });
      fetchCategories();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || error.message || "Error adding category");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This will not delete products in this category.")) {
      try {
        await axios.delete(`/api/categories/${id}`);
        toast.success("Category deleted");
        fetchCategories();
      } catch (error) {
        toast.error("Error deleting category");
      }
    }
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Category <span className="text-blue-500">Management</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Organize your products with custom categories</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all duration-300 active:scale-95"
          >
            <i className="bx bx-plus text-xl"></i>
            <span>Add Category</span>
          </button>
        )}
      </div>

      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100 dark:border-white/10">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <i className="bx bx-category text-2xl"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">All Categories</h3>
          <span className="ml-auto px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold uppercase tracking-wider">
            {categories.length} Total
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full py-20 text-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400 italic font-medium">Loading categories...</p>
            </div>
          ) : categories.length > 0 ? (
            categories.map((c) => (
              <div key={c._id} className="group relative bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-5 rounded-2xl hover:bg-white dark:hover:bg-white/10 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-xl font-bold group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    {c.category?.charAt(0).toUpperCase()}
                  </div>
                  {isAdmin && (
                    <button 
                      onClick={() => handleDelete(c._id)} 
                      className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                      title="Delete Category"
                    >
                      <i className="bx bx-trash text-xl"></i>
                    </button>
                  )}
                </div>
                
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-1 group-hover:text-blue-500 transition-colors">
                  {c.category}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-4 line-clamp-2">
                  {c.description || "No description provided for this category."}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-1.5">
                    <i className="bx bx-package text-blue-500"></i>
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                      {c.productCount || 0} Products
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded">
                    /{c.slug}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bx bx-category-alt text-4xl text-gray-300"></i>
              </div>
              <p className="text-gray-500 dark:text-gray-400 italic font-medium">No categories found yet!</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10 animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <i className="bx bx-plus text-blue-500"></i>
                Add New Category
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 transition-colors">
                <i className="bx bx-x text-2xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Category Name</label>
                  <input 
                    type="text" 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. Electronics" 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Brief description of the category..." 
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
