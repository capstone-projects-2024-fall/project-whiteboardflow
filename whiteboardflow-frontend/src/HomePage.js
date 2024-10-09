import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './pages/Login/Login.js';
import './HomePage.css';

function HomePage() {
    return (
        <div className="homepage-container">
            {/* MUI AppBar Component */}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Whiteboard Assistant
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <section className="intro-section">
                <div className="intro-content">
                    <h2>Practice, practice, practice</h2>
                    <p>Whiteboard Assistant helps you to prepare for your whiteboard interview!</p>
                    <Button variant="contained" href="#login" style={{ marginTop: '20px' }}>
                        Let's Go!
                    </Button>
                </div>
            </section>

            <section id="login" className="login-section">
                <h2 className="login-heading">Login to Your Account</h2>
                <Login />
            </section>

            <footer className="footer">
                <p>&copy; 2024 Whiteboard Assistant. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
