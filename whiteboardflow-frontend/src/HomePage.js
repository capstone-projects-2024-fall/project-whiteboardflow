// HomePage.js
import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import RotatingText from './RotatingText'; // Import the RotatingText component
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
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
                <Button variant="contained" href="#login" style={{ marginTop: '20px' }}>
                    Get Started
                </Button>
            </section>

            {/* Add the rotating text at the bottom */}
            <section style={{ marginTop: '100px', textAlign: 'center' }}>
                <RotatingText />
            </section>
        </Container>
    );
};

export default HomePage;


<Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '2rem', fontWeight: 'bold' }}>
    Whiteboard Assistant
</Typography>
