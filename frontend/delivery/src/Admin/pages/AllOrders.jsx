import React, { useState } from "react";
import OrdersTable from "../components/OrdersTable";
import "./AllOrders.css";

const AllOrders = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Orders Mock Data
  const orders = [
    { 
      id: "#ORD-2023-156", 
      customer: "John Smith", 
      status: "transit", 
      date: "May 15, 2025", 
      amount: "24.99",
      pickup: "New York",
      destination: "Los Angeles",
      rider: "Rider #12"
    },
    { 
      id: "#ORD-2023-155", 
      customer: "Sarah Johnson", 
      status: "delivered", 
      date: "May 14, 2025", 
      amount: "18.50",
      pickup: "Boston",
      destination: "Washington DC",
      rider: "Rider #5"
    },
    { 
      id: "#ORD-2023-154", 
      customer: "Michael Brown", 
      status: "pending", 
      date: "May 14, 2025", 
      amount: "32.75",
      pickup: "Chicago",
      destination: "Miami",
      rider: "Unassigned"
    },
  ];

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleExport = () => {
    // Get all data from the table
    const tableData = document.querySelector('.orders-table');
    if (!tableData) return;

    // Get headers from the table
    const headers = Array.from(tableData.querySelectorAll('th'))
      .map(header => header.textContent.trim());

    // Get all rows from the table
    const rows = Array.from(tableData.querySelectorAll('tbody tr'))
      .map(row => Array.from(row.querySelectorAll('td'))
        .map(cell => cell.textContent.trim())
      );

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1 className="orders-title">All Orders</h1>
        
        <div className="orders-actions">
          <div className="status-filter">
            <select value={statusFilter} onChange={handleStatusChange} className="filter-select">
              <option value="all">All Statuses</option>
              <option value="delivered">Delivered</option>
              <option value="transit">In Transit</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          
          <button className="export-button" onClick={handleExport}>
            Export
            <svg className="export-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="orders-content">
        <OrdersTable 
          orders={orders} 
          showPagination={true} 
          showPickupDestination={true}
          showRider={true}
          statusFilter={statusFilter}
        />
      </div>
    </div>
  );
};

export default AllOrders;