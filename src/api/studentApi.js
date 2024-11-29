import axios from 'axios';

export const fetchTimetable = async (studentId, token) => {
    try {
        const response = await axios.get(`http://localhost:8082/api/v1/students/${studentId}/timetable`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchCourses = async (studentId, token) => {
    try {
        const response = await axios.get(`http://localhost:8082/api/v1/students/${studentId}/registered-courses`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
