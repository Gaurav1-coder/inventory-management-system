import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  
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
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products");
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const fetchCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const { data } = await axios.get("/api/categories");
      setCategories(data || []);
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
      category: product.category,
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
    <div className="products-page">
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div className="left">
          <h1 style={{ fontSize: '24px', fontWeight: '700' }}>Product Management</h1>
          <p style={{ color: 'var(--dark-grey)', fontSize: '14px' }}>Manage your inventory items</p>
        </div>
        <button className="report" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
          <i className="bx bx-plus" style={{ fontSize: '20px' }}></i>
          <span>Add Product</span>
        </button>
      </div>

      <div className="filters-section" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', background: 'var(--light)', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
          <i className="bx bx-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dark-grey)' }}></i>
          <input 
            type="text" 
            placeholder="Search product name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid var(--grey)', background: 'var(--light)', color: 'var(--dark)' }}
          />
        </div>
        <select 
          value={categoryFilter} 
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--grey)', background: 'var(--light)', color: 'var(--dark)', minWidth: '150px' }}
        >
          <option value="">All Categories</option>
          {categories.map(c => <option key={c._id} value={c.category}>{c.category}</option>)}
        </select>
        <select 
          value={sort} 
          onChange={(e) => setSort(e.target.value)}
          style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--grey)', background: 'var(--light)', color: 'var(--dark)', minWidth: '150px' }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="quantity-low">Stock: Low to High</option>
          <option value="quantity-high">Stock: High to Low</option>
        </select>
      </div>

      <div className="bottom-data">
        <div className="orders" style={{ background: 'var(--light)', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div className="header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <i className="bx bx-package" style={{ fontSize: '24px', color: 'var(--primary)' }}></i>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Product Inventory</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--grey)' }}>
                <th style={{ textAlign: 'left', padding: '15px', color: 'var(--dark-grey)', fontWeight: '600' }}>Product</th>
                <th style={{ textAlign: 'left', padding: '15px', color: 'var(--dark-grey)', fontWeight: '600' }}>Category</th>
                <th style={{ textAlign: 'left', padding: '15px', color: 'var(--dark-grey)', fontWeight: '600' }}>Price</th>
                <th style={{ textAlign: 'left', padding: '15px', color: 'var(--dark-grey)', fontWeight: '600' }}>Stock</th>
                <th style={{ textAlign: 'left', padding: '15px', color: 'var(--dark-grey)', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingProducts ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>Loading products...</td></tr>
              ) : products.length > 0 ? (
                products.map((p) => (
                  <tr key={p._id} style={{ borderBottom: '1px solid var(--grey)' }}>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img 
                          src={p?.image?.url || (typeof p?.image === 'string' ? p.image : "https://via.placeholder.com/48")} 
                          alt="" 
                          style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }} 
                        />
                        <span style={{ fontWeight: '500' }}>{p?.product || "Unnamed"}</span>
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ background: 'var(--grey)', padding: '4px 10px', borderRadius: '6px', fontSize: '13px' }}>
                        {p?.category?.name || (typeof p?.category === 'string' ? p.category : "No Category")}
                      </span>
                    </td>
                    <td style={{ padding: '15px', fontWeight: '600' }}>${p.price}</td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ 
                          fontWeight: '700', 
                          color: p.quantity < 5 ? 'var(--danger)' : 'inherit'
                        }}>
                          {p.quantity}
                        </span>
                        {p.quantity < 5 && (
                          <span style={{ background: 'var(--light-danger)', color: 'var(--danger)', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: '700', textTransform: 'uppercase' }}>
                            Low Stock
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => handleEdit(p)} style={{ color: 'var(--primary)', border: 'none', background: 'var(--light-primary)', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="bx bx-edit-alt" style={{ fontSize: '18px' }}></i>
                        </button>
                        <button onClick={() => handleDelete(p._id)} style={{ color: 'var(--danger)', border: 'none', background: 'var(--light-danger)', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="bx bx-trash" style={{ fontSize: '18px' }}></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '60px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                      <i className="bx bx-search-alt" style={{ fontSize: '48px', color: 'var(--grey)' }}></i>
                      <p style={{ color: 'var(--dark-grey)', fontWeight: '500' }}>No products found yet!</p>
                      <button className="report" onClick={() => setIsModalOpen(true)}>Add your first product</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '24px' }}>
              <button 
                disabled={page === 1} 
                onClick={() => setPage(page - 1)}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--grey)', background: page === 1 ? '#f5f5f5' : 'var(--light)', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
              >
                Previous
              </button>
              <span style={{ display: 'flex', alignItems: 'center', fontWeight: '600' }}>Page {page} of {totalPages}</span>
              <button 
                disabled={page === totalPages} 
                onClick={() => setPage(page + 1)}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--grey)', background: page === totalPages ? '#f5f5f5' : 'var(--light)', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2001, padding: '20px' }}>
          <div className="modal-content" style={{ background: 'var(--light)', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700' }}>{isEditMode ? "Edit Product" : "Add New Product"}</h2>
              <i className="bx bx-x" onClick={closeModal} style={{ fontSize: '28px', cursor: 'pointer', color: 'var(--dark-grey)' }}></i>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Product Name</label>
                <input type="text" name="product" value={formData.product} onChange={handleInputChange} required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--grey)', background: 'var(--light)', color: 'var(--dark)' }} />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--grey)', background: 'var(--light)', color: 'var(--dark)', minHeight: '100px' }}></textarea>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Price ($)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--grey)', background: 'var(--light)', color: 'var(--dark)' }} />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Quantity</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--grey)', background: 'var(--light)', color: 'var(--dark)' }} />
                </div>
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} required style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--grey)', background: 'var(--light)', color: 'var(--dark)' }}>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c._id} value={c.category}>{c.category}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Product Image</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '12px', border: '2px dashed var(--grey)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#f9f9f9' }}>
                    {imagePreview ? <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <i className="bx bx-image-add" style={{ fontSize: '32px', color: 'var(--dark-grey)' }}></i>}
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ flex: 1 }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                <button type="submit" className="report" style={{ flex: 2, padding: '14px' }}>{isEditMode ? "Update Product" : "Save Product"}</button>
                <button type="button" onClick={closeModal} style={{ flex: 1, background: 'var(--grey)', color: 'var(--dark)', border: 'none', padding: '14px', borderRadius: '36px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
