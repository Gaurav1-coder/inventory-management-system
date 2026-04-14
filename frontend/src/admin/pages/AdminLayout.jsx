// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React, { useState, useEffect } from "react";
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
  };

  if (!userState.userInfo) {
    return null;
  }

  return (
    <div className={`app ${isDarkMode ? "dark" : ""} admin-home-container`}>
      <Sidebar isClosed={isSidebarClosed} />
      <div className="content">
        <Navbar
          onSidebarToggle={handleSidebarToggle}
          onDarkModeToggle={handleDarkModeToggle}
        />
        <main style={{ padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

