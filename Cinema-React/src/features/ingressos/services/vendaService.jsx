import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/vendas`;

/**
 * Busca todas as vendas no backend.
 * Inclui os dados relacionados da Sessão.
 */
export const getVendas = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar vendas:", error);
        throw error;
    }
};

/**
 * Cria uma nova venda no backend.
 */
export const createVenda = async (vendaData) => {
    try {
        const response = await axios.post(API_URL, vendaData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar venda:", error);
        throw error;
    }
};

/**
 * Atualiza uma venda existente no backend.
 */
export const updateVenda = async (id, vendaData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, vendaData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar venda ${id}:`, error);
        throw error;
    }
};

/**
 * Exclui uma venda do backend.
 */
export const deleteVenda = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Erro ao excluir venda ${id}:`, error);
        throw error;
    }
};