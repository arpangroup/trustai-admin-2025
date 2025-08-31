// components/FormInput.jsx
import React, { useState } from 'react';
import LabelWithInfo from './LabelWithInfo';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  placeholder = '',
  required = false,
  disabled = false,
  info = null,
  onChange,  
  onBlur,
  className = '',
  wrapperClass='',
  error = ''
}) => {  
  return (
    // <div className="site-input-groups">
      <div className={wrapperClass || 'site-input-groups'} key={name}>
      <LabelWithInfo label={label} info={info} />
      <input
        type={type}
        className={`box-input ${className} ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}        
        onBlur={onBlur}       
        onWheel={(e) => e.target.blur()}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormInput;
