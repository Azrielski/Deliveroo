import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./AdminLayout.css";
import Sidebar from "./components/Sidebar";
import { Menu } from "lucide-react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false); // Close sidebar on route change
  }, [location]);

  return (
    <div className="admin-layout">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}
      <div className="admin-content">
        <header>
          <button
            className="toggle-sidebar"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="menu-icon" />
          </button>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;