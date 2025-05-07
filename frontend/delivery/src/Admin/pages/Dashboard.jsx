import React from "react";
import StatCard from "../components/StatCard";
import OrdersTable from "../components/OrdersTable";
import { ShoppingCart, Users, Bike } from "lucide-react";
import "./Dashboard.css";

const Dashboard = () => {
  // Mock data
  const recentOrders = [
    { 
      id: "#ORD-2025-023", 
      customer: "Beatrice Njoki", 
      status: "in transit", 
      date: "15 May 2025", 
      amount: "KSh 2,499.00" 
    },
    { 
      id: "#ORD-2025-022", 
      customer: "David Mwangi", 
      status: "delivered", 
      date: "14 May 2025", 
      amount: "KSh 1,850.00" 
    },
    { 
      id: "#ORD-2025-021", 
      customer: "Grace Wanjiru", 
      status: "pending", 
      date: "14 May 2025", 
      amount: "KSh 3,275.00" 
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