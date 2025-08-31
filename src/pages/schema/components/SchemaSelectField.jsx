const SchemaSelectField = ({ value, options, onChange, disabled }) => (
  <select
    className="form-select form-select-sm"
    value={value}
    disabled={disabled}
    onChange={onChange}
  >
    <option value="">Select</option>
    {options.map(opt => (
      <option key={opt.value} value={opt.value} disabled={opt.disabled}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default SchemaSelectField;
