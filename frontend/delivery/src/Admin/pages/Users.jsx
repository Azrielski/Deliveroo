import React from "react";
import UsersTable from "../components/UsersTable";
import "./Users.css";

const Users = () => {
  // Users Mock data
  const users = [
    {
      id: "#USR-001",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      orders: 12,
      joined: "Jan 15, 2023",
    },
    {
      id: "#USR-002",
      name: "Sarah Johnson",
      email: "sarahj@example.com",
      phone: "+1 (555) 987-6543",
      orders: 8,
      joined: "Mar 22, 2024",
    },
    {
      id: "#USR-003",
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "+1 (555) 456-7890",
      orders: 5,
      joined: "Apr 10, 2025",
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