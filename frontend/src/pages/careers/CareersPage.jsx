import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  X,
  Upload,
  Send,
  CheckCircle2
} from "lucide-react";
import { toast } from "react-hot-toast";
import MainLayout from "../../components/MainLayout";

const jobs = [
  { id: "fs-dev", title: "Senior Full Stack Developer", type: "Full Time", location: "Remote / Mumbai", category: "Engineering" },
  { id: "ui-designer", title: "Product Designer (UI/UX)", type: "Full Time", location: "Remote / Bangalore", category: "Design" },
  { id: "db-admin", title: "Database Administrator", type: "Contract", location: "Remote", category: "Engineering" },
  { id: "cs-manager", title: "Customer Success Manager", type: "Full Time", location: "Delhi", category: "Sales" }
];

const ApplicationModal = ({ job, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    reason: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success("Application Submitted Successfully!");
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden relative"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-all">
          <X className="w-6 h-6 text-slate-400" />
        </button>

        <div className="p-10 lg:p-16">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2 block">Application Form</span>
          <h2 className="text-3xl font-black text-slate-900 mb-2">{job.title}</h2>
          <p className="text-slate-500 mb-10">Please fill in your details to apply for this position.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-2">Email Address</label>
                <input 
                  required
                  type="email" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-2">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-2">Experience (Years)</label>
                <input 
                  required
                  type="number" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="e.g. 5"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-2">Resume Upload (PDF)</label>
              <div className="w-full p-8 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all group">
                <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <p className="text-sm text-slate-500 font-medium">Click to upload or drag and drop</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-2">Why should we hire you?</label>
              <textarea 
                required
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-blue-100 outline-none transition-all h-32 resize-none"
                placeholder="Tell us about your passion..."
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Application"}
              {!loading && <Send className="w-5 h-5" />}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <MainLayout>
      <section className="bg-white pt-32 pb-40">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6">
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">
              Build the future of <br />
              <span className="text-emerald-600">Retail Tech</span>
            </h1>
            <p className="text-xl text-slate-600">
              We're looking for passionate individuals to help us redefine how businesses manage their inventory.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              { icon: Sparkles, title: "Innovation First", desc: "Work with the latest technologies like AI and real-time data streaming." },
              { icon: Users, title: "Global Team", desc: "Collaborate with a diverse team from all over the world." },
              { icon: TrendingUp, title: "Growth Mindset", desc: "Generous learning budget and clear career progression paths." }
            ].map((benefit, i) => (
              <div key={i} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <benefit.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-4">{benefit.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-10">Open Positions</h2>
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2 block">{job.category}</span>
                  <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-6 mt-4 text-slate-500 text-sm">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.location}</div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {job.type}</div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedJob(job)}
                  className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center gap-2 self-start md:self-center"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedJob && (
          <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default CareersPage;

