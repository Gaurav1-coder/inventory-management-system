// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Building2, 
  AlertCircle, 
  Lightbulb, 
  Settings, 
  BarChart, 
  Quote, 
  TrendingUp,
  ChevronRight,
  CheckCircle2,
  Zap,
  Star,
  Activity,
  Users
} from "lucide-react";
import MainLayout from "../../components/MainLayout";
import Breadcrumbs from "../../components/BreadCrumbs";

const caseStudyData = {
  freshmart: {
    company: "FreshMart Retail",
    overview: "FreshMart is a regional grocery chain with 12 locations across the Midwest, specializing in fresh produce and organic goods.",
    problem: "Before SmartSims, FreshMart struggled with manual inventory counts that were often inaccurate, leading to frequent stockouts of high-demand items and overstocking of perishables.",
    solution: "By implementing SmartSims across all 12 branches, FreshMart gained real-time visibility into their stock levels and automated their replenishment process.",
    process: "We phased the rollout over 4 weeks, starting with their main warehouse and then training branch managers on the POS and stock transfer modules.",
    stats: [
      { label: "Inventory Turnover", value: "+45%", icon: TrendingUp },
      { label: "Manual Data Entry", value: "-70%", icon: Settings },
      { label: "Waste Reduction", value: "30%", icon: BarChart }
    ],
    testimonial: {
      text: "The multi-branch sync is truly game-changing. We've seen a massive boost in efficiency and a significant drop in food waste.",
      author: "David Chen",
      role: "CEO, FreshMart Retail",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    comparison: [
      { before: "Manual spreadsheet tracking", after: "Automated real-time cloud sync" },
      { before: "Reactive ordering (Stockouts)", after: "Predictive AI-driven replenishment" },
      { before: "2-hour end-of-day reports", after: "Instant live analytics dashboard" }
    ],
    color: "blue"
  },
  techgear: {
    company: "TechGear Hub",
    overview: "TechGear Hub is a premier electronics retailer known for high-value inventory and cutting-edge consumer gadgets.",
    problem: "Managing high-value items required absolute precision. Their old system lacked serialized tracking, making it impossible to track specific unit history or batch movements.",
    solution: "SmartSims provided the serialized tracking and batch management TechGear needed to secure their inventory and optimize their high-turnover SKUs.",
    process: "Integration with their existing barcode infrastructure was seamless, taking only 10 days to fully migrate their 50,000+ SKU database.",
    stats: [
      { label: "Stock Accuracy", value: "99.9%", icon: CheckCircle2 },
      { label: "Shrinkage Reduction", value: "25%", icon: AlertCircle },
      { label: "Order Processing", value: "2x Faster", icon: Zap }
    ],
    testimonial: {
      text: "The precision SmartSims offers is unparalleled. We now know exactly where every single item is, across every branch, at any moment.",
      author: "Sarah Jenkins",
      role: "Operations Director, TechGear",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    comparison: [
      { before: "Missing serialized history", after: "Full lifecycle unit tracking" },
      { before: "Slow manual barcode entry", after: "Lightning-fast integrated scanning" },
      { before: "High shrinkage rates", after: "Complete audit logs & accountability" }
    ],
    color: "emerald"
  },
  styleloft: {
    company: "StyleLoft Boutique",
    overview: "StyleLoft is a high-end fashion boutique with a focus on curated designer collections and personalized customer service.",
    problem: "Their legacy POS was clunky and didn't support modern payment methods or loyalty points, causing long queues and missed sales opportunities.",
    solution: "The SmartSims POS module transformed their checkout experience with UPI/Card support and a built-in customer loyalty engine.",
    process: "StyleLoft staff were trained in a single afternoon. The intuitive UI meant they could start processing sales immediately.",
    stats: [
      { label: "Checkout Speed", value: "+70%", icon: Zap },
      { label: "Customer Loyalty", value: "+40%", icon: Users },
      { label: "Return Customers", value: "1.5x", icon: Star }
    ],
    testimonial: {
      text: "Our customers love the new checkout process. It's fast, professional, and the loyalty points keep them coming back for more.",
      author: "Elena Rodriguez",
      role: "Founder, StyleLoft",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    comparison: [
      { before: "5-minute checkout time", after: "Sub-60 second billing" },
      { before: "No customer purchase history", after: "Rich customer profiles & loyalty" },
      { before: "Cash-only or clunky card ops", after: "Seamless multi-payment support" }
    ],
    color: "purple"
  }
};

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-12">
    <div className="h-20 bg-slate-100 rounded-3xl w-3/4" />
    <div className="flex gap-4">
      <div className="h-16 bg-slate-50 rounded-2xl w-32" />
      <div className="h-16 bg-slate-50 rounded-2xl w-32" />
      <div className="h-16 bg-slate-50 rounded-2xl w-32" />
    </div>
    <div className="grid grid-cols-3 gap-16">
      <div className="col-span-2 space-y-8">
        <div className="h-64 bg-slate-50 rounded-[3rem]" />
        <div className="h-64 bg-slate-50 rounded-[3rem]" />
      </div>
      <div className="space-y-8">
        <div className="h-80 bg-slate-900/5 rounded-[3rem]" />
        <div className="h-48 bg-blue-50/50 rounded-[3rem]" />
      </div>
    </div>
  </div>
);

const CaseStudyDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const data = caseStudyData[id];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  if (!data) return <Navigate to="/case-studies" />;

  return (
    <MainLayout>
      <section className="bg-white pt-32 pb-40">
        <div className="container mx-auto px-6">
          <Breadcrumbs />
          <Link 
            to="/case-studies" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-all mb-12 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies
          </Link>

          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LoadingSkeleton />
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* Header */}
                  <div className="mb-20 text-center lg:text-left">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
                      How {data.company} <br />
                      <span className="text-blue-600">Scaled with SmartSims</span>
                    </h1>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                      {data.stats.map((stat, i) => (
                        <div key={i} className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                          <stat.icon className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Content Main */}
                    <div className="lg:col-span-2 space-y-20">
                      <section>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-blue-600" />
                          </div>
                          1. Company Overview
                        </h2>
                        <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                          <p className="text-lg text-slate-600 leading-relaxed">{data.overview}</p>
                        </div>
                      </section>

                      <section>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-4">
                          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-red-500" />
                          </div>
                          2. The Challenge
                        </h2>
                        <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                          <p className="text-lg text-slate-600 leading-relaxed">{data.problem}</p>
                        </div>
                      </section>

                      <section>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                            <Lightbulb className="w-6 h-6 text-emerald-500" />
                          </div>
                          3. The Solution
                        </h2>
                        <div className="p-8 bg-emerald-50/30 border border-emerald-100 rounded-[2.5rem]">
                          <p className="text-lg text-slate-600 leading-relaxed">{data.solution}</p>
                        </div>
                      </section>

                      <section>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                            <Settings className="w-6 h-6 text-purple-600" />
                          </div>
                          4. Implementation Process
                        </h2>
                        <div className="relative pl-8 border-l-2 border-slate-100 space-y-8">
                          {data.process.split('. ').map((step, i) => (
                            <div key={i} className="relative">
                              <div className="absolute -left-[2.6rem] top-1 w-4 h-4 rounded-full bg-white border-4 border-purple-600" />
                              <p className="text-lg text-slate-600">{step}.</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-12">
                      {/* 5. Results/Statistics */}
                      <div className="p-8 bg-white rounded-[3rem] border border-slate-100 shadow-xl">
                        <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
                          <Activity className="w-5 h-5 text-blue-600" />
                          Key Results
                        </h3>
                        <div className="space-y-6">
                          {data.stats.map((stat, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                              <span className="text-sm font-bold text-slate-500">{stat.label}</span>
                              <span className="text-lg font-black text-blue-600">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 7. Before vs After */}
                      <div className="p-8 bg-slate-900 rounded-[3rem] text-white shadow-2xl">
                        <h3 className="text-2xl font-bold mb-8 text-blue-400">Before vs After</h3>
                        <div className="space-y-6">
                          {data.comparison.map((item, i) => (
                            <div key={i} className="space-y-2 pb-6 border-b border-white/10 last:border-0">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Before</p>
                              </div>
                              <p className="text-sm line-through opacity-50 ml-3.5">{item.before}</p>
                              <div className="flex items-center gap-2 mb-1 mt-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">After</p>
                              </div>
                              <p className="text-sm font-bold ml-3.5">{item.after}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 6. Customer Testimonial */}
                      <div className="p-8 bg-blue-50 rounded-[3rem] border border-blue-100 relative overflow-hidden">
                        <Quote className="absolute top-4 right-4 w-12 h-12 text-blue-200/50" />
                        <p className="text-slate-700 italic leading-relaxed mb-8 relative z-10 text-lg">
                          "{data.testimonial.text}"
                        </p>
                        <div className="flex items-center gap-4">
                          <img src={data.testimonial.image} className="w-14 h-14 rounded-full border-2 border-white shadow-md" alt="Avatar" />
                          <div>
                            <h4 className="font-extrabold text-slate-900">{data.testimonial.author}</h4>
                            <p className="text-slate-500 text-sm font-medium">{data.testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 8. Growth Graph/Chart */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 lg:p-20 bg-slate-50 rounded-[4rem] border border-slate-100 text-center"
                  >
                    <div className="max-w-3xl mx-auto mb-16">
                      <h3 className="text-3xl font-black text-slate-900 mb-4">6-Month Growth Visualization</h3>
                      <p className="text-lg text-slate-500">How {data.company} transformed their operations using SmartSims' predictive analytics and real-time inventory management.</p>
                    </div>
                    
                    <div className="h-80 bg-white rounded-[3rem] border border-slate-100 flex items-end justify-around p-8 lg:p-16 gap-4 lg:gap-8 shadow-inner">
                      {[40, 65, 55, 85, 75, 100].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-4 h-full justify-end">
                          <motion.div 
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ delay: i * 0.1, duration: 1 }}
                            className="w-full bg-blue-600 rounded-2xl relative group shadow-lg shadow-blue-200/50"
                          >
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap">
                              {h}% Efficiency
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                          </motion.div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Month {i+1}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CaseStudyDetail;

