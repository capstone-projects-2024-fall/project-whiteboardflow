// Main.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import Whiteboard from './components/Whiteboard/Whiteboard';
import OralTest from './pages/OralTest/OralTest';
import Settings from './components/Settings/Settings';
import BackEndTest from './BackEndTest';
import Results from './components/Result/Result';
import { auth } from './firebase'; // Import auth for authentication state

function Main() {
    const [user, setUser] = useState(null);

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user); // Set user if logged in, otherwise null
        });
        return () => unsubscribe(); // Cleanup on component unmount
    }, []);

    return (
        <Router>
            <Layout user={user}> {/* Pass user as prop to Layout */}
                <Routes>
                    <Route index element={<HomePage user={user} />} /> {/* Pass user to HomePage */}
                    <Route path="whiteboard" element={<Whiteboard />} />
                    <Route path="OralTest" element={<OralTest />} />
                    <Route path="Settings" element={<Settings />} />
                    <Route path="BackEndTest" element={<BackEndTest />} />
                    <Route path="results" element={<Results />} /> 
                </Routes>
            </Layout>
        </Router>
    );
}

export default Main;
