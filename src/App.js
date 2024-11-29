import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import LoginForm from './components/LoginForm';
import Timetable from './components/Timetable';
import RegisteredCourses from './components/RegisteredCourses';
import useAuth from './hooks/useAuth';
import { fetchTimetable, fetchCourses } from './api/studentApi';

const App = () => {
    const { token, studentId, handleLogin } = useAuth();
    const [timetable, setTimetable] = useState(null);
    const [courses, setCourses] = useState(null);

    const getTimetable = async () => {
        if (studentId && token) {
            const data = await fetchTimetable(studentId, token);
            setTimetable(data);
        }
    };

    const getCourses = async () => {
        if (studentId && token) {
            const data = await fetchCourses(studentId, token);
            setCourses(data);
        }
    };

    // Fetch timetable and courses once token and studentId are available
    useEffect(() => {
        if (token && studentId) {
            getTimetable();
            getCourses();
        }
    }, [token, studentId]);

    return (
        <Container>
            {!token ? (
                <LoginForm onLogin={handleLogin} />
            ) : (
                <div>
                    <Typography variant="h6">Student ID: {studentId}</Typography>

                    {/* Automatically fetch and display timetable and courses */}
                    <Timetable timetable={timetable} />
                    <RegisteredCourses courses={courses} />
                </div>
            )}
        </Container>
    );
};

export default App;
