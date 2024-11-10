// Layout.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, Button, Snackbar, CircularProgress, Avatar, Switch } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { auth, provider, signInWithPopup, signOut } from './firebase';
import Footer from './Footer';
import './Layout.css';
import { useAvatar } from './Avatar/AvatarContext.js';
import AvatarToggleButton from './Avatar/AvatarToggleButton.js';

/**
 * Main layout component that includes a navigation bar, user menu, settings menu,
 * dark mode toggle, and footer. Manages user authentication, UI settings, and navigation.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout.
 * @param {any} props.user - The authenticated user object.
 * @returns {JSX.Element} The rendered Layout component.
 */
const Layout = ({ children, user }) => { // Accept user as a prop
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
    const [userAnchorEl, setUserAnchorEl] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [footer, setFooter] = useState(false);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
    const navigate = useNavigate();

    /**
     * Navigates to the home page.
     */
    const homeButt = () => {
        navigate("/")
    };

    /**
     * Opens the settings menu.
     * @param {React.MouseEvent} event - The event object.
     */
    const handleOpenSettingsMenu = (event) => setSettingsAnchorEl(event.currentTarget);

    /**
     * Closes the settings menu.
     */
    const handleCloseSettingsMenu = () => setSettingsAnchorEl(null);

    /**
     * Opens the user menu.
     * @param {React.MouseEvent} event - The event object.
     */
    const handleOpenUserMenu = (event) => setUserAnchorEl(event.currentTarget);

    /**
     * Closes the user menu.
     */
    const handleCloseUserMenu = () => setUserAnchorEl(null);

    /**
     * Initiates Google sign-in using Firebase authentication.
     * Displays a success or failure message in a snackbar.
     */
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

    /**
     * Logs the user out using Firebase authentication.
     * Displays a success or failure message in a snackbar.
     */
    const handleLogout = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                setSnackbarMessage('Successfully logged out.');
                setSnackbarOpen(true);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Logout failed:', error);
                setSnackbarMessage('Logout failed. Please try again.');
                setLoading(false);
            });
    };

    /**
     * Toggles dark mode and saves the preference to localStorage.
     */
    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
        localStorage.setItem('darkMode', !darkMode);
    };

    /**
     * Toggles the visibility of the footer.
     */
    const toggleFooter = () => {
        setFooter((prev) => !prev);
    };

    /**
     * Closes the snackbar notification.
     */
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className={`layout-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <HomeIcon
                className={darkMode ? "darkmode-home-button" : "lightmode-home-button"}
                fontSize='large'
                onClick={homeButt}
            />
            {user && (
                <SettingsIcon
                    className={darkMode ? "darkmode-settings-button" : "lightmode-settings-button"}
                    fontSize='large'
                    onClick={handleOpenSettingsMenu}
                />
            )}

            {/* Settings menu for toggling dark mode and the avatar */}
            <Menu
                anchorEl={settingsAnchorEl}
                open={Boolean(settingsAnchorEl)}
                onClose={handleCloseSettingsMenu}
            >
                <div className='settings-menu'>
                    <div className='settings-row'>
                        <Typography variant="h6">Toggle Dark Mode</Typography>
                        <Switch checked={darkMode} onChange={toggleDarkMode} color="default" />
                    </div>

                    <div className='settings-row'>
                        <Typography variant="h6">Toggle Teddy</Typography>
                        <AvatarToggleButton />
                    </div>
                </div>
            </Menu>

            {/* User menu with login/logout options */}
            <Menu
                anchorEl={userAnchorEl}
                open={Boolean(userAnchorEl)}
                onClose={handleCloseUserMenu}
            >
                <div className='user-menu'>
                    {user ? (
                        <>
                            <Avatar alt={user.displayName} src={user.photoURL} sx={{ marginBottom: 1 }} />
                            <Typography variant="h6">Welcome, {user.displayName}</Typography>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={signInWithGoogle}>Login with Google</Button>
                    )}
                </div>
            </Menu>

            {loading && <CircularProgress size={24} color="inherit" />}

            <AccountCircleIcon
                className={darkMode ? "darkmode-user-button" : "lightmode-user-button"}
                fontSize='large'
                onClick={handleOpenUserMenu}
            />

            <div className="content-container">
                <Outlet context={[darkMode, setDarkMode]} />
            </div>

            <ExpandCircleDownIcon className={footer ? "footer-toggle-button-up" : "footer-toggle-button-down"} onClick={toggleFooter} />

            {footer && <Footer darkMode={darkMode} />}

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
