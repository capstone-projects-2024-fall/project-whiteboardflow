import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.js';  // Import the new HomePage component
import Login from './Login.js';  // Import the Login component
import ScreenShotTest from './ScreenShotTest.js';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />  {/* Home page route */}
                <Route path="/login" element={<Login />} />  {/* Login page route */}
                <Route path="/sstest" element={<ScreenShotTest />} />
            </Routes>
        </Router>
    );
}

export default Main;

