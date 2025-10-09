import React, { useState } from "react";
import "./MultiSelectDropdown.css";

const MultiSelectDropdown = ({ options, selected, onChange, placeholder = "Select options" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="multi-select">
      {/* Dropdown button */}
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span className="dropdown-placeholder">
          {selected.length > 0 ? selected.join(", ") : placeholder}
        </span>
        <span className="dropdown-arrow">&#9662;</span>
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <div className="dropdown-list">
          {options.map((option) => (
            <label key={option} className="dropdown-item">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => handleSelect(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;