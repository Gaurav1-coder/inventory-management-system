import React from "react";
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUp
} from "lucide-react";
import { 
  FaTwitter, 
  FaYoutube, 
  FaInstagram, 
  FaFacebook 
} from "react-icons/fa";
import { images } from "../constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (path, sectionId) => {
    if (location.pathname === '/' && sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
      // Wait for navigation then scroll
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={images.Logo}
                alt="logo"
                className="w-12 h-12 brightness-0 invert transition-transform group-hover:scale-110"
              />
              <span className="text-xl font-bold text-white">SmartSims</span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              Empowering businesses with intelligent inventory solutions and high-performance POS systems. Scale your enterprise with confidence.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: FaTwitter, color: '#1DA1F2' },
                { Icon: FaYoutube, color: '#FF0000' },
                { Icon: FaInstagram, color: '#E4405F' },
                { Icon: FaFacebook, color: '#1877F2' }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, backgroundColor: item.color, color: '#fff' }}
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center transition-all shadow-lg"
                >
                  <item.Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-extrabold text-lg mb-8 relative inline-block">
              Product
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-blue-600 rounded-full" />
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Features", path: "/features", section: "features" },
                { name: "Pricing", path: "/pricing" },
                { name: "Case Studies", path: "/case-studies" },
                { name: "Documentation", path: "/documentation" },
                { name: "API Reference", path: "/api-reference" }
              ].map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => handleLinkClick(item.path, item.section)}
                    className="hover:text-blue-400 transition-colors hover:translate-x-2 transform duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-extrabold text-lg mb-8 relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-blue-600 rounded-full" />
            </h3>
            <ul className="space-y-4">
              {[
                { name: "About Us", path: "/about" },
                { name: "Meet Our Creator", path: "/creators" },
                { name: "Careers", path: "/careers" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Service", path: "/terms" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="hover:text-blue-400 transition-colors hover:translate-x-2 transform duration-300 flex items-center gap-2"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-extrabold text-lg mb-8 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-blue-600 rounded-full" />
            </h3>
            <ul className="space-y-6">
              <li>
                <a 
                  href="https://goo.gl/maps/xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    <MapPin className="w-5 h-5 text-blue-500 group-hover:text-white" />
                  </div>
                  <span className="text-sm leading-relaxed group-hover:text-white transition-colors">
                    123 Business Hub, Tech Park, <br />Mumbai, India 400001
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+918001234567" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors">
                    <Phone className="w-5 h-5 text-emerald-500 group-hover:text-white" />
                  </div>
                  <span className="text-sm group-hover:text-white transition-colors">+91 (800) 123-4567</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@smartsims.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-amber-600 transition-colors">
                    <Mail className="w-5 h-5 text-amber-500 group-hover:text-white" />
                  </div>
                  <span className="text-sm group-hover:text-white transition-colors">support@smartsims.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} SmartSims Inventory Management.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="group flex items-center gap-3 text-sm font-black text-white hover:text-blue-400 transition-all bg-slate-800 px-6 py-3 rounded-2xl shadow-xl hover:shadow-blue-600/20 border border-slate-700 hover:border-blue-600/50"
          >
            Back to top
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
