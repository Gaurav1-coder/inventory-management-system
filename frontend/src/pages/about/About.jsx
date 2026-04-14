// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React from "react";
import { motion } from "framer-motion";
import { 
  Rocket, 
  Target, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Cloud,
  BarChart3,
  Users2,
  MessageSquare,
  Sparkles,
  Shield,
  Cpu,
  Trophy,
  Heart,
  TrendingUp
} from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";

const teamMembers = [
  {
    id: "gaurav",
    name: "Gaurav Katiyar",
    role: "TEAM LEAD / FULL STACK DEVELOPER",
    bio: "Leading the project development and coordinating team tasks.",
    image: "https://tse1.mm.bing.net/th/id/OIP.JCApWuTUQXEqN4zwYIsZagHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3",
    social: { linkedin: "#", github: "#" }
  },
  {
    id: "vamika",
    name: "Vamika Solanki",
    role: "Database Engineer",
    bio: "Architecture expert specializing in high-scale data.",
    image: "https://thumbs.dreamstime.com/b/programmer-developer-flat-style-illustration-white-background-isolated-character-ai-generated-335094652.jpg",
    social: { linkedin: "#", github: "#" }
  },
  {
    id: "uplaksh",
    name: "Uplaksh Rajoria",
    role: "Frontend Developer",
    bio: "UI/UX enthusiast crafting beautiful experiences.",
    image: "https://tse1.mm.bing.net/th/id/OIP.jImm8EEaNUGRea8O2KYuigAAAA?w=400&h=400&rs=1&pid=ImgDetMain&o=7&rm=3",
    social: { linkedin: "#", github: "#" }
  },
  {
    id: "vanshika",
    name: "Vanshika Gupta",
    role: "PRODUCT DESIGN / UI-UX",
    bio: "Product strategist focused on user-centric design.",
    image: "https://tse3.mm.bing.net/th/id/OIP.t0jfkUl0k1csBOy9CGB26gHaHa?w=700&h=700&rs=1&pid=ImgDetMain&o=7&rm=3",
    social: { linkedin: "#", github: "#" }
  }
];

const storySections = [
  {
    title: "Who We Are",
    icon: Users2,
    content: "SmartSims is a team of forward-thinking engineers and designers dedicated to transforming the inventory landscape. We combine deep industry expertise with cutting-edge technology to build solutions that actually solve problems.",
    color: "blue"
  },
  {
    title: "Our Journey",
    icon: TrendingUp,
    content: "Born from a simple observation of local business struggles, SmartSims has evolved from a prototype into a robust enterprise ecosystem. We've scaled alongside our users, learning from every transaction.",
    color: "emerald"
  },
  {
    title: "Why We Built This",
    icon: Heart,
    content: "We believe that inventory management shouldn't be a bottleneck for growth. We built SmartSims to empower business owners with the data they need to make confident, profitable decisions every single day.",
    color: "purple"
  },
  {
    title: "Our Technology",
    icon: Cpu,
    content: "Powered by a distributed cloud architecture and real-time data streaming, our platform ensures sub-millisecond latency. We use the latest in React and MongoDB to provide a seamless, secure experience.",
    color: "amber"
  },
  {
    title: "Our Promise",
    icon: Trophy,
    content: "Our commitment is simple: zero stock-outs, 100% data accuracy, and a platform that grows with you. We're not just a software provider; we're your partner in operational excellence.",
    color: "rose"
  }
];

const featureCards = [
  {
    icon: Sparkles,
    title: "Innovation Driven",
    desc: "Always ahead of the curve with the latest tech stack and features."
  },
  {
    icon: Heart,
    title: "Customer Focused",
    desc: "Designed around the actual needs and feedback of our users."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Military-grade encryption and multi-tenant isolation for your data."
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Scale your business across borders with multi-branch support."
  },
  {
    icon: BarChart3,
    title: "AI Powered Analytics",
    desc: "Predictive insights that help you stay ahead of market trends."
  },
  {
    icon: Zap,
    title: "Future Ready Platform",
    desc: "Built to adapt to the ever-evolving world of retail and logistics."
  }
];

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="bg-white min-h-screen overflow-hidden">
        {/* Background Decorative Shapes */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px] opacity-60" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-40 pb-20">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-5 py-2 rounded-full bg-blue-600/5 text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-blue-100"
              >
                Discover Our Story
              </motion.span>
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-10 leading-[1.1] tracking-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
                  SmartSims
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute -bottom-2 left-0 h-2 bg-blue-600/10 rounded-full" 
                  />
                </span>
              </h1>
              
              <div className="space-y-8 max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
                  We are building the world's most intuitive and powerful inventory ecosystem, empowering modern businesses to scale without limits.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Narrative Sections - Stylish Cards */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {storySections.slice(0, 4).map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-10 bg-white/40 backdrop-blur-xl rounded-[3rem] border border-slate-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-${section.color}-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    <section.icon className={`w-8 h-8 text-${section.color}-600`} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-6">{section.title}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">{section.content}</p>
                </motion.div>
              ))}
              
              {/* Special Wide Card for Promise */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 p-12 bg-slate-900 rounded-[4rem] text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:bg-blue-600/30 transition-all duration-700" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center shrink-0">
                    <Trophy className="w-12 h-12 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black mb-6">{storySections[4].title}</h3>
                    <p className="text-slate-400 text-xl leading-relaxed max-w-4xl">{storySections[4].content}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-32 bg-slate-50/50 relative">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Core Pillars of Excellence</h2>
              <p className="text-slate-500 text-lg font-medium">Built on principles that drive enterprise success.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureCards.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group"
                >
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-500">
                    <feature.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Creators Section */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight tracking-tight">Meet Our Creator</h2>
              <p className="text-slate-500 text-xl font-medium">The visionary minds behind the SmartSims revolution.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group text-center"
                >
                  <Link to={`/team/${member.id}`}>
                    <div className="relative mb-8 mx-auto w-64 h-64">
                      <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10" />
                      <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-4 group-hover:-rotate-3">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8 gap-4">
                           <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all">
                              <FaLinkedin className="w-5 h-5" />
                           </div>
                           <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all">
                              <FaGithub className="w-5 h-5" />
                           </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-extrabold uppercase tracking-widest text-[10px] mb-4">{member.role}</p>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed px-4">{member.bio}</p>
                </motion.div>
              ))}
            </div>

            {/* Contact Us Button */}
            <div className="mt-32 text-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-slate-900 text-white font-black rounded-full shadow-2xl shadow-slate-200 hover:bg-blue-600 transition-all duration-500 flex items-center gap-4 mx-auto group"
                >
                  <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  <span className="text-lg">Connect With Our Team</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </div>
        </section>

        {/* Floating Chatbot */}
        <ChatBot />
      </div>
    </MainLayout>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { text: "Hi! How can I help you today with your inventory needs?", isBot: true }
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput("");

    // Simple bot logic
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for reaching out! Our team will get back to you soon. For immediate support, please use the Contact Us page.", 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {isOpen ? (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-80 h-[32rem] flex flex-col border border-white overflow-hidden"
        >
          <div className="bg-slate-900 p-6 text-white font-bold flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-black tracking-widest uppercase">AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
               <Zap className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
            {messages.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, x: msg.isBot ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                key={i} 
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm font-medium leading-relaxed ${msg.isBot ? 'bg-white text-slate-800 shadow-sm' : 'bg-blue-600 text-white shadow-blue-200 shadow-lg'}`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-6 border-t border-slate-100 flex gap-3 bg-white">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-100 rounded-2xl px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <button onClick={handleSend} className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-blue-600 transition-all shadow-lg">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-white shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-blue-600 transition-all duration-500 group"
        >
          <MessageSquare className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </motion.button>
      )}
    </div>
  );
};

export default AboutPage;

