import React from 'react';

const FormInputWithSelect = ({
  label,
  inputName,
  inputValue,
  onInputChange,
  selectName,
  selectValue,
  onSelectChange,
  inputPlaceholder = '',
  inputType = 'text',
  selectOptions = [],
  disabled = false,
  required = true,
}) => {
  // Validate numeric/decimal input if inputType is number or text
  const validateDouble = (value) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      return value;
    }
    return inputValue;
  };

  const handleInputChange = (e) => {
    const validatedValue = validateDouble(e.target.value);
    onInputChange(e.target.name, validatedValue);
  };

  return (
      <div className="site-input-groups">
        <label className="box-input-label" htmlFor={inputName}>{label}</label>
        <div className="position-relative">
          <input
            id={inputName}
            type={inputType}
            className="box-input"
            placeholder={inputPlaceholder}
            name={inputName}
            value={inputValue}
            onChange={handleInputChange}
            disabled={disabled}
            required={required}
          />
          <div className="prcntcurr">
            <select
              name={selectName}
              className="form-select"
              value={selectValue}
              onChange={e => onSelectChange(e.target.value)}
              disabled={disabled}
            >
              {selectOptions.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
  );
};

export default FormInputWithSelect;
