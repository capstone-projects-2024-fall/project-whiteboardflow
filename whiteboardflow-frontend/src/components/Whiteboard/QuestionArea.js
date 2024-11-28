import { Resizable } from 're-resizable';
import { Box } from '@mui/material';
import React, { useState, useLayoutEffect} from 'react';
import HintButton from './HintButton';
import AvatarToggleButton from '../Avatar/AvatarToggleButton';
import QuestionDisplay from './QuestionDisplay';

const QuestionArea = ({ sendPNGToFirebase, darkMode}) => {
    const minWidth = 15;
    const [width, setWidth] = useState('50%'); // Start with default visible width
    const [isVisible, setIsVisible] = useState(true); // Manage visibility state

    useLayoutEffect(() => {
        setIsVisible(width > '0px');
    }, [width]);

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
                    ref.style.width = `${minWidth}px`; // Ensure it snaps back to minWidth
                    setWidth(`${minWidth}px`);
                }
            }}
            handleStyles={{
                right: {
                    width: '20px',
                    background: 'rgba(0, 0, 0, 0.1)',
                    cursor: 'ew-resize'
                }
            }}
            handleComponent={{
                right: <div style={{ width: '15px', cursor: 'ew-resize' }}></div>
            }}
        >
            {console.log("Question Area " + darkMode)}
            {isVisible && (
                <Box sx={{ padding: '20px', height: '93vh', overflowY: isVisible ? 'auto' : 'hidden' }}>
                    <QuestionDisplay darkMode = {darkMode} />
                </Box>

            )}
            {isVisible && (<Box sx={{ height: '7vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'left', borderTop: '1px solid #ccc' }}>
                <AvatarToggleButton />
                <HintButton sendPNGToFirebase={sendPNGToFirebase} />
            </Box>)}
        </Resizable>
    );
};

export default QuestionArea;
