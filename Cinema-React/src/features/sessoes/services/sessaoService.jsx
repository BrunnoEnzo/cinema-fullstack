import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/sessoes`;

/**
 * Busca todas as sessões no backend.
 * Inclui os dados relacionados de Filme e Sala.
 */
export const getSessoes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar sessões:", error);
        throw error;
    }
};

/**
 * Cria uma nova sessão no backend.
 */
export const createSessao = async (sessaoData) => {
    try {
        const response = await axios.post(API_URL, sessaoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar sessão:", error);
        throw error;
    }
};

/**
 * Atualiza uma sessão existente no backend.
 */
export const updateSessao = async (id, sessaoData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, sessaoData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar sessão ${id}:`, error);
        throw error;
    }
};

/**
 * Exclui uma sessão do backend.
 */
export const deleteSessao = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Erro ao excluir sessão ${id}:`, error);
        throw error;
    }
};