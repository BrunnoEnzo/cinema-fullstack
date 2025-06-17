import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import Card from "../components/Card/Card";
import "../styles/global.css";

// 1. Importando os serviços da API
import * as filmeService from '../features/filmes/services/filmeService';
import * as sessaoService from '../features/sessoes/services/sessaoService';
import * as vendaService from '../features/ingressos/services/vendaService'; // Assumindo que o nome do serviço é este

function Home() {
    const [totalFilmes, setTotalFilmes] = useState(0);
    const [proximasSessoes, setProximasSessoes] = useState([]);
    const [totalVendas, setTotalVendas] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // 2. Carregando todos os dados da API de forma eficiente
    useEffect(() => {
        const carregarDados = async () => {
            setIsLoading(true);
            try {
                // Usando Promise.all para buscar tudo em paralelo
                const [filmesData, sessoesData, vendasData] = await Promise.all([
                    filmeService.getFilmes(),
                    sessaoService.getSessoes(),
                    vendaService.getVendas()
                ]);

                // 3. Processando os dados recebidos da API
                // Total de filmes
                setTotalFilmes(filmesData.length);

                // Lógica corrigida para Próximas Sessões
                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0); // Define para o início do dia
                const sessoesFuturas = sessoesData
                    .filter(s => new Date(s.dataHora) >= hoje) // Filtra sessões de hoje em diante
                    .sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora)) // Ordena pela mais próxima
                    .slice(0, 2); // Pega as 2 primeiras
                setProximasSessoes(sessoesFuturas);

                // Lógica corrigida para Vendas de Hoje
                const hojeString = new Date().toLocaleDateString('pt-BR');
                const vendasHoje = vendasData.filter(v => 
                    new Date(v.createdAt).toLocaleDateString('pt-BR') === hojeString
                );
                setTotalVendas(vendasHoje.length);

            } catch (error) {
                console.error("Erro ao carregar dados do dashboard:", error);
            } finally {
                setIsLoading(false);
            }
        };

        carregarDados();
    }, []);

    const formatarHora = (dataHoraISO) => {
        return new Date(dataHoraISO).toLocaleTimeString('pt-BR', {
            hour: '2-digit', minute: '2-digit', timeZone: 'UTC'
        });
    };

    return (
        <div className="bg-dark text-light" style={{ minHeight: "100vh", width: '100vw', boxSizing: "border-box" }}>
            <Navbar />

            <div className="container-fluid py-4">
                <div className="row justify-content-center">
                    <div className="col-12 text-center mb-4">
                        <h1 className="custom-text-center">Bem-vindo ao Sistema de Gerenciamento de Cinema</h1>
                        <p className="lead">
                            Gerencie filmes, salas, sessões e vendas de ingressos
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center px-3">
                    <div className="col-md-4 col-lg-3 mb-4">
                        <Card
                            title="Filmes Cadastrados"
                            value={isLoading ? '...' : totalFilmes}
                            linkText="Gerenciar Filmes"
                            linkTo="/cadastro-filmes"
                            bgColor="secondary"
                        />
                    </div>
                    <div className="col-md-4 col-lg-3 mb-4">
                        <Card
                            title="Próximas 3 Sessões"
                            linkText="Ver Todas"
                            linkTo="/sessoes" // Link para a página de visualização de sessões
                            bgColor="primary"
                        >
                            {/* 4. Exibindo as próximas sessões no Card */}
                            {isLoading ? <p>Carregando...</p> :
                                proximasSessoes.length > 0 ? (
                                    <ul className="list-group list-group-flush">
                                        {proximasSessoes.map(sessao => (
                                            <li key={sessao.id} className="list-group-item bg-transparent text-light border-light">
                                                <strong>{sessao.filme.titulo}</strong><br />
                                                <small>{sessao.sala.nomeSala} - {formatarHora(sessao.dataHora)}</small>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Nenhuma sessão futura encontrada.</p>
                                )
                            }
                        </Card>
                    </div>
                    <div className="col-md-4 col-lg-3 mb-4">
                        <Card
                            title="Vendas Hoje"
                            value={isLoading ? '...' : totalVendas}
                            linkText="Nova Venda"
                            linkTo="/venda-ingressos"
                            bgColor="success"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;