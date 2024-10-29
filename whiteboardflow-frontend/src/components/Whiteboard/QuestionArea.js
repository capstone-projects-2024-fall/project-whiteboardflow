import React from 'react';
import { Resizable } from 're-resizable';
import { Typography, Box } from '@mui/material';
import HelpButton from './HelpButton';

// QuestionArea component accepts props for visibility and resize handling
const QuestionArea = ({ isVisible, onResizeStop }) => {
    if (!isVisible) return null;  // Do not render if not visible

    return (
        <Resizable
            defaultSize={{
                width: '50%',  // Start with half the width
                height: '100%' // Full height
            }}
            minWidth={50} // Minimum width to which the section can shrink
            maxWidth="80%" // Maximum width to which it can expand
            enable={{ right: true }}
            onResizeStop={onResizeStop}
            handleStyles={{
                right: {
                    width: '20px',  // Increased handle width for better grab area
                    background: 'rgba(0, 123, 255, 0.5)',
                    cursor: 'ew-resize'
                }
            }}
        >
            <Box sx={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
                <Typography variant="subtitle2" style={{ color: '#888', marginBottom: '5px', fontWeight: 'bold' }}>
                    Question
                </Typography>
                <Typography variant="h6" style={{ color: '#3f51b5', fontWeight: 'bold', marginBottom: '20px' }}>
                    Write a `helloWorld` function.
                </Typography>
                <HelpButton />
            </Box>
        </Resizable>
    );
};

export default QuestionArea;
