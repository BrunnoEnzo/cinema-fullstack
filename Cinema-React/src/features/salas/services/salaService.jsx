import axios from 'axios';

// URL base da sua API NestJS para o recurso de salas
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/salas`;

/**
 * Busca todas as salas no backend.
 */
export const getSalas = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar salas:", error);
        throw error;
    }
};

/**
 * Cria uma nova sala no backend.
 */
export const createSala = async (salaData) => {
    try {
        const response = await axios.post(API_URL, salaData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar sala:", error);
        throw error;
    }
};

/**
 * Atualiza uma sala existente no backend.
 */
export const updateSala = async (id, salaData) => {
    try {
        // Usando PUT conforme sua preferência anterior
        const response = await axios.put(`${API_URL}/${id}`, salaData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar sala ${id}:`, error);
        throw error;
    }
};

/**
 * Exclui uma sala do backend.
 */
export const deleteSala = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Erro ao excluir sala ${id}:`, error);
        throw error;
    }
};