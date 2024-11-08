// AvatarToggleButton.js
import React from 'react';
import { Button } from '@mui/material';
import { useAvatar } from './AvatarContext'; // Import your Avatar context

const AvatarToggleButton = () => {
    const { isVisible, toggleAvatar } = useAvatar(); // Access avatar visibility from context

    return (
        <Button
            variant="contained"
            onClick={toggleAvatar}
            sx={{
                marginRight: 1.5,
                width: 132,
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                borderRadius: '8px',
                backgroundColor: '#1976d2',
                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.4)',
                '&:hover': {
                    backgroundColor: '#1565c0',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.7)',
                },
            }}
        >
            {isVisible ? 'Hide Teddy' : 'Show Teddy'}
        </Button>
    );
};

export default AvatarToggleButton;
