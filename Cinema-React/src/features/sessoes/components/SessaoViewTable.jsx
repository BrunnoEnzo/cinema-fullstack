import React from 'react';
import Button from '../../../components/Button/Button';

const SessaoViewTable = ({
  sessoes,
  termoBusca,
  redirecionarParaVenda,
}) => {
  // Função interna para formatar a data e hora a partir do dado da API
  const formatarDataHora = (dataHoraISO) => {
    if (!dataHoraISO) return { data: 'N/A', hora: '' };
    const dataObj = new Date(dataHoraISO);
    return {
      data: dataObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
      hora: dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })
    };
  };

  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover align-middle mb-0">
        <thead>
          <tr>
            <th className="text-center align-middle">ID</th>
            <th className="text-center align-middle">Filme</th>
            <th className="text-center align-middle">Sala</th>
            <th className="text-center align-middle">Data</th>
            <th className="text-center align-middle">Horário</th>
            <th className="text-center align-middle">Ação</th>
          </tr>
        </thead>
        <tbody>
          {sessoes.length === 0 ? (
            <tr className="table-dark">
              <td colSpan="6" className="text-center">
                {termoBusca ? 'Nenhuma sessão encontrada para sua busca' : 'Nenhuma sessão disponível no momento'}
              </td>
            </tr>
          ) : (
            sessoes.map(sessao => {
              // Para cada sessão, formata sua data e hora
              const { data, hora } = formatarDataHora(sessao.dataHora);
              return (
                <tr key={sessao.id} className="table-dark">
                  <td className="text-center align-middle">{sessao.id}</td>
                  {/* Ajustado para acessar as propriedades corretas dos objetos aninhados */}
                  <td className="text-center align-middle"><strong>{sessao.filme.titulo}</strong></td>
                  <td className="text-center align-middle">{sessao.sala.nomeSala}</td>
                  <td className="text-center align-middle">{data}</td>
                  <td className="text-center align-middle">{hora}</td>
                  <td className="text-center align-middle">
                    <Button
                      cor="success"
                      tamanho="sm"
                      classeAdicional='customMenor-btn'
                      // Ajustado para passar os parâmetros corretos para a função
                      onClick={() => redirecionarParaVenda(sessao.id, sessao.filme.titulo, sessao.sala.nomeSala)}
                      ariaLabel={`Comprar ingresso para ${sessao.filme.titulo}`}
                    >
                      Comprar
                    </Button>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SessaoViewTable;