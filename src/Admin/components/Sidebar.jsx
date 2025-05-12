import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Users, Bike, LogOut, X } from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <Link to="/admin/dashboard" className="logo-container" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Bike className="sidebar-logo" />
          <h1 className="sidebar-title">Deliveroo Admin</h1>
        </Link>
        <button className="close-sidebar" onClick={() => setIsOpen(false)}>
          <X className="close-icon" />
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) => 
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <LayoutDashboard className="sidebar-icon" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/admin/orders" 
          className={({ isActive }) => 
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <ShoppingCart className="sidebar-icon" />
          <span>All Orders</span>
        </NavLink>
        
        <NavLink 
          to="/admin/users" 
          className={({ isActive }) => 
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <Users className="sidebar-icon" />
          <span>Users</span>
        </NavLink>
        
        <NavLink 
          to="/admin/riders" 
          className={({ isActive }) => 
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <Bike className="sidebar-icon" />
          <span>Riders</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => navigate('/')}>
          <LogOut className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;