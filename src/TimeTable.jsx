import React, { useState, useEffect } from 'react';

const TimeTable = ({ token }) => {
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        const fetchTimetable = async () => {
            const response = await fetch('http://localhost:8082/api/v1/students/1/timetable', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Sending the JWT token in the header
                },
            });
            const data = await response.json();
            setTimetable(data.weekdays || []);
        };

        if (token) {
            fetchTimetable();
        }
    }, [token]);

    return (
        <div>
            <h2>Timetable</h2>
            <ul>
                {timetable.map((day, index) => (
                    <li key={index}>
                        <h3>{day.day}</h3>
                        <ul>
                            {day.timeslots.map((slot, idx) => (
                                <li key={idx}>
                                    {slot.startTime} - {slot.endTime}: {slot.coursename}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TimeTable;
