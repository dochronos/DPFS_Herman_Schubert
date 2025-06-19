import React from "react";

const Card = ({ title, value }) => {
  return (
    <div className="dashboard-card">
      <h3 className="dashboard-card-title">{title}</h3>
      <p className="dashboard-card-value">{value}</p>
    </div>
  );
};

export default Card;
