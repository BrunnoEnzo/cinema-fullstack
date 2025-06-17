import axios from 'axios';

// URL base da sua API NestJS
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/filmes`;

/**
 * Busca todos os filmes no backend.
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de filmes.
 */
export const getFilmes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        throw error; // Propaga o erro para o componente tratar
    }
};

/**
 * Cria um novo filme no backend.
 * @param {object} filmeData - Os dados do filme a ser criado.
 * @returns {Promise<object>} Uma promessa que resolve para o filme recém-criado.
 */
export const createFilme = async (filmeData) => {
    try {
        const response = await axios.post(API_URL, filmeData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar filme:", error);
        throw error;
    }
};

/**
 * Atualiza um filme existente no backend.
 * @param {number} id - O ID do filme a ser atualizado.
 * @param {object} filmeData - Os novos dados do filme.
 * @returns {Promise<object>} Uma promessa que resolve para o filme atualizado.
 */
export const updateFilme = async (id, filmeData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, filmeData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar filme ${id}:`, error);
        throw error;
    }
};

/**
 * Exclui um filme do backend.
 * @param {number} id - O ID do filme a ser excluído.
 * @returns {Promise<void>} Uma promessa que é resolvida quando a exclusão é concluída.
 */
export const deleteFilme = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Erro ao excluir filme ${id}:`, error);
        throw error;
    }
};