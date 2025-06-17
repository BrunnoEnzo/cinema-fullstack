import React, { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import SearchInput from '../components/Input/SearchInput';
import Navbar from "../components/navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import SessaoForm from '../features/sessoes/components/SessaoForm';
import SessaoTable from '../features/sessoes/components/SessaoTable';

// Importando os serviços da API
import * as sessaoService from '../features/sessoes/services/sessaoService';
import * as filmeService from '../features/filmes/services/filmeService';
import * as salaService from '../features/salas/services/salaService';

function SessaoPage() {
    const [sessoes, setSessoes] = useState([]);
    const [filmes, setFilmes] = useState([]);
    const [salas, setSalas] = useState([]);
    const [sessaoEditando, setSessaoEditando] = useState(null);
    const [termoBusca, setTermoBusca] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sessaoParaExcluir, setSessaoParaExcluir] = useState(null);
    
    const [formData, setFormData] = useState({
        filme: '',
        sala: '',
        dataHora: '',
        preco: '',
        idioma: '',
        formato: ''
    });

    // Seus arrays originais, porém usando o label como value para simplificar
    const idiomas = [
        { value: 'Dublado', label: 'Dublado' },
        { value: 'Legendado', label: 'Legendado' }
    ];

    const formatos = [
        { value: '2D', label: '2D' },
        { value: '3D', label: '3D' }
    ];

    // *** INÍCIO DAS ALTERAÇÕES ***

    // 1. FUNÇÃO DE TRADUÇÃO: Converte dados da API para o formato que seus componentes esperam
    const transformarDadosApiParaFrontend = (sessoesApi) => {
        return sessoesApi.map(sessao => {
            const [data, horaCompleta] = sessao.dataHora.split('T');
            const horario = horaCompleta.slice(0, 5); // Pega apenas HH:mm
            return {
                id: sessao.id,
                filme: sessao.filme.titulo,
                sala: sessao.sala.nomeSala,
                data: data,
                horario: horario,
                preco: parseFloat(sessao.preco),
                idioma: sessao.idioma,
                formato: sessao.formato,
                // Mantemos os IDs para facilitar a edição
                filmeId: sessao.filmeId,
                salaId: sessao.salaId,
            };
        });
    };

    // 2. CARREGAMENTO DE DADOS: Busca na API e depois traduz
    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [filmesData, salasData, sessoesApiData] = await Promise.all([
                    filmeService.getFilmes(),
                    salaService.getSalas(),
                    sessaoService.getSessoes()
                ]);
                
                setFilmes(filmesData);
                setSalas(salasData);
                setSessoes(transformarDadosApiParaFrontend(sessoesApiData)); // Traduz os dados
            } catch (error) {
                console.error('Erro ao carregar dados da API:', error);
                alert('Não foi possível carregar os dados do servidor.');
            }
        };
        carregarDados();
    }, []);

    const fetchSessoes = async () => {
        try {
            const sessoesApiData = await sessaoService.getSessoes();
            setSessoes(transformarDadosApiParaFrontend(sessoesApiData)); // Sempre traduz
        } catch (error) {
             console.error('Erro ao recarregar sessões:', error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. SUBMISSÃO DE DADOS: Envia para a API no formato que ela espera
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        const sessaoParaApi = {
            filmeId: parseInt(formData.filme),
            salaId: parseInt(formData.sala),
            dataHora: formData.dataHora,
            preco: parseFloat(formData.preco),
            idioma: formData.idioma, // O valor já é o texto correto
            formato: formData.formato,  // O valor já é o texto correto
        };

        try {
            if (sessaoEditando) {
                await sessaoService.updateSessao(sessaoEditando.id, sessaoParaApi);
            } else {
                await sessaoService.createSessao(sessaoParaApi);
            }
            setShowModal(false);
            fetchSessoes();
        } catch (error) {
            console.error("Erro ao salvar sessão:", error);
            alert("Erro ao salvar sessão. Verifique os dados.");
        }
    };
    
    // 4. EXCLUSÃO: Chama a API e depois recarrega e traduz os dados
    const confirmarExclusao = async () => {
        if (!sessaoParaExcluir) return;
        try {
            await sessaoService.deleteSessao(sessaoParaExcluir.id);
            setShowDeleteModal(false);
            fetchSessoes();
        } catch (error) {
            console.error("Erro ao excluir sessão:", error);
            alert("Não foi possível excluir a sessão.");
        }
    };
    
    // 5. EDIÇÃO: Popula o formulário usando os IDs que guardamos no objeto traduzido
    const abrirModalEdicao = (sessao) => {
        setSessaoEditando(sessao);
        setFormData({
            filme: sessao.filmeId, // Usa o filmeId que guardamos
            sala: sessao.salaId,   // Usa o salaId que guardamos
            dataHora: `${sessao.data}T${sessao.horario}`,
            preco: sessao.preco.toString(),
            idioma: sessao.idioma,
            formato: sessao.formato
        });
        setShowModal(true);
    };

    // *** FIM DAS ALTERAÇÕES ***
    
    // O restante do seu código original permanece INTOCADO.
    
    const validarFormulario = () => {
        if (!formData.filme) { alert('Por favor, selecione um filme'); return false; }
        if (!formData.sala) { alert('Por favor, selecione uma sala'); return false; }
        if (!formData.dataHora) { alert('Por favor, informe a data e hora'); return false; }
        if (!formData.preco || isNaN(formData.preco) || formData.preco <= 0) { alert('Por favor, informe um preço válido maior que zero'); return false; }
        // Simplifiquei os arrays de idioma e formato, então essa validação já está coberta
        // if (!formData.idioma) { alert('Por favor, selecione o idioma'); return false; }
        // if (!formData.formato) { alert('Por favor, selecione o formato'); return false; }
        const dataSelecionada = new Date(formData.dataHora);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        if (dataSelecionada < hoje) { alert('A data não pode ser anterior a hoje!'); return false; }
        const cemAnosNoFuturo = new Date();
        cemAnosNoFuturo.setFullYear(hoje.getFullYear() + 100);
        if (dataSelecionada > cemAnosNoFuturo) { alert('A data não pode ser superior a 100 anos no futuro!'); return false; }
        return true;
    };

    const resetForm = () => {
        setFormData({ filme: '', sala: '', dataHora: '', preco: '', idioma: '', formato: '' });
    };

    const prepararExclusao = (sessao) => {
        setSessaoParaExcluir(sessao);
        setShowDeleteModal(true);
    };

    const abrirModalAdicionar = () => {
        setSessaoEditando(null);
        resetForm();
        setShowModal(true);
    };

    const sessoesFiltradas = termoBusca
        ? sessoes.filter(s =>
            s.filme.toLowerCase().includes(termoBusca.toLowerCase()) ||
            s.sala.toLowerCase().includes(termoBusca.toLowerCase()))
        : sessoes;

    const formatarData = (data) => {
        if (!data) return 'N/A';
        try {
            const [ano, mes, dia] = data.split('-');
            return `${dia}/${mes}/${ano}`;
        } catch {
            return data;
        }
    };

    // SEU RETURN PERMANECE IDÊNTICO.
    return (
        <div className="bg-dark text-light table-responsive" style={{ minHeight: "100vh", width: '100vw', boxSizing: "border-box" }}>
            <Navbar />
            <div className="container mt-4">
                <h1 className="text-center mb-4 custom-text-center">Cadastro de Sessões</h1>

                <div className="d-flex justify-content-between mb-4">
                    <Button
                        cor="primary"
                        onClick={abrirModalAdicionar}
                        ariaLabel="Adicionar nova sessão"
                    >
                        Adicionar Sessão
                    </Button>

                    <div className="d-flex">
                        <SearchInput
                            placeholder="Buscar sessões"
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />
                        {termoBusca && (
                            <Button
                                cor="light"
                                classeAdicional="ms-2"
                                onClick={() => setTermoBusca('')}
                            >
                                Limpar
                            </Button>
                        )}
                    </div>
                </div>

                <SessaoTable
                    sessoesFiltradas={sessoesFiltradas}
                    abrirModalEdicao={abrirModalEdicao}
                    prepararExclusao={prepararExclusao}
                    formatarData={formatarData}
                />

                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    titulo={sessaoEditando ? 'Editar Sessão' : 'Adicionar Sessão'}
                >
                    <SessaoForm
                        formData={formData}
                        filmes={filmes}
                        salas={salas}
                        idiomas={idiomas}
                        formatos={formatos}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        isEditing={!!sessaoEditando}
                    />
                </Modal>

                <Modal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    titulo="Confirmar Exclusão"
                    footerContent={
                        <>
                            <Button
                                cor="secondary"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                cor="danger"
                                onClick={confirmarExclusao}
                            >
                                Excluir
                            </Button>
                        </>
                    }
                >
                    <p>Tem certeza que deseja excluir a sessão <strong>{sessaoParaExcluir?.filme} - {sessaoParaExcluir?.sala}</strong>?</p>
                    <p className="text-warning">Atenção: Todos os ingressos vendidos para esta sessão serão removidos!</p>
                </Modal>
            </div>
        </div>
    );
}
    
export default SessaoPage;