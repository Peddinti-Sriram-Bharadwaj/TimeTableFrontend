import React from 'react';
import { Button } from '@mui/material';
import { generateTimetablePDF } from '../../utils/pdfUtils';

const TimetablePDF = ({ timetable }) => {
    const timeSlots = [
        { startTime: "08:00", endTime: "09:00" },
        { startTime: "09:00", endTime: "10:00" },
        { startTime: "10:00", endTime: "11:00" },
    ];

    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timetableStructure = {}; // Logic to create timetable structure here

    return (
        <Button
            variant="contained"
            color="secondary"
            onClick={() => generateTimetablePDF(timeSlots, weekdays, timetableStructure)}
        >
            Download Timetable as PDF
        </Button>
    );
};

export default TimetablePDF;
