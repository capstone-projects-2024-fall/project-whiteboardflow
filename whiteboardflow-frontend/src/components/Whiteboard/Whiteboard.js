import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div style={{width: '100%', height: '90vh', position: 'relative'}}>
            <div
                id="editor"
                ref={editorElementRef}
                style={{
                    width: '100%',
                    height: '100%',
                    touchAction: 'none',
                }}
            />
            <HelpButton/>
            <SubmitButton onExport={handleExportAndSubmit} />


        </div>
    );
};

export default Whiteboard;
