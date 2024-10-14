import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup } from './firebase';



const Layout = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);
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
            .then((result) => setUser(result.user))
            .catch((error) => console.error('Login failed:', error));
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
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
                        <Typography variant="h6" component="div">
                            Welcome, {user.displayName}
                        </Typography>
                    ) : (
                        <Button color="inherit" onClick={signInWithGoogle}>
                            Login with Google
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            {children}
        </div>
    );
};

export default Layout;
