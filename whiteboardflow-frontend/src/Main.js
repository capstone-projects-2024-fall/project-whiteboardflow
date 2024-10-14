import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import Whiteboard from './components/Whiteboard/Whiteboard';
import OralTest from './pages/OralTest/OralTest';
import Settings from './components/Settings/Settings';
//import Home from './Main';

function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="whiteboard" element={<Whiteboard />} />
                    <Route path="OralTest" element={<OralTest />} />
                    <Route path="Settings" element={<Settings />} />
                    
                </Route>
            </Routes>
        </Router>
    );
}

export default Main;

