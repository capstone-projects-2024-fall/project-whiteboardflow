// React.js Imports
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useWhiteboard } from './WhiteboardContext';

// Material-UI Imports for UI components
import { Box } from '@mui/material';
import QuestionArea from './QuestionArea';
import SubmitButton from './SubmitButton';
import HelpModal from './HelpModal';
import CustomMenuAction from './CustomMenuAction';
import { auth } from "../../firebase";

// Style imports
import './css/reset.css';
import './css/components.css';
import './css/examples.css';
import './css/custom-menu-action.css';

const Whiteboard = () => {
    // Refs for DOM elements and editor instance
    const { editor, sendPNGToFirebase, isLoaded, setIsLoaded } = useWhiteboard();
    const editorElement = useRef(null);
    const [isQuestionVisible, setQuestionVisible] = useState(true); // State to toggle question visibility
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    // eslint-disable-next-line
    const [darkMode, setDarkMode] = useOutletContext();

    const toggleModal = () => setModalVisible(!modalVisible);

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
                            minWidth: 1240,
                            minHeight: 2000,
                            guides: {
                                enable: false
                            },
                            penStyle: {
                                width: 2, // Fixed pen width
                            },
                        },
                        grabber: {
                            listenerOptions: {
                            },
                            pressureType: 'none', // Disable pressure
                        },
                        recognition: {
                            alwaysConnected: true,
                            type: "TEXT",
                            "recognition-timeout": 3600000
                        },
                        modules: {
                            eraser: true,
                            transcript: true
                        },
                        triggers: {
                            exportContent: "ONDEMAND"
                        },
                        menu: {
                            style: {
                                enable: false
                            },
                            intention: {
                                enable: false
                            },
                            action: {
                                enable: true
                            }
                        }

                    },
                    behaviors: {
                        menu: {
                            action: CustomMenuAction
                        }
                    }
                };
                editor.current = new window.iink.Editor(editorElement.current, options);
                await editor.current.initialize();
                setIsLoaded(true);
                // deleteElements();
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
    }, [isLoaded, editor, setIsLoaded]);

    // Function to handle export and submission of editor content
    const handleExportAndSubmit = async () => {
        try {
            if (editor.current) {
                const userId = auth.currentUser.uid;
                await sendPNGToFirebase(editor.current.behaviors.haveSymbolsSelected, `user-files/${userId}/static.png`);
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
    // function deleteElements() {
    //     // var menu = document.querySelector('.ms-menu.ms-menu-top-left.ms-menu-row');
    //     // if (menu && menu.children.length > 1) {
    //     //     // Remove the second child
    //     //     menu.removeChild(menu.children[1]);
    //     // }
    //     // // Check if the main menu element exists
    //     // if (menu) {
    //     //     // Find the first child with the class 'sub-menu-content.buttom.open' within the first child of the main menu
    //     //     var subMenuContent = menu.children[0]?.querySelector('.sub-menu-content.buttom.open');
    //     //
    //     //     // Check if the sub-menu content element exists
    //     //     if (subMenuContent) {
    //     //         // Find the element with the class 'ms-menu-column' within the sub-menu content
    //     //         var menuColumn = subMenuContent.querySelector('.ms-menu-column');
    //     //
    //     //         // Check if the menu column element exists and has at least four children
    //     //         if (menuColumn && menuColumn.children.length >= 4) {
    //     //             // Remove the first four children
    //     //             for (let i = 0; i < 4; i++) {
    //     //                 menuColumn.removeChild(menuColumn.children[0]);
    //     //             }
    //     //         }
    //     //     }
    //     // }
    //     // document.querySelector('.ms-menu.ms-menu-top-right').style.display = 'none';
    //     // document.querySelector('.ms-menu.ms-menu-bottom.ms-menu-row').style.display = 'none';
    //     // Select the first child div of the element with class 'state'
    //     const stateElement = document.querySelector('.state'); // Select the element with class 'state'
    //     if (stateElement) {
    //         stateElement.remove();
    //     }
    // }

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', position: 'fixed', overflow: 'hidden' }}>

            {/* Question Area */}
            <QuestionArea darkMode={darkMode} isVisible={isQuestionVisible} onResizeStop={handleResizeStop} sendPNGToFirebase={sendPNGToFirebase} />

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
                        backgroundColor: darkMode ? '#bbb' : '#fff',
                    }}
                />
                <button id="link-info" className="link-info" onClick={toggleModal} style={{ cursor: 'pointer', zIndex: '1000', border: 'none', background: "transparent", userSelect: 'none' }}>
                    <img src="/img/info.svg" alt="Info" />
                </button>
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
            <HelpModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
        </div>
    );
};

export default Whiteboard;
