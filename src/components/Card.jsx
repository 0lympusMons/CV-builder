import React from "react";

export default function Card({className, icon, title, children }) {
  return (
    <div className={`card ${className}`}>
      <div className="card--header">
        <img
          className="card--icon"
          src={`src/assets/${icon}`}
          alt="card-icon"
        />
        <h1 className="card--title">{title}</h1>
      </div>

      {children}
    </div>
  );
}
