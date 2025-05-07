import React from "react";
import UsersTable from "../components/UsersTable";
import "./Users.css";

const Users = () => {
  // Users Mock data
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

  return (
    <div className="users-page">
      <h1 className="users-title">Registered Users</h1>
      
      <div className="users-content">
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default Users;