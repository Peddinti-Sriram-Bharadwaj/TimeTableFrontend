import axios from 'axios';

const API_URL = 'http://localhost:8082/api/v1/auth/';

const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}login`, {
            email, // Ensure this is correct
            password,
        });

        if (response.data.body) {
            localStorage.setItem('jwtToken', response.data.body);
        }
        return response.data; // Return full response for further checks
    } catch (error) {
        // Log error details for debugging
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error; // Rethrow to handle in Login component
    }
};

const logout = () => {
    localStorage.removeItem('jwtToken');
};

const getToken = () => {
    return localStorage.getItem('jwtToken');
};

export default {
    login,
    logout,
    getToken,
};
