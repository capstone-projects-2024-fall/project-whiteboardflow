import React, {useEffect, useRef} from 'react';
import HelpButton from './HelpButton';
import SubmitButton from './SubmitButton';
import './css/reset.css';
import './css/components.css';
import './css/examples.css';

const Whiteboard = () => {
    const editorElementRef = useRef(null);
    let editor = null;

    useEffect(() => {
        const handleResize = () => {
            if (editor) {
                editor.resize();
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
                editor = new window.iink.Editor(editorElementRef.current, options);
                await editor.initialize();
                if (!editor) {
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
        // Assuming downloadAsPNG returns a Blob directly; adjust based on actual return type
            const blob = await editor.behaviors.sendSVGToServer(0);

        } catch (error) {
            console.error('Error during export or send:', error);
        }
    };
    function customDownloadAsPNG() {
        const r = editor.model.symbols; // Assuming all symbols should be used
        const s = editor.getSymbolsBounds(r);
        const n = editor.buildBlobFromSymbols(r, s);
        const a = URL.createObjectURL(n);
        const l = new Image();
        l.width = s.width;
        l.height = s.height;
        l.src = a;
        l.onload = async () => {
            const canvas = document.createElement("canvas");
            canvas.width = l.width;
            canvas.height = l.height;
            const context = canvas.getContext("2d");
            context.drawImage(l, 0, 0);
            URL.revokeObjectURL(a);
            const imageBase64 = canvas.toDataURL("image/png");

            // Instead of downloading, send this to the server
            try {
                const response = await fetch('/api/upload-image', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image: imageBase64 })
                });
                if (response.ok) {
                    console.log('Image successfully uploaded to the server');
                } else {
                    throw new Error('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };
    }

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
