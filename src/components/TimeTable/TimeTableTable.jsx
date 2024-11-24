import React from 'react';
import {
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

const TimetableTable = ({ timetable, error, fetchTimetable }) => {
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={fetchTimetable}
                style={{ marginBottom: '20px' }}
            >
                Show Timetable
            </Button>
            {error && <Typography color="error">{error}</Typography>}

            {timetable && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Time</TableCell>
                                {/* Render days */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Render timeslots */}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default TimetableTable;
