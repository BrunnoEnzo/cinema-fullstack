function InputDate({
  id,
  name = id,
  label,
  required = false,
  value = "",
  onChange = () => {},
  className = "",
  disabled = false,
  min,
  max,
  ...props
}) {
  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <input
        type="date"
        className="form-control"
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        min={min}
        max={max}
        {...props}
      />
    </div>
  );
}

export default InputDate;