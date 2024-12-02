// HomePage.js
import { React, useState} from 'react';
import { Button, Typography, Container } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';

import RotatingText from '../RotatingText/RotatingText';
import { auth, provider, signInWithPopup } from '../../firebase';
import './HomePage.css';
import '../Avatar/RetroAvatar.css';

import { testWrite, getOneHistory, getAllHistory } from '../../firebase';

// import { useSessionId } from '../../SessionIdContext';



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


    const handleGetStarted = () => {
            navigate("/questionSelect")
        };
    
    return (
        <Container>
            {/* {console.log(Date.now())} */}
            <section style={{ padding: '100px 0 0 0', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                <Typography variant="h8" gutterBottom className="styled-heading">
                    <span className={darkMode ? "heading-main-dark" : "heading-main-light"}>Whiteboard</span>
                    <span className="heading-highlight">.assistant</span>
                </Typography>

            </section>

						TEST

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