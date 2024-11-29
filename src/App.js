import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import LoginForm from './components/LoginForm';
import Timetable from './components/Timetable';
import RegisteredCourses from './components/RegisteredCourses';
import useAuth from './hooks/useAuth';
import { fetchTimetable, fetchCourses } from './api/studentApi';
import { jsPDF } from "jspdf";
import "jspdf-autotable";


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

    const downloadTimetableAsPDF = () => {
        const doc = new jsPDF();

        doc.setFont("helvetica", "normal");

        // Title
        doc.text("Student Timetable", 20, 10);

        // Table header
        const header = ["Day", "08:00 - 09:30", "09:30 - 11:00", "11:00 - 13:00"];

        // Prepare table body
        const body = timetable.weekdays.map((day) => {
            return [
                day.day,
                day.timeslots.find((slot) => slot.startTime === "08:00")?.coursename || "No Class",
                day.timeslots.find((slot) => slot.startTime === "09:30")?.coursename || "No Class",
                day.timeslots.find((slot) => slot.startTime === "11:00")?.coursename || "No Class"
            ];
        });

        // Create the table
        doc.autoTable({
            head: [header],
            body: body,
            startY: 20,
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] }, // Custom header color
            margin: { top: 30, left: 20, right: 20 },
        });

        // Download PDF
        doc.save("timetable.pdf");
    };


    return (
        <Container>
            {!token ? (
                <LoginForm onLogin={handleLogin} />
            ) : (
                <div>
                    <Typography variant="h6">Student ID: {studentId}</Typography>

                    {/* Button to download the timetable as PDF */}
                    <Button
                        onClick={downloadTimetableAsPDF}
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
