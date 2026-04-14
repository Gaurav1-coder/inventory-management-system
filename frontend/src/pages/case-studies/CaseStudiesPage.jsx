// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Globe, ArrowRight, Quote, Star } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";

const cases = [
  {
    id: "freshmart",
    company: "FreshMart Retail",
    logo: "FM",
    result: "45% increase in inventory turnover",
    desc: "How a regional grocery chain automated their stock replenishment across 12 locations using SmartSims.",
    color: "bg-blue-600"
  },
  {
    id: "techgear",
    company: "TechGear Hub",
    logo: "TG",
    result: "Zero stockouts in 6 months",
    desc: "Electronic retailer TechGear used our AI analytics to predict demand and optimize their high-value inventory.",
    color: "bg-emerald-600"
  },
  {
    id: "styleloft",
    company: "StyleLoft Boutique",
    logo: "SL",
    result: "70% faster checkout process",
    desc: "Fashion boutique StyleLoft integrated our POS with their online store for a unified customer experience.",
    color: "bg-purple-600"
  }
];

const CaseStudiesPage = () => {
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
              Success Stories
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">
              Scaling with <br />
              <span className="text-blue-600">SmartSims</span>
            </h1>
            <p className="text-xl text-slate-600">
              Discover how leading businesses use our platform to transform their operations and drive growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cases.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-1 bg-gradient-to-br from-slate-100 to-white rounded-[3rem] shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="bg-white rounded-[2.9rem] p-10 h-full flex flex-col">
                  <div className={`w-16 h-16 ${c.color} rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-8 shadow-lg`}>
                    {c.logo}
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{c.company}</h3>
                  <span className="text-blue-600 font-bold text-sm mb-6 block">{c.result}</span>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">{c.desc}</p>
                  <Link 
                    to={`/case-study/${c.id}`}
                    className="flex items-center gap-2 text-slate-900 font-bold text-sm hover:text-blue-600 transition-colors"
                  >
                    Read Full Story <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 p-12 lg:p-20 bg-slate-50 rounded-[4rem] border border-slate-100 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 italic leading-tight">
                "SmartSims didn't just give us a tool; they gave us a new way to understand our business. The multi-branch sync is truly game-changing."
              </h2>
              <div className="flex items-center gap-4">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-14 h-14 rounded-full border-2 border-white shadow-md" alt="CEO" />
                <div>
                  <h4 className="font-extrabold text-slate-900">David Chen</h4>
                  <p className="text-slate-500 text-sm font-medium">CEO, FreshMart Retail</p>
                </div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {[
                { label: "Active Stores", val: "500+" },
                { label: "Daily Sales", val: "$2M+" },
                { label: "Stock Items", val: "10M+" },
                { label: "Global Users", val: "50k+" }
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 text-center">
                  <h3 className="text-3xl font-black text-blue-600 mb-1">{stat.val}</h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CaseStudiesPage;

