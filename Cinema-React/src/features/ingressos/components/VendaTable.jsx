import React from 'react';
import Button from '../../../components/Button/Button';

const VendaTable = ({
  vendasFiltradas,
  abrirModalEdicao,
  prepararExclusao,
  formatarCPF
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover align-middle mb-0">
        <thead>
          <tr>
            <th className="text-center align-middle">ID</th>
            <th className="text-center align-middle">Sessão</th>
            <th className="text-center align-middle">Nome do Cliente</th>
            <th className="text-center align-middle">CPF</th>
            <th className="text-center align-middle">Assento</th>
            <th className="text-center align-middle">Pagamento</th>
            <th className="text-center align-middle">Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendasFiltradas.map(venda => (
            <tr key={venda.id}>
              <td className="text-center align-middle">{venda.id}</td>
              <td className="text-center align-middle">{venda.sessao}</td>
              <td className="text-center align-middle">{venda.nomeCliente}</td>
              <td className="text-center align-middle">{formatarCPF(venda.cpf)}</td>
              <td className="text-center align-middle">{venda.assento}</td>
              <td className="text-center align-middle">{venda.tipoPagamento}</td>
              <td className="text-center align-middle">
                <div className="d-flex justify-content-center gap-2">
                  <Button
                    cor="warning"
                    tamanho="sm"
                    classeAdicional='customMenor-btn '
                    onClick={() => abrirModalEdicao(venda)}
                    ariaLabel={`Editar venda ${venda.id}`}
                  >
                    Editar
                  </Button>
                  <Button
                    cor="danger"
                    tamanho="sm"
                    classeAdicional='customMenor-btn'
                    onClick={() => prepararExclusao(venda)}
                    ariaLabel={`Excluir venda ${venda.id}`}
                  >
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendaTable;