import React from 'react';
import Button from '../../../components/Button/Button';

const SessaoTable = ({
  sessoesFiltradas,
  abrirModalEdicao,
  prepararExclusao,
  formatarData
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover align-middle mb-0">
        <thead>
          <tr>
            <th className="text-center align-middle">ID</th>
            <th className="text-center align-middle">Filme</th>
            <th className="text-center align-middle">Sala</th>
            <th className="text-center align-middle">Data</th>
            <th className="text-center align-middle">Hora</th>
            <th className="text-center align-middle">Preço</th>
            <th className="text-center align-middle">Idioma</th>
            <th className="text-center align-middle">Formato</th>
            <th className="text-center align-middle">Ações</th>
          </tr>
        </thead>
        <tbody>
          {sessoesFiltradas.map(sessao => (
            <tr key={sessao.id}>
              <td className="text-center align-middle">{sessao.id}</td>
              <td className="text-center align-middle">{sessao.filme}</td>
              <td className="text-center align-middle">{sessao.sala}</td>
              <td className="text-center align-middle">{formatarData(sessao.data)}</td>
              <td className="text-center align-middle">{sessao.horario}</td>
              <td className="text-center align-middle">R$ {sessao.preco.toFixed(2)}</td>
              <td className="text-center align-middle">{sessao.idioma}</td>
              <td className="text-center align-middle">{sessao.formato}</td>
              <td className="text-center align-middle">
                <div className="d-flex justify-content-center gap-2">
                  <Button
                    cor="warning"
                    tamanho="sm"
                    classeAdicional='customMenor-btn custom-btn'
                    onClick={() => abrirModalEdicao(sessao)}
                    ariaLabel={`Editar sessão ${sessao.id}`}
                  >
                    Editar
                  </Button>
                  <Button
                    cor="danger"
                    tamanho="sm"
                    classeAdicional='customMenor-btn custom-btn'
                    onClick={() => prepararExclusao(sessao)}
                    ariaLabel={`Excluir sessão ${sessao.id}`}
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

export default SessaoTable;