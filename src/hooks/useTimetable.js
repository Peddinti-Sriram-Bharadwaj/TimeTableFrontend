import { useState, useEffect } from 'react';
import { fetchTimetable } from '../api/studentApi';

const useTimetable = (studentId, token) => {
    const [timetable, setTimetable] = useState(null);

    useEffect(() => {
        const getTimetable = async () => {
            if (studentId && token) {
                const data = await fetchTimetable(studentId, token);
                setTimetable(data);
            }
        };
        getTimetable();
    }, [studentId, token]);

    return timetable;
};

export default useTimetable;
