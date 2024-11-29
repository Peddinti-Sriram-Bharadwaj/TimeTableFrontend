import React, { useState, useEffect } from 'react';

const RegisteredCourses = ({ token }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch('http://localhost:8082/api/v1/students/1/registered-courses', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Sending the JWT token in the header
                },
            });
            const data = await response.json();
            setCourses(data || []);
        };


        if (token) {
            fetchCourses();
        }
    }, [token]);

    return (
        <div>
            <h2>Registered Courses</h2>
            <ul>
                {courses.map((course, index) => (
                    <li key={index}>
                        <p>Course: {course.courseName}</p>
                        <p>Faculty: {course.faculty}</p>
                        <p>Room: {course.roomNumber}</p>
                        <p>Specialization: {course.specialization}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RegisteredCourses;
