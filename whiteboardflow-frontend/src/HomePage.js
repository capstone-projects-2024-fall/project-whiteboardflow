// HomePage.js
import React from 'react';
import { Button, Typography, Container } from '@mui/material';

const HomePage = () => {
    return (
        <Container>
            <section style={{ padding: '40px 0', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to Whiteboard Assistant!
                </Typography>
                <Typography variant="body1" paragraph>
                    Prepare for your whiteboard interview with hands-on practice.
                </Typography>
                <Button variant="contained" href="#login" style={{ marginTop: '20px' }}>
                    Get Started
                </Button>
            </section>
        </Container>
    );
};

export default HomePage;
