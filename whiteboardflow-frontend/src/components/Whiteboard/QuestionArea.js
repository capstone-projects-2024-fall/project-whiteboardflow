import React from 'react';
import { Resizable } from 're-resizable';
import { Typography, Box } from '@mui/material';
import HelpButton from './HelpButton';

// QuestionArea component accepts props for visibility and resize handling
const QuestionArea = ({ isVisible, onResizeStop }) => {
    return (
        <Resizable
            defaultSize={{
                width: isVisible ? '50%' : '0px', // Use a minimal width when not visible
                height: '100%' // Full height
            }}
            minWidth={10} // Set to minimal width to keep the drag handle accessible
            maxWidth="80%" // Maximum width to which it can expand
            enable={{ right: true }}
            onResizeStop={onResizeStop}
            handleStyles={{
                right: {
                    width: '20px',  // Handle width
                    background: 'rgba(0, 123, 255, 0.8)',
                    cursor: 'ew-resize'
                }
            }}
            handleComponent={{
                right: <div style={{ width: '20px', cursor: 'ew-resize' }}></div>
            }}
        >
            {isVisible && (
                <Box sx={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
                    <Typography variant="subtitle2" style={{ color: '#888', marginBottom: '5px', fontWeight: 'bold' }}>
                        Question
                    </Typography>
                    <Typography variant="h6" style={{ color: '#3f51b5', fontWeight: 'bold', marginBottom: '20px' }}>
                        Write a `helloWorld` function.
                    </Typography>
                    <HelpButton />
                </Box>
            )}
        </Resizable>
    );
};

export default QuestionArea;
