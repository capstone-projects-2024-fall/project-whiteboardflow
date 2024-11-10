// AvatarContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedAvatar from './RetroAvatar';
import './AvatarContext.css';

/**
 * React context for managing avatar state and visibility.
 */
const AvatarContext = createContext();

/**
 * Custom hook to access the AvatarContext.
 * @returns {Object} - The context value with avatar visibility and toggle functions.
 */
export const useAvatar = () => {
    return useContext(AvatarContext);
};

/**
 * Provides avatar context for managing visibility and showing hints based on the route.
 * @param {Object} props - The properties passed to the provider.
 * @param {React.ReactNode} props.children - The child components wrapped by AvatarProvider.
 * @returns {JSX.Element} - The context provider with avatar and hint display.
 */
export const AvatarProvider = ({ children }) => {
    /** @type {[boolean, Function]} State and function to toggle avatar visibility */
    const [isVisible, setIsVisible] = useState(true);

    /** @type {[boolean, Function]} State and function to toggle hint visibility */
    const [showHint, setShowHint] = useState(false);

    /** @type {Object} - The current route location from react-router */
    const location = useLocation();

    /**
     * Gets a hint message based on the current route path.
     * @returns {string} The hint message.
     */
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
                return "Here are your results!\nGood Job!";
            case '/whiteboard':
                return "Use the whiteboard for brainstorming.";
            default:
                return "Hello! Need any help?";
        }
    };

    /**
     * Toggles the avatar's visibility.
     */
    const toggleAvatar = () => setIsVisible((prev) => !prev);

    /**
     * Toggles the hint bubble's visibility.
     */
    const toggleHint = () => setShowHint((prev) => !prev);

    /**
     * Effect that shows the hint bubble when the route changes.
     * Runs on page load and when the path changes.
     */
    useEffect(() => {
        setShowHint(true);
        // Optionally hide the hint after a few seconds with a timer:
        // const timer = setTimeout(() => setShowHint(false), 5000);
        // return () => clearTimeout(timer);
    }, [location.pathname]);

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
