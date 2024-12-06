import { Resizable } from 're-resizable';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import React, { useState, useLayoutEffect } from 'react';
import HintButton from './HintButton';
import AvatarToggleButton from '../Avatar/AvatarToggleButton';
import QuestionDisplay from './QuestionDisplay';

const HandleButton = styled(Button)(({ theme }) => ({
    minHeight: '80px',
    minWidth: '20px',
    padding: '0 8px',
    borderRadius: '2px',
    backgroundColor: 'darkgrey',
    '&:hover': {
        backgroundColor: 'grey'
    }
}));

const QuestionArea = ({ sendPNGToFirebase, darkMode }) => {
    const minWidth = 15;
    const [width, setWidth] = useState('50%');
    const [isVisible, setIsVisible] = useState(true);

    useLayoutEffect(() => {
        setIsVisible(width !== '0px');
    }, [width]);

    const toggleVisibility = () => {
        if (isVisible) {
            setWidth('0px');
            setIsVisible(false);
        } else {
            setWidth('30%');
            setIsVisible(true);
        }
    };

    return (
        <Resizable
            defaultSize={{
                width: width,
                height: '100vh'
            }}
            minWidth={minWidth}
            maxWidth="80%"
            enable={{
                top: false,
                right: true,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false
            }}
            onResize={(e, direction, ref, d) => {
                const newWidth = parseInt(ref.style.width, 10);
                if (newWidth <= minWidth) {
                    ref.style.width = '0px';
                    setWidth('0px');
                    setIsVisible(false);
                } else {
                    setWidth(`${newWidth}px`);
                    setIsVisible(true);
                }
            }}
            onResizeStop={(e, direction, ref, d) => {
                const finalWidth = parseInt(ref.style.width, 10);
                if (finalWidth > 0 && finalWidth < minWidth) {
                    ref.style.width = `${minWidth}px`;
                    setWidth(`${minWidth}px`);
                }
            }}
            handleStyles={{
                right: {
                    width: '20px',
                    background: 'rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // Disable pointer events on the handle itself
                    pointerEvents: 'none',
                }
            }}
            handleComponent={{
                right: (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                            // Re-enable pointer events inside this container
                            pointerEvents: 'auto'
                        }}
                    >
                        <HandleButton
                            variant="contained"
                            size="small"
                            // Stop the mousedown event so it won't trigger resizing
                            onMouseDown={(e) => {
                                e.stopPropagation();
                            }}
                            onClick={(e) => {
                                console.log("clicked");
                                e.stopPropagation();
                                e.preventDefault();
                                toggleVisibility();
                            }}
                        >
                            {isVisible ? '<' : '>'}
                        </HandleButton>
                    </div>
                )
            }}
        >
            {isVisible && (
                <Box sx={{ padding: '20px', height: '93vh', overflowY: 'auto' }}>
                    <QuestionDisplay darkMode={darkMode} />
                </Box>
            )}
            {isVisible && (
                <Box
                    sx={{
                        height: '7vh',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'left',
                        borderTop: '1px solid #ccc'
                    }}
                >
                    <AvatarToggleButton />
                    <HintButton sendPNGToFirebase={sendPNGToFirebase} />
                </Box>
            )}
        </Resizable>
    );
};

export default QuestionArea;
