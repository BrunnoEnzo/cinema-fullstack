import React from 'react';
import InputText from '../../../components/Input/InputText';
import SelectInput from '../../../components/Input/SelectInput';
import InputDateTime from '../../../components/Input/InputDateTime';
import Button from '../../../components/Button/Button';

const SessaoForm = ({
  formData,
  filmes,
  salas,
  idiomas,
  formatos,
  handleInputChange,
  handleSubmit,
  isEditing = false
}) => {
  return (
    <form id="formSessao" onSubmit={handleSubmit}>
      <SelectInput
        name="filme"
        label="Filme"
        options={filmes.map(f => ({ value: f.id, label: f.titulo }))}
        required
        value={formData.filme}
        onChange={handleInputChange}
        defaultText="Selecione o filme"
      />
      <SelectInput
        name="sala"
        label="Sala"
        options={salas.map(s => ({ value: s.id, label: s.nomeSala }))}
        required
        value={formData.sala}
        onChange={handleInputChange}
        defaultText="Selecione a sala"
      />
      <InputDateTime
        name="dataHora"
        label="Data e Hora"
        required
        value={formData.dataHora}
        onChange={handleInputChange}
      />
      <InputText
        name="preco"
        label="Preço"
        type="number"
        required
        value={formData.preco}
        onChange={handleInputChange}
        min="0.01"
        step="0.01"
      />
      <SelectInput
        name="idioma"
        label="Idioma"
        options={idiomas}
        required
        value={formData.idioma}
        onChange={handleInputChange}
        defaultText="Selecione o idioma"
      />
      <SelectInput
        name="formato"
        label="Formato"
        options={formatos}
        required
        value={formData.formato}
        onChange={handleInputChange}
        defaultText="Selecione o formato"
      />
      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button
          tipo="button"
          cor="secondary"
          onClick={() => document.getElementById('formSessao').reset()}
        >
          Limpar
        </Button>
        <Button
          tipo="submit"
          cor="primary"
        >
          {isEditing ? 'Atualizar Sessão' : 'Adicionar Sessão'}
        </Button>
      </div>
    </form>
  );
};

export default SessaoForm;