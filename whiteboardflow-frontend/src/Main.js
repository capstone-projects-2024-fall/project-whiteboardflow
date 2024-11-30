import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import Whiteboard from './components/Whiteboard/Whiteboard';
import OralTest from './components/OralTest/OralTest';
import Results from './components/Result/Result';
import DifficultySelect from './components/DifficultySelect/DifficultySelect';
import QuestionSelect from './components/QuestionSelect/QuestionSelect';
import Dashboard from './components/Dashboard/Dashboard';
import { auth } from './firebase';
import { AvatarProvider } from './components/Avatar/AvatarContext';
import { QuestionProvider } from './components/QuestionSelect/QuestionContext';

function Main() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log("User state:", user); // Debug log
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const PrivateRoute = ({ children }) => {
        console.log("PrivateRoute user:", user); // Debug log
        if (user === null) {
            return <div>Loading...</div>; // Show loading while checking auth state
        }
        return user ? children : <Navigate to="/" />;
    };

    return (
        <Router>
            <AvatarProvider>
                <QuestionProvider>
                    <Routes>
                        <Route element={<Layout user={user} />}>
                            <Route index element={<HomePage user={user} />} />
                            <Route path="OralTest" element={<PrivateRoute><OralTest /></PrivateRoute>} />
                            <Route path="results" element={<PrivateRoute><Results /></PrivateRoute>} />
                            <Route path="whiteboard" element={<PrivateRoute><Whiteboard /></PrivateRoute>} />
                            <Route path="difficulty" element={<PrivateRoute><DifficultySelect /></PrivateRoute>} />
                            <Route path="questionSelect" element={<PrivateRoute><QuestionSelect /></PrivateRoute>} />
                            <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        </Route>
                    </Routes>
                </QuestionProvider>
            </AvatarProvider>
        </Router>
    );
}

export default Main;
