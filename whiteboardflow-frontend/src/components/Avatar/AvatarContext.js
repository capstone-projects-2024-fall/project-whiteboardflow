// AvatarContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedAvatar from './RetroAvatar';
import ReactMarkdown from 'react-markdown';
import './AvatarContext.css';

const AvatarContext = createContext();

export const useAvatar = () => {
    return useContext(AvatarContext);
};

export const AvatarProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [hintMessage, setHintMessage] = useState("");
    const [showHint, setShowHint] = useState(false); // Initial state for the hint bubble
    const location = useLocation(); // Get current route location

    // Show hint automatically when the page loads
    useEffect(() => {
        setShowHint(true);
        const defaultHintMessage = getDefaultHintMessage(location.pathname);
        setHintMessage(defaultHintMessage);
        // Optionally hide the hint after a few seconds
        //const timer = setTimeout(() => setShowHint(false), 5000); // Hide after 5 seconds
        //return () => clearTimeout(timer); // Clean up the timer on unmount
    }, [location.pathname]); // Run this effect on page load and when the path changes

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
                return "Here are your results!\nGood Job!";
            case '/whiteboard':
                return "Use the whiteboard for brainstorming.";
            default:
                return "Hello! Need any help?";
        }
    };

    const toggleAvatar = () => setIsVisible((prev) => !prev);
    const toggleHint = () => setShowHint((prev) => !prev);


    return (
        <AvatarContext.Provider value={{ isVisible, toggleAvatar, setHintMessage }}>
            {children}
            {isVisible && (
                <div className="avatar-fixed-container" onClick={toggleHint}>
                    <AnimatedAvatar />
                    {showHint && (
                        <div className="hint-bubble">
                            <ReactMarkdown>{hintMessage}</ReactMarkdown>
                        </div>
                    )}
                </div>
            )}
        </AvatarContext.Provider>
    );
};
