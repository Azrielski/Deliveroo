import React, { useState, useRef, useEffect } from "react";
import { Eye, ExternalLink, ChevronDown } from "lucide-react";
import "./OrdersTable.css";

const OrdersTable = () => {
  const [orders, setOrders] = useState([
    {
      id: "#ORD-KE-2025-156",
      customer: "James Mwangi",
      pickup: "Nairobi",
      destination: "Mombasa",
      status: "transit",
      rider: "Rider #12",
    },
    {
      id: "#ORD-KE-2025-155",
      customer: "Grace Wanjiku",
      pickup: "Kisumu",
      destination: "Eldoret",
      status: "delivered",
      rider: "Rider #5",
    },
    {
      id: "#ORD-KE-2025-154",
      customer: "Brian Otieno",
      pickup: "Nakuru",
      destination: "Thika",
      status: "pending",
      rider: "Unassigned",
    },
  ]);

  const [filterOpen, setFilterOpen] = useState(false);

  const statusOptions = [
    { value: "delivered", label: "Delivered" },
    { value: "transit", label: "In Transit" },
    { value: "pending", label: "Pending" },
  ];

  const riderOptions = [
    { value: "Rider #1", label: "Rider #1" },
    { value: "Rider #5", label: "Rider #5" },
    { value: "Rider #12", label: "Rider #12" },
    { value: "Unassigned", label: "Unassigned" },
  ];

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleRiderChange = (orderId, newRider) => {
    setOrders(orders.map((order) =>
      order.id === orderId ? { ...order, rider: newRider } : order
    ));
  };

  const StatusBadge = ({ status }) => {
    const statusMap = {
      delivered: "Delivered",
      pending: "Pending",
      transit: "In Transit",
    };
    return (
      <div className={`status-badge status-${status}`}>
        {statusMap[status]}
      </div>
    );
  };

  const Dropdown = ({ options, value, onChange, width = "100%" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef(null);

    useEffect(() => {
      if (isOpen && triggerRef.current) {
        triggerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    }, [isOpen]);

    return (
      <div className="dropdown-container" style={{ width }}>
        <button
          ref={triggerRef}
          className="dropdown-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value}</span>
          <ChevronDown size={16} />
        </button>
        {isOpen && (
          <div
            className="dropdown-menu"
            style={{
              left: triggerRef.current && window.innerWidth - triggerRef.current.getBoundingClientRect().right < 120 ? "auto" : 0,
              right: triggerRef.current && window.innerWidth - triggerRef.current.getBoundingClientRect().right < 120 ? 0 : "auto",
            }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className="dropdown-item"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="orders-container">
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>PICKUP</th>
              <th>DESTINATION</th>
              <th>STATUS</th>
              <th>RIDER</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="order-id-cell">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.pickup}</td>
                <td>{order.destination}</td>
                <td>
                  <Dropdown
                    options={statusOptions}
                    value={
                      order.status === "transit" ? "In Transit" :
                      order.status === "delivered" ? "Delivered" : "Pending"
                    }
                    onChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                    width="120px"
                  />
                </td>
                <td>
                  <Dropdown
                    options={riderOptions}
                    value={order.rider}
                    onChange={(newRider) => handleRiderChange(order.id, newRider)}
                    width="120px"
                  />
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn">
                      <Eye size={18} />
                    </button>
                    <button className="action-btn">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <div className="pagination-info">
          Showing 1 to 3 of 156 results
        </div>
        <div className="pagination-controls">
          <button className="pagination-btn">Previous</button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
