import React, { useState } from 'react';
import axios from 'axios';
import AuthService from '../../services/AuthService';
import {
    Container,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Timetable = () => {
    const [timetable, setTimetable] = useState(null);
    const [error, setError] = useState('');

    const timeSlots = [
        { startTime: "08:00", endTime: "09:00" },
        { startTime: "09:00", endTime: "10:00" },
        { startTime: "10:00", endTime: "11:00" },
    ];

    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const fetchTimetable = async () => {
        const token = AuthService.getToken();
        if (!token) {
            window.location.href = '/';
            return;
        }

        try {
            const response = await axios.get('http://localhost:8082/api/v1/students/2/timetable', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTimetable(response.data);
            setError('');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                AuthService.logout();
                window.location.href = '/';
            } else {
                setError('Error fetching timetable. Please try again.');
            }
        }
    };

    // Create a timetable structure with empty slots
    const createTimetableStructure = () => {
        const structure = {};
        weekdays.forEach(day => {
            structure[day] = timeSlots.map(slot => ({
                ...slot,
                coursename: "empty slot", // Default to empty slot
            }));
        });

        // Fill in the fetched timetable data
        if (timetable) {
            timetable.weekdays.forEach(weekday => {
                weekday.timeslots.forEach(slot => {
                    const matchingSlot = structure[weekday.day].find(s => s.startTime === slot.startTime);
                    if (matchingSlot) {
                        matchingSlot.coursename = slot.coursename;
                    }
                });
            });
        }

        return structure;
    };

    const timetableStructure = createTimetableStructure();

    // Function to generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Student Timetable", 14, 22);

        // Set column headers
        const headers = ["Time", ...weekdays];

        // Prepare data for the table
        const data = timeSlots.map(slot => [
            `${slot.startTime} - ${slot.endTime}`,
            ...weekdays.map(day => timetableStructure[day].find(s => s.startTime === slot.startTime)?.coursename || "empty slot")
        ]);

        // Add table to PDF
        doc.autoTable({
            head: [headers],
            body: data,
            startY: 30,
        });

        // Save the generated PDF
        doc.save("timetable.pdf");
    };

    return (
        <Container>
            <Button variant="contained" color="primary" onClick={fetchTimetable} style={{ marginBottom: '20px' }}>
                Show Timetable
            </Button>
            <Button variant="contained" color="secondary" onClick={generatePDF} style={{ marginBottom: '20px', marginLeft: '10px' }}>
                Download Timetable as PDF
            </Button>
            {error && <Typography color="error">{error}</Typography>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            {weekdays.map((day, index) => (
                                <TableCell key={index} align="center">{day}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timeSlots.map((slot, index) => (
                            <TableRow key={index}>
                                <TableCell>{`${slot.startTime} - ${slot.endTime}`}</TableCell>
                                {weekdays.map((day) => (
                                    <TableCell key={day} align="center">
                                        {timetableStructure[day].find(s => s.startTime === slot.startTime)?.coursename || "empty slot"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Timetable;
