import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";

const teamMembers = [
  {
    id: "gaurav",
    name: "Gaurav Katiyar",
    role: "Team Lead / Full Stack Developer",
    image: "https://tse1.mm.bing.net/th/id/OIP.JCApWuTUQXEqN4zwYIsZagHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3",
    bio: "Leading the project development and coordinating team tasks.",
    social: { twitter: "#", linkedin: "#", github: "#" }
  },
  {
      id: "vamika",
      name: "Vamika Solanki",
      role: "Database Engineer",
      image: "https://thumbs.dreamstime.com/b/programmer-developer-flat-style-illustration-white-background-isolated-character-ai-generated-335094652.jpg",
      bio: "Architecture expert specializing in high-scale data.",
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
  {
    id: "uplaksh",
    name: "Uplaksh Rajoria",
    role: "Frontend Developer",
    image: "https://tse1.mm.bing.net/th/id/OIP.jImm8EEaNUGRea8O2KYuigAAAA?w=400&h=400&rs=1&pid=ImgDetMain&o=7&rm=3",
    bio: "UI/UX enthusiast crafting beautiful experiences.",
    social: { twitter: "#", linkedin: "#", github: "#" }
  },
  {
    id: "vanshika",
    name: "Vanshika Gupta",
    role: "PRODUCT DESIGN / UI-UX",
    image: "https://tse3.mm.bing.net/th/id/OIP.t0jfkUl0k1csBOy9CGB26gHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3",
    bio: "Product strategist focused on user-centric design.",
    social: { twitter: "#", linkedin: "#", github: "#" }
  }
];

const TeamCard = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -15 }}
    className="group text-center"
  >
    <Link to={`/team/${member.id}`}>
      <div className="relative mb-8 mx-auto w-72 h-72">
        <div className="absolute inset-0 bg-blue-600 rounded-[3.5rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10" />
        <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500 transform group-hover:-translate-y-4 group-hover:-rotate-3">
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-10 gap-5">
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all">
                <FaLinkedin className="w-6 h-6" />
             </div>
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all">
                <FaGithub className="w-6 h-6" />
             </div>
          </div>
        </div>
      </div>
    </Link>
    <h3 className="text-3xl font-black text-slate-900 mb-2">{member.name}</h3>
    <p className="text-blue-600 font-extrabold uppercase tracking-widest text-xs mb-4">{member.role}</p>
    <p className="text-slate-500 text-lg font-medium leading-relaxed px-6 max-w-xs mx-auto">{member.bio}</p>
  </motion.div>
);

const CreatorsPage = () => {
  return (
    <MainLayout>
      <section className="bg-white pt-48 pb-60 relative overflow-hidden min-h-screen">
        {/* Background Decorative Shapes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[150px] opacity-60" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-50 rounded-full blur-[150px] opacity-60" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-6 py-2 rounded-full bg-blue-600/5 text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-8 border border-blue-100">
                The Architects
              </span>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-10 tracking-tight leading-none">
                Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Creator</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium max-w-3xl mx-auto">
                A collective of dreamers and doers building the future of enterprise inventory management.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-20">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-40 text-center"
          >
             <Link to="/contact">
                <button className="px-12 py-6 bg-slate-900 text-white rounded-full font-black text-lg shadow-2xl hover:bg-blue-600 transition-all flex items-center gap-4 mx-auto group">
                   Let's Build Something Together
                   <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
             </Link>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CreatorsPage;
