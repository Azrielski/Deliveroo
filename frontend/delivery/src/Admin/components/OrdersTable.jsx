import React from "react";
import { Eye, ExternalLink } from "lucide-react";
import "./OrdersTable.css";

const OrderStatus = ({ status }) => {
  const statusClasses = {
    delivered: "status-badge status-delivered",
    pending: "status-badge status-pending",
    transit: "status-badge status-transit",
  };
  
  const statusLabels = {
    delivered: "Delivered",
    pending: "Pending",
    transit: "In Transit",
  };

  return (
    <span className={statusClasses[status]}>
      {statusLabels[status]}
    </span>
  );
};

const OrdersTable = ({ 
  orders, 
  showPagination = false,
  showPickupDestination = false,
  showRider = false,
  isRecent = false
}) => {
  return (
    <div className="orders-table-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>CUSTOMER</th>
            {showPickupDestination && (
              <>
                <th>PICKUP</th>
                <th>DESTINATION</th>
              </>
            )}
            <th>STATUS</th>
            {!isRecent && <th>DATE</th>}
            {showRider && <th>RIDER</th>}
            <th>AMOUNT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="order-id">{order.id}</td>
              <td>{order.customer}</td>
              {showPickupDestination && (
                <>
                  <td>{order.pickup}</td>
                  <td>{order.destination}</td>
                </>
              )}
              <td>
                <OrderStatus status={order.status} />
              </td>
              {!isRecent && <td>{order.date}</td>}
              {showRider && <td>{order.rider || "Unassigned"}</td>}
              <td>${order.amount}</td>
              <td>
                <div className="table-actions">
                  <button className="action-button">
                    <Eye className="action-icon" />
                  </button>
                  <button className="action-button">
                    <ExternalLink className="action-icon" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPagination && (
        <div className="table-pagination">
          <p className="pagination-info">
            Showing 1 to 3 of 156 results
          </p>
          <div className="pagination-buttons">
            <button className="pagination-button">Previous</button>
            <button className="pagination-button active">1</button>
            <button className="pagination-button">2</button>
            <button className="pagination-button">3</button>
            <button className="pagination-button">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;