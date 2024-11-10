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
import { auth } from './firebase';
import { AvatarProvider } from './Avatar/AvatarContext';

/**
 * Main component of the application that sets up routes, layout, 
 * and user authentication state. Wraps the routes in an 
 * `AvatarProvider` and handles user authentication status.
 *
 * @returns {JSX.Element} The main routing and layout structure of the app.
 */
function Main() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        /**
         * Listens for changes in the user's authentication state.
         * Updates the user state when authentication status changes.
         * Cleans up the listener on component unmount.
         *
         * @returns {Function} Unsubscribe function to clean up the listener.
         */
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <Router> {/* Router wraps AvatarProvider to ensure context is available */}
            <AvatarProvider>
                <Routes>
                    <Route element={<Layout user={user} />}>
                        <Route index element={<HomePage user={user} />} />
                        <Route path="OralTest" element={<OralTest />} />
                        <Route path="Settings" element={<Settings />} />
                        <Route path="BackEndTest" element={<BackEndTest />} />
                        <Route path="results" element={<Results />} />
                    </Route>
                    <Route path="whiteboard" element={<Whiteboard />} />
                </Routes>
            </AvatarProvider>
        </Router>
    );
}

export default Main;
