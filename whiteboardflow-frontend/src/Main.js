// Main.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import Whiteboard from './components/Whiteboard/Whiteboard';
import OralTest from './components/OralTest/OralTest';
import Results from './components/Result/Result';
import DifficultySelect from './components/DifficultySelect/DifficultySelect';
import QuestionSelect from './components/QuestionSelect/QuestionSelect'
import { auth } from './firebase';
import { AvatarProvider } from './components/Avatar/AvatarContext';
import { QuestionProvider } from './components/QuestionSelect/QuestionContext';
import { SessionIdProvider } from './SessionIdContext';
import History from './components/History/History'

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
                <QuestionProvider>
                    <SessionIdProvider>
                        <Routes>
                            <Route element={<Layout user={user} />}>
                                <Route index element={<HomePage user={user} />} />
                                {/* Only allow access to these routes if user is logged in */}
                                <Route path="OralTest" element={<PrivateRoute><OralTest /></PrivateRoute>} />
                                <Route path="results" element={<PrivateRoute><Results /></PrivateRoute>} />
                                <Route path="whiteboard" element={<PrivateRoute><Whiteboard /></PrivateRoute>} />
                                <Route path="difficulty" element={<PrivateRoute><DifficultySelect /></PrivateRoute>} />
                                <Route path="questionSelect" element={<PrivateRoute><QuestionSelect /></PrivateRoute>} />
                                <Route path="history" element={<PrivateRoute><History /></PrivateRoute>} />
                            </Route>
                        </Routes>
                    </SessionIdProvider>                   
                </QuestionProvider>
            </AvatarProvider>
        </Router>
    );
}

export default Main;
