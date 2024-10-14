// Layout.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Layout = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const pages = [
        { name: 'Home', path: '/' },
        { name: 'Whiteboard', path: '/whiteboard' },
        { name: 'Oral Test', path: '/OralTest' },
        { name: 'Settings', path: '/Settings' }
        
    ];

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);
    const handleMenuClick = (path) => {
        navigate(path);
        handleCloseMenu();
    };

    return (
        <>
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
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    );
};

export default Layout;
