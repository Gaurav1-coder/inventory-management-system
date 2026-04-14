// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { images } from "../constants";
import { logout } from "../store/actions/user";

const navItemsInfo = [
  { name: "Home", type: "link", href: "/" },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { title: "About us", href: "/about" },
      { title: "Contact us", href: "/contact" },
      { title: "Meet Team", href: "/creators" },
      { title: "Case Studies", href: "/case-studies" },
    ],
  },
  { name: "Pricing", type: "link", href: "/pricing" },
  { name: "Faq", type: "link", href: "/faq" },
];

const NavItem = ({ item, isMobile, closeNav }) => {
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === item.href;

  return (
    <li className="relative group list-none">
      {item.type === "link" ? (
        <Link
          to={item.href}
          onClick={closeNav}
          className={`px-4 py-2 flex items-center transition-all duration-300 hover:text-blue-600 ${
            isActive ? "text-blue-600 font-bold" : "text-slate-700 font-medium"
          }`}
        >
          {item.name}
          {!isMobile && (
            <motion.span
              layoutId="underline"
              className={`absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
              initial={false}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </Link>
      ) : (
        <div className="relative group">
          <button
            className="px-4 py-2 flex items-center gap-x-1 text-slate-700 font-medium hover:text-blue-600 transition-all"
            onClick={() => setDropdown(!dropdown)}
            onMouseEnter={() => !isMobile && setDropdown(true)}
            onMouseLeave={() => !isMobile && setDropdown(false)}
          >
            <span>{item.name}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdown ? "rotate-180" : ""}`} />
          </button>
          
          <AnimatePresence>
            {dropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onMouseEnter={() => !isMobile && setDropdown(true)}
                onMouseLeave={() => !isMobile && setDropdown(false)}
                className={`${
                  isMobile ? "relative w-full" : "absolute top-full left-0 w-48"
                } bg-white shadow-xl rounded-xl overflow-hidden z-[100] border border-slate-100`}
              >
                <ul className="py-2">
                  {item.items.map((page, index) => (
                    <li key={index}>
                      <Link
                        to={page.href}
                        onClick={closeNav}
                        className="block px-6 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all text-sm font-medium"
                      >
                        {page.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navIsVisible, setNavIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userState = useSelector((state) => state.user);
  const [profileDropdown, setProfileDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    setProfileDropdown(false);
  };

  return (
    <section 
      className={`sticky top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-2" : "bg-white py-4"
      }`}
    >
      <header className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-12 h-12 object-contain" src={images.Logo} alt="logo" />
          <span className="text-xl font-bold text-slate-900 hidden sm:block">SmartSims</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-x-2">
          <ul className="flex items-center gap-x-2">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} isMobile={false} />
            ))}
          </ul>

          <div className="h-6 w-[1px] bg-slate-200 mx-4" />

          {userState.userInfo ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 pl-2 pr-4 py-1.5 rounded-full hover:bg-slate-100 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{userState.userInfo?.name?.split(' ')[0] || 'User'}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${profileDropdown ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {profileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-2xl border border-slate-100 overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-slate-50/50 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{userState.userInfo?.email || 'User Email'}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => { navigate("/admin/dashboard"); setProfileDropdown(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </button>
                      <button
                        onClick={() => { navigate("/profile"); setProfileDropdown(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </button>
                      <button
                        onClick={logoutHandler}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-8 py-2.5 rounded-full font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Sign in
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setNavIsVisible(!navIsVisible)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
          >
            {navIsVisible ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {navIsVisible && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setNavIsVisible(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] lg:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[100] shadow-2xl lg:hidden flex flex-col p-6"
              >
                <div className="flex justify-between items-center mb-10">
                  <span className="text-xl font-bold text-slate-900">Menu</span>
                  <button onClick={() => setNavIsVisible(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
                
                <ul className="flex flex-col gap-y-2 mb-auto">
                  {navItemsInfo.map((item) => (
                    <NavItem key={item.name} item={item} isMobile={true} closeNav={() => setNavIsVisible(false)} />
                  ))}
                </ul>

                <div className="pt-6 border-t border-slate-100 mt-6">
                  {userState.userInfo ? (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => { navigate("/admin/dashboard"); setNavIsVisible(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                      </button>
                      <button
                        onClick={logoutHandler}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-bold"
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { navigate("/login"); setNavIsVisible(false); }}
                      className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200"
                    >
                      Sign in
                    </button>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </section>
  );
};

export default Header;

