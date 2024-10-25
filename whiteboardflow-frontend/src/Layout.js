import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Snackbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup, signOut } from './firebase';
import Footer from './Footer'; // Import the Footer component
import './Layout.css'; // Import the CSS file for layout styling

const Layout = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const pages = [
        { name: 'Home', path: '/' },
        { name: 'Whiteboard', path: '/whiteboard' },
        { name: 'Oral Test', path: '/OralTest' },
        { name: 'Settings', path: '/Settings' },
    ];

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);
    const handleMenuClick = (path) => {
        navigate(path);
        handleCloseMenu();
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
            })
            .catch((error) => {
                console.error('Login failed:', error);
                setSnackbarMessage('Login failed. Please try again.');
                setSnackbarOpen(true);
            });
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                setSnackbarMessage('Successfully logged out.');
                setSnackbarOpen(true);
            })
            .catch((error) => {
                console.error('Logout failed:', error);
                setSnackbarMessage('Logout failed. Please try again.');
                setSnackbarOpen(true);
            });
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="layout-container">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleOpenMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Whiteboard Assistant
                    </Typography>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.name} onClick={() => handleMenuClick(page.path)}>
                                {page.name}
                            </MenuItem>
                        ))}
                    </Menu>
                    {user ? (
                        <>
                            <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                                Welcome, {user.displayName}
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={signInWithGoogle}>
                            Login with Google
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <div className="content-container">
                {children}
            </div>
            <Footer /> {/* Add Footer here */}
            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                autoHideDuration={6000}
            />
        </div>
    );
};

export default Layout;
