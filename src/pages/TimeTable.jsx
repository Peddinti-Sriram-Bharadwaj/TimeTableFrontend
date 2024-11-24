import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import ApiService from '../services/ApiService';
import TimetableTable from '../components/Timetable/TimetableTable';
import TimetablePDF from '../components/Timetable/TimetablePDF';

const Timetable = () => {
    const [timetable, setTimetable] = useState(null);
    const [error, setError] = useState('');

    const fetchTimetable = async () => {
        const token = AuthService.getToken();
        if (!token) {
            window.location.href = '/';
            return;
        }

        try {
            const data = await ApiService.fetchTimetable(2);
            setTimetable(data);
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

    return (
        <>
            <TimetableTable
                timetable={timetable}
                error={error}
                fetchTimetable={fetchTimetable}
            />
            <TimetablePDF timetable={timetable} />
        </>
    );
};

export default Timetable;
