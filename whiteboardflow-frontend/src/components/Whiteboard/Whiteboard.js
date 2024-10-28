import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import HelpButton from './HelpButton';
import SubmitButton from './SubmitButton';
import './css/reset.css';
import './css/components.css';
import './css/examples.css';

const Whiteboard = () => {
    const editorElementRef = useRef(null);
    const editorRef = useRef(null); // Use useRef to store the editor instance
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (editorRef.current) {
                editorRef.current.resize();
            }
        };

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
                editorRef.current = new window.iink.Editor(editorElementRef.current, options);
                await editorRef.current.initialize();
                if (!editorRef.current) {
                    console.error("Editor is not initialized.");
                }
                window.addEventListener("resize", handleResize);
            } catch (error) {
                console.error("Error during iink Editor initialization:", error);
            }
        };
        loadEditor();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleExportAndSubmit = async () => {
        try {
            if (editorRef.current) {
                await editorRef.current.behaviors.sendPNGToServer(editorRef.current.behaviors.haveSymbolsSelected);
                navigate('/oraltest'); // Navigate to the OralTest page after export
            }
        } catch (error) {
            console.error('Error during export or send:', error);
        }
    };

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative', padding: '20px' }}>
            {/* Question Label */}
            <Typography variant="subtitle2" style={{ color: '#888', marginBottom: '5px', fontWeight: 'bold' }}>
                Question
            </Typography>

            {/* Question Text */}
            <Typography variant="h6" style={{ color: '#3f51b5', fontWeight: 'bold', marginBottom: '20px' }}>
                Write a `helloWorld` function.
            </Typography>
            
            {/* Editor Section */}
            <div
                id="editor"
                ref={editorElementRef}
                style={{
                    width: '100%',
                    height: '80%',  // Adjust height to fit the question above
                    touchAction: 'none',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    padding: '10px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff',
                }}
            />
            
            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <HelpButton />
                <SubmitButton onExport={handleExportAndSubmit} />
            </Box>
        </div>
    );
};

export default Whiteboard;
