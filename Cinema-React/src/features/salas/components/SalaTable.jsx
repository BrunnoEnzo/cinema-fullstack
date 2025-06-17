import React from 'react';
import Button from '../../../components/Button/Button';

const SalaTable = ({
  salasFiltradas,
  abrirModalEdicao,
  prepararExclusao
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover align-middle mb-0">
        <thead>
          <tr>
            <th className="text-center align-middle">ID</th>
            <th className="text-center align-middle">Sala</th>
            <th className="text-center align-middle">Capacidade</th>
            <th className="text-center align-middle">Tipo</th>
            <th className="text-center align-middle">Ações</th>
          </tr>
        </thead>
        <tbody>
          {salasFiltradas.map(sala => (
            <tr key={sala.id}>
              <td className="text-center align-middle">{sala.id}</td>
              <td className="text-center align-middle">{sala.nomeSala}</td>
              <td className="text-center align-middle">{sala.capacidade}</td>
              <td className="text-center align-middle">{sala.tipo}</td>
              <td className="text-center align-middle">
                <div className="d-flex justify-content-center gap-2">
                  <Button
                    cor="warning"
                    tamanho="sm"
                    classeAdicional='customMenor-btn'
                    onClick={() => abrirModalEdicao(sala)}
                    ariaLabel={`Editar sala ${sala.nomeSala}`}
                  >
                    Editar
                  </Button>
                  <Button
                    cor="danger"
                    tamanho="sm"
                    classeAdicional='customMenor-btn'
                    onClick={() => prepararExclusao(sala)}
                    ariaLabel={`Excluir sala ${sala.nomeSala}`}
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

export default SalaTable;