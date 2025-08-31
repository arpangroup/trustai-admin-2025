const SchemaInputField = ({ type = "text", value, onChange, onBlur, disabled, isInvalid, feedback }) => (
  <>
    <input
      type={type}
      className={`form-control form-control-sm ${isInvalid ? "is-invalid" : ""}`}
      value={value}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
    />
    {isInvalid && <div className="invalid-feedback">{feedback}</div>}
  </>
);

export default SchemaInputField;
