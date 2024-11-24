import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Timetable from './components/TimeTable/TimeTable';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/timetable" element={<Timetable />} />
            </Routes>
        </Router>
    );
};

export default App;
