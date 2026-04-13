import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Code, 
  Copy, 
  Check, 
  Zap, 
  Lock, 
  ArrowRight,
  Database,
  ShoppingCart,
  Package,
  Users,
  Search
} from "lucide-react";
import MainLayout from "../../components/MainLayout";
import Breadcrumbs from "../../components/BreadCrumbs";

const endpoints = [
  {
    method: "GET",
    url: "/api/product",
    desc: "Fetch all products available in the inventory. Supports filtering by storeId or branchId.",
    params: [
      { name: "storeId", type: "string", required: false, desc: "Filter by store ID" },
      { name: "branchId", type: "string", required: false, desc: "Filter by branch ID" }
    ],
    request: null,
    response: {
      status: 200,
      data: [{ id: "prod_123", name: "Apple iPhone 15", sku: "IPH15-128", price: 999 }]
    }
  },
  {
    method: "POST",
    url: "/api/product",
    desc: "Create a new product in the inventory database.",
    params: [],
    request: {
      name: "Apple iPhone 15",
      sku: "IPH15-128",
      category: "cat_electronics",
      costPrice: 800,
      sellingPrice: 999,
      quantity: 50,
      storeId: "store_001"
    },
    response: {
      status: 201,
      message: "Product created successfully",
      id: "prod_123"
    }
  },
  {
    method: "PUT",
    url: "/api/product/:id",
    desc: "Update details of an existing product.",
    params: [
      { name: "id", type: "string", required: true, desc: "Product ID to update" }
    ],
    request: { quantity: 60 },
    response: { status: 200, message: "Product updated" }
  },
  {
    method: "DELETE",
    url: "/api/product/:id",
    desc: "Permanently remove a product from the inventory.",
    params: [
      { name: "id", type: "string", required: true, desc: "Product ID to delete" }
    ],
    request: null,
    response: { status: 200, message: "Product deleted" }
  },
  {
    method: "GET",
    url: "/api/order",
    desc: "Retrieve a list of all sales orders. Can be filtered by customer or date range.",
    params: [
      { name: "customerId", type: "string", required: false, desc: "Filter by customer ID" },
      { name: "startDate", type: "string", required: false, desc: "ISO date string" }
    ],
    request: null,
    response: {
      status: 200,
      data: [{ id: "ord_999", total: 1200, items: 3, status: "completed" }]
    }
  },
  {
    method: "POST",
    url: "/api/order",
    desc: "Create a new sales order. Automatically deducts stock from inventory.",
    params: [],
    request: {
      items: [
        { productId: "prod_123", quantity: 2 }
      ],
      paymentMethod: "UPI",
      branchId: "br_001"
    },
    response: {
      status: 201,
      orderId: "ord_999",
      invoiceUrl: "https://smartsims.com/inv/ord_999"
    }
  }
];

const EndpointCard = ({ endpoint }) => {
  const [copied, setCopied] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(`http://localhost:9000${endpoint.url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const methodColors = {
    GET: "bg-blue-100 text-blue-700",
    POST: "bg-emerald-100 text-emerald-700",
    PUT: "bg-amber-100 text-amber-700",
    DELETE: "bg-red-100 text-red-700"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden mb-12"
    >
      <div className="p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${methodColors[endpoint.method]}`}>
              {endpoint.method}
            </span>
            <code className="text-lg font-bold text-slate-900">{endpoint.url}</code>
          </div>
          <button 
            onClick={copyUrl}
            className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-600 transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy Endpoint"}
          </button>
        </div>

        <p className="text-slate-600 mb-10 leading-relaxed max-w-3xl">
          {endpoint.desc}
        </p>

        {endpoint.params.length > 0 && (
          <div className="mb-10">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Parameters</h4>
            <div className="space-y-4">
              {endpoint.params.map((p, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <code className="text-blue-600 font-bold">{p.name}</code>
                  <span className="text-xs font-bold text-slate-400 uppercase">{p.type}</span>
                  <span className="text-slate-500 text-sm">{p.desc}</span>
                  {p.required && <span className="ml-auto text-[10px] font-black text-red-500 uppercase">Required</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Request Example */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Request Body</h4>
            <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm text-blue-400 overflow-x-auto h-48">
              <pre>{JSON.stringify(endpoint.request || {}, null, 2)}</pre>
            </div>
          </div>

          {/* Response Example */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Response Example</h4>
              <span className="text-xs font-bold text-emerald-500">{endpoint.response.status} OK</span>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm text-emerald-400 overflow-x-auto h-48">
              <pre>{JSON.stringify(endpoint.response, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const APIReferencePage = () => {
  const [search, setSearch] = useState("");

  const filteredEndpoints = endpoints.filter(e => 
    e.url.toLowerCase().includes(search.toLowerCase()) ||
    e.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <section className="bg-slate-50 pt-32 pb-40 min-h-screen">
        <div className="container mx-auto px-6">
          <Breadcrumbs />
          <div className="max-w-5xl mx-auto">
            
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-24"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6">
                Developer API
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8">
                API <span className="text-blue-600">Reference</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                Integrate SmartSims directly into your existing workflows. Our REST API follows standard conventions and returns JSON-encoded responses.
              </p>

              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search endpoints..."
                  className="w-full pl-16 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] shadow-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-lg"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </motion.div>

            {/* Auth Info */}
            <div className="p-8 bg-blue-600 rounded-[3rem] text-white shadow-2xl shadow-blue-200 mb-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <Lock className="w-8 h-8" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-black mb-2">Authentication Required</h3>
                <p className="text-blue-50/80 leading-relaxed">All requests must include a Bearer token in the Authorization header. You can generate tokens in the Super Admin settings panel.</p>
              </div>
              <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all shrink-0">
                Read Auth Guide
              </button>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            </div>

            {/* Endpoints */}
            <div className="space-y-12">
              {filteredEndpoints.length > 0 ? (
                filteredEndpoints.map((e, i) => (
                  <EndpointCard key={i} endpoint={e} />
                ))
              ) : (
                <div className="text-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold">No endpoints found matching "{search}"</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default APIReferencePage;
