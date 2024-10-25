// Footer.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import './Footer.css'; // Optional: If you want to style the footer

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#f8f9fa', padding: '20px 0', textAlign: 'center', marginTop: '40px' }}>
            <Container>
                <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()} Whiteboard Assistant. All Rights Reserved.
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
