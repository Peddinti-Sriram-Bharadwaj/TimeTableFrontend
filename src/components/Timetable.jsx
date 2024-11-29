import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Timetable = ({ timetable }) => {
    if (!timetable) return null;

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeslots = [
        { startTime: '08:00', endTime: '09:30' },
        { startTime: '09:30', endTime: '11:00' },
        { startTime: '11:00', endTime: '13:00' },
    ];

    const createEmptyTimeslot = () => {
        return timeslots.map((slot) => ({
            startTime: slot.startTime,
            endTime: slot.endTime,
            courseName: '',
        }));
    };

    const createTimetableTable = () => {
        return daysOfWeek.map((day) => {
            const daySlots = timetable.weekdays.find((weekday) => weekday.day === day);
            if (!daySlots) {
                return (
                    <TableRow key={day}>
                        <TableCell>{day}</TableCell>
                        {timeslots.map((slot, index) => (
                            <TableCell key={index}>No Class</TableCell>
                        ))}
                    </TableRow>
                );
            }
            const timeslotsForDay = createEmptyTimeslot();
            daySlots.timeslots.forEach((slot) => {
                const timeslotIndex = timeslots.findIndex(
                    (time) => {
                        // Strip seconds from both the times to match
                        const startTime = slot.startTime.substring(0, 5); // "HH:MM"
                        const endTime = slot.endTime.substring(0, 5); // "HH:MM"
                        return time.startTime === startTime && time.endTime === endTime;
                    }
                );
                if (timeslotIndex >= 0) {
                    timeslotsForDay[timeslotIndex].courseName = slot.coursename;
                }
            });

            return (
                <TableRow key={day}>
                    <TableCell>{day}</TableCell>
                    {timeslotsForDay.map((slot, index) => (
                        <TableCell key={index}>{slot.courseName || 'No Class'}</TableCell>
                    ))}
                </TableRow>
            );
        });
    };


    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" style={{ margin: '10px' }}>Timetable</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Day</strong></TableCell>
                        {timeslots.map((slot, index) => (
                            <TableCell key={index}>
                                <strong>{slot.startTime} - {slot.endTime}</strong>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {createTimetableTable()}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Timetable;
