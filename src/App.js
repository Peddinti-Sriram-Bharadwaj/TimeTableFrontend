import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import LoginForm from './components/LoginForm';
import Timetable from './components/Timetable';
import RegisteredCourses from './components/RegisteredCourses';
import useAuth from './hooks/useAuth';
import useTimetable from './hooks/useTimetable';
import useCourses from './hooks/useCourses';
import { downloadTimetableAsPDF } from './utils/pdfUtils';

const App = () => {
    const { token, studentId, handleLogin } = useAuth();
    const timetable = useTimetable(studentId, token);
    const courses = useCourses(studentId, token);

    return (
        <Container>
            {!token ? (
                <LoginForm onLogin={handleLogin} />
            ) : (
                <div>
                    <Typography variant="h6">Student ID: {studentId}</Typography>

                    {/* Button to download the timetable as PDF */}
                    <Button
                        onClick={() => downloadTimetableAsPDF(timetable)}
                        variant="contained"
                        color="primary"
                        style={{ margin: '20px 0' }}
                    >
                        Download Timetable as PDF
                    </Button>

                    {/* Automatically fetch and display timetable and courses */}
                    <Timetable timetable={timetable} />
                    <RegisteredCourses courses={courses} />
                </div>
            )}
        </Container>
    );
};

export default App;
