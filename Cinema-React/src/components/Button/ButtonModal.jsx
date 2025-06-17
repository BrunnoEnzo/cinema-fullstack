function ButtonModal({
    children = "",
    targetId = "",
    cor = "primary",
    tamanho = "",
    classeAdicional = "",
    tipo = "button",
    icone = null,
    disabled = false,
    onClick = () => {}
  }) {
    return (
      <button
        type={tipo}
        className={`btn btn-${cor} ${tamanho} ${classeAdicional}`}
        data-bs-toggle={!disabled ? "modal" : null}
        data-bs-target={!disabled ? `#${targetId}` : null}
        disabled={disabled}
        onClick={onClick}
        aria-disabled={disabled}
      >
        {icone && <span className="me-2">{icone}</span>}
        {children}
      </button>
    );
  }
  
  export default ButtonModal;