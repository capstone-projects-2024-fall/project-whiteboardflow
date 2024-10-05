import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App.js';  
import Login from './Login.js'; 

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" replace />} /> 
            </Routes>
        </Router>
    );
}

export default Main;
