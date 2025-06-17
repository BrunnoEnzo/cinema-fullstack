function InputText({
  id,
  name = id,
  label,
  type = "text",
  placeholder = "",
  required = false,
  value = "",
  onChange = () => {},
  className = "",
  disabled = false,
  min,
  max,
  step,
  ...props
}) {
  return (
    <div className={`mb-3 ${className}`}>
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <input
        type={type}
        className="form-control"
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        min={type === "number" ? min : undefined}
        max={type === "number" ? max : undefined}
        step={type === "number" ? step : undefined}
        {...props}
      />
    </div>
  );
}

export default InputText;