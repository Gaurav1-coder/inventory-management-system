import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/login");
    }
  }, [navigate, userState.userInfo]);

  const handleSidebarToggle = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    if (saved) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, []);

  if (!userState.userInfo) {
    return null;
  }

  return (
    <div className={`min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-black text-slate-900 dark:text-white transition-colors duration-500`}>
      <Sidebar isClosed={isSidebarClosed} />
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${isSidebarClosed ? "md:ml-20" : "md:ml-64"}`}>
        <Navbar
          onSidebarToggle={handleSidebarToggle}
          onDarkModeToggle={handleDarkModeToggle}
        />
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
