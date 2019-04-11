import React from "react";

const inputStyle = {
  marginLeft: "18rem"
};

const Checkbox = ({ label, isSelected, onCheckboxChange, id }) => (
  <div className="form-check">
    <label>
      <input
        className="d-flex justify-content-end"
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
        id={id}
        style={inputStyle}
      />
    </label>
  </div>
);

export default Checkbox;
