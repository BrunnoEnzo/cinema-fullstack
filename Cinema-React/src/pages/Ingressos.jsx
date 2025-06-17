import React, { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import SearchInput from '../components/Input/SearchInput';
import Navbar from "../components/navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import VendaTable from '../features/ingressos/components/VendaTable';
import VendaForm from '../features/ingressos/components/VendaForm';
import * as vendaService from '../features/ingressos/services/vendaService';
import * as sessaoService from '../features/sessoes/services/sessaoService';

function IngressoPage() {
    const [vendas, setVendas] = useState([]);
    const [sessoes, setSessoes] = useState([]);
    const [vendaEditando, setVendaEditando] = useState(null);
    const [termoBusca, setTermoBusca] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [vendaParaExcluir, setVendaParaExcluir] = useState(null);
    const [formData, setFormData] = useState({
        sessao: '',
        nomeCliente: '',
        cpf: '',
        assento: '',
        tipoPagamento: ''
    });

    const tiposPagamento = [
        { value: 'Cartão', label: 'Cartão' },
        { value: 'Pix', label: 'Pix' },
        { value: 'Dinheiro', label: 'Dinheiro' }
    ];

    const transformarVendasParaFrontend = (vendasApi) => {
        return vendasApi.map(venda => ({
            id: venda.id,
            sessao: `${venda.sessao.filme.titulo} - ${venda.sessao.sala.nomeSala}`,
            nomeCliente: venda.nomeCliente,
            cpf: venda.cpf,
            assento: venda.assento,
            tipoPagamento: venda.tipoPagamento,
            sessaoId: venda.sessaoId,
        }));
    };

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [sessoesData, vendasApiData] = await Promise.all([
                    sessaoService.getSessoes(),
                    vendaService.getVendas()
                ]);
                setSessoes(sessoesData);
                setVendas(transformarVendasParaFrontend(vendasApiData));

                // *** LÓGICA RESTAURADA AQUI ***
                const sessaoSelecionada = sessionStorage.getItem('sessaoSelecionada');
                if (sessaoSelecionada) {
                    const { id } = JSON.parse(sessaoSelecionada);
                    setFormData(prev => ({...prev, sessao: id}));
                    setShowModal(true);
                    sessionStorage.removeItem('sessaoSelecionada');
                }

            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                alert('Não foi possível carregar os dados do servidor.');
            }
        };
        carregarDados();
    }, []);

    const fetchVendas = async () => {
        try {
            const vendasApiData = await vendaService.getVendas();
            setVendas(transformarVendasParaFrontend(vendasApiData));
        } catch(error) {
            console.error("Erro ao recarregar vendas:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        const vendaParaApi = {
            sessaoId: parseInt(formData.sessao),
            nomeCliente: formData.nomeCliente.trim(),
            cpf: formData.cpf.replace(/\D/g, ''),
            assento: formData.assento.trim(),
            tipoPagamento: formData.tipoPagamento
        };

        try {
            if (vendaEditando) {
                await vendaService.updateVenda(vendaEditando.id, vendaParaApi);
            } else {
                await vendaService.createVenda(vendaParaApi);
            }
            setShowModal(false);
            fetchVendas();
        } catch (error) {
            console.error("Erro ao salvar venda:", error);
            alert("Erro ao salvar venda.");
        }
    };
    
    const confirmarExclusao = async () => {
        if (!vendaParaExcluir) return;
        try {
            await vendaService.deleteVenda(vendaParaExcluir.id);
            setShowDeleteModal(false);
            fetchVendas();
        } catch (error) {
            console.error("Erro ao excluir venda:", error);
            alert("Não foi possível excluir a venda.");
        }
    };

    const abrirModalEdicao = (venda) => {
        setVendaEditando(venda);
        setFormData({
            sessao: venda.sessaoId,
            nomeCliente: venda.nomeCliente,
            cpf: venda.cpf,
            assento: venda.assento,
            tipoPagamento: venda.tipoPagamento
        });
        setShowModal(true);
    };

    const validarFormulario = () => {
        if (!formData.sessao) { alert('Por favor, selecione uma sessão'); return false; }
        if (!formData.nomeCliente.trim()) { alert('Por favor, informe o nome do cliente'); return false; }
        if (!formData.cpf.trim() || formData.cpf.replace(/\D/g, '').length !== 11 ) { alert('CPF deve conter 11 dígitos'); return false; }
        if (!formData.assento.trim()) { alert('Por favor, informe o assento'); return false; }
        if (!formData.tipoPagamento) { alert('Por favor, selecione o tipo de pagamento'); return false; }
        return true;
    };

    const resetForm = () => {
        setFormData({ sessao: '', nomeCliente: '', cpf: '', assento: '', tipoPagamento: '' });
    };

    const prepararExclusao = (venda) => {
        setVendaParaExcluir(venda);
        setShowDeleteModal(true);
    };

    const abrirModalAdicionar = () => {
        setVendaEditando(null);
        resetForm();
        setShowModal(true);
    };

    const vendasFiltradas = termoBusca
        ? vendas.filter(v =>
            v.nomeCliente.toLowerCase().includes(termoBusca.toLowerCase()) ||
            v.cpf.includes(termoBusca) ||
            v.sessao.toLowerCase().includes(termoBusca.toLowerCase()))
        : vendas;

    const formatarCPF = (cpf) => {
        if (!cpf) return '';
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    return (
        <div className="bg-dark text-light table-responsive" style={{ minHeight: "100vh", width: '100vw', boxSizing: "border-box" }}>
          <Navbar />
          <div className="container mt-4">
            <h1 className="text-center mb-4 custom-text-center">Venda de Ingressos</h1>
            <div className="d-flex justify-content-between mb-4">
              <Button cor="primary" onClick={abrirModalAdicionar}>
                Adicionar Venda
              </Button>
              <div className="d-flex">
                <SearchInput
                  placeholder="Buscar ingressos"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                />
              </div>
            </div>
            <VendaTable
              vendasFiltradas={vendasFiltradas}
              abrirModalEdicao={abrirModalEdicao}
              prepararExclusao={prepararExclusao}
              formatarCPF={formatarCPF}
            />
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              titulo={vendaEditando ? 'Editar Venda' : 'Nova Venda'}
            >
              <VendaForm
                formData={formData}
                sessoes={sessoes}
                tiposPagamento={tiposPagamento}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isEditing={!!vendaEditando}
              />
            </Modal>
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
              <p>Tem certeza que deseja excluir o ingresso de <strong>{vendaParaExcluir?.nomeCliente}</strong> para a sessão <strong>{vendaParaExcluir?.sessao}</strong>?</p>
            </Modal>
          </div>
        </div>
      );
}
    
export default IngressoPage;