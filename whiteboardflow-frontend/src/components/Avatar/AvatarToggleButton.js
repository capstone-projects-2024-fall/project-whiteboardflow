// AvatarToggleButton.js
import React from 'react';
import { Switch } from '@mui/material';
import { useAvatar } from './AvatarContext'; // Import your Avatar context

const AvatarToggleButton = () => {
    const { isVisible, toggleAvatar } = useAvatar(); // Access avatar visibility from context

    return (

        <Switch checked={isVisible} onChange={toggleAvatar} color="default" />
    );
};

export default AvatarToggleButton;
