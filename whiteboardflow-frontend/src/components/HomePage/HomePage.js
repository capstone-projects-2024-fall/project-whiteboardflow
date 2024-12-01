import React, { useState } from 'react';
import { Button, Typography, Container, Modal } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import RotatingText from '../RotatingText/RotatingText';
import Dashboard from '../Dashboard/Dashboard'; // Adjust the path to your Dashboard.js
import './HomePage.css';
import '../Avatar/RetroAvatar.css';

const HomePage = ({ user }) => {
    const [darkMode] = useOutletContext(); // Context for dark mode
    const [openDashboard, setOpenDashboard] = useState(false); // State for the modal
    const navigate = useNavigate();

    // Handlers for opening/closing the modal
    const handleOpenDashboard = () => {
        console.log('Opening Dashboard Modal');
        setOpenDashboard(true);
    };

    const handleCloseDashboard = () => {
        console.log('Closing Dashboard Modal');
        setOpenDashboard(false);
    };

    const handleGetStarted = () => {
        navigate("/questionSelect"); // Redirect to question selection
    };

    // Style for the modal
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxHeight: '90%',
        overflowY: 'auto',
        backgroundColor: darkMode ? '#202124' : '#fff',
        color: darkMode ? '#fff' : '#000',
        boxShadow: 24,
        padding: '20px',
        borderRadius: '8px',
        outline: 'none',
    };

    return (
        <Container>
            {/* Header Section */}
            <section style={{ padding: '100px 0 0 0', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                <Typography variant="h8" gutterBottom className="styled-heading">
                    <span className={darkMode ? "heading-main-dark" : "heading-main-light"}>Whiteboard</span>
                    <span className="heading-highlight">.assistant</span>
                </Typography>
            </section>

            {/* Rotating Text Section */}
            <section style={{ marginTop: '60px', textAlign: 'center' }}>
                <RotatingText darkMode={darkMode} />
            </section>

            {/* Action Section */}
            <section style={{ padding: '60px 0', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                {/* Ensure the button appears by removing unnecessary conditions */}
                <Button
                    variant="contained"
                    style={{ marginTop: '20px', marginRight: '10px' }}
                    onClick={handleGetStarted}
                >
                    Get Started
                </Button>
                <Button
                    variant="outlined"
                    style={{ marginTop: '20px', marginLeft: '10px' }}
                    onClick={handleOpenDashboard}
                >
                    View Dashboard
                </Button>
            </section>

            {/* Modal for the Dashboard */}
            <Modal
                open={openDashboard}
                onClose={handleCloseDashboard}
                aria-labelledby="dashboard-modal-title"
                aria-describedby="dashboard-modal-description"
                disableEnforceFocus={false} // Ensure focus stays within the modal
                disableAutoFocus={false}   // Automatically focuses the modal
                BackdropProps={{
                    invisible: false, // Ensure the backdrop is functional
                }}
            >
                <div style={modalStyle}>
                    <Typography
                        id="dashboard-modal-title"
                        variant="h6"
                        component="h2"
                        style={{ textAlign: 'center', marginBottom: '20px' }}
                    >
                        Your Dashboard
                    </Typography>
                    <Dashboard /> {/* Render the Dashboard component */}
                    <Button
                        variant="outlined"
                        style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                        onClick={handleCloseDashboard}
                    >
                        Close
                    </Button>
                </div>
            </Modal>
        </Container>
    );
};

export default HomePage;
