// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Terminal, 
  HelpCircle, 
  Layout, 
  ArrowRight, 
  Zap, 
  Code, 
  Search, 
  ChevronDown, 
  Copy, 
  Check,
  Settings,
  ShoppingCart,
  Package,
  FileText,
  GitBranch,
  Users,
  AlertTriangle
} from "lucide-react";
import MainLayout from "../../components/MainLayout";
import Breadcrumbs from "../../components/BreadCrumbs";

const docContent = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: BookOpen,
    content: "SmartSims is designed to be intuitive. To begin, register your main store account. Once verified, you can access the Super Admin portal to configure your global settings and subscription plan.",
    code: "npm install smartsims-client"
  },
  {
    id: "installation",
    title: "Installation Guide",
    icon: Settings,
    content: "Our platform is cloud-based, but you can integrate our local POS agent for hardware support. Download the installer for your OS and follow the step-by-step wizard.",
    code: "./install-pos-agent.sh --token YOUR_API_KEY"
  },
  {
    id: "dashboard",
    title: "Dashboard Guide",
    icon: Layout,
    content: "The dashboard provides a bird's-eye view of your entire operation. Monitor real-time sales, active cashiers, and low-stock alerts across all branches from a single screen.",
  },
  {
    id: "pos-usage",
    title: "POS Usage",
    icon: ShoppingCart,
    content: "Our POS is built for speed. Use the search bar or barcode scanner to add items. You can hold orders, apply manual discounts, and process payments via Cash, Card, or UPI.",
  },
  {
    id: "inventory",
    title: "Inventory Management",
    icon: Package,
    content: "Manage your catalog with ease. Add products with SKUs, categories, and tax levels. Use the stock transfer module to move inventory between branches without manual entry errors.",
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    icon: FileText,
    content: "Generate detailed PDF or Excel reports for sales, employee performance, and profit/loss. Our AI engine also provides predictive stock replenishment suggestions.",
  },
  {
    id: "branches",
    title: "Branch Management",
    icon: GitBranch,
    content: "Add new branches as your business grows. Assign dedicated managers and set location-specific tax rates or pricing if needed.",
  },
  {
    id: "employees",
    title: "Employee Management",
    icon: Users,
    content: "Control access with Role-Based Access Control (RBAC). Create accounts for cashiers, branch managers, and warehouse staff with specific permissions.",
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: AlertTriangle,
    content: "If you encounter sync issues, ensure your internet connection is stable. Use the 'Sync Force' button in the POS settings to manually refresh the local database.",
  },
  {
    id: "faq",
    title: "FAQ",
    icon: HelpCircle,
    content: "Find answers to common questions about SmartSims, subscription billing, and data security.",
    questions: [
      { q: "Is my data secure?", a: "Yes, we use enterprise-grade encryption and multi-tenant isolation." },
      { q: "Can I use it offline?", a: "The POS works offline and syncs automatically when the connection is restored." },
      { q: "Do you support custom integrations?", a: "Yes, check our API reference for developer tools." }
    ]
  }
];

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group mt-4">
      <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-blue-400 overflow-x-auto">
        <code>{code}</code>
      </div>
      <button 
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};

const AccordionItem = ({ item, isOpen, onToggle }) => {
  return (
    <motion.div 
      id={item.id}
      initial={false}
      className="border border-slate-100 rounded-[2rem] overflow-hidden mb-6 scroll-mt-40 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isOpen ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"}`}>
            <item.icon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">{item.title}</h2>
        </div>
        <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-8 pb-8 pt-2">
              <div className="prose prose-slate prose-lg max-w-none">
                <p className="text-slate-600 leading-relaxed mb-8">
                  {item.content}
                </p>
                
                {item.code && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Example Command</h4>
                    <CodeBlock code={item.code} />
                  </div>
                )}

                {item.questions && (
                  <div className="mt-8 space-y-6">
                    {item.questions.map((faq, i) => (
                      <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="font-extrabold text-slate-900 mb-2 flex items-center gap-3">
                          <HelpCircle className="w-4 h-4 text-blue-600" />
                          {faq.q}
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                <button className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-all flex items-center gap-2">
                  Was this helpful? 
                  <div className="flex gap-2 ml-2">
                    <span className="px-3 py-1 bg-slate-50 rounded-lg hover:bg-blue-50 transition-all cursor-pointer">Yes</span>
                    <span className="px-3 py-1 bg-slate-50 rounded-lg hover:bg-red-50 transition-all cursor-pointer">No</span>
                  </div>
                </button>
                <button className="text-sm font-bold text-blue-600 flex items-center gap-2">
                  Copy Link <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DocumentationPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeId, setActiveId] = useState("getting-started");
  const [openIds, setOpenIds] = useState(["getting-started"]);

  const toggleAccordion = (id) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    setActiveId(id);
  };

  const filteredDocs = docContent.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <section className="bg-slate-50/50 pt-32 pb-40 min-h-screen">
        <div className="container mx-auto px-6">
          <Breadcrumbs />
          <div className="max-w-3xl mb-20">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">Documentation</h1>
            <p className="text-xl text-slate-500 leading-relaxed">Everything you need to know about setting up and scaling with SmartSims.</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Sidebar Navigation */}
            <aside className="lg:w-1/4 sticky top-32 space-y-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search docs..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <nav className="space-y-1">
                {docContent.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (!openIds.includes(item.id)) toggleAccordion(item.id);
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeId === item.id 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                        : "text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${activeId === item.id ? "text-white" : "text-slate-400"}`} />
                    {item.title}
                  </button>
                ))}
              </nav>

              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl">
                <h4 className="text-lg font-black mb-2 relative z-10">Still stuck?</h4>
                <p className="text-sm text-slate-400 mb-6 relative z-10 leading-relaxed">Our support team is available 24/7 for Enterprise customers.</p>
                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-blue-600 hover:text-white transition-all relative z-10">
                  Open Support Ticket
                </button>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-blue-600/40 transition-all" />
              </div>
            </aside>

            {/* Content Area */}
            <main className="lg:w-3/4">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((item) => (
                  <AccordionItem 
                    key={item.id} 
                    item={item} 
                    isOpen={openIds.includes(item.id)}
                    onToggle={() => toggleAccordion(item.id)}
                  />
                ))
              ) : (
                <div className="text-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold">No documentation found matching "{searchQuery}"</p>
                </div>
              )}
            </main>

          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default DocumentationPage;

