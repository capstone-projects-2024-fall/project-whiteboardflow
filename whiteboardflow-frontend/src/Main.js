// Main.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import Whiteboard from './components/Whiteboard/Whiteboard';
import OralTest from './pages/OralTest/OralTest';
import Settings from './components/Settings/Settings';
import BackEndTest from './BackEndTest';
import Results from './components/Result/Result';
import { auth } from './firebase';
import { AvatarProvider } from './Avatar/AvatarContext';

function Main() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    // PrivateRoute component to restrict access
    const PrivateRoute = ({ children }) => {
        return user ? children : <Navigate to="/" />;
    };

    return (
        <Router>
            <AvatarProvider>
                <Routes>
                    <Route element={<Layout user={user} />}>
                        <Route index element={<HomePage user={user} />} />
                        {/* Only allow access to these routes if user is logged in */}
                        <Route path="OralTest" element={<PrivateRoute><OralTest /></PrivateRoute>} />
                        <Route path="Settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                        <Route path="BackEndTest" element={<PrivateRoute><BackEndTest /></PrivateRoute>} />
                        <Route path="results" element={<PrivateRoute><Results /></PrivateRoute>} />
                        <Route path="whiteboard" element={<PrivateRoute><Whiteboard /></PrivateRoute>} />
                    </Route>
                </Routes>
            </AvatarProvider>
        </Router>
    );
}

export default Main;
