import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';  
import Login from './Login'; 
import Home from './Home'

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" replace />} /> 
                <Route path="/home" element={<Home />} /> 
            </Routes>
        </Router>
    );
}

export default Main;
