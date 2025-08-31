// components/FormInput.jsx
import React, { useState } from 'react';
import LabelWithInfo from './LabelWithInfo';

const FormDropdown = ({
  label,
  name,
  value,
  options = [],
  required = false,
  disabled = false,
  info = null,
  onChange,  
  error = '',
  className = '',
  wrapperClass='',
  ...props
}) => {
  return (
    // <div className="col-xl-6 site-input-groups mt-0" key={name}> 
      <div className={wrapperClass || 'col-xl-6 site-input-groups mt-0'} key={name}>
      <LabelWithInfo label={label} info={info} />

      <select
        name={name}
        className={`form-select ${className} ${error ? 'is-invalid' : ''}`}
        value={value || ""}
        onChange={onChange}
      // onChange={e => onSelectChange(e.target.value)}
        required={required}
        disabled={disabled}
        {...props}
      >
        {options.map(({ value, label, disabled  }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}

    </div>
  );
};

export default FormDropdown;
