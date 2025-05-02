import React from "react";
import RiderCard from "../components/RiderCard";
import RidersTable from "../components/RidersTable";
import "./Riders.css";

const Riders = () => {
  // Mock data for riders
  const availableRiders = [
    {
      name: "Alex Johnson",
      riderId: "Rider #12",
      status: "available",
    },
    {
      name: "Maria Garcia",
      riderId: "Rider #5",
      status: "available",
    },
  ];
  
  const busyRiders = [
    {
      name: "David Wilson",
      riderId: "Rider #8",
      status: "delivering",
      ordersCount: 2,
    },
    {
      name: "James Lee",
      riderId: "Rider #15",
      status: "delivering",
      ordersCount: 1,
    },
  ];
  
  const allRiders = [
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

  return (
    <div className="riders-page">
      <div className="riders-header">
        <h1 className="riders-title">Riders Management</h1>
        
        <button className="add-rider-button">
          + Add Rider
        </button>
      </div>
      
      <div className="riders-section">
        <h2 className="section-title">Available Riders</h2>
        <div className="riders-grid">
          {availableRiders.map((rider, index) => (
            <RiderCard
              key={index}
              name={rider.name}
              riderId={rider.riderId}
              status={rider.status}
            />
          ))}
        </div>
      </div>
      
      <div className="riders-section">
        <h2 className="section-title">Busy Riders</h2>
        <div className="riders-grid">
          {busyRiders.map((rider, index) => (
            <RiderCard
              key={index}
              name={rider.name}
              riderId={rider.riderId}
              status={rider.status}
              ordersCount={rider.ordersCount}
            />
          ))}
        </div>
      </div>
      
      <div className="riders-table-container">
        <h2 className="section-title">All Riders</h2>
        <RidersTable riders={allRiders} />
      </div>
    </div>
  );
};

export default Riders;
