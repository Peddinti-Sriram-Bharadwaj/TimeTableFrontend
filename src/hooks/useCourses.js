import { useState, useEffect } from 'react';
import { fetchCourses } from '../api/studentApi';

const useCourses = (studentId, token) => {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        const getCourses = async () => {
            if (studentId && token) {
                const data = await fetchCourses(studentId, token);
                setCourses(data);
            }
        };
        getCourses();
    }, [studentId, token]);

    return courses;
};

export default useCourses;
