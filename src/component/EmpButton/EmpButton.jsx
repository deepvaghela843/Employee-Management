import React from "react";

const EmpButton = ({ name, onClick }) => {
  return (
    <button className="btn btn-outline-primary" onClick={onClick}>
      {name}
    </button>
  );
};

export default EmpButton;
