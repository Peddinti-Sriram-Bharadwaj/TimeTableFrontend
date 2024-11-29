import { useState } from 'react';
import { login } from '../api/authApi';

const useAuth = () => {
    const [token, setToken] = useState(null);
    const [studentId, setStudentId] = useState(null);

    const handleLogin = async (email, password) => {
        try {
            const data = await login(email, password);
            setToken(data.token);
            setStudentId(data.studentId);
            return data;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    return { token, studentId, handleLogin };
};

export default useAuth;
