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
import { auth } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
                await sendPNGToFirebase(editor.current.behaviors.haveSymbolsSelected);
                navigate('/oraltest'); // Navigate to the OralTest page after export
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

    const sendPNGToFirebase = async (i = false) => {
        const behaviors = editor.current.behaviors;
        const symbols = i ? behaviors.model.symbolsSelected : behaviors.model.symbols;
        const bounds = behaviors.getSymbolsBounds(symbols);
        const svgBlob = behaviors.buildBlobFromSymbols(symbols, bounds);
        const svgUrl = URL.createObjectURL(svgBlob);
        const img = new Image();

        img.onload = async () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#FFFFFF'; // Set the background color to white
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill canvas
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(svgUrl); // Clean up the SVG blob URL

            // Convert the canvas to PNG
            canvas.toBlob(async (pngBlob) => {
                // Use user's uid to create path
                const userId = auth.currentUser.uid;
                const storage = getStorage();
                const storageRef = ref(storage, `user-files/${userId}/static.png`);

                try {
                    // Upload PNG blob to Firebase Storage
                    const snapshot = await uploadBytes(storageRef, pngBlob);
                    console.log("Image uploaded to Firebase successfully.");

                    const downloadURL = await getDownloadURL(snapshot.ref);
                    console.log("File available at:", downloadURL);
                } catch (error) {
                    console.error("Error uploading image to Firebase:", error);
                }
            }, 'image/png');
        };
        img.src = svgUrl;
    }

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', position: 'fixed', overflow: 'hidden' }}>

            {/* Question Area */}
            <QuestionArea isVisible={isQuestionVisible} onResizeStop={handleResizeStop} sendPNGToFirebase={sendPNGToFirebase} />

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
                <HelpModal />
                {/* Submit Area */}
                <Box sx={{
                    height: '7vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTop: '1px solid #ccc'
                }}>
                    <SubmitButton onExport={handleExportAndSubmit} />
                </Box>
            </div>
        </div>
    );
};

export default Whiteboard;
