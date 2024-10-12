import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './HomePage.js';  // Import the new HomePage component
import Login from './pages/Login/Login.js';  // Import the Login component
import Whiteboard from './components/Whiteboard/Whiteboard';

function Main() {
    return (
        <Router>
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/whiteboard" element={<Whiteboard />} />
                <Route path="/" element={<HomePage />} />  {/* Home page route */}

                <Route path="/login" element={<Login />} />  {/* Login page route */}
            </Routes>
        </Router>
    );
}

export default Main;

