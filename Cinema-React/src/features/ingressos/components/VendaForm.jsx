import React from 'react';
import InputText from '../../../components/Input/InputText';
import SelectInput from '../../../components/Input/SelectInput';
import InputCpf from '../../../components/Input/InputCpf';
import Button from '../../../components/Button/Button';

const VendaForm = ({
  formData,
  sessoes,
  tiposPagamento,
  handleInputChange,
  handleSubmit,
  isEditing = false
}) => {
  return (
    <form id="formVenda" onSubmit={handleSubmit}>
      <SelectInput
        name="sessao"
        label="Sessão"
        // CORREÇÃO APLICADA AQUI:
        options={sessoes.map(s => ({
          value: s.id,
          // Acessamos as propriedades 'titulo' e 'nomeSala' dos objetos
          label: `${s.filme?.titulo || 'Filme Indisponível'} - ${s.sala?.nomeSala || 'Sala Indisponível'}`
        }))}
        required
        value={formData.sessao}
        onChange={handleInputChange}
        defaultText="Selecione a sessão"
      />
      <InputText
        name="nomeCliente"
        label="Nome do Cliente"
        required
        value={formData.nomeCliente}
        onChange={handleInputChange}
        placeholder="Digite o nome do cliente"
      />
      <InputCpf
        name="cpf"
        label="CPF do Cliente"
        required
        value={formData.cpf}
        onChange={handleInputChange}
        placeholder="Digite o CPF"
      />
      <InputText
        name="assento"
        label="Assento"
        required
        value={formData.assento}
        onChange={handleInputChange}
        placeholder="Digite o número do assento"
      />
      <SelectInput
        name="tipoPagamento"
        label="Tipo de Pagamento"
        options={tiposPagamento}
        required
        value={formData.tipoPagamento}
        onChange={handleInputChange}
        defaultText="Selecione o tipo de pagamento"
      />
      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button
          tipo="button"
          cor="secondary"
          onClick={() => document.getElementById('formVenda').reset()}
        >
          Limpar
        </Button>
        <Button
          tipo="submit"
          cor="primary"
        >
          {isEditing ? 'Atualizar Venda' : 'Registrar Venda'}
        </Button>
      </div>
    </form>
  );
};

export default VendaForm;