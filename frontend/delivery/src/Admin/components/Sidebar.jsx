import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Users, Bike, LogOut } from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Bike className="sidebar-logo" />
        <h1 className="sidebar-title">Deliveroo Admin</h1>
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
        <button className="sidebar-item">
          <LogOut className="sidebar-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;