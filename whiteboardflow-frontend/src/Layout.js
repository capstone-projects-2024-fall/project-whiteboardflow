// Layout.js
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, Button, Snackbar, CircularProgress, Avatar, Switch } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
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

const Layout = ({ children, user }) => { // Accept user as a prop
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
    const [userAnchorEl, setUserAnchorEl] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [footer, setFooter] = useState(false);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
    const navigate = useNavigate();

    const homeButt = () => {
        navigate("/")
    }

    // const pages = [
    //     { name: 'Home', path: '/' },
    //     { name: 'Get Started', path: '/whiteboard' },
    //     { name: 'Settings', path: '/Settings' },
    //     { name: 'Results', path: '/results' }
    // ];

    // useEffect(() => {

    // },[darkMode])

    const handleOpenSettingsMenu = (event) => setSettingsAnchorEl(event.currentTarget);
    const handleCloseSettingsMenu = () => setSettingsAnchorEl(null);


    const handleOpenUserMenu = (event) => setUserAnchorEl(event.currentTarget);
    const handleCloseUserMenu = () => setUserAnchorEl(null);


    // const handleMenuClick = (path) => {
    //     navigate(path);
    //     handleCloseMenu();
    // };

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

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
        localStorage.setItem('darkMode', !darkMode);
    };

    const toggleFooter = () => {
        setFooter((prev) => !prev);
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Define a list of paths where you want the Footer to be visible
    // const footerVisiblePaths = ['/', '/home', '/Settings']; // Example paths, add the paths you need
    // const showFooter = footerVisiblePaths.includes(location.pathname);

    return (
        <div className={`layout-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            {console.log(useLocation)}
            {/* <AppBar position="static"> */}
                {/* <Toolbar> */}
                    {/* <IconButton
                        size="large"
                        edge="start"
                        className={darkMode ? "darkmode-home-button" : "lightmode-home-button"}
                        aria-label="home"
                        onClick={homeButt}
                    > */}
                        {/* <HomeIcon sx={darkMode ? { color: "pink", fontSize: 40} : { color: "red", fontSize: 40}}/> */}
                        <HomeIcon 
                            className={darkMode ? "darkmode-home-button" : "lightmode-home-button"}
                            fontSize='large'
                            onClick={homeButt}
                        />
                    {/* </IconButton> */}
                    {user && (
                        // <IconButton
                        //     size="large"
                        //     edge="start"
                        //     aria-label="menu"
                        //     // className={darkMode ? "darkmode-settings-button" : "lightmode-settings-button"}
                        //     sx={ {position:"static", right: "80px", top: "20px"}}
                        //     // onClick={handleOpenSettingsMenu}
                        // >
                            <SettingsIcon 
                                className={darkMode ? "darkmode-settings-button" : "lightmode-settings-button"}
                                fontSize='large'
                                onClick={handleOpenSettingsMenu}
                            />
                        // </IconButton>
                    )}

                    

                    {/* settings menu */}
                    <Menu
                        anchorEl={settingsAnchorEl}
                        open={Boolean(settingsAnchorEl)}
                        onClose={handleCloseSettingsMenu}
                    >
                        <div className='settings-menu'>
                            <div className='settings-row'>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Toggle Dark Mode
                                </Typography>
                                <Switch checked={darkMode} onChange={toggleDarkMode} color="default" />
                            </div>
                            
                            <div className='settings-row'>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Toggle Teddy
                                </Typography>
                                <AvatarToggleButton />
                            </div>
                        </div>
                    </Menu>

                    
                    {/* user menu */}
                    <Menu
                        anchorEl={userAnchorEl}
                        open={Boolean(userAnchorEl)}
                        onClose={handleCloseUserMenu}
                    >
                        <div className='user-menu'>
                        {user ? (
                        <>
                            <Avatar alt={user.displayName} src={user.photoURL} sx={{ marginBottom: 1 }} />   
                            {/* <Avatar alt={user.displayName} src={user.photoURL} /> */}
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

                        </div>
                    </Menu>

                    {loading && <CircularProgress size={24} color="inherit" />}

                    
                    {/* <IconButton
                        size="large"
                        edge="start"
                        aria-label="settings"
                        className={darkMode ? "darkmode-user-button" : "lightmode-user-button"}
                        onClick={handleOpenUserMenu}
                    
                    > */}

                    <AccountCircleIcon 
                        className={darkMode ? "darkmode-user-button" : "lightmode-user-button"}
                        fontSize='large'
                        onClick={handleOpenUserMenu}
                    />
                    {/* </IconButton> */}
                    
                {/* </Toolbar> */}
            {/* </AppBar> */}

            <div className="content-container">
                <Outlet context={[darkMode, setDarkMode]}
                
                />
            </div>

            <ExpandCircleDownIcon className={footer ? "footer-toggle-button-up" : "footer-toggle-button-down"} onClick={toggleFooter}/>
            {/* <button onClick={toggleFooter}></button> */}

            {footer && <Footer darkMode={darkMode}/>}

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
