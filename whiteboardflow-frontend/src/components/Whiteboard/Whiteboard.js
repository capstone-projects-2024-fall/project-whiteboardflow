// React.js Imports
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Material-UI Imports for UI components
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Custom button components
import HelpButton from './HelpButton';
import SubmitButton from './SubmitButton';

// Style imports
import './css/reset.css';
import './css/components.css';
import './css/examples.css';

const Whiteboard = () => {
    // Refs for DOM elements and editor instance
    const editorElement = useRef(null);
    const editor = useRef(null);
    const navigate = useNavigate();

    // State for managing the accordion's expanded or collapsed state
    const [expanded, setExpanded] = useState(true);

    // Functions related to the editor initialization and resizing
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

    // Function to handle toggling of accordion expansion state
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative', padding: '20px' }}>
            {/* Accordion component for collapsible question section */}
            <Accordion expanded={expanded} onChange={handleExpandClick}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="subtitle2" style={{ color: '#888', fontWeight: 'bold' }}>
                        Question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="h6" style={{ color: '#3f51b5', fontWeight: 'bold', marginBottom: '20px' }}>
                        Write a `helloWorld` function.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* Editor section for user input */}
            <div
                id="editor"
                ref={editorElement}
                style={{
                    width: '100%',
                    height: 'calc(100% - 48px)', // Adjust height considering accordion header
                    touchAction: 'none',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    padding: '10px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff',
                    marginTop: '20px',
                }}
            />

            {/* Flex container for action buttons */}
            <Box sx={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <HelpButton />
                <SubmitButton onExport={handleExportAndSubmit} />
            </Box>
        </div>
    );
};

export default Whiteboard;
