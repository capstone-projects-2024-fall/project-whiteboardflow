// AvatarContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedAvatar from './RetroAvatar';
import './AvatarContext.css';

const AvatarContext = createContext();

export const useAvatar = () => useContext(AvatarContext);

export const AvatarProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [showHint, setShowHint] = useState(false);
    const location = useLocation();

    const toggleAvatar = () => setIsVisible((prev) => !prev);
    const toggleHint = () => setShowHint((prev) => !prev);

    useEffect(() => {
        setShowHint(true);
    }, [location.pathname]);

    // Determine hint message based on the current route
    const getHintMessage = () => {
        switch (location.pathname) {
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
                return "Click me for a hint!";
            default:
                return "Hello! Need any help?";
        }
    };

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
