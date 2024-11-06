import React from 'react';
import { Container, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import './Footer.css'; // Optional CSS for styling

const Footer = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <Container>
                <div className="footer-content">
                    
                    {/* Social Media Links */}
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
                    </div>
                </div>

                {/* Copyright Info */}
                <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
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
