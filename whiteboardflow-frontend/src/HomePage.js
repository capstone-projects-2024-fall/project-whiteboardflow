// HomePage.js
import { React, useState } from 'react';
import { Button, Typography, Container } from '@mui/material';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';

import RotatingText from './RotatingText';
import { auth, provider, signInWithPopup, signOut } from './firebase';
import './HomePage.css';
import './Avatar/RetroAvatar.css';

/**
 * HomePage component providing the main interface for users, including login, 
 * a welcome message, and navigation to the whiteboard.
 *
 * @param {Object} props - The props object.
 * @param {any} props.user - The authenticated user object.
 * @returns {JSX.Element} The rendered HomePage component.
 */
const HomePage = ({ user }) => {
    const [darkMode, setDarkMode] = useOutletContext();
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    /**
     * Initiates Google sign-in using Firebase authentication.
     * Displays a success or failure message in a snackbar.
     */
    const signInWithGoogle = () => {
        setLoading(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                setSnackbarMessage(`Welcome, ${result.user.displayName}`);
                setSnackbarOpen(true);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Login failed:', error);
                setSnackbarMessage('Login failed. Please try again.');
                setSnackbarOpen(true);
                setLoading(false);
            });
    };

    /**
     * Starts the whiteboard session by saving the start time in local storage
     * and navigating to the whiteboard page.
     */
    const handleGetStarted = () => {
        localStorage.setItem("startTime", Date.now());
        navigate("/whiteboard");
    };

    return (
        <Container>
            <section style={{ padding: '100px 0 0 0', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                <Typography variant="h8" gutterBottom className="styled-heading">
                    <span className={darkMode ? "heading-main-dark" : "heading-main-light"}>Whiteboard</span>
                    <span className="heading-highlight">.assistant</span>
                </Typography>
            </section>

            {/* Rotating text component */}
            <section style={{ marginTop: '60px', textAlign: 'center' }}>
                <RotatingText darkMode={darkMode} />
            </section>

            <section style={{ padding: '60px 0', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                {/* Conditionally render the "Get Started" button if the user is logged in */}
                {user ? (
                    <Button variant="contained" style={{ marginTop: '20px' }} onClick={handleGetStarted}>
                        Get Started
                    </Button>
                ) : (
                    <Button variant="contained" style={{ marginTop: '20px' }} onClick={signInWithGoogle}>
                        Get Started
                    </Button>
                )}
            </section>
        </Container>
    );
};

export default HomePage;
