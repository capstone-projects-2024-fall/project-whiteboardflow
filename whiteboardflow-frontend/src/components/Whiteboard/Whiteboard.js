import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import HelpButton from './HelpButton';
import SubmitButton from './SubmitButton';
import { auth } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
                await sendPNGToFirebase(editorRef.current.behaviors.haveSymbolsSelected);
                navigate('/oraltest'); // Navigate to the OralTest page after export
            }
        } catch (error) {
            console.error('Error during export or send:', error);
        }
    };

    const sendPNGToFirebase = async (i = false) => {
        const behaviors = editorRef.current.behaviors;
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
