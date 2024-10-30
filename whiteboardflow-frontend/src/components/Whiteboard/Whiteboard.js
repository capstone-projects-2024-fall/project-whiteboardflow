// React.js Imports
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Resizable } from 're-resizable';

// Material-UI Imports for UI components
import { Box } from '@mui/material';

// Import components
import QuestionArea from './QuestionArea';
import SubmitButton from './SubmitButton';
import HelpModal from './HelpModal';

// Style imports
import './css/reset.css';          // Resets default browser styling
import './css/components.css';     // Styles specific to components
import './css/examples.css';       // Example-specific styles

const Whiteboard = () => {
    // Refs for DOM elements and editor instance
    const editor = useRef(null)
    const editorElement = useRef(null)
    const navigate = useNavigate();
    const [isQuestionVisible, setQuestionVisible] = useState(true); // State to toggle question visibility

    // Effect for editor initialization and event handling
    useEffect(() => {
        // Function to handle window resizing to adjust editor dimensions
        const handleResize = () => {
            if (editor.current) {
                editor.current.resize();
            }
        };

        // Function to load editor configuration and initialize it
        const loadEditor = async () => {
            try {
                const response = await fetch("server-configuration.json");
                const server = await response.json();
                const options = {
                    configuration: {
                        offscreen: true,
                        server,
                        rendering: {
                            minWidth: 2000,
                            minHeight: 2000,
                        },
                        modules: {
                            eraser: true,
                            transcript: true,
                        },
                        triggers: {
                            exportContent: "ONDEMAND"
                        }
                    },
                };
                editor.current = new window.iink.Editor(editorElement.current, options);
                await editor.current.initialize();
                hideElements();
                if (!editor.current) {
                    console.error("Editor is not initialized.");
                }
                window.addEventListener("resize", handleResize);
            } catch (error) {
                console.error("Error during iink Editor initialization:", error);
            }
        };

        loadEditor();

        // Cleanup function to remove the resize event listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Function to handle export and submission of editor content
    const handleExportAndSubmit = async () => {
        try {
            if (editor.current) {
                await editor.current.behaviors.sendPNGToServer(editor.current.behaviors.haveSymbolsSelected);
                navigate('/oraltest');
            }
        } catch (error) {
            console.error('Error during export or send:', error);
        }
    };

    // Handle resizing stop event
    const handleResizeStop = (e, direction, ref) => {
        const width = parseInt(ref.style.width, 10);
        setQuestionVisible(width > 15);  // Toggle visibility based on the width threshold
    };
    // Hide unnecessary elements
    function hideElements() {
        // Select the first child div of the element with class 'state'
        const stateElement = document.querySelector('.state'); // Select the element with class 'state'
        if (stateElement) {
            stateElement.style.display = 'none'; // Hide the entire element
        }
    }

    return (
        <div style={{width: '100%', height: '100vh', display: 'flex', position: 'fixed', overflow: 'hidden'}}>

            {/* Question Area */}
            <QuestionArea isVisible={isQuestionVisible} onResizeStop={handleResizeStop}/>

            {/* Editor Section */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                height: '100vh'
            }}>
                <div
                    ref={editorElement}
                    style={{
                        flexGrow: 1,
                        height: '93vh',
                        touchAction: 'none',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        padding: '10px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#fff',
                    }}
                />
                <HelpModal/>
                {/* Submit Area */}
                <Box sx={{
                    height: '7vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTop: '1px solid #ccc'
                }}>
                    <SubmitButton onExport={handleExportAndSubmit}/>
                </Box>
            </div>
        </div>
            );
            };

            export default Whiteboard;
