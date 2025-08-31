// components/FormInputWithUnit.jsx
import React, { useState } from 'react';
import LabelWithInfo from './LabelWithInfo';

const FormInputWithUnit = ({
  label,
  name,
  value,
  unit = '',
  placeholder = '',
  type = 'text',
  onChange,
  required = false,
  disabled = false,
  info = null,
  inputClassName = '',
}) => {
  return (
    <div className="site-input-groups">      
      <LabelWithInfo label={label} info={info} />
      <div className="input-group joint-input">
        <input
          type={type}
          className={`form-control ${inputClassName}`}
          name={name}
          value={value}
          onChange={onChange}            
          onWheel={(e) => e.target.blur()}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
        />
        {unit && <span className="input-group-text">{unit}</span>}
      </div>
    </div>
  );
};

export default FormInputWithUnit;
