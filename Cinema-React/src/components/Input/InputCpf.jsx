import { useState, useEffect } from "react";

function InputCpf({
  id = "cpf",
  name = "cpf",
  label = "CPF",
  placeholder = "Digite o CPF",
  required = false,
  value = "",
  onChange = () => {},
  className = "",
  disabled = false,
  ...props
}) {
  const [inputValue, setInputValue] = useState("");

  // Atualiza inputValue se o value externo mudar
  useEffect(() => {
    // Formata o value recebido (só números) para a máscara
    let val = value.replace(/\D/g, "").slice(0, 11);
    val = val
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
    setInputValue(val);
  }, [value]);

  const handleChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 11) val = val.slice(0, 11);
    val = val
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");

    setInputValue(val);

    // Cria um evento modificado para enviar o valor formatado e o nome
    onChange({
      target: {
        name,
        value: val,
      },
    });
  };

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <input
        type="text"
        className="form-control"
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        maxLength={14}
        {...props}
      />
    </div>
  );
}

export default InputCpf;
