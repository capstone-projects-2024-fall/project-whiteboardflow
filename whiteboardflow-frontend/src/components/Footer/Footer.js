import React from 'react';
import { Container, Typography } from '@mui/material';
import './Footer.css'; // Optional CSS for styling

const Footer = ({darkMode}) => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={darkMode ? "footer-dark" : "footer-light"}>
            <Container>
                <div className="footer-content">
                    
                    {/* Social Media Links
                    <div className="footer-social">
                        <Typography variant="h6">Follow Us</Typography>
                        <IconButton href="https://www.facebook.com" target="_blank" color="primary">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton href="https://www.twitter.com" target="_blank" color="primary">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton href="https://www.linkedin.com" target="_blank" color="primary">
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton href="https://www.instagram.com" target="_blank" color="primary">
                            <InstagramIcon />
                        </IconButton>
                    </div> */}
                </div>

                {/* Copyright Info */}
                <Typography variant="body2" color="white" align="center" style={{ marginTop: '20px' }}>
                    © {new Date().getFullYear()} Whiteboard Assistant. All Rights Reserved.
                </Typography>

                {/* Back to Top Button */}
                <div className="back-to-top" onClick={handleScrollToTop}>
                    <Typography variant="body2" color="primary" style={{ cursor: 'pointer' }}>
                        Back to Top
                    </Typography>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;