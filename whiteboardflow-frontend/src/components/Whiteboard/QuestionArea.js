import { Resizable } from 're-resizable';
import { Box } from '@mui/material';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import HintButton from './HintButton';
import DOMPurify from "dompurify";

const QuestionArea = ({ sendPNGToFirebase }) => {
    const minWidth = 15;
    const [width, setWidth] = useState('50%'); // Start with default visible width
    const [isVisible, setIsVisible] = useState(true); // Manage visibility state
    const [questionText, setQuestionText] = useState("");
    useLayoutEffect(() => {
        setIsVisible(width > '0px');
    }, [width]);

    function removeHTMLTags(str) {
        return str.replace(/<[^>]*>/g, '');
      }

    useEffect(() => {
        // const question = getQuestionFromFirebase();
        let question = `
        <p><strong>Question:</strong> Write a function that takes a list of numbers and returns the sum of
            all even numbers in the list.</p>
        <p><strong>Function Signature:</strong></p>
        <p><strong>Example:</strong></p>
        <p><strong>Explanation:</strong> In the list <code>[1, 2, 3, 4, 5, 6]</code>, the even numbers are
            2, 4, and 6. Their sum is 12.</p>
        `; // Hardcoded for now until the question is retrieved from firebase
        setQuestionText(question);
        localStorage.setItem("question", removeHTMLTags(question));
    });

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
            {isVisible && (
                <Box sx={{ padding: '20px', height: '93vh', overflowY: isVisible ? 'auto' : 'hidden' }}>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(questionText) }} />
                </Box>

            )}
            {isVisible && (<Box sx={{ height: '7vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid #ccc' }}>
                <HintButton sendPNGToFirebase={sendPNGToFirebase} />
            </Box>)}
        </Resizable>
    );
};

export default QuestionArea;
