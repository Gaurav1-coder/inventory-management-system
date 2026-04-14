// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Bell, 
  ScanBarcode, 
  Users,
  ShieldCheck,
  Cloud,
  CheckCircle2,
  Star,
  Quote,
  ArrowRight
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -10 }}
    className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-300 flex flex-col"
  >
    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
      <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-extrabold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm flex-1">{description}</p>
    <Link 
      to="/features"
      className="mt-8 flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all"
    >
      Learn More <ArrowRight className="w-4 h-4" />
    </Link>
    <div className="mt-6 w-10 h-1 bg-blue-100 group-hover:w-full group-hover:bg-blue-600 transition-all duration-500 rounded-full" />
  </motion.div>
);

const TestimonialCard = ({ name, role, content, image, rating }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-xl transition-all"
  >
    <div className="flex gap-1 mb-3">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
      ))}
    </div>
    <p className="text-slate-600 italic text-sm mb-6 leading-relaxed">"{content}"</p>
    <div className="flex items-center gap-3">
      <img src={image} alt={name} className="w-10 h-10 rounded-full object-cover border-2 border-blue-100" />
      <div>
        <h4 className="font-bold text-slate-900 text-xs">{name}</h4>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{role}</p>
      </div>
    </div>
  </motion.div>
);

const About = () => {
  const features = [
    {
      icon: Package,
      title: "Inventory Tracking",
      description: "Track stock levels in real-time across multiple warehouses with instant updates.",
      delay: 0.1
    },
    {
      icon: ShoppingCart,
      title: "Smart POS System",
      description: "Fast billing and payment support with invoice and receipt generation.",
      delay: 0.2
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Analyze sales, profits, customer behavior, and stock performance.",
      delay: 0.3
    },
    {
      icon: Bell,
      title: "Low Stock Alerts",
      description: "Receive automated alerts when stock reaches critical levels.",
      delay: 0.4
    },
    {
      icon: ScanBarcode,
      title: "Barcode Scanner",
      description: "Scan products quickly with integrated barcode support.",
      delay: 0.5
    },
    {
      icon: Users,
      title: "Employee Management",
      description: "Manage employee roles, attendance, and productivity reports.",
      delay: 0.6
    }
  ];

  const testimonials = [
    { name: "Rahul Sharma", role: "Store Owner", content: "Syncing across 5 retail outlets is now seamless.", image: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5 },
    { name: "Priya Verma", role: "Warehouse Manager", content: "Reduced manual entry time by almost 70%.", image: "https://randomuser.me/api/portraits/women/44.jpg", rating: 5 },
    { name: "Aman Gupta", role: "Retail Manager", content: "The clean interface didn't even need training.", image: "https://randomuser.me/api/portraits/men/67.jpg", rating: 5 },
    { name: "Ritika Jain", role: "Business Head", content: "Analytics provide insights we never had before.", image: "https://randomuser.me/api/portraits/women/12.jpg", rating: 5 },
    { name: "Kunal Arora", role: "Shop Manager", content: "Barcode scanning works flawlessly on mobile.", image: "https://randomuser.me/api/portraits/men/45.jpg", rating: 5 },
    { name: "Sneha Kapoor", role: "Supply Chain Lead", content: "Inventory transfers are now just a click away.", image: "https://randomuser.me/api/portraits/women/65.jpg", rating: 5 },
    { name: "Mohit Singh", role: "Wholesaler", content: "Best POS system for high-volume transactions.", image: "https://randomuser.me/api/portraits/men/88.jpg", rating: 5 },
    { name: "Neha Agarwal", role: "FMCG Retailer", content: "Alerts save us from out-of-stock disasters.", image: "https://randomuser.me/api/portraits/women/22.jpg", rating: 5 },
    { name: "Arjun Patel", role: "Logistics Expert", content: "Real-time visibility across all branches is key.", image: "https://randomuser.me/api/portraits/men/91.jpg", rating: 5 },
    { name: "Simran Kaur", role: "Boutique Owner", content: "Simple, powerful, and beautiful UI/UX.", image: "https://randomuser.me/api/portraits/women/33.jpg", rating: 5 },
    { name: "Vikas Yadav", role: "General Manager", content: "Security and cloud sync are enterprise-grade.", image: "https://randomuser.me/api/portraits/men/55.jpg", rating: 5 },
    { name: "Ananya Mehta", role: "Operations Lead", content: "SmartSims is the backbone of our business.", image: "https://randomuser.me/api/portraits/women/54.jpg", rating: 5 }
  ];

  return (
    <div className="space-y-32 pb-32">
      {/* Features Grid */}
      <section className="container mx-auto px-6 pt-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Powerful features to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">scale your business</span>
          </motion.h2>
          <p className="text-slate-600 text-lg">
            Everything you need to manage inventory, sales, and operations in one unified enterprise platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </section>

      {/* Why Choose Us / Detailed Feature */}
      <section className="bg-slate-900 py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-10"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Why Businesses Choose <br />
                <span className="text-blue-400">SmartSims</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                SmartSims empowers businesses with advanced inventory automation, multi-branch stock visibility, real-time analytics, secure cloud sync, and lightning-fast POS operations.
              </p>
              
              <div className="grid grid-cols-1 gap-6">
                {[
                  { icon: CheckCircle2, title: "99.9% Uptime", desc: "Reliable service for round-the-clock operations." },
                  { icon: ShieldCheck, title: "Enterprise Security", desc: "Military-grade encryption for all your sensitive data." },
                  { icon: Cloud, title: "Cloud Backup", desc: "Automatic backups ensure your data is always safe." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-5 p-6 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10"
                  >
                    <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/20 border-8 border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000"
                  alt="Business Team"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6"
          >
            Testimonials
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Trusted by Industry Leaders</h2>
          <p className="text-slate-600 text-lg">Join thousands of businesses already scaling with SmartSims.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;

