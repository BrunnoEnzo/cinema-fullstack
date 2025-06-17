import React, { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import SearchInput from '../components/Input/SearchInput';
import Navbar from "../components/navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import FilmeForm from '../features/filmes/components/FilmeForm';
import FilmeTable from '../features/filmes/components/FilmeTable';
import * as filmeService from '../features/filmes/services/filmeService'; // Importe o serviço

function FilmePage() {
    const [filmes, setFilmes] = useState([]);
    const [filmeEditando, setFilmeEditando] = useState(null);
    const [termoBusca, setTermoBusca] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [filmeParaExcluir, setFilmeParaExcluir] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        genero: '',
        classificacao: '',
        duracao: '',
        dataEstreia: ''
    });

    const generos = [
        { value: 'Ação', label: 'Ação' },
        { value: 'Suspense', label: 'Suspense' },
        { value: 'Comédia', label: 'Comédia' },
        { value: 'Drama', label: 'Drama' },
        { value: 'Terror', label: 'Terror' },
        { value: 'Romance', label: 'Romance' },
        { value: 'Ficção Científica', label: 'Ficção Científica' },
        { value: 'Documentário', label: 'Documentário' },
        { value: 'Animação', label: 'Animação' },
        { value: 'Fantasia', label: 'Fantasia' },
        { value: 'Aventura', label: 'Aventura' },
        { value: 'Musical', label: 'Musical' }
    ];

    const classificacoes = [
        { value: 0, label: 'Livre' },
        { value: 10, label: '+10' },
        { value: 12, label: '+12' },
        { value: 14, label: '+14' },
        { value: 16, label: '+16' },
        { value: 18, label: '+18' }
    ];
    
    // Função para carregar os filmes da API
    const fetchFilmes = async () => {
        try {
            setIsLoading(true);
            const data = await filmeService.getFilmes();
            setFilmes(data);
            setError(null);
        } catch (error) {
            setError("Não foi possível carregar os filmes disponíveis.");
        } finally {
            setIsLoading(false);
        }
    };

    // Carrega os filmes quando o componente é montado
    useEffect(() => {
        fetchFilmes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Converte os dados do formulário para o formato esperado pela API
        const filmeData = {
            ...formData,
            duracao: parseInt(formData.duracao, 10), // Garante que a duração seja um número
            // A data já deve estar no formato 'YYYY-MM-DD', o que é ok para o backend.
        };

        try {
            if (filmeEditando) {
                await filmeService.updateFilme(filmeEditando.id, filmeData);
            } else {
                await filmeService.createFilme(filmeData);
            }
            
            setShowModal(false);
            setFilmeEditando(null);
            resetForm();
            fetchFilmes(); // Recarrega a lista de filmes após a operação
        } catch (error) {
            console.error("Erro ao salvar filme:", error);
            setError("Não foi possível salvar o filme. Verifique os dados e tente novamente.");
        }
    };

    const resetForm = () => {
        setFormData({
            titulo: '',
            descricao: '',
            genero: '',
            classificacao: '',
            duracao: '',
            dataEstreia: ''
        });
    };

    const prepararExclusao = (filme) => {
        setFilmeParaExcluir(filme);
        setShowDeleteModal(true);
    };

    const confirmarExclusao = async () => {
        if (!filmeParaExcluir) return;

        try {
            await filmeService.deleteFilme(filmeParaExcluir.id);
            setShowDeleteModal(false);
            setFilmeParaExcluir(null);
            fetchFilmes(); // Recarrega a lista após a exclusão
        } catch (error) {
            console.error("Erro ao excluir filme:", error);
            setError("Não foi possível excluir o filme.");
        }
    };

    const abrirModalEdicao = (filme) => {
        setFilmeEditando(filme);
        setFormData({
            titulo: filme.titulo,
            descricao: filme.descricao,
            genero: filme.genero,
            classificacao: filme.classificacao,
            duracao: filme.duracao.toString(),
            // Formata a data para o input type="date" (YYYY-MM-DD)
            dataEstreia: new Date(filme.dataEstreia).toISOString().split('T')[0]
        });
        setShowModal(true);
    };

    const abrirModalAdicionar = () => {
        setFilmeEditando(null);
        resetForm();
        setShowModal(true);
        setError(null);
    };

    const filmesFiltrados = termoBusca
        ? filmes.filter(f =>
            f.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
            f.descricao.toLowerCase().includes(termoBusca.toLowerCase()))
        : filmes;

    return (
        <div className="bg-dark text-light table-responsive" style={{ minHeight: "100vh", width: '100vw', boxSizing: "border-box" }}>
            <Navbar />
            <div className="container mt-4">
                <h1 className="text-center mb-4 custom-text-center">Cadastro de Filmes</h1>
        
                <div className="d-flex justify-content-between mb-4">
                    <Button cor="primary" onClick={abrirModalAdicionar}>
                        Adicionar Filme
                    </Button>
        
                    <div className="d-flex">
                        <SearchInput
                            placeholder="Buscar filmes"
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />
                        {termoBusca && (
                            <Button cor="light" classeAdicional="ms-2" onClick={() => setTermoBusca('')}>
                                Limpar
                            </Button>
                        )}
                    </div>
                </div>
                
                {isLoading && <p className="text-center">Carregando filmes...</p>}
                {error && <div className="alert alert-danger">{error}</div>}
                
                {!isLoading && !error && (
                    <FilmeTable
                        filmesFiltrados={filmesFiltrados}
                        abrirModalEdicao={abrirModalEdicao}
                        prepararExclusao={prepararExclusao}
                        classificacoes={classificacoes}
                    />
                )}
        
                {/* Modal de Adição/Edição */}
                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    titulo={filmeEditando ? 'Editar Filme' : 'Adicionar Filme'}
                >
                    <FilmeForm
                        formData={formData}
                        generos={generos}
                        classificacoes={classificacoes}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        isEditing={!!filmeEditando}
                    />
                </Modal>
        
                {/* Modal de Confirmação de Exclusão */}
                <Modal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    titulo="Confirmar Exclusão"
                    footerContent={
                        <>
                            <Button cor="secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancelar
                            </Button>
                            <Button cor="danger" onClick={confirmarExclusao}>
                                Excluir
                            </Button>
                        </>
                    }
                >
                    <p>Tem certeza que deseja excluir o filme <strong>{filmeParaExcluir?.titulo}</strong>?</p>
                </Modal>
            </div>
        </div>
    );
}

export default FilmePage;