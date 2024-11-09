// HomePage.js
import { React, useState, useEffect } from 'react';
import { Button, Typography, Container } from '@mui/material';
import { Link, useOutletContext} from 'react-router-dom';
import RotatingText from './RotatingText';
import { auth, provider, signInWithPopup, signOut } from './firebase';
import './HomePage.css';

const HomePage = ({ user}) => {

    const [darkMode, setDarkMode] = useOutletContext();
    

    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const signInWithGoogle = () => {
        setLoading(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                setSnackbarMessage(`Welcome, ${result.user.displayName}`);
                setSnackbarOpen(true);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Login failed:', error);
                setSnackbarMessage('Login failed. Please try again.');
                setSnackbarOpen(true);
                setLoading(false);
            });
    };
    
    return (
        <Container>
            <section style={{ padding: '100px 0 0 0', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                <Typography variant="h8" gutterBottom className="styled-heading">
                    <span className={darkMode ? "heading-main-dark" : "heading-main-light"}>Whiteboard</span>
                    <span className="heading-highlight">.assistant</span>
                </Typography>
                {/* <Typography variant="body1" paragraph>
                    Prepare for your whiteboard interview with hands-on practice.
                </Typography> */}

                
            </section>

            {/* Add the rotating text at the bottom */}
            <section style={{ marginTop: '60px', textAlign: 'center' }}>
                <RotatingText darkMode={darkMode}/>
            </section>

            <section style={{ padding: '60px 0', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>

            {/* Conditionally render the "Get Started" button if the user is logged in */}
            {user ? (
                    <Link to="/whiteboard" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{ marginTop: '20px' }}>
                            Get Started
                        </Button>
                    </Link>
                ) : (
                    // <Link to="/whiteboard" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{ marginTop: '20px' }} onClick={signInWithGoogle}>
                            Get Started
                        </Button>
                    // </Link>
                )}

                </section>

            
        </Container>
    );
};

export default HomePage;