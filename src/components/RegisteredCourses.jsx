import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const RegisteredCourses = ({ courses }) => {
    if (!courses) return null;

    return (
        <div style={{ marginTop: '20px' }}>
            <Typography variant="h6">Registered Courses</Typography>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {courses.map((course, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{course.courseName}</Typography>
                                <Typography variant="body2">Faculty: {course.faculty}</Typography>
                                <Typography variant="body2">Room: {course.roomNumber}</Typography>
                                <Typography variant="body2">Specialization: {course.specialization}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default RegisteredCourses;
