import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { images } from "../../../constants";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-32">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-60"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-emerald-50 rounded-full blur-3xl opacity-50"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-6">
                <Zap className="w-4 h-4" />
                Next-Gen Inventory Solutions
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-5xl xl:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                Smart Inventory <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                  Management
                </span> System
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Empower your business with real-time tracking, automated supply chains, and intelligent insights. 
                The most professional POS and inventory solution for modern enterprises.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/register")}
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/features")}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                >
                  View Demo
                </motion.button>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-70">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold text-slate-700">Live Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold text-slate-700">Enterprise Security</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10"
            >
              <img
                className="w-full h-auto drop-shadow-2xl"
                src={images.HeroImage}
                alt="Smart Inventory Dashboard"
              />
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 bg-white p-4 rounded-2xl shadow-2xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Revenue Today</p>
                    <p className="text-lg font-extrabold text-slate-800">$12,450</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-5 -right-5 bg-white p-4 rounded-2xl shadow-2xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Stock Health</p>
                    <p className="text-lg font-extrabold text-slate-800">98.5% OK</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
