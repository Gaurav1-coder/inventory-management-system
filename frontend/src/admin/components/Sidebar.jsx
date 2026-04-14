import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ isClosed }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;
  const role = userInfo?.role || "staff";

  const menuItems = [
    { to: "/admin/dashboard", icon: "bxs-dashboard", label: "Dashboard", roles: ["admin", "manager", "staff"] },
    { to: "/admin/products", icon: "bx-package", label: "Products", roles: ["admin", "manager", "staff"] },
    { to: "/admin/activity-log", icon: "bx-history", label: "Activity Log", roles: ["admin", "manager", "staff"] },
    { to: "/admin/suppliers", icon: "bx-store", label: "Suppliers", roles: ["admin", "manager"] },
    { to: "/admin/sales", icon: "bx-dollar-circle", label: "Sales", roles: ["admin", "manager", "staff"] },
    { to: "/admin/orders", icon: "bx-shopping-bag", label: "Orders", roles: ["admin", "manager", "staff"] },
    { to: "/admin/stock-transactions", icon: "bx-transfer", label: "Stock", roles: ["admin", "manager", "staff"] },
    { to: "/admin/notifications", icon: "bx-bell", label: "Notifications", roles: ["admin", "manager"] },
    { to: "/admin/categories", icon: "bx-category", label: "Categories", roles: ["admin", "manager"] },
    { to: "/admin/users", icon: "bx-group", label: "Users", roles: ["admin"] },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full z-[2000] bg-white dark:bg-black/40 backdrop-blur-xl border-r border-gray-200 dark:border-white/10 transition-all duration-300 shadow-2xl ${isClosed ? "w-20" : "w-64"} flex flex-col justify-between`}>
      {/* TOP SECTION: Logo + Menu Title */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <i className="bx bx-code-alt text-2xl"></i>
          </div>
          {!isClosed && (
            <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
              INVENTORY
            </span>
          )}
        </div>

        <div className="px-4 py-2">
          <p className={`text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[2px] mb-4 px-2 ${isClosed ? "text-center" : ""}`}>
            {isClosed ? "..." : "Main Menu"}
          </p>
          <ul className="space-y-1.5">
            {menuItems
              .filter((item) => item.roles.includes(role))
              .map((item) => {
                const isActive = pathname.includes(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? "bg-blue-500 text-white shadow-[0_4px_15px_rgba(59,130,246,0.4)] translate-x-1"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:translate-x-1"
                      }`}
                    >
                      <i className={`bx ${item.icon} text-xl ${isActive ? "text-white" : "group-hover:text-blue-500"}`}></i>
                      {!isClosed && <span className="font-semibold text-sm tracking-wide">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      {/* BOTTOM SECTION: Logout/Back to Site */}
      <div className={`p-4 border-t border-gray-100 dark:border-white/10 ${isClosed ? "text-center" : ""}`}>
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all duration-300 group ${isClosed ? "justify-center" : ""}`}
        >
          <i className="bx bx-log-out-circle text-xl"></i>
          {!isClosed && <span className="font-bold text-sm tracking-wide">Back to Site</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
