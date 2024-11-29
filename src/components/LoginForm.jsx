import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        onLogin(email, password);
    };

    return (
        <div>
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
            <Button onClick={handleSubmit}>Login</Button>
        </div>
    );
};

export default LoginForm;
