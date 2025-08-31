// components/FormInput.jsx
import React, { useState } from 'react';
import LabelWithInfo from './LabelWithInfo';

const FormTextarea = ({
  label,
  name,
  value,
  required = false,
  disabled = false,
  info = null,
  onChange,
  rows = 8,
  cols = 30,
  warning = ""  
}) => {
  return (
    <div>
      <LabelWithInfo label={label} info={info} />
      <textarea
        className="form-textarea"
        cols={cols}
        rows={rows}
        spellcheck="false"
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange} />
      {warning.trim() !== "" && (
        <p className="paragraph mb-0 mt-2">{warning}</p>
      )}
    </div>
  );
};

export default FormTextarea;
