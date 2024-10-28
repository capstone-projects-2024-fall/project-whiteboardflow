// Layout.js
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Snackbar, CircularProgress, Avatar, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup, signOut } from './firebase';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(false); // New: Loading spinner state
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true'); // New: Dark mode state
    const navigate = useNavigate();

    const pages = [
        { name: 'Home', path: '/' },
        { name: 'Get Started', path: '/whiteboard' },
        //{ name: 'Oral Test', path: '/OralTest' },
        { name: 'Settings', path: '/Settings' },
        { name: 'Results', path: '/results' }
    ];

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);
    const handleMenuClick = (path) => {
        navigate(path);
        handleCloseMenu();
    };

    const signInWithGoogle = () => {
        setLoading(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Login failed:', error);
                setSnackbarMessage('Login failed. Please try again.');
                setSnackbarOpen(true);
                setLoading(false);
            });
    };

    const handleLogout = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                setUser(null);
                setSnackbarMessage('Successfully logged out.');
                setSnackbarOpen(true);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Logout failed:', error);
                setSnackbarMessage('Logout failed. Please try again.');
                setSnackbarOpen(true);
                setLoading(false);
            });
    };

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
        localStorage.setItem('darkMode', !darkMode);
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
        <div className={`layout-container ${darkMode ? 'dark-mode' : ''}`}>
            <AppBar position="static">
                <Toolbar>
                    {user && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleOpenMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
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

                    <Switch checked={darkMode} onChange={toggleDarkMode} color="default" />

                    {loading && <CircularProgress size={24} color="inherit" />}

                    {user ? (
                        <>
                            <Avatar alt={user.displayName} src={user.photoURL} sx={{ marginRight: 2 }} />
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

            <Footer />

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
