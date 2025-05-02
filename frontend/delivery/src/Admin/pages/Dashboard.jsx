import React from "react";
import StatCard from "../components/StatCard";
import OrdersTable from "../components/OrdersTable";
import { ShoppingCart, Users, Bike } from "lucide-react";
import "./Dashboard.css";

const Dashboard = () => {
  // Mock data for the dashboard
  const recentOrders = [
    { 
      id: "#ORD-2023-156", 
      customer: "John Smith", 
      status: "transit", 
      date: "May 15, 2023", 
      amount: "24.99" 
    },
    { 
      id: "#ORD-2023-155", 
      customer: "Sarah Johnson", 
      status: "delivered", 
      date: "May 14, 2023", 
      amount: "18.50" 
    },
    { 
      id: "#ORD-2023-154", 
      customer: "Michael Brown", 
      status: "pending", 
      date: "May 14, 2023", 
      amount: "32.75" 
    },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      
      <div className="stats-grid">
        <StatCard 
          title="Total Orders" 
          value="1,248" 
          iconBgColor="#dbeafe" 
          icon={<ShoppingCart className="stat-icon blue-icon" />}
          subtext="+12% from last month"
        />
        
        <StatCard 
          title="Registered Users" 
          value="586" 
          iconBgColor="#dcfce7" 
          icon={<Users className="stat-icon green-icon" />}
          subtext="+8% from last month"
        />
        
        <StatCard 
          title="Active Riders" 
          value="42" 
          iconBgColor="#fef3c7" 
          icon={<Bike className="stat-icon amber-icon" />}
          subtext="5 currently available"
        />
      </div>
      
      <div className="dashboard-recent-orders">
        <h2 className="section-title">Recent Orders</h2>
        <OrdersTable orders={recentOrders} isRecent={true} />
      </div>
    </div>
  );
};

export default Dashboard;