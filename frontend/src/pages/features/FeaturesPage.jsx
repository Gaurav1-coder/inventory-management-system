import React from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  ShoppingCart, 
  ScanBarcode, 
  Users, 
  BarChart3, 
  Globe,
  Zap,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import MainLayout from "../../components/MainLayout";

const features = [
  {
    icon: Package,
    title: "Inventory Tracking",
    desc: "Track stock levels in real-time across multiple warehouses with instant updates.",
    color: "blue"
  },
  {
    icon: ShoppingCart,
    title: "POS Billing",
    desc: "Fast billing and payment support with invoice and receipt generation.",
    color: "emerald"
  },
  {
    icon: ScanBarcode,
    title: "Barcode Scanner",
    desc: "Scan products quickly with integrated barcode support for mobile and desktop.",
    color: "purple"
  },
  {
    icon: Users,
    title: "Employee Management",
    desc: "Manage employee roles, attendance, and productivity reports seamlessly.",
    color: "orange"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    desc: "Analyze sales, profits, customer behavior, and stock performance with AI.",
    color: "indigo"
  },
  {
    icon: Globe,
    title: "Multi Branch Support",
    desc: "Scale your business globally with centralized control over all branches.",
    color: "rose"
  }
];

const FeaturesPage = () => {
  return (
    <MainLayout>
      <section className="bg-white pt-32 pb-40">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6">
              Platform Capabilities
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">
              Enterprise-Grade <br />
              <span className="text-blue-600">Inventory Features</span>
            </h1>
            <p className="text-xl text-slate-600">
              Everything you need to run a high-performance business in one unified, smart platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-100 transition-all group"
              >
                <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-8">{f.desc}</p>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                  Learn more <Zap className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FeaturesPage;
