import React from "react";
import { motion } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Target, 
  Lightbulb, 
  Code2, 
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Zap,
  MessageSquare,
  Briefcase,
  Star,
  Quote
} from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import MainLayout from "../../components/MainLayout";

const founderData = {
  gaurav: {
    name: "Gaurav Katiyar",
    role: "Team Lead / Full Stack Developer",
    image: "https://tse1.mm.bing.net/th/id/OIP.JCApWuTUQXEqN4zwYIsZagHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3",
    banner: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200",
    skills: ["Strategic Leadership", "Retail Tech", "Business Development", "Enterprise Architecture"],
    bio: "Gaurav is a visionary leader with over 2 years of experience in the retail technology sector. He founded SmartSims with the goal of bringing enterprise-grade inventory solutions to businesses of all sizes.",
    whyProject: "I wanted to simplify inventory operations for businesses and create an enterprise-level platform that solves real-world stock and sales challenges. Seeing local businesses struggle with manual tracking was the spark.",
    benefits: "By choosing SmartSims, businesses get a 45% boost in inventory turnover and 100% real-time data accuracy across all their branches.",
    vision: "To create a global standard for inventory management where automation and AI drive every business decision, making 'out of stock' a thing of the past.",
    responsibilities: [
      "Designed the core system architecture for multi-branch scalability.",
      "Established strategic partnerships with global logistics providers.",
      "Led the initial product vision and roadmap development."
    ],
    quote: "Empowering businesses through technology isn't just a goal; it's our responsibility.",
    social: { twitter: "#", linkedin: "#", github: "#" }
  },
  vamika: {
    name: "Vamika Solanki",
    role: "PRODUCT DESIGN / UI-UX",
    image: "https://thumbs.dreamstime.com/b/programmer-developer-flat-style-illustration-white-background-isolated-character-ai-generated-335094652.jpg",
    banner: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200",
    skills: ["Product Strategy", "User Experience", "Market Analysis", "Agile Management"],
    bio: "vamika is a product strategist who believes that great software should be as intuitive as it is powerful. She oversees the product lifecycle at SmartSims, ensuring we meet our users' evolving needs.",
    whyProject: "Software in the inventory space was either too simple or too complex. I joined to build that perfect middle ground—a premium platform that's actually enjoyable to use.",
    benefits: "Our users experience a 70% reduction in manual data entry time and a significantly faster checkout process at the POS.",
    vision: "For SmartSims to be the most user-centric business tool in the world, where design excellence meets operational power.",
    responsibilities: [
      "Defined the user experience for the POS and Branch Manager portals.",
      "Managed the development sprints and cross-functional team communication.",
      "Conducted extensive market research to shape feature priorities."
    ],
    quote: "Design is not just what it looks like; it's how it works for the end user.",
    social: { twitter: "#", linkedin: "#", github: "#" }
  },
  vanshika: {
    name: "Vanshika Gupta",
    role: "Database Engineer",
    image: "https://tse3.mm.bing.net/th/id/OIP.t0jfkUl0k1csBOy9CGB26gHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3",
    banner: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200",
    skills: ["MongoDB", "Database Optimization", "Data Security", "Scalable Systems"],
    bio: "Vanshika is an architecture expert specializing in high-scale data systems. She ensures that SmartSims remains lightning-fast and secure, even as our data grows into the millions of records.",
    whyProject: "The challenge of maintaining real-time data integrity across thousands of branches simultaneously was too exciting to pass up. I wanted to build a bulletproof data engine.",
    benefits: "Absolute data security with multi-tenant isolation and zero-latency stock synchronization across thousands of locations.",
    vision: "A backend that is invisible because it's so reliable—zero latency, absolute security, and perfect data synchronization.",
    responsibilities: [
      "Optimized MongoDB queries reducing report generation time by 60%.",
      "Implemented the multi-tenant database structure for SaaS security.",
      "Developed the real-time stock sync engine using change streams."
    ],
    quote: "Data is the soul of inventory; we make sure that soul is secure and fast.",
    social: { twitter: "#", linkedin: "#", github: "#" }
  },
  uplaksh: {
    name: "Uplaksh",
    role: "Frontend Developer",
    image: "https://tse1.mm.bing.net/th/id/OIP.jImm8EEaNUGRea8O2KYuigAAAA?w=400&h=400&rs=1&pid=ImgDetMain&o=7&rm=3",
    banner: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200",
    skills: ["React.js", "Tailwind CSS", "Framer Motion", "UI/UX Design"],
    bio: "Uplaksh is a UI/UX enthusiast who is passionate about crafting beautiful, high-performance web experiences. He is the hand behind the premium look and feel of the SmartSims platform.",
    whyProject: "Enterprise software shouldn't be ugly. I wanted to prove that a business tool could have the same premium, animated feel as the best consumer apps.",
    benefits: "A stunning, responsive interface that reduces employee training time and increases operational efficiency through intuitive design.",
    vision: "To make SmartSims the most visually stunning and responsive SaaS platform in the industry.",
    responsibilities: [
      "Developed the entire premium UI component library.",
      "Implemented complex Framer Motion animations for the landing page.",
      "Ensured pixel-perfect responsiveness across all device types."
    ],
    quote: "Every pixel matters when you're building the future of business operations.",
    social: { twitter: "#", linkedin: "#", github: "#" }
  }
};

const FounderProfile = () => {
  const { id } = useParams();
  const founder = founderData[id];

  if (!founder) return <Navigate to="/about" />;

  return (
    <MainLayout>
      <div className="bg-white min-h-screen pb-40">
        {/* Hero Banner */}
        <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={founder.banner} 
            className="w-full h-full object-cover"
            alt="Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-white" />
          
          <div className="absolute bottom-0 left-0 w-full">
            <div className="container mx-auto px-6">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="flex flex-col md:flex-row items-end gap-8 pb-10"
               >
                  <div className="relative shrink-0">
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] border-[10px] border-white overflow-hidden shadow-2xl bg-white">
                       <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                    </div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200"
                    >
                       <Star className="w-6 h-6" />
                    </motion.div>
                  </div>
                  
                  <div className="mb-4">
                     <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">
                        {founder.role}
                     </span>
                     <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight">
                        {founder.name}
                     </h1>
                  </div>
               </motion.div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Sidebar: About & Socials */}
            <div className="lg:col-span-4 space-y-10">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100"
               >
                  <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                     <Target className="w-5 h-5 text-blue-600" />
                     About {founder.name.split(' ')[0]}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                     {founder.bio}
                  </p>
                  
                  <div className="mt-10 pt-10 border-t border-slate-200 flex gap-4">
                     {[
                       { Icon: FaLinkedin, link: founder.social.linkedin, color: "bg-[#0077b5]" },
                       { Icon: FaGithub, link: founder.social.github, color: "bg-[#333]" },
                       { Icon: FaTwitter, link: founder.social.twitter, color: "bg-[#1da1f2]" }
                     ].map((s, i) => (
                        <motion.a
                          key={i}
                          href={s.link}
                          whileHover={{ y: -5, scale: 1.1 }}
                          className={`w-12 h-12 ${s.color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-all`}
                        >
                           <s.Icon className="w-5 h-5" />
                        </motion.a>
                     ))}
                  </div>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="p-10 bg-blue-600 rounded-[3rem] text-white shadow-2xl shadow-blue-200"
               >
                  <Quote className="w-10 h-10 mb-6 text-blue-300" />
                  <p className="text-xl font-bold leading-relaxed italic">
                     "{founder.quote}"
                  </p>
               </motion.div>
            </div>

            {/* Right Main: Skills, Why Project, Responsibilities */}
            <div className="lg:col-span-8 space-y-16">
               {/* Why Joined Section */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
                  <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
                     <Lightbulb className="w-8 h-8 text-emerald-500" />
                     Why I Joined This Project
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium relative z-10">
                     {founder.whyProject}
                  </p>
               </motion.div>

               {/* Skills Grid */}
               <div className="space-y-8">
                  <h3 className="text-2xl font-black text-slate-900 px-2">Core Expertise</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {founder.skills.map((skill, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                      >
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform">
                           <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-800">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
               </div>

               {/* Responsibilities */}
               <div className="space-y-8">
                  <h3 className="text-2xl font-black text-slate-900 px-2">Key Responsibilities</h3>
                  <div className="space-y-4">
                     {founder.responsibilities.map((r, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                        >
                           <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:bg-blue-600 transition-colors">
                              <Briefcase className="w-6 h-6" />
                           </div>
                           <p className="text-lg text-slate-600 font-medium leading-relaxed">{r}</p>
                        </motion.div>
                     ))}
                  </div>
               </div>

               {/* Bottom CTA */}
               <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-100">
                  <Link to="/about">
                     <motion.button 
                       whileHover={{ x: -5 }}
                       className="flex items-center gap-3 text-slate-500 font-black hover:text-blue-600 transition-colors"
                     >
                        <ArrowLeft className="w-6 h-6" />
                        Back to Team
                     </motion.button>
                  </Link>
                  
                  <Link to="/contact">
                     <motion.button 
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       className="px-10 py-5 bg-slate-900 text-white rounded-full font-black flex items-center gap-3 shadow-xl hover:bg-blue-600 transition-all"
                     >
                        <MessageSquare className="w-5 h-5" />
                        Get in Touch
                     </motion.button>
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FounderProfile;
