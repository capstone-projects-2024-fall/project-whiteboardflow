// AvatarContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedAvatar from './RetroAvatar';
import ReactMarkdown from 'react-markdown';
import CircularProgress from '@mui/material/CircularProgress'; // Import MUI loader
import './AvatarContext.css';

const AvatarContext = createContext();

export const useAvatar = () => useContext(AvatarContext);

export const AvatarProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [hintMessage, setHintMessage] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [hintLoading, setHintLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Automatically hide avatar on specific routes
        const hiddenRoutes = ['/questionSelect'];
        setIsVisible(!hiddenRoutes.includes(location.pathname));

        setShowHint(true);
        const defaultHintMessage = getDefaultHintMessage(location.pathname);
        setHintMessage(defaultHintMessage);
    }, [location.pathname]);

    // Determine hint message based on the current route
    const getDefaultHintMessage = (path) => {
        switch (path) {
            case '/':
                return "Welcome to the Whiteboard Assistant!";
            case '/OralTest':
                return "Get ready for the oral test!";
            case '/Settings':
                return "Adjust your preferences here.";
            case '/BackEndTest':
                return "This is where you can test the backend.";
            case '/results':
                return "Here are your results!";
            case '/whiteboard':
                return "Show your work here!";
            default:
                return "Hello! Need any help?";
        }
    };

    const toggleAvatar = () => setIsVisible((prev) => !prev);
    const toggleHint = () => setShowHint((prev) => !prev);


    return (
        <AvatarContext.Provider value={{ isVisible, toggleAvatar, setHintMessage, setHintLoading }}>
            {children}
            {isVisible && (
                <div className="avatar-fixed-container" onClick={toggleHint}>
                    <AnimatedAvatar />
                    {showHint && (
                        <div className="hint-bubble">
                            <div className="hint-content">
                                {hintLoading ? (
                                    <CircularProgress size={40} /> // Show loader if loading
                                ) : (
                                    <ReactMarkdown>{hintMessage}</ReactMarkdown> // Show hint message otherwise
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </AvatarContext.Provider>
    );
};
