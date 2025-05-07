import React from "react";
import { Outlet } from "react-router-dom";
import "./AdminLayout.css";
import Sidebar from "./components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;