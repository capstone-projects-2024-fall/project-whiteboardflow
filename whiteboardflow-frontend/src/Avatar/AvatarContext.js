// AvatarContext.js
import React, { createContext, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import AnimatedAvatar from './RetroAvatar';
import './AvatarContext.css';

const AvatarContext = createContext();

export const useAvatar = () => {
    return useContext(AvatarContext);
};

export const AvatarProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [showHint, setShowHint] = useState(false);
    const location = useLocation(); // Get current route location

    // Determine hint message based on the current route
    const getHintMessage = () => {
        switch (location.pathname) {
            case '/':
                return "Welcome to the homepage!";
            case '/OralTest':
                return "Get ready for the oral test!";
            case '/oraltest':
                return "Get ready for the oral test!";
            case '/Settings':
                return "Adjust your preferences here.";
            case '/BackEndTest':
                return "This is where you can test the backend.";
            case '/results':
                return "Check your results here!";
            case '/whiteboard':
                return "Use the whiteboard for brainstorming.";
            default:
                return "Hello! Need any help?";
        }
    };

    const toggleAvatar = () => setIsVisible((prev) => !prev);
    const toggleHint = () => setShowHint((prev) => !prev);

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
