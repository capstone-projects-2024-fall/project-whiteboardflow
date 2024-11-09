// AvatarContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedAvatar from './RetroAvatar';
import './AvatarContext.css';

const AvatarContext = createContext();

export const useAvatar = () => {
    return useContext(AvatarContext);
};

export const AvatarProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [showHint, setShowHint] = useState(false); // Initial state for the hint bubble
    const location = useLocation(); // Get current route location

    // Determine hint message based on the current route
    const getHintMessage = () => {
        switch (location.pathname) {
            case '/':
                return "Welcome to the homepage!";
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

    // Show hint automatically when the page loads
    useEffect(() => {
        setShowHint(true);
        // Optionally hide the hint after a few seconds
        //const timer = setTimeout(() => setShowHint(false), 5000); // Hide after 5 seconds
       //return () => clearTimeout(timer); // Clean up the timer on unmount
    }, [location.pathname]); // Run this effect on page load and when the path changes

    return (
        <AvatarContext.Provider value={{ isVisible, toggleAvatar }}>
            {children}
            {isVisible && (
                <div className="avatar-fixed-container" onClick={toggleHint}>
                    <AnimatedAvatar />
                    {showHint && (
                        <div className="hint-bubble">
                            <p>{getHintMessage()}</p>
                        </div>
                    )}
                </div>
            )}
        </AvatarContext.Provider>
    );
};
