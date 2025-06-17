import React from 'react';
import InputText from '../../../components/Input/InputText';
import SelectInput from '../../../components/Input/SelectInput';
import Button from '../../../components/Button/Button';

const SalaForm = ({
  formData,
  tiposSala,
  handleInputChange,
  handleSubmit,
  isEditing = false
}) => {
  return (
    <form id="formSala" onSubmit={handleSubmit}>
      <InputText
        name="nomeSala"
        label="Nome/Número da Sala"
        required
        value={formData.nomeSala}
        onChange={handleInputChange}
      />
      <InputText
        name="capacidade"
        label="Capacidade"
        type="number"
        required
        value={formData.capacidade}
        onChange={handleInputChange}
        min="1"
      />
      <SelectInput
        name="tipo"
        label="Tipo de Sala"
        options={tiposSala}
        required
        value={formData.tipo}
        onChange={handleInputChange}
        defaultText="Selecione o tipo de sala"
      />
      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button
          tipo="button"
          cor="secondary"
          onClick={() => document.getElementById('formSala').reset()}
        >
          Limpar
        </Button>
        <Button
          tipo="submit"
          cor="primary"
        >
          {isEditing ? 'Atualizar Sala' : 'Adicionar Sala'}
        </Button>
      </div>
    </form>
  );
};

export default SalaForm;