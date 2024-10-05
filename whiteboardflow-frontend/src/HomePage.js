import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Login from './Login.js';
import './HomePage.css'; // External CSS for fancy styling

function HomePage() {
    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <nav className="navbar">
                    <h1 className="logo">Whiteboard Assistant</h1>
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </header>

            <section className="intro-section">
                <div className="intro-content">
                    <h2>Practice, practice, practice</h2>
                    <p>Whiteboard Assistant helps you to prepare for your whiteboard interview!</p>

                    {/* MUI Button for "Let's Go!" */}
                    {/* MUI Button choices: text, contained, outlined */}
                    <Button variant="contained" href="#login" style={{ marginTop: '20px' }}>
                        Let's Go!
                    </Button>
                </div>
            </section>

            <section id="login" className="login-section">
                <h2 className="login-heading">Login to Your Account</h2>
                <Login /> {/* Embed the Login component */}
            </section>

            <footer className="footer">
                <p>&copy; 2024 Whiteboard Assistant. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
