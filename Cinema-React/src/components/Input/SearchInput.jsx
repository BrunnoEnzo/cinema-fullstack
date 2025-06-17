function SearchInput({
  id,
  name = id,
  placeholder = "",
  value = "",
  onChange = () => { },
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <input
      type="search"
      className={`form-control ${className}`}
      id="inputPesquisaTitulo"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      aria-label={placeholder || "Pesquisar"}
      {...props}
    />
  );
}

export default SearchInput;