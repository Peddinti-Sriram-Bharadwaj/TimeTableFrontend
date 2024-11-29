import axios from 'axios';

export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8082/api/v1/auth/login', { email, password });
        return response.data.body;
    } catch (error) {
        throw error;
    }
};
