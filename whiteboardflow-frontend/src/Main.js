import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import Whiteboard from './components/Whiteboard/Whiteboard';
import OralTest from './components/OralTest/OralTest';
import Results from './components/Result/Result';
import QuestionSelect from './components/QuestionSelect/QuestionSelect';
import History from './components/History/History'
import HistoryEntry from './components/History/HistoryEntry';
import UnsupportedBrowser from './components/UnsupportedBrowser/UnsupportedBrowser';
import { auth } from './firebase';
import { AvatarProvider } from './components/Avatar/AvatarContext';
import { QuestionProvider } from './components/QuestionSelect/QuestionContext';
import { WhiteboardProvider } from './components/Whiteboard/WhiteboardContext';


function Main() {
    const [user, setUser] = useState(null);
    const [isFirefox, setIsFirefox] = useState(false);
    const [isBrowserChecked, setIsBrowserChecked] = useState(false);

    useEffect(() => {
        // Detect Firefox browser
        const userAgent = navigator.userAgent.toLowerCase();
        setIsFirefox(userAgent.includes("firefox"));
        setIsBrowserChecked(true);

        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    // PrivateRoute component to restrict access
    const PrivateRoute = ({ children }) => {
        return user ? children : <Navigate to="/" />;
    };

    // Show empty layout to avoid initial page flicker
    if (!isBrowserChecked) {
        return null;
    }

    // Render a message for unsupported browsers (basically, just FireFox)
    if (isFirefox) {
        return (
            <UnsupportedBrowser />
        );
    }

    return (
        <Router>
            <WhiteboardProvider>
                <AvatarProvider>
                    <QuestionProvider>
                        <Routes>
                            <Route element={<Layout user={user} />}>
                                <Route index element={<HomePage user={user} />} />
                                {/* Only allow access to these routes if user is logged in */}
                                <Route path="questionSelect" element={<PrivateRoute><QuestionSelect /></PrivateRoute>} />
                                <Route path="whiteboard" element={<PrivateRoute><Whiteboard /></PrivateRoute>} />
                                <Route path="OralTest" element={<PrivateRoute><OralTest /></PrivateRoute>} />
                                <Route path="results" element={<PrivateRoute><Results /></PrivateRoute>} />
                                <Route path="whiteboard" element={<PrivateRoute><Whiteboard /></PrivateRoute>} />
                                <Route path="history" element={<PrivateRoute><History /></PrivateRoute>} />
                                <Route path="history/:entry_id" element={<PrivateRoute><HistoryEntry /></PrivateRoute>} />
                            </Route>
                        </Routes>
                    </QuestionProvider>
                </AvatarProvider>
            </WhiteboardProvider>
        </Router>
    );
}

export default Main;
