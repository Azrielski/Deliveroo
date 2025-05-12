import React, { useState } from "react";
import RiderCard from "../components/RiderCard";
import RidersTable from "../components/RidersTable";
import AddRiderModal from "../components/AddRiderModal";
import "./Riders.css";

const Riders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Riders Mock data
  const [availableRiders, setAvailableRiders] = useState([
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
  ]);
  
  const [busyRiders, setBusyRiders] = useState([
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
  ]);
  
  const [allRiders, setAllRiders] = useState([
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
  ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddRider = (riderData) => {
    // Generate a new rider ID
    const newRiderId = `#RDR-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    // Format the name
    const fullName = `${riderData.firstName} ${riderData.lastName}`;
    
    // Format the vehicle info
    const vehicle = riderData.licensePlate 
      ? `${riderData.vehicleType} (${riderData.licensePlate})`
      : riderData.vehicleType;
    
    // Create new rider object for the table
    const newRider = {
      id: newRiderId,
      name: fullName,
      vehicle: vehicle,
      phone: riderData.phone,
      status: "available",
      assignedOrders: 0,
    };
    
    // Create new rider object for the card display
    const newRiderCard = {
      name: fullName,
      riderId: `Rider ${newRiderId.replace('#RDR-', '#')}`,
      status: "available",
    };
    
    // Update state
    setAllRiders([...allRiders, newRider]);
    setAvailableRiders([...availableRiders, newRiderCard]);
    
    // Close modal
    closeModal();
  };

  const handleDeleteRider = (riderId) => {
    // Remove from all riders
    setAllRiders(allRiders.filter(rider => rider.id !== riderId));
    
    // Remove from available or busy riders
    const riderNumber = riderId.replace('#RDR-', '#');
    setAvailableRiders(availableRiders.filter(rider => rider.riderId !== `Rider ${riderNumber}`));
    setBusyRiders(busyRiders.filter(rider => rider.riderId !== `Rider ${riderNumber}`));
  };

  return (
    <div className="riders-page">
      <div className="riders-header">
        <h1 className="riders-title">Riders Management</h1>
        
        <button className="add-rider-button" onClick={openModal}>
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
      
      <div className="riders-table-section">
        <h2 className="section-title">All Riders</h2>
        <RidersTable riders={allRiders} onDeleteRider={handleDeleteRider} />
      </div>
      
      <AddRiderModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        onSubmit={handleAddRider}
      />
    </div>
  );
};

export default Riders;