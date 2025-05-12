import React, { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import OrdersTable from "../components/OrdersTable";
import { ShoppingCart, Users, Bike } from "lucide-react";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    activeRiders: 0,
    availableRiders: 0,
    orderGrowth: 0,
    userGrowth: 0
  });

  // Mock data - In a real app, this would come from your API
  const orders = [
    { 
      id: "#ORD-2025-023", 
      customer: "Beatrice Njoki", 
      status: "transit", 
      date: "15 May 2025", 
      amount: "KSh 2,499.00",
      pickup: "Nairobi CBD",
      destination: "Westlands",
      rider: "Rider #12"
    },
    { 
      id: "#ORD-2025-022", 
      customer: "David Mwangi", 
      status: "delivered", 
      date: "14 May 2025", 
      amount: "KSh 1,850.00",
      pickup: "Kilimani",
      destination: "Lavington",
      rider: "Rider #5"
    },
    { 
      id: "#ORD-2025-021", 
      customer: "Grace Wanjiru", 
      status: "pending", 
      date: "14 May 2025", 
      amount: "KSh 3,275.00",
      pickup: "Karen",
      destination: "Langata",
      rider: "Unassigned"
    },
  ];

  const users = [
    {
      id: "#KE-001",
      name: "Joseph Otieno",
      email: "j.otieno@example.co.ke",
      phone: "+254 712 345 678",
      orders: 12,
      joined: "15 Jan 2023",
    },
    {
      id: "#KE-002",
      name: "Amina Hassan",
      email: "amina.hassan@example.co.ke",
      phone: "+254 723 876 543",
      orders: 8,
      joined: "22 Mar 2024",
    },
    {
      id: "#KE-003",
      name: "Grace Wambui",
      email: "grace.wambui@example.co.ke",
      phone: "+254 701 234 567",
      orders: 5,
      joined: "10 Apr 2025",
    },
  ];

  const riders = [
    {
      id: "#RDR-012",
      name: "Alex Johnson",
      vehicle: "Motorcycle (ABC-1234)",
      phone: "+1 (555) 123-4567",
      status: "available",
      assignedOrders: 0,
    },
    {
      id: "#RDR-005",
      name: "Maria Garcia",
      vehicle: "Bicycle",
      phone: "+1 (555) 987-6543",
      status: "available",
      assignedOrders: 0,
    },
    {
      id: "#RDR-008",
      name: "David Wilson",
      vehicle: "Scooter (XYZ-5678)",
      phone: "+1 (555) 456-7890",
      status: "busy",
      assignedOrders: 2,
    },
    {
      id: "#RDR-015",
      name: "James Lee",
      vehicle: "Motorcycle (DEF-9012)",
      phone: "+1 (555) 234-5678",
      status: "busy",
      assignedOrders: 1,
    },
  ];

  useEffect(() => {
    // Calculate statistics
    const totalOrders = orders.length;
    const totalUsers = users.length;
    const activeRiders = riders.length;
    const availableRiders = riders.filter(rider => rider.status === "available").length;

    // Calculate growth rates (mock data - in a real app, you'd compare with previous period)
    const orderGrowth = 12; // Mock growth rate
    const userGrowth = 8; // Mock growth rate

    setStats({
      totalOrders,
      totalUsers,
      activeRiders,
      availableRiders,
      orderGrowth,
      userGrowth
    });
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      
      <div className="stats-grid">
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders.toLocaleString()} 
          iconBgColor="#dbeafe" 
          icon={<ShoppingCart className="stat-icon blue-icon" />}
          subtext={`+${stats.orderGrowth}% from last month`}
        />
        
        <StatCard 
          title="Registered Users" 
          value={stats.totalUsers.toLocaleString()} 
          iconBgColor="#dcfce7" 
          icon={<Users className="stat-icon green-icon" />}
          subtext={`+${stats.userGrowth}% from last month`}
        />
        
        <StatCard 
          title="Active Riders" 
          value={stats.activeRiders} 
          iconBgColor="#fef3c7" 
          icon={<Bike className="stat-icon amber-icon" />}
          subtext={`${stats.availableRiders} currently available`}
        />
      </div>

      <div className="dashboard-recent-orders">
        <h2 className="section-title">Recent Orders</h2>
        <OrdersTable 
          orders={orders} 
          showPagination={false}
          showPickupDestination={true}
          showRider={true}
          isRecent={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;