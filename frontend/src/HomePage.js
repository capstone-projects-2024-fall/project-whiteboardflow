// HomePage.js
import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import RotatingText from './RotatingText';
import './HomePage.css';

const HomePage = ({ user }) => {
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
                    <Link to="/whiteboard" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{ marginTop: '20px' }}>
                            Get Started
                        </Button>
                    </Link>
                ) : (
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '20px' }}>
                        Please log in to start practicing.
                    </Typography>
                )}
            </section>

            {/* Add the rotating text at the bottom */}
            <section style={{ marginTop: '100px', textAlign: 'center' }}>
                <RotatingText />
            </section>
        </Container>
    );
};

export default HomePage;
