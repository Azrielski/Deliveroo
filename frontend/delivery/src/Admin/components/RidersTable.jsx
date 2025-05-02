import React from "react";
import { Eye, ExternalLink, Trash } from "lucide-react";
import "./RidersTable.css";

const RidersTable = ({ riders }) => {
  return (
    <div className="riders-table-container">
      <table className="riders-table">
        <thead>
          <tr>
            <th>RIDER ID</th>
            <th>NAME</th>
            <th>VEHICLE</th>
            <th>PHONE</th>
            <th>STATUS</th>
            <th>ASSIGNED ORDERS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider) => (
            <tr key={rider.id}>
              <td className="rider-id">{rider.id}</td>
              <td>{rider.name}</td>
              <td>{rider.vehicle}</td>
              <td>{rider.phone}</td>
              <td>
                <span className={`status-badge ${rider.status === "available" ? "status-green" : "status-orange"}`}>
                  {rider.status === "available" ? "Available" : "Busy"}
                </span>
              </td>
              <td>{rider.assignedOrders}</td>
              <td>
                <div className="table-actions">
                  <button className="action-button">
                    <Eye className="action-icon" />
                  </button>
                  <button className="action-button">
                    <ExternalLink className="action-icon" />
                  </button>
                  <button className="action-button delete-action">
                    <Trash className="action-icon" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RidersTable;