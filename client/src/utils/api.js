import axios from 'axios';

// Use environment variables for API URL in production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://finance-manager-79a56dkdw-viishal07s-projects.vercel.app/api';
const TRANSACTIONS_URL = `${API_BASE_URL}/transactions`;
const USERS_URL = `${API_BASE_URL}/users`;

// Auth API calls
export const registerUser = async (userData) => {
    try {
        console.log('Registering user with URL:', `${USERS_URL}/register`);
        console.log('Full API URL:', API_BASE_URL);
        console.log('User data:', userData);
        
        const response = await axios.post(`${USERS_URL}/register`, userData, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000 // 10 second timeout
        });
        
        console.log('Registration successful:', response.data);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Registration error details:', error);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
        console.error('Response headers:', error.response?.headers);
        throw error.response?.data?.message || error.message || 'Error registering user';
    }
};

export const loginUser = async (userData) => {
    try {
        console.log('Logging in with URL:', `${USERS_URL}/login`);
        const response = await axios.post(`${USERS_URL}/login`, userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Login error details:', error);
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
        throw error.response?.data?.message || 'Error logging in';
    }
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

// Test API connectivity
export const testAPI = async () => {
    try {
        console.log('Testing API connectivity...');
        const response = await axios.get(API_BASE_URL.replace('/api', ''));
        console.log('API test successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('API test failed:', error);
        throw error;
    }
};

// Helper function to get auth config
const getAuthConfig = () => {
    const user = getCurrentUser();
    const config = {
        headers: {
            Authorization: `Bearer ${user?.token}`
        }
    };
    return config;
};

// Transaction API calls
export const getTransactions = async () => {
    try {
        const response = await axios.get(TRANSACTIONS_URL, getAuthConfig());
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error fetching transactions';
    }
};

export const addTransaction = async (transactionData) => {
    try {
        const response = await axios.post(TRANSACTIONS_URL, transactionData, getAuthConfig());
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error adding transaction';
    }
};

export const deleteTransaction = async (id) => {
    try {
        const response = await axios.delete(`${TRANSACTIONS_URL}/${id}`, getAuthConfig());
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error deleting transaction';
    }
};