import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions';

export const getTransactions = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addTransaction = async (transactionData) => {
    const response = await axios.post(API_URL, transactionData);
    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};