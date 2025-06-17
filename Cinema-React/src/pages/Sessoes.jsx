import React, { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import SearchInput from '../components/Input/SearchInput';
import Navbar from "../components/navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import SessaoViewTable from '../features/sessoes/components/SessaoViewTable';
import * as sessaoService from '../features/sessoes/services/sessaoService';

function SessaoViewPage() {
    const [allSessoes, setAllSessoes] = useState([]);
    const [termoBusca, setTermoBusca] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const carregarSessoes = async () => {
            setIsLoading(true);
            try {
                const sessoesDaApi = await sessaoService.getSessoes();
                setAllSessoes(sessoesDaApi);
                setError(null);
            } catch (err) {
                console.error('Erro ao carregar sessões:', err);
                setError("Não foi possível carregar as sessões disponíveis.");
            } finally {
                setIsLoading(false);
            }
        };
        carregarSessoes();
    }, []);

    const sessoesFiltradas = termoBusca
        ? allSessoes.filter(s => 
            s.filme.titulo.toLowerCase().includes(termoBusca.toLowerCase()) || 
            s.sala.nomeSala.toLowerCase().includes(termoBusca.toLowerCase())
        )
        : allSessoes;

    const redirecionarParaVenda = (sessaoId, filmeTitulo, salaNome) => {
        sessionStorage.setItem('sessaoSelecionada', JSON.stringify({
            id: sessaoId,
            filme: filmeTitulo,
            sala: salaNome
        }));
        window.location.href = '/venda-ingressos';
    };

    return (
        <div className="bg-dark text-light table-responsive" style={{ minHeight: "100vh", width: '100vw', boxSizing: "border-box" }}>
            <Navbar />
            <div className="container mt-4">
                <h1 className="text-center mb-4 custom-text-center">Sessões Disponíveis</h1>

                <div className="d-flex justify-content-center mb-4">
                    <div className="w-75">
                        <SearchInput
                            placeholder="Buscar por filme ou sala"
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />
                    </div>
                </div>

                {isLoading && <p className="text-center">Carregando sessões...</p>}
                {error && <div className="alert alert-danger">{error}</div>}
                
                {!isLoading && !error && (
                    <SessaoViewTable
                        sessoes={sessoesFiltradas}
                        termoBusca={termoBusca}
                        redirecionarParaVenda={redirecionarParaVenda}
                    />
                )}
            </div>
        </div>
    );
}

export default SessaoViewPage;