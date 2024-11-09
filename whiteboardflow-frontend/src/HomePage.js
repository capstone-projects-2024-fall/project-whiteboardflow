// HomePage.js
import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import RotatingText from './RotatingText';
import './HomePage.css';
import './Avatar/RetroAvatar.css';

const HomePage = ({ user }) => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        // Set the start time in localStorage
        localStorage.setItem("startTime", Date.now());
        // Redirect to the whiteboard page
        navigate("/whiteboard");
    };

    return (
        <Container>
            <section style={{ padding: '40px 0', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                <Typography variant="h8" gutterBottom className="styled-heading">
                    <span className="heading-main">Whiteboard</span>
                    <span className="heading-highlight">.assistant</span>
                </Typography>
                <Typography variant="body1" paragraph>
                    Prepare for your whiteboard interview with hands-on practice.
                </Typography>

                {/* Conditionally render the "Get Started" button if the user is logged in */}
                {user ? (
                    <Button variant="contained" style={{ marginTop: '20px' }} onClick={handleGetStarted}>
                        Get Started
                    </Button>
                ) : (
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '20px' }}>
                        Please log in to start practicing.
                    </Typography>
                )}
            </section>

            {/* Add the rotating text at the bottom */}
            <section className="rotating-text-section" style={{ marginTop: '100px', textAlign: 'center' }}>
                <RotatingText />
            </section>
        </Container>
    );
};

export default HomePage;
