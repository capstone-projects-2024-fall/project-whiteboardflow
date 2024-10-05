import React from 'react';
import Login from './Login.js'; // Import the Login component
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
                    <h2>Collaborate, Organize, Create</h2>
                    <p>Whiteboard Assistant makes remote collaboration seamless. Jump into a session, share ideas, and work together in real-time!</p>
                    <a href="#login" className="cta-button">Get Started</a>
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
