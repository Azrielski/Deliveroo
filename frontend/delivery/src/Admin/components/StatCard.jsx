import React from "react";
import "./StatCard.css";

const StatCard = ({ title, value, icon, iconBgColor, subtext }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-content">
        <div className="stat-card-icon" style={{ backgroundColor: iconBgColor }}>
          {icon}
        </div>
        <div className="stat-card-info">
          <p className="stat-card-title">{title}</p>
          <h3 className="stat-card-value">{value}</h3>
          {subtext && <p className="stat-card-subtext">{subtext}</p>}
        </div>
      </div>
    </div>
  );
};

export default StatCard;