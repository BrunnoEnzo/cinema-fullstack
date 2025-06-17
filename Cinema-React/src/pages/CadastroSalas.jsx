import React, { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import SearchInput from '../components/Input/SearchInput';
import Navbar from "../components/navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import SalaForm from '../features/salas/components/SalaForm';
import SalaTable from '../features/salas/components/SalaTable';
import * as salaService from '../features/salas/services/salaService'; // Ajuste o caminho se necessário

function SalaPage() {
    const [salas, setSalas] = useState([]);
    const [salaEditando, setSalaEditando] = useState(null);
    const [termoBusca, setTermoBusca] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [salaParaExcluir, setSalaParaExcluir] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        nomeSala: '',
        capacidade: '',
        tipo: ''
    });

    // Simplificado para enviar o texto diretamente, que é o que o schema espera (String)
    const tiposSala = [
        { value: '2D', label: '2D' },
        { value: '3D', label: '3D' },
        { value: 'IMAX', label: 'IMAX' },
        { value: 'VIP', label: 'VIP' }
    ];
    
    // Função para carregar as salas da API
    const fetchSalas = async () => {
        try {
            setIsLoading(true);
            const data = await salaService.getSalas();
            setSalas(data);
            setError(null);
        } catch (err) {
            setError("Não foi possível carregar as salas disponíveis.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Carrega as salas quando o componente é montado
    useEffect(() => {
        fetchSalas();
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

        const salaData = {
            ...formData,
            capacidade: parseInt(formData.capacidade, 10) || 0,
        };

        // Validação básica no frontend
        if (!salaData.nomeSala.trim() || !salaData.tipo || salaData.capacidade <= 0) {
            setError("Por favor, preencha todos os campos corretamente.");
            return;
        }

        setIsLoading(true);
        try {
            if (salaEditando) {
                await salaService.updateSala(salaEditando.id, salaData);
            } else {
                await salaService.createSala(salaData);
            }
            
            setShowModal(false);
            setSalaEditando(null);
            resetForm();
            await fetchSalas(); // Recarrega a lista após a operação
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Não foi possível salvar a sala.";
            setError(Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ nomeSala: '', capacidade: '', tipo: '' });
    };

    const prepararExclusao = (sala) => {
        setSalaParaExcluir(sala);
        setShowDeleteModal(true);
    };

    const confirmarExclusao = async () => {
        if (!salaParaExcluir) return;

        setIsLoading(true);
        try {
            await salaService.deleteSala(salaParaExcluir.id);
            setShowDeleteModal(false);
            setSalaParaExcluir(null);
            await fetchSalas();
        } catch (err) {
            setError("Não foi possível excluir a sala.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const abrirModalEdicao = (sala) => {
        setSalaEditando(sala);
        setFormData({
            nomeSala: sala.nomeSala,
            capacidade: sala.capacidade.toString(),
            tipo: sala.tipo 
        });
        setError(null);
        setShowModal(true);
    };

    const abrirModalAdicionar = () => {
        setSalaEditando(null);
        resetForm();
        setError(null);
        setShowModal(true);
    };

    const salasFiltradas = termoBusca
        ? salas.filter(s =>
            s.nomeSala.toLowerCase().includes(termoBusca.toLowerCase()))
        : salas;

    return (
        <div className="bg-dark text-light table-responsive" style={{ minHeight: "100vh", width: '100vw', boxSizing: "border-box" }}>
            <Navbar />
            <div className="container mt-4">
                <h1 className="text-center mb-4 custom-text-center">Cadastro de Salas</h1>

                <div className="d-flex justify-content-between mb-4">
                    <Button cor="primary" onClick={abrirModalAdicionar}>
                        Adicionar Sala
                    </Button>

                    <div className="d-flex">
                        <SearchInput
                            placeholder="Buscar salas"
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />
                    </div>
                </div>

                {isLoading && <p className="text-center">Carregando...</p>}
                {error && <div className="alert alert-danger" onClick={() => setError(null)}>{error}</div>}
                
                {!isLoading && (
                    <SalaTable
                        salasFiltradas={salasFiltradas}
                        abrirModalEdicao={abrirModalEdicao}
                        prepararExclusao={prepararExclusao}
                    />
                )}

                {/* Modais aqui... */}
                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    titulo={salaEditando ? 'Editar Sala' : 'Adicionar Sala'}>
                    <SalaForm
                        formData={formData}
                        tiposSala={tiposSala}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        isEditing={!!salaEditando}
                    />
                </Modal>

                <Modal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    titulo="Confirmar Exclusão"
                    footerContent={
                    <>
                        <Button cor="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
                        <Button cor="danger" onClick={confirmarExclusao}>Excluir</Button>
                    </>
                    }>
                    <p>Tem certeza que deseja excluir a sala <strong>{salaParaExcluir?.nomeSala}</strong>?</p>
                </Modal>
            </div>
        </div>
    );
}
    
export default SalaPage;