import axios from 'axios';

const ApiService = {
    fetchTimetable: (studentId) => {
        return axios.get(`http://localhost:8082/api/v1/students/${studentId}/timetable`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(response => response.data);
    },
};

export default ApiService;
