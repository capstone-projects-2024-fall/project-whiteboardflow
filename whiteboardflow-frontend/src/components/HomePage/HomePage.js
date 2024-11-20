// HomePage.js
import { React, useState} from 'react';
import { Button, Typography, Container } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';

import RotatingText from '../RotatingText/RotatingText';
import { auth, provider, signInWithPopup } from '../../firebase';
import './HomePage.css';
import '../Avatar/RetroAvatar.css';



const HomePage = ({ user}) => {

    // eslint-disable-next-line
    const [darkMode, setDarkMode] = useOutletContext();
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    // eslint-disable-next-line
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
  
  const navigate = useNavigate();

    // const handleGetStarted = () => {
    //     // Set the start time in localStorage
    //     localStorage.setItem("startTime", Date.now());
    //     // Redirect to the whiteboard page
    //     navigate("/whiteboard");
    // };

    const handleGetStarted = () => {
            // Set the start time in localStorage
            // localStorage.setItem("startTime", Date.now());
            // Redirect to the whiteboard page
            navigate("/difficulty");
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
                    <Button variant="contained" style={{ marginTop: '20px' }} onClick={handleGetStarted}>
                        Get Started
                    </Button>

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